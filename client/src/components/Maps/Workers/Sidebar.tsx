import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Tooltip } from "flowbite-react";
import * as timeago from "timeago.js";

const Sidebar = ({ offerers, bounds }: any): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div>
      <h4 className="text-center text-xl font-semibold">Workers available</h4>
      <hr className="mx-10 mt-10" />
      <div className="mt-5 flex max-h-full flex-col justify-start overflow-auto">
        {offerers.map((offerer: any, idx: number) => (
          <div
            key={offerer.id}
            className={`relative p-5 hover:z-20 hover:cursor-pointer hover:border-r-4 hover:border-jobssy-blue hover:shadow ${
              idx % 2 === 0 ? "" : "bg-white"
            }`}
            onClick={() => navigate(`/app/workers/${offerer.id}`)}
          >
            <h5 className="inline-flex font-semibold">
              {offerer.user.first_name}{" "}
              {offerer.user.verified && (
                <Tooltip content="Verified">
                  <CheckCircleIcon className="ml-2 h-3 w-3" />
                </Tooltip>
              )}
            </h5>
            <p className="truncate text-sm">{offerer.description}</p>
            <span className="jobssy-span text-jobssy-blue">
              Joined {timeago.format(offerer.start_time)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
