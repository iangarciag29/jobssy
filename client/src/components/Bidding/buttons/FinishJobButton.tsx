import { BTN_SIZE, JOB_STATE } from "../../../types";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { HandleGraphQLError } from "../../../utils/ErrorHandler";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils";
import Button from "../../Generics/Button";

const FinishJobButton = ({
  job,
  auth,
}: {
  job: any;
  auth?: any;
}): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[job.state as keyof typeof JOB_STATE];

  const [commitStateMutation] = useMutation(graphql`
    mutation FinishJobButtonMutation(
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

  const handleClick = (): void => {
    commitStateMutation({
      variables: {
        id: job.id,
        new_state: JOB_STATE.FINISHED,
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

  if (auth.user.id !== job.offerer.user.id) return <>ø</>;

  switch (state) {
    case JOB_STATE.WORKING:
      return (
        <Button
          text="Finish job"
          size={BTN_SIZE.SMALL}
          onClick={() => handleClick()}
          className="mx-auto mb-5 bg-cyan-700 text-cyan-50 text-jobssy-blue shadow-none hover:underline "
        />
      );
    default:
      return <></>;
  }
};

export default connect(mapStateToProps, null)(FinishJobButton);
