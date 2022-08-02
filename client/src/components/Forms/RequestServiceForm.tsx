import { BTN_SIZE } from "../../types";
import Button from "../Generics/Button";
import { useId, useRef } from "react";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { useMutation } from "react-relay";
import { useNavigate } from "react-router-dom";
import { AlertHandler } from "../../utils/AlertHandler";
import { SweetAlertResult } from "sweetalert2";

const RequestServiceForm = ({
  service,
  setIsModalOpen,
  user,
}: any): JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const currencyId = useId();

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const priceRef = useRef<any>();
  const currencyRef = useRef<any>();

  const navigate = useNavigate();

  const [commitMutation, isMutationInFlight] = useMutation(graphql`
    mutation RequestServiceFormMutation(
      $user_id: ID!
      $offerer_id: ID!
      $address_id: ID!
      $title: String!
      $description: String!
      $price: Float!
      $currency: String!
      $started_by_offerer: Boolean!
    ) {
      createJob(
        user_id: $user_id
        offerer_id: $offerer_id
        address_id: $address_id
        title: $title
        description: $description
        price: $price
        currency: $currency
        started_by_offerer: $started_by_offerer
      ) {
        id
      }
    }
  `);

  const onSubmit = () => {
    commitMutation({
      variables: {
        user_id: user.id,
        offerer_id: service.offerer.id,
        address_id: service.address.id,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        price: parseFloat(priceRef.current.value),
        currency: currencyRef.current.value,
        started_by_offerer: false,
      },
      onCompleted: (data: any) => {
        const { createJob } = data;
        AlertHandler.fire({
          icon: "success",
          title: "Sent",
          text: "The job has been created.",
          confirmButtonColor: "#384E77",
        }).then((_: SweetAlertResult) => {
          navigate(`/app/jobs/${createJob.id}`);
          return;
        });
        return;
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
  };

  return (
    <form>
      <div className="flex flex-col space-y-5">
        <div className="flex flex-col">
          <label htmlFor={titleId}>Title</label>
          <input
            type="text"
            id={titleId}
            ref={titleRef}
            className="jobssy-form-input"
            defaultValue={service.title}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={descriptionId}>Job description</label>
          <textarea
            id={descriptionId}
            ref={descriptionRef}
            className="jobssy-form-input"
            defaultValue={service.description}
          />
        </div>
        <div className="flex flex-row space-x-10">
          <div className="w-1/2">
            <label htmlFor={priceId}>Price</label>
            <input
              type="number"
              min={0}
              step={0.01}
              className="jobssy-form-input"
              id={priceId}
              ref={priceRef}
              defaultValue={service.price}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor={currencyId}>Currency</label>
            <input
              type="text"
              maxLength={3}
              minLength={3}
              className="jobssy-form-input"
              id={currencyId}
              ref={currencyRef}
              defaultValue={service.currency}
            />
          </div>
        </div>
        <hr />
        <div className="flex flex-row justify-between">
          <Button
            onClick={() => setIsModalOpen(false)}
            size={BTN_SIZE.MEDIUM}
            text="Cancel"
            className="bg-red-700"
            disabled={isMutationInFlight}
          />
          <Button
            size={BTN_SIZE.MEDIUM}
            text="Send request"
            type="submit"
            disabled={isMutationInFlight}
            onClick={() => onSubmit()}
          />
        </div>
      </div>
    </form>
  );
};

export default RequestServiceForm;
