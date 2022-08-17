import { JOB_STATE } from "../../types";
import DenyOfferBtn from "./buttons/DenyOffer";
import ApproveButton from "./buttons/ApproveButton";
import WorkingButton from "./buttons/WorkingButton";
import FinishJobButton from "./buttons/FinishJobButton";
import SubmitRateButton from "./buttons/SubmitRateButton";

const ControBar = ({ job }: any): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[job.state as keyof typeof JOB_STATE];

  switch (state) {
    case JOB_STATE.DENIED_BY_USER:
    case JOB_STATE.DENIED_BY_OFFERER:
    case JOB_STATE.CANCELLED:
      return <></>;
    default:
      if (job.rate !== null) return <></>;
      return (
        <div className="relative">
          <hr className="mt-10" />
          <div className="flex flex-row justify-around pt-12">
            <ApproveButton job={job} />
            <WorkingButton job={job} />
            <FinishJobButton job={job} />
            <DenyOfferBtn job={job} />
            <SubmitRateButton job={job} />
          </div>
          <span className="jobssy-span absolute top-3 left-0">Control Bar</span>
        </div>
      );
  }
};

export default ControBar;
