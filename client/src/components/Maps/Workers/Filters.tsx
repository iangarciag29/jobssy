import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  LocationMarkerIcon,
  MinusSmIcon,
  PlusSmIcon,
  SelectorIcon,
} from "@heroicons/react/outline";
import { Tooltip } from "flowbite-react";
import { Fragment, useEffect, useState } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;

const Filters = ({
  mapRef,
  currentLocation,
  zoom,
  setZoom,
  categories,
  selectedCategory,
  setSelectedCategory,
  setQueryArgs,
}: {
  mapRef: any;
  currentLocation: LatLngLiteral;
  zoom: number;
  setZoom: (zoom: number) => void;
  categories: any;
  selectedCategory: any;
  setSelectedCategory: any;
  setQueryArgs: any;
}): JSX.Element => {
  const [minRate, setMinRate] = useState<number>(0);
  const [maxRate, setMaxRate] = useState<number>(5);
  const [jobs_done, setJobsDone] = useState<boolean>(false);

  useEffect(() => {
    if (maxRate <= minRate) return;
    setQueryArgs((prev: any) => ({
      options: {
        fetchKey: (prev?.fetchKey ?? 0) + 1,
      },
      variables: { max_rate: maxRate, min_rate: minRate, jobs_done: jobs_done },
    }));
  }, [minRate, maxRate, jobs_done]);

  return (
    <div className="flex flex-none flex-row justify-center space-x-10">
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
      <div className="relative my-auto">
        <div className=" w-72">
          <Listbox value={selectedCategory} onChange={setSelectedCategory}>
            <div className="">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-200 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">{selectedCategory.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <SelectorIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {categories.map((category: any) => (
                    <Listbox.Option
                      key={category.id}
                      value={category}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "cursor-pointer bg-sky-100 text-sky-900"
                            : "text-gray-900"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {category.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="my-auto flex min-w-[150px] flex-row space-x-2">
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
            step={1}
            value={zoom}
            onChange={(e) => setZoom(parseInt(e.target.value))}
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
      <div className="my-auto">
        <input
          type="number"
          min={1}
          max={5}
          step={1}
          onChange={(e) => setMinRate(parseInt(e.target.value))}
          className="block min-w-[6rem] rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Min rate"
        />
      </div>
      <div className="my-auto">
        <input
          type="number"
          min={1}
          max={5}
          step={1}
          onChange={(e) => setMaxRate(parseInt(e.target.value))}
          className="block min-w-[6rem] rounded-lg border border-gray-300 bg-gray-200 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Max rate"
        />
      </div>
    </div>
  );
};

export default Filters;
