import { BTN_SIZE, JOB_STATE } from "../../types";
import Button from "../Generics/Button";

const EditButton = ({
  setIsEditing,
  jobState,
}: {
  setIsEditing: (editing: boolean) => void;
  jobState: string;
}): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[jobState as keyof typeof JOB_STATE];

  if (!state) return <></>;

  switch (state) {
    case JOB_STATE.CANCELLED:
    case JOB_STATE.FINISHED:
    case JOB_STATE.DENIED_BY_OFFERER:
    case JOB_STATE.DENIED_BY_USER:
    case JOB_STATE.PENDING_START:
    case JOB_STATE.WORKING:
      return <></>;
    default:
      return (
        <Button
          text="Edit"
          size={BTN_SIZE.SMALL}
          onClick={() => setIsEditing(true)}
          className="mb-5 bg-transparent text-jobssy-blue shadow-none hover:underline"
        />
      );
  }
};

export default EditButton;
