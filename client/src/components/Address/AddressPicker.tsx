import { Combobox, Transition } from "@headlessui/react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import React, { Fragment, useId } from "react";
import { SelectorIcon } from "@heroicons/react/outline";

const AddressPicker = ({ setAddress }: any): JSX.Element => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const addressId = useId();

  const handleSelect = async (val: string) => {
    setValue(val, false);
    clearSuggestions();

    const results = await getGeocode({ address: val });
    const { lat, lng } = await getLatLng(results[0]);
    setAddress({ name: val, lat, lng });
  };

  return (
    <Combobox onChange={handleSelect} value={value}>
      <div className="group relative z-0 -mt-5 w-full">
        <label
          htmlFor={addressId}
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Select your address
        </label>

        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
          <Combobox.Input
            onChange={(event) => setValue(event.target.value)}
            disabled={!ready}
            id={addressId}
            placeholder="Enter your address"
            className="jobssy-form-input"
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => clearSuggestions()}
        >
          <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <Combobox.Option
                  value={description}
                  key={place_id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-jobssy-blue text-white" : "text-gray-900"
                    }`
                  }
                >
                  {description}
                </Combobox.Option>
              ))}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default AddressPicker;
