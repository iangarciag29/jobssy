import { Modal } from "flowbite-react";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";

const RequestJobModal = ({
  isModalOpen,
  setIsModalOpen,
  service,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  service: any;
}): JSX.Element => {
  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Request a new job</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{service.title}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => setIsModalOpen(false)}
          size={BTN_SIZE.MEDIUM}
          text="Send request"
        />
        <Button
          onClick={() => setIsModalOpen(false)}
          size={BTN_SIZE.MEDIUM}
          text="Cancel"
          className="bg-red-700"
        />
      </Modal.Footer>
    </Modal>
  );
};

export default RequestJobModal;
