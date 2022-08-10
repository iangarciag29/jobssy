import { Label, Modal, Textarea, TextInput } from "flowbite-react";
import React, { useEffect, useId, useRef } from "react";
import { useLazyLoadQuery, useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  PostListingModalQuery,
  PostListingModalQuery$data,
} from "./__generated__/PostListingModalQuery.graphql";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import { HandleGraphQLError } from "../../utils/ErrorHandler";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import { AlertHandler } from "../../utils/AlertHandler";
import { SweetAlertResult } from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PostListingModal = ({
  isOpen,
  setIsOpen,
  auth,
}: {
  isOpen: boolean | undefined;
  setIsOpen: (open: boolean) => void;
  auth?: any;
}): JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const categoryId = useId();
  const priceId = useId();
  const currencyId = useId();

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const categoryRef = useRef<any>();
  const priceRef = useRef<any>();
  const currencyRef = useRef<any>();

  const navigate = useNavigate();

  const data: PostListingModalQuery$data =
    useLazyLoadQuery<PostListingModalQuery>(
      graphql`
        query PostListingModalQuery {
          categories {
            id
            name
          }
        }
      `,
      {},
    );

  const [commitMutation] = useMutation(graphql`
    mutation PostListingModalMutation(
      $user_id: ID!
      $category_id: ID!
      $title: String!
      $description: String!
      $price: Float!
      $currency: String!
    ) {
      createPost(
        user_id: $user_id
        category_id: $category_id
        title: $title
        description: $description
        price: $price
        currency: $currency
      ) {
        id
      }
    }
  `);

  const submitPost = (): void => {
    commitMutation({
      variables: {
        user_id: auth.user.id,
        category_id: categoryRef.current.value,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        price: parseFloat(priceRef.current.value),
        currency: currencyRef.current.value,
      },
      onCompleted: (response: any, errors) => {
        if (!HandleGraphQLError(errors)) return;
        const { createPost } = response;
        AlertHandler.fire({
          icon: "success",
          title: "Created!",
          text: "Your post have been created.",
          confirmButtonColor: "#384E77",
        }).then((_) => {
          navigate(`/app/listings/${createPost.id}`);
        });
      },
    });
  };

  const { categories } = data;

  useEffect(() => {
    if (isOpen && categories && categories.length <= 0) {
      AlertHandler.fire({
        icon: "warning",
        title: "Warning!",
        text: "There are no categories available!",
        confirmButtonColor: "#384E77",
      }).then((_: SweetAlertResult) => {
        navigate("/app/categories");
      });
    }
  }, [categories, isOpen, navigate]);

  return (
    <Modal
      show={isOpen}
      size="3xl"
      popup={true}
      onClose={() => setIsOpen(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-bold text-primary">
            Post a new job request
          </h3>
          <div>
            <div className="mb-2 block">
              <Label htmlFor={titleId} value="Title" />
            </div>
            <TextInput id={titleId} required={true} ref={titleRef} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor={descriptionId} value="Description" />
            </div>
            <Textarea
              id={descriptionId}
              required={true}
              rows={5}
              ref={descriptionRef}
              placeholder="Please provide a detailed description of the service you are requesting."
            />
          </div>
          <div className="flex flex-col space-x-0 space-y-5 lg:flex-row lg:space-x-5 lg:space-y-0">
            <div className="w-full lg:w-1/3">
              <label
                htmlFor={categoryId}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Select a category
              </label>
              <select
                id={categoryId}
                ref={categoryRef}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                {categories?.map((category: any) => (
                  <option value={category.id} key={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full lg:w-1/3">
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
            <div className="w-full lg:w-1/3">
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
          <div className="flex w-full justify-end">
            <Button
              size={BTN_SIZE.MEDIUM}
              text="Post"
              onClick={() => submitPost()}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(mapStateToProps, null)(PostListingModal);
