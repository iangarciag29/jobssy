import { Modal } from "flowbite-react";
import RequestServiceForm from "../Forms/RequestServiceForm";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";

const RequestJobModal = ({
  isModalOpen,
  setIsModalOpen,
  service,
  auth,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  service: any;
  auth?: any;
}): JSX.Element => {
  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Request a new job</Modal.Header>
      <Modal.Body>
        <RequestServiceForm
          service={service}
          setIsModalOpen={setIsModalOpen}
          user={auth.user}
        />
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, null)(RequestJobModal);
