import { BTN_SIZE, JOB_STATE } from "../../../types";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils";
import Button from "../../Generics/Button";
import { useState } from "react";
import NewRateModal from "../../Modals/NewRateModal";

const SubmitRateButton = ({
  job,
  auth,
}: {
  job: any;
  auth?: any;
}): JSX.Element => {
  const state: JOB_STATE = JOB_STATE[job.state as keyof typeof JOB_STATE];
  const [openModal, setOpenModal] = useState<boolean>(false);

  if (!state) return <></>;

  if (auth.user.id !== job.user.id || job.rate !== null) return <></>;

  switch (state) {
    case JOB_STATE.FINISHED:
      return (
        <>
          <Button
            text="Rate job"
            size={BTN_SIZE.SMALL}
            onClick={() => setOpenModal(true)}
            className="mx-auto mb-5 bg-cyan-700 text-cyan-50 text-jobssy-blue shadow-none hover:underline "
          />
          <NewRateModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            job={job}
          />
        </>
      );
    default:
      return <></>;
  }
};

export default connect(mapStateToProps, null)(SubmitRateButton);
