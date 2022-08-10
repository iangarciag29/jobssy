import {
  EyeIcon,
  LocationMarkerIcon,
  MinusSmIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";
import { Tooltip } from "flowbite-react";

type LatLngLiteral = google.maps.LatLngLiteral;

const Filters = ({
  mapRef,
  currentLocation,
  zoom,
  setZoom,
}: {
  mapRef: any;
  currentLocation: LatLngLiteral;
  zoom: number;
  setZoom: (zoom: number) => void;
}): JSX.Element => {
  return (
    <div className="flex w-full flex-row justify-center space-x-10">
      <div className="my-auto">
        <Tooltip content="Current location">
          <button
            className="rounded-xl bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300 hover:text-gray-900 hover:shadow-md"
            onClick={() => {
              mapRef.current?.panTo(currentLocation);
              setZoom(13);
            }}
          >
            <LocationMarkerIcon className="h-5 w-5 " />
          </button>
        </Tooltip>
      </div>
      <div className="z-50 my-auto flex flex-row space-x-2">
        <Tooltip content="Reduce zoom">
          <button
            className="rounded-xl bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300 hover:text-gray-900 hover:shadow-md"
            onClick={() => setZoom(zoom - 1)}
          >
            <MinusSmIcon className="h-5 w-5" />
          </button>
        </Tooltip>
        <div className="grid items-center">
          <input
            type="range"
            min={5}
            max={15}
            value={zoom}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
          />
        </div>
        <Tooltip content="Increase zoom">
          <button
            className="rounded-xl bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300 hover:text-gray-900 hover:shadow-md"
            onClick={() => setZoom(zoom + 1)}
          >
            <PlusSmIcon className="h-5 w-5" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Filters;
