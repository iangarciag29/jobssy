import { BTN_SIZE, JOB_STATE } from "../../../types";
import Button from "../../Generics/Button";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils";
import { HandleGraphQLError } from "../../../utils/ErrorHandler";

const DenyOfferBtn = ({ job, auth }: { job: any; auth?: any }): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[job.state as keyof typeof JOB_STATE];

  const [commitStateMutation] = useMutation(graphql`
    mutation DenyOfferBtnMutation(
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

  const handleSubmit = (): void => {
    commitStateMutation({
      variables: {
        id: job.id,
        new_state:
          auth.user.id === job.user.id
            ? JOB_STATE.DENIED_BY_USER
            : JOB_STATE.DENIED_BY_OFFERER,
        author_id: auth.user.id,
      },
      onCompleted: (response, errors) => {
        if (!HandleGraphQLError(errors)) return;
        console.log(response);
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
  };

  if (!state) return <></>;

  switch (state) {
    case JOB_STATE.CANCELLED:
    case JOB_STATE.FINISHED:
    case JOB_STATE.DENIED_BY_OFFERER:
    case JOB_STATE.DENIED_BY_USER:
    case JOB_STATE.PENDING_START:
    case JOB_STATE.WORKING:
    case JOB_STATE.USER_CHANGES:
    case JOB_STATE.STARTED:
      return <></>;
    default:
      if (job.state === JOB_STATE.USER_CREATED && auth.user.id === job.user.id)
        return <></>;
      return (
        <Button
          text="Deny job"
          size={BTN_SIZE.SMALL}
          onClick={handleSubmit}
          className="mx-auto mb-5 bg-red-700 text-red-50 text-jobssy-blue shadow-none hover:underline "
        />
      );
  }
};

export default connect(mapStateToProps, null)(DenyOfferBtn);
