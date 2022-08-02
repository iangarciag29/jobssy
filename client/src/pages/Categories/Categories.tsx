import { useLazyLoadQuery, useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  CategoriesQuery,
  CategoriesQuery$data,
} from "./__generated__/CategoriesQuery.graphql";
import Page from "../../containers/Page";
import Button from "../../components/Generics/Button";
import { BTN_SIZE } from "../../types";
import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import CreateCategoryModal from "../../components/Modals/CreateCategoryModal";
import { HandleGraphQLError } from "../../utils/ErrorHandler";

const Categories = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const data: CategoriesQuery$data = useLazyLoadQuery<CategoriesQuery>(
    graphql`
      query CategoriesQuery {
        categories {
          id
          name
        }
      }
    `,
    {},
  );

  const [commitMutation, _] = useMutation(graphql`
    mutation CategoriesDeletionMutation($id: ID!) {
      deleteCategory(id: $id)
    }
  `);

  const deleteCategory = (id: string) => {
    commitMutation({
      variables: {
        id,
      },
      onCompleted: (response, errors) => {
        if (!HandleGraphQLError(errors)) return;
        categories?.filter((category: any) => category.id !== id);
      },
    });
  };

  const { categories } = data;

  return (
    <Page
      title="Categories"
      actionBtn={
        <Button
          text={<PlusIcon className="h-4 w-4" />}
          size={BTN_SIZE.SMALL}
          className="rounded-full bg-jobssy-blue px-2"
          onClick={() => setIsModalOpen(true)}
        />
      }
    >
      <div className="relative mb-10 overflow-x-auto shadow sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-100 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category: any) => (
              <tr
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-900"
                key={category.id}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                >
                  {category.name}
                </th>
                <td className="py-4 px-6">
                  <Button
                    size={BTN_SIZE.SMALL}
                    text="Delete"
                    onClick={() => deleteCategory(category.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CreateCategoryModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Page>
  );
};

export default Categories;
