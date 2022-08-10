import { Avatar, Tooltip } from "flowbite-react";
import * as timeago from "timeago.js";
import { AtSymbolIcon, ClockIcon, PhoneIcon } from "@heroicons/react/outline";

const BasicProfile = ({ profile }: { profile: any }): JSX.Element => {
  return (
    <div className="relative flex flex-col justify-start space-x-0 space-y-10 space-y-0 lg:flex-row lg:space-x-10">
      <div className="">
        <Avatar
          img="https://xsgames.co/randomusers/avatar.php?g=male"
          rounded={true}
          size="xl"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <h5 className="font-semibold">
          {profile.first_name} {profile.last_name}
        </h5>
        <span className="inline-flex text-sm font-light text-gray-700">
          <ClockIcon className="mt-0.5 mr-2 h-4 w-4" />
          Joined Jobssy {timeago.format(profile.created_at)}
        </span>
        <span className="text-sm font-semibold uppercase text-jobssy-green">
          Contact
        </span>
        <a
          href={`mailto:${profile.email}`}
          className="inline-flex text-sm font-light text-gray-900"
        >
          <AtSymbolIcon className="mt-1 mr-1 h-3 w-3" />
          {profile.email}
        </a>
        <a
          href={`tel:${profile.cellphone}`}
          className="inline-flex text-sm font-light text-gray-900"
        >
          <PhoneIcon className="mt-1 mr-1 h-3 w-3" />
          {profile.cellphone}
        </a>
      </div>
      {profile.verified && (
        <div className="absolute top-0 right-0">
          <span className="mr-2 inline-flex items-center rounded-full bg-blue-100 p-1 text-sm font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
            <Tooltip content="Verified">
              <svg
                className="h-3 w-3"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Tooltip>
          </span>
        </div>
      )}
    </div>
  );
};

export default BasicProfile;
