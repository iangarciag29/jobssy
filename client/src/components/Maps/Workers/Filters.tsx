import { EyeIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import { Tooltip } from "flowbite-react";

type LatLngLiteral = google.maps.LatLngLiteral;

const Filters = ({
  mapRef,
  currentLocation,
}: {
  mapRef: any;
  currentLocation: LatLngLiteral;
}): JSX.Element => {
  return (
    <div className="flex w-full flex-row justify-center space-x-10">
      <div className="my-auto">
        <Tooltip content="Toggle visibility">
          <button className="rounded-xl bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300 hover:text-gray-900 hover:shadow-md">
            <EyeIcon className="h-5 w-5 " />
          </button>
        </Tooltip>
      </div>
      <div className="my-auto">
        <Tooltip content="Current location">
          <button
            className="rounded-xl bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300 hover:text-gray-900 hover:shadow-md"
            onClick={() => mapRef.current?.panTo(currentLocation)}
          >
            <LocationMarkerIcon className="h-5 w-5 " />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Filters;
