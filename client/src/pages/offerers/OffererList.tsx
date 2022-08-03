import { GoogleMap, useLoadScript } from "@react-google-maps/api";
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
import { useEffect, useRef, useState } from "react";
import OffererPreviewModal from "../../components/Modals/OffererPreviewModal";
import { AlertHandler } from "../../utils/AlertHandler";

const OffererList = (): JSX.Element => {
  const [offererPreviewModalOpen, setOffererPreviewModalOpen] =
    useState<boolean>(false);
  const [selectedOfferer, setSelectedOfferer] = useState<any>({});
  const [bounds, setBounds] = useState({});

  const mapRef = useRef<GoogleMap>(null);

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
            verified
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
          start_time
        }
      }
    `,
    {},
  );

  const [latitude, setLatitude] = useState<any>(null);
  const [longitude, setLongitude] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: any) => {
          let lat = position.coords.latitude;
          let lng = position.coords.longitude;

          setLatitude(lat);
          setLongitude(lng);
        },
        () => {
          if (navigator.geolocation) {
            navigator.permissions.query({ name: "geolocation" }).then((res) => {
              if (res.state === "denied") {
                AlertHandler.fire({
                  icon: "warning",
                  title: "Warning!",
                  text: "Jobssy's location features will not be available if location services are disabled.",
                });
              }
            });
          } else {
            AlertHandler.fire({
              icon: "error",
              title: "Error",
              text: "Unable to access your location.",
            });
          }
        },
      );
    }
  }, []);

  useEffect(() => {
    console.log("[DEBUG] [GMAPS] EVENT :: BOUNDS_CHANGED ::", bounds);
  }, [bounds]);

  const { offerers } = data;

  if (!offerers) return <></>;

  return (
    <div className="flex min-h-[90vh] flex-col lg:flex-row">
      {isLoaded && latitude && longitude ? (
        <div className="fixed relative w-full bg-cyan-400 lg:w-3/4">
          <div className="absolute top-0 right-0 left-0 z-10 grid min-h-[5vh] items-center bg-gray-50">
            <Filters
              mapRef={mapRef}
              currentLocation={{ lat: latitude, lng: longitude }}
            />
          </div>
          <WorkersMap
            addresses={offerers.map((offerer: any) => ({
              address: offerer.user.address,
              offerer,
            }))}
            bounds={bounds}
            setBounds={setBounds}
            mapRef={mapRef}
            selectOfferer={selectOfferer}
            currentLocation={{ lat: latitude, lng: longitude }}
          />
        </div>
      ) : (
        <div className="grid w-full items-center bg-gray-100 text-center lg:w-3/4">
          <Spinner size="xl" />
        </div>
      )}
      <div className="w-full overflow-auto bg-gray-50 py-10 lg:w-1/4">
        <Sidebar offerers={offerers} bounds={bounds} />
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
