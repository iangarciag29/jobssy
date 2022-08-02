import { useState } from "react";
import { InformationCircleIcon, LightBulbIcon } from "@heroicons/react/solid";
import { XIcon } from "@heroicons/react/outline";
import CreateOffererProfileModal from "../Modals/CreateOffererProfileModal";

const OffererAd = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      {open && (
        <div
          id="alert-additional-content-5"
          className="relative mb-10 rounded-lg border border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
          role="alert"
        >
          <div className="flex items-center">
            <InformationCircleIcon className="mr-2 h-5 w-5 text-gray-700 dark:text-gray-300" />
            <span className="sr-only">Information</span>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Create your worker profile now!
            </h3>
          </div>
          <div className="mt-2 mb-4 text-sm text-gray-700 dark:text-gray-300">
            With Jobssy worker profile you will be able to find customers around
            your city, get rated and earn money.
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="mr-2 inline-flex items-center rounded-lg bg-gray-700 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-600"
            >
              <LightBulbIcon className="mr-2 h-4 w-4" />
              Create profile
            </button>
            <button
              type="button"
              className="rounded-lg border border-gray-700 bg-transparent px-3 py-1.5 text-center text-xs font-medium text-gray-700 hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-gray-600 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              data-dismiss-target="#alert-additional-content-5"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              Dismiss
            </button>
          </div>
          <button
            className="absolute top-3 right-2 rounded-xl p-2 hover:bg-gray-100"
            onClick={() => setOpen(false)}
          >
            <XIcon className="h-4 w-4" />
          </button>
        </div>
      )}
      <CreateOffererProfileModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default OffererAd;
