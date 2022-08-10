import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { Tooltip } from "flowbite-react";
import * as timeago from "timeago.js";
import { useEffect, useState } from "react";
import { isWithinBounds } from "../../../utils/MathUtils";
import RatingBadge from "../../Generics/RatingBadge";

const Sidebar = ({ offerers, bounds }: any): JSX.Element => {
  const navigate = useNavigate();

  const [internalFilter, setInternalFilter] = useState(offerers);

  useEffect(() => {
    setInternalFilter(
      offerers.filter((offerer: any) =>
        isWithinBounds(
          {
            lat: offerer.user.address.latitude,
            lng: offerer.user.address.longitude,
          },
          bounds,
        ),
      ),
    );
  }, [bounds, offerers]);

  return (
    <div>
      <h4 className="text-center text-xl font-semibold">Workers available</h4>
      <hr className="mx-10 mt-10" />
      <div className="mt-5 flex max-h-full flex-col justify-start overflow-auto">
        {internalFilter.length > 0 &&
          internalFilter.map((offerer: any, idx: number) => (
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
              <p className="text-sm text-gray-600">
                ({offerer.services.length}) service(s) listed.
              </p>
              <Tooltip content="Categories">
                <div className="flex flex-row space-x-2 overflow-x-scroll py-2">
                  {[
                    ...new Set(
                      offerer.services.map(
                        (service: any) => service.category.name,
                      ),
                    ),
                  ].map((name: any) => (
                    <span
                      className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800"
                      key={name}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </Tooltip>
              <p className="truncate text-sm">{offerer.description}</p>
              <span className="jobssy-span text-jobssy-blue">
                Joined {timeago.format(offerer.start_time)}
              </span>
              <div className="absolute top-2 right-2">
                <RatingBadge rating={offerer.rating} />
              </div>
            </div>
          ))}
        {internalFilter.length <= 0 && (
          <p className="mt-10 text-center text-sm text-gray-600">
            There are no workers in this area
          </p>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
