import { Modal, Spinner } from "flowbite-react";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import AddressPicker from "../Address/AddressPicker";
import { useState } from "react";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { AlertHandler } from "../../utils/AlertHandler";
import { useLoadScript } from "@react-google-maps/api";
import { libraries } from "../../utils/GMapsLibraries";
import { HandleGraphQLError } from "../../utils/ErrorHandler";

const UpdateAddressModal = ({
  isModalOpen,
  setIsModalOpen,
  auth,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  auth?: any;
}): JSX.Element => {
  const [address, setAddress] = useState<{
    name: string;
    lat: number;
    lng: number;
  } | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const [commitMutation] = useMutation(graphql`
    mutation UpdateAddressModalMutation(
      $user_id: ID!
      $name: String!
      $latitude: Float!
      $longitude: Float!
    ) {
      updateAddress(
        user_id: $user_id
        name: $name
        latitude: $latitude
        longitude: $longitude
      ) {
        id
        name
        longitude
        latitude
        updated_at
      }
    }
  `);

  const handleClick = (): void => {
    if (address === null) {
      AlertHandler.fire({
        icon: "error",
        title: "Error!",
        text: "You have not selected a new address yet.",
        confirmButtonColor: "#384E77",
      });
    } else {
      commitMutation({
        variables: {
          user_id: auth.user.id,
          name: address.name,
          latitude: address.lat,
          longitude: address.lng,
        },
        onCompleted: (response, errors) => {
          if (!HandleGraphQLError(errors)) return;
          setIsModalOpen(false);
          setAddress(null);
        },
      });
    }
  };

  return (
    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Modal.Header>Edit Address</Modal.Header>
      <Modal.Body>
        {isLoaded ? (
          <div className="my-5 w-full">
            <AddressPicker setAddress={setAddress} />
          </div>
        ) : (
          <div className="w-full text-center">
            <Spinner size="xl" />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <div className="w-full text-right">
          <Button
            text="Update"
            size={BTN_SIZE.SMALL}
            className=""
            onClick={handleClick}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(mapStateToProps, null)(UpdateAddressModal);
