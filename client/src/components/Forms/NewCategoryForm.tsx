import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import { useId, useRef } from "react";
import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { HandleGraphQLError } from "../../utils/ErrorHandler";
import { Spinner } from "flowbite-react";

const NewCategoryForm = ({ setCounter, setIsModalOpen }: any): JSX.Element => {
  const nameId = useId();
  const nameRef = useRef<HTMLInputElement | null>(null);

  const [commitMutation, isMutationInFlight] = useMutation(graphql`
    mutation NewCategoryFormMutation($name: String!) {
      createCategory(name: $name) {
        id
        name
      }
    }
  `);

  const onSubmit = (e: any): void => {
    e.preventDefault();
    if (!nameRef.current) return;
    commitMutation({
      variables: {
        name: nameRef.current.value,
      },
      onCompleted: (response, errors) => {
        if (!HandleGraphQLError(errors)) return;
        console.log(response);
        setCounter((x: number) => x + 1);
        setIsModalOpen(false);
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
  };

  if (isMutationInFlight) {
    return (
      <div className="grid h-48 items-center text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <form>
      <div className="mb-6">
        <label
          htmlFor={nameId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Category name
        </label>
        <input
          type="text"
          id={nameId}
          ref={nameRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Provide a category name"
        />
      </div>
      <div className="flex justify-end">
        <Button text="Create" size={BTN_SIZE.SMALL} onClick={onSubmit} />
      </div>
    </form>
  );
};

export default NewCategoryForm;
