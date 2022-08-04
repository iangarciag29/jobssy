import { JOB_STATE } from "../../types";
import DenyOfferBtn from "./DenyOffer";
import ApproveButton from "./ApproveButton";

const ControBar = ({ job }: any): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[job.state as keyof typeof JOB_STATE];

  switch (state) {
    case JOB_STATE.DENIED_BY_USER:
    case JOB_STATE.DENIED_BY_OFFERER:
    case JOB_STATE.CANCELLED:
    case JOB_STATE.FINISHED:
    case JOB_STATE.WORKING:
      return <></>;
    default:
      return (
        <div className="relative">
          <hr className="mt-10" />
          <div className="flex flex-row justify-around pt-5">
            <DenyOfferBtn job={job} />
            <ApproveButton job={job} />
          </div>
          <span className="jobssy-span absolute top-3 left-0">Control Bar</span>
        </div>
      );
  }
};

export default ControBar;
