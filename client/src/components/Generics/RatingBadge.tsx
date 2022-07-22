import { StarIcon } from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react";

const RatingBadge = ({ rating }: { rating: number }): JSX.Element => {
  return (
    <Tooltip
      content={<span className="font-jobssy text-sm font-bold">Rating</span>}
    >
      <div className=" flex flex-row justify-center space-x-1 rounded-xl bg-yellow-100 px-5 py-1 text-yellow-600">
        <div className="grid items-center">
          <p className="text-lg">{rating}</p>
        </div>
        <div className="grid items-center">
          <StarIcon className="h-5 w-5" />
        </div>
      </div>
    </Tooltip>
  );
};

export default RatingBadge;
