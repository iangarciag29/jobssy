import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  OffererInfoQuery,
  OffererInfoQuery$data,
} from "./__generated__/OffererInfoQuery.graphql";
import Button from "../../components/Generics/Button";
import { BTN_SIZE } from "../../types";
import { PlusIcon } from "@heroicons/react/outline";
import CreateNewServiceModal from "../../components/Modals/CreateNewServiceModal";
import { useState } from "react";
import { Badge } from "flowbite-react";
import RequestJobModal from "../../components/Modals/RequestJobModal";

const OffererInfo = ({ user }: any) => {
  const { id } = user;
  const [newServiceModalOpen, setNewServiceModalOpen] =
    useState<boolean>(false);

  const data: OffererInfoQuery$data = useLazyLoadQuery<OffererInfoQuery>(
    graphql`
      query OffererInfoQuery($id: ID!) {
        offererByUser(id: $id) {
          id
          description
          jobs_completed
          rating
          bids {
            id
            amount
            currency
            created_at
          }
          jobs {
            id
            currency
            price
            description
            user {
              first_name
              last_name
            }
            rate {
              comment
              value
              created_at
            }
            state
          }
          services {
            id
            title
            description
            category {
              name
            }
            price
            currency
          }
        }
      }
    `,
    { id },
  );

  const offerer = data.offererByUser;

  if (!offerer)
    return (
      <div>
        <p>Couldn't find worker profile details.</p>
      </div>
    );

  return (
    <div className="w-full pt-10 pb-5">
      <hr className="mb-5" />
      <h4 className="text-lg font-semibold">Worker profile</h4>
      <div className="flex flex-col lg:flex-row">
        <div className="flex w-full flex-col space-y-5 py-5 lg:w-1/3">
          <span className="jobssy-span">Description</span>
          <p>{offerer.description}</p>
        </div>
        <div className="relative flex w-full flex-col space-y-5 py-5 lg:w-2/3">
          <span className="jobssy-span">Services</span>
          {offerer.services &&
            offerer.services.length > 0 &&
            offerer.services.map((service: any) => (
              <div
                className="flex flex-row justify-between space-x-5 text-sm"
                key={service.id}
              >
                <div className="mr-10 space-y-5">
                  <h5 className="font-bold capitalize text-secondary">
                    {service.title}
                  </h5>
                  <div className="inline-flex">
                    <Badge color="indigo">{service.category.name}</Badge>
                  </div>
                  <p className="text-justify">{service.description}</p>
                </div>
                <div className="grid flex-1 flex-col items-center">
                  <div className="flex flex-col text-center text-jobssy-blue">
                    <span className="text-xl font-black">${service.price}</span>{" "}
                    <span className="font-semibold">{service.currency}</span>
                  </div>
                </div>
              </div>
            ))}
          {offerer.services && offerer.services.length <= 0 && (
            <p className="text-sm text-gray-500">
              You don't have any services listed. You can list one by clicking
              the plus button at the top right corner.
            </p>
          )}
          <Button
            size={BTN_SIZE.EXTRA_SMALL}
            text={<PlusIcon className="h-4 w-4" />}
            className="absolute top-0 right-0 rounded-full px-1"
            onClick={() => setNewServiceModalOpen(true)}
          />
        </div>
        <CreateNewServiceModal
          offerer={offerer}
          isModalOpen={newServiceModalOpen}
          setIsModalOpen={setNewServiceModalOpen}
        />
      </div>
      <div></div>
    </div>
  );
};

export default OffererInfo;
