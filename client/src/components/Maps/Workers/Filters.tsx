import { EyeIcon } from "@heroicons/react/outline";
import { Tooltip } from "flowbite-react";

const Filters = (): JSX.Element => {
  return (
    <div className="flex w-full flex-row justify-center">
      <div className="my-auto">
        <Tooltip content="Toggle visibility">
          <button className="rounded-xl bg-gray-200 p-2 text-gray-800 shadow hover:bg-gray-300 hover:text-gray-900 hover:shadow-md">
            <EyeIcon className="h-5 w-5 " />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Filters;
