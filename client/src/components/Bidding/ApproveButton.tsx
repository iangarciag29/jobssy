import { BTN_SIZE, JOB_STATE } from "../../types";
import Button from "../Generics/Button";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";

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
      }
    }
  `);

  const handlePreviousNextJobState = (state: JOB_STATE): JOB_STATE => {
    // TODO: Validate previous state and to state in order to see if both user and worker had approved the job.

    return JOB_STATE.USER_APPROVED;
  };

  const handleSubmit = (): void => {
    commitStateChangeMutation({
      variables: {
        id: job.id,
        new_state: JOB_STATE.USER_APPROVED,
        author_id: auth.user.id,
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
      return (
        <Button
          text="Approve changes"
          size={BTN_SIZE.SMALL}
          onClick={handleSubmit}
          className="mb-5 bg-green-600 text-green-50 text-jobssy-blue shadow-none hover:underline"
        />
      );
    default:
      return <></>;
  }
};

export default connect(mapStateToProps, null)(ApproveButton);
