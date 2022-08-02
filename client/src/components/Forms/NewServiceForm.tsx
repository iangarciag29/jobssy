import React, { useId, useRef, useState } from "react";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { Spinner } from "flowbite-react";
import AddressPicker from "../Address/AddressPicker";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import { HandleGraphQLError } from "../../utils/ErrorHandler";

const NewServiceForm = ({
  categories,
  auth,
  offerer,
}: {
  categories: any;
  auth?: any;
  offerer: any;
}): JSX.Element => {
  const titleId = useId();
  const categoryId = useId();
  const descriptionId = useId();
  const priceId = useId();
  const currencyId = useId();

  const titleRef = useRef<any>();
  const categoryRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const priceRef = useRef<any>();
  const currencyRef = useRef<any>();

  const [address, setAddress] = useState<{
    name: String;
    lat: number;
    lng: number;
  }>({ name: "", lat: 0, lng: 0 });

  const [commitAddressMutation] = useMutation(graphql`
    mutation NewServiceFormAddressMutation(
      $user_id: ID!
      $name: String!
      $latitude: Float!
      $longitude: Float!
    ) {
      createAddress(
        user_id: $user_id
        name: $name
        latitude: $latitude
        longitude: $longitude
      ) {
        id
      }
    }
  `);

  const [commitNewServiceMutation] = useMutation(graphql`
    mutation NewServiceFormMutation(
      $offerer_id: ID!
      $address_id: ID!
      $category_id: ID!
      $title: String!
      $description: String!
      $price: Float!
      $currency: String!
    ) {
      createService(
        offerer_id: $offerer_id
        address_id: $address_id
        category_id: $category_id
        title: $title
        description: $description
        price: $price
        currency: $currency
      ) {
        id
        title
        description
      }
    }
  `);

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    commitAddressMutation({
      variables: {
        user_id: auth.user.id,
        name: address.name,
        latitude: address.lat,
        longitude: address.lng,
      },
      onCompleted: (addressResponse: any, addressErrors: any) => {
        if (!HandleGraphQLError(addressErrors)) return;
        const address_id = addressResponse.createAddress.id;
        const data = {
          offerer_id: offerer.id,
          address_id,
          title: titleRef.current.value,
          description: descriptionRef.current.value,
          price: parseFloat(priceRef.current.value),
          category_id: categoryRef.current.value,
          currency: currencyRef.current.value,
        };

        commitNewServiceMutation({
          variables: data,
          onCompleted: (response, errors) => {
            if (!HandleGraphQLError(errors)) return;
            console.log(response);
          },
        });
      },
    });
  };

  return (
    <form>
      <div className="mb-6">
        <label
          htmlFor={titleId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Service title
        </label>
        <input
          type="text"
          id={titleId}
          ref={titleRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Enter service title"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor={categoryId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select a category
        </label>
        <select
          id={categoryId}
          ref={categoryRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        >
          {categories.map((category: any) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <AddressPicker setAddress={setAddress} />
      </div>
      <div className="mb-6">
        <label
          htmlFor={descriptionId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Please provide a description of the service.
        </label>
        <textarea
          id={descriptionId}
          rows={5}
          ref={descriptionRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Please provide a profile description"
        ></textarea>
      </div>
      <div className="mb-6 flex flex-col space-x-0 space-y-5 lg:flex-row lg:space-x-10 lg:space-y-0">
        <div className="w-full lg:w-1/2">
          <div className="mb-6">
            <label
              htmlFor={priceId}
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Service price
            </label>
            <input
              type="number"
              step={0.1}
              defaultValue={0.0}
              id={priceId}
              ref={priceRef}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter service price"
              required
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mb-6">
            <label
              htmlFor={currencyId}
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Currency
            </label>
            <input
              type="text"
              id={currencyId}
              ref={currencyRef}
              maxLength={3}
              minLength={3}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Enter price currency"
              required
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <Button text="Post" size={BTN_SIZE.SMALL} onClick={handleSubmit} />
      </div>
    </form>
  );
};

export default connect(mapStateToProps, null)(NewServiceForm);
