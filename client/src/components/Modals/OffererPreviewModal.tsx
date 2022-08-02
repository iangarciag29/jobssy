import { Modal, Tooltip } from "flowbite-react";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import { useNavigate } from "react-router-dom";

const OffererPreviewModal = ({
  offerer,
  isModalOpen,
  setIsModalOpen,
}: any): JSX.Element => {
  const navigate = useNavigate();

  if (!offerer) return <></>;

  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
      <Modal.Header>
        <Tooltip content={`[DEBUG] ${offerer.id}`}>Worker preview</Tooltip>
      </Modal.Header>
      <Modal.Body>
        <div className="flex w-full flex-col space-y-5">
          <h3 className="font-bold">
            {offerer.user?.first_name} {offerer.user?.last_name}
          </h3>
          <p className="text-justify">{offerer.description}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-end">
          <Button
            text="View more"
            size={BTN_SIZE.SMALL}
            onClick={() => navigate(`/app/workers/${offerer.id}}`)}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default OffererPreviewModal;
