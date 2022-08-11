import { Modal } from "flowbite-react";
import NewBidForm from "../Forms/NewBidForm";

const NewBidModal = ({
  openModal,
  setOpenModal,
  post,
  setFetchKey,
}: {
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  post: any;
  setFetchKey: any;
}): JSX.Element => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>Make a bid</Modal.Header>
      <Modal.Body>
        <NewBidForm
          post={post}
          setOpenModal={setOpenModal}
          setFetchKey={setFetchKey}
        />
      </Modal.Body>
    </Modal>
  );
};
export default NewBidModal;
