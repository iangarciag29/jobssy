import { useFragment } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { ServiceList_services$data } from "./__generated__/ServiceList_services.graphql";
import Button from "../Button";
import { BTN_SIZE } from "../../../types";
import { useState } from "react";
import RequestJobModal from "../../Modals/RequestJobModal";
import { Badge } from "flowbite-react";

const ServiceList = ({ offerer }: { offerer: any }): JSX.Element => {
  const [selectedService, setSelectedService] = useState({});
  const [isNewJobModalOpen, setIsNewJobModalOpen] = useState<boolean>(false);

  const data: ServiceList_services$data = useFragment(
    graphql`
      fragment ServiceList_services on Offerer {
        services {
          id
          title
          description
          price
          currency
          created_at
          offerer {
            id
          }
          address {
            id
            name
          }
          category {
            name
          }
        }
      }
    `,
    offerer,
  );

  const { services } = data;

  if (!services || services.length <= 0)
    return (
      <div className="py-5 text-center">
        <p className="text-gray-500">This worker hasn't posted any services.</p>
      </div>
    );

  return (
    <div className="flex flex-col space-y-10">
      {services &&
        services.map((service: any) => (
          <div
            className="flex flex-row justify-between space-x-5"
            key={service.id}
          >
            <div className="mr-10 space-y-5">
              <h5 className="text-xl font-bold capitalize text-secondary">
                {service.title}
              </h5>
              <div className="inline-flex">
                <Badge color="indigo">{service.category.name}</Badge>
              </div>
              <p className="text-justify">{service.description}</p>
            </div>
            <div className="grid flex-1 items-center">
              <div className="flex flex-col text-center text-jobssy-blue">
                <span className="text-2xl font-black">${service.price}</span>{" "}
                <span className="font-semibold">{service.currency}</span>
              </div>
              <div className="text-center">
                <Button
                  size={BTN_SIZE.SMALL}
                  text="Request"
                  onClick={() => {
                    setSelectedService(service);
                    setIsNewJobModalOpen(true);
                  }}
                />
              </div>
            </div>
            <RequestJobModal
              isModalOpen={isNewJobModalOpen}
              setIsModalOpen={setIsNewJobModalOpen}
              service={selectedService}
            />
          </div>
        ))}
    </div>
  );
};

export default ServiceList;
