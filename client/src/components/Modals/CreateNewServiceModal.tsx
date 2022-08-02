import { Modal, Spinner } from "flowbite-react";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  CreateNewServiceModalQuery,
  CreateNewServiceModalQuery$data,
} from "./__generated__/CreateNewServiceModalQuery.graphql";
import NewServiceForm from "../Forms/NewServiceForm";
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "../../utils/GMapsLibraries";
import { useEffect } from "react";
import { AlertHandler } from "../../utils/AlertHandler";
import { useNavigate } from "react-router-dom";
import { SweetAlertResult } from "sweetalert2";

const CreateNewServiceModal = ({
  isModalOpen,
  setIsModalOpen,
  offerer,
}: any): JSX.Element => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const navigate = useNavigate();

  const data: CreateNewServiceModalQuery$data =
    useLazyLoadQuery<CreateNewServiceModalQuery>(
      graphql`
        query CreateNewServiceModalQuery {
          categories {
            id
            name
          }
        }
      `,
      {},
    );

  const { categories } = data;

  useEffect(() => {
    if (isModalOpen && categories && categories.length <= 0) {
      AlertHandler.fire({
        icon: "warning",
        title: "Warning!",
        text: "There are no categories available!",
        confirmButtonColor: "#384E77",
      }).then((_: SweetAlertResult) => {
        navigate("/app/categories");
      });
    }
  }, [categories, isModalOpen, navigate]);

  if (!categories) return <></>;

  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="3xl">
      <Modal.Header>Create a new service</Modal.Header>
      <Modal.Body>
        {isLoaded ? (
          <NewServiceForm categories={categories} offerer={offerer} />
        ) : (
          <div className="grid h-56 items-center text-center">
            <Spinner size="xl" />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default CreateNewServiceModal;
