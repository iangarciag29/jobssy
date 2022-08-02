import { Modal } from "flowbite-react";
import NewOffererProfileForm from "../Forms/NewOffererProfileForm";

const CreateOffererProfileModal = ({
  isModalOpen,
  setIsModalOpen,
}: any): JSX.Element => {
  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Create a worker profile</Modal.Header>
      <Modal.Body>
        <NewOffererProfileForm />
      </Modal.Body>
    </Modal>
  );
};

export default CreateOffererProfileModal;
