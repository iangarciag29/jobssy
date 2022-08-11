import { Label, TextInput } from "flowbite-react";
import React, { useId, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { HandleGraphQLError } from "../../utils/ErrorHandler";
import { AlertHandler } from "../../utils/AlertHandler";
import { SweetAlertResult } from "sweetalert2";

const NewBidForm = ({
  auth,
  post,
  setOpenModal,
  setFetchKey,
}: {
  auth?: any;
  post: any;
  setOpenModal: (open: boolean) => void;
  setFetchKey: any;
}): JSX.Element => {
  const priceId = useId();
  const currencyId = useId();

  const priceRef = useRef<any>();
  const currencyRef = useRef<any>();

  const navigate = useNavigate();

  const [commitNewBidMutation] = useMutation(graphql`
    mutation NewBidFormMutation(
      $offerer_id: ID!
      $post_id: ID!
      $amount: Float!
      $currency: String!
    ) {
      createBid(
        offerer_id: $offerer_id
        post_id: $post_id
        amount: $amount
        currency: $currency
      ) {
        id
        offerer {
          user {
            first_name
            last_name
            email
          }
        }
        amount
        currency
        created_at
      }
    }
  `);

  const handleClick = (): void => {
    if (priceRef.current.value === "" || currencyRef.current.value === "") {
      AlertHandler.fire({
        icon: "warning",
        title: "Oh!",
        text: "You must enter a price and a currency",
        confirmButtonColor: "#384E77",
      });
      return;
    }
    commitNewBidMutation({
      variables: {
        offerer_id: auth.user.id,
        post_id: post.id,
        amount: parseFloat(priceRef.current.value),
        currency: currencyRef.current.value,
      },
      onCompleted: (response, errors) => {
        if (!HandleGraphQLError) return;
        AlertHandler.fire({
          icon: "success",
          title: "Sent!",
          text: "The bid has been sent.",
          confirmButtonColor: "#384E77",
        }).then((_: SweetAlertResult) => {
          setFetchKey((x: number) => x + 1);
          setOpenModal(false);
          priceRef.current.value = "";
          currencyRef.current.value = "";
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  return (
    <>
      <div className="flex flex-col space-x-0 space-y-5 lg:flex-row lg:space-x-10 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <div>
            <div className="mb-1 block">
              <Label htmlFor={priceId} value="Price" />
            </div>
            <TextInput
              step={0.1}
              id={priceId}
              ref={priceRef}
              required={true}
              addon="$"
              placeholder="0.00"
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div>
            <div className="block">
              <Label htmlFor={currencyId} value="Currency" />
            </div>
            <TextInput
              id={currencyId}
              type="text"
              ref={currencyRef}
              maxLength={3}
              minLength={3}
              placeholder="USD"
              required={true}
            />
          </div>
        </div>
      </div>
      <div className="mt-5 text-right">
        <Button text="Make bid" size={BTN_SIZE.SMALL} onClick={handleClick} />
      </div>
    </>
  );
};

export default connect(mapStateToProps, null)(NewBidForm);
