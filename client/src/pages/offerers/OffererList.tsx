import { useLoadScript } from "@react-google-maps/api";
import { Spinner } from "flowbite-react";
import WorkersMap from "../../components/Maps/WorkersMap";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  OffererListQuery,
  OffererListQuery$data,
} from "./__generated__/OffererListQuery.graphql";
import { libraries } from "../../utils/GMapsLibraries";
import Sidebar from "../../components/Maps/Workers/Sidebar";
import Filters from "../../components/Maps/Workers/Filters";
import { useState } from "react";
import OffererPreviewModal from "../../components/Modals/OffererPreviewModal";

const OffererList = (): JSX.Element => {
  const [offererPreviewModalOpen, setOffererPreviewModalOpen] =
    useState<boolean>(false);
  const [selectedOfferer, setSelectedOfferer] = useState<any>({});

  const selectOfferer = (offerer: any) => {
    setSelectedOfferer(offerer);
    setOffererPreviewModalOpen(true);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const data: OffererListQuery$data = useLazyLoadQuery<OffererListQuery>(
    graphql`
      query OffererListQuery {
        offerers {
          id
          description
          user {
            first_name
            last_name
            email
            cellphone
            address {
              id
              name
              latitude
              longitude
            }
          }
          services {
            category {
              id
              name
            }
          }
          rating
          jobs_completed
        }
      }
    `,
    {},
  );

  const { offerers } = data;

  if (!offerers) return <></>;

  return (
    <div className="flex min-h-[90vh] flex-col lg:flex-row">
      {isLoaded ? (
        <div className="fixed relative w-full bg-cyan-400 lg:w-3/4">
          <div className="absolute top-0 right-0 left-0 z-10 grid min-h-[5vh] items-center bg-gray-50">
            <Filters />
          </div>
          <WorkersMap
            addresses={offerers.map((offerer: any) => ({
              address: offerer.user.address,
              offerer,
            }))}
            selectOfferer={selectOfferer}
          />
        </div>
      ) : (
        <div className="grid w-full items-center bg-gray-100 text-center lg:w-3/4">
          <Spinner size="xl" />
        </div>
      )}
      <div className="w-full overflow-auto bg-gray-50 py-10 lg:w-1/4">
        <Sidebar offerers={offerers} selectOfferer={selectOfferer} />
      </div>
      <OffererPreviewModal
        offerer={selectedOfferer}
        isModalOpen={offererPreviewModalOpen}
        setIsModalOpen={setOffererPreviewModalOpen}
      />
    </div>
  );
};

export default OffererList;
