import { Modal } from "flowbite-react";
import NewCategoryForm from "../Forms/NewCategoryForm";

const CreateCategoryModal = ({
  isModalOpen,
  setIsModalOpen,
  setCounter,
}: any): JSX.Element => {
  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Create a new category</Modal.Header>
      <Modal.Body>
        <NewCategoryForm
          setCounter={setCounter}
          setIsModalOpen={setIsModalOpen}
        />
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryModal;
