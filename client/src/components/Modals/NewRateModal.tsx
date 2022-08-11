import { Modal } from "flowbite-react";
import NewRateForm from "../Forms/NewRateForm";

const NewRateModal = ({
  openModal,
  setOpenModal,
  job,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  job: any;
}): JSX.Element => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Rate this job</Modal.Header>
      <Modal.Body>
        <NewRateForm job={job} setOpenModal={setOpenModal} />
      </Modal.Body>
    </Modal>
  );
};

export default NewRateModal;
