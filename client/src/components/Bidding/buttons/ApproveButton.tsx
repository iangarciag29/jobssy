import { BTN_SIZE, JOB_STATE } from "../../../types";
import Button from "../../Generics/Button";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils";
import { Tooltip } from "flowbite-react";
import { HandleGraphQLError } from "../../../utils/ErrorHandler";

const ApproveButton = ({
  job,
  auth,
}: {
  job: any;
  auth?: any;
}): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[job.state as keyof typeof JOB_STATE];

  const [commitStateChangeMutation] = useMutation(graphql`
    mutation ApproveButtonMutation(
      $id: ID!
      $new_state: JobState!
      $author_id: ID!
    ) {
      updateState(id: $id, new_state: $new_state, author_id: $author_id) {
        id
        state
        logs {
          id
          state_from
          state_to
          created_at
        }
      }
    }
  `);

  const handlePreviousNextJobState = (
    current_state: JOB_STATE,
    is_offerer: boolean,
  ): JOB_STATE => {
    if (
      !is_offerer &&
      (current_state === JOB_STATE.OFFERER_APPROVED ||
        current_state === JOB_STATE.OFFERER_CHANGES ||
        current_state === JOB_STATE.OFFERER_CREATED)
    )
      return JOB_STATE.PENDING_START;
    if (
      is_offerer &&
      (current_state === JOB_STATE.USER_CHANGES ||
        current_state === JOB_STATE.USER_APPROVED ||
        current_state === JOB_STATE.USER_CREATED)
    )
      return JOB_STATE.STARTED;
    return JOB_STATE.CANCELLED;
  };

  const handleSubmit = (): void => {
    commitStateChangeMutation({
      variables: {
        id: job.id,
        new_state: handlePreviousNextJobState(
          job.state,
          auth.user.id === job.offerer.user.id,
        ),
        author_id: auth.user.id,
      },
      onCompleted: (response, errors) => {
        if (!HandleGraphQLError(errors)) return;
      },
    });
  };

  if (!state) return <></>;

  switch (state) {
    case JOB_STATE.USER_CREATED:
    case JOB_STATE.OFFERER_CREATED:
    case JOB_STATE.OFFERER_APPROVED:
    case JOB_STATE.USER_APPROVED:
    case JOB_STATE.USER_CHANGES:
    case JOB_STATE.OFFERER_CHANGES:
      if (
        auth.user.id !== job.offerer.user.id &&
        auth.user.id === job.user.id &&
        (job.state === JOB_STATE.USER_APPROVED ||
          job.state === JOB_STATE.USER_CREATED ||
          job.state === JOB_STATE.USER_CHANGES)
      )
        return <p>You are the customer and already approved this job.</p>;
      if (auth.user.id === job.offerer.user.id && JOB_STATE.OFFERER_CHANGES)
        return <></>;
      return (
        <Button
          text={
            <Tooltip
              content={`[DEBUG] [NEXT] ${handlePreviousNextJobState(
                job.state,
                auth.user.id === job.offerer.user.id,
              )}`}
            >
              Approve changes
            </Tooltip>
          }
          size={BTN_SIZE.SMALL}
          onClick={handleSubmit}
          className="mb-5 bg-green-600 text-green-50 shadow-none hover:underline"
        />
      );
    default:
      return <></>;
  }
};

export default connect(mapStateToProps, null)(ApproveButton);
