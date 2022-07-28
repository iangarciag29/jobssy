import { Label, Modal, Textarea, TextInput } from "flowbite-react";
import React, { useId } from "react";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  PostListingModalQuery,
  PostListingModalQuery$data,
} from "./__generated__/PostListingModalQuery.graphql";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";

const PostListingModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean | undefined;
  setIsOpen: (open: boolean) => void;
}): JSX.Element => {
  const titleId = useId();
  const descriptionId = useId();
  const categoryId = useId();
  const priceId = useId();
  const currencyId = useId();

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

  const { categories } = data;

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
            <TextInput id={titleId} required={true} />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor={descriptionId} value="Description" />
            </div>
            <Textarea
              id={descriptionId}
              required={true}
              rows={5}
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
                  maxLength={3}
                  minLength={3}
                  placeholder="USD"
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="flex w-full justify-end">
            <Button size={BTN_SIZE.MEDIUM} text="Post" />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default PostListingModal;
