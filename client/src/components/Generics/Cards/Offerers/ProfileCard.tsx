import { Avatar } from "flowbite-react";
import RatingBadge from "../../RatingBadge";
import { AtSymbolIcon, GlobeIcon, PhoneIcon } from "@heroicons/react/outline";

const ProfileCard = ({ offerer }: any): JSX.Element => {
  console.log(offerer);

  return (
    <div className="relative flex flex-col space-y-10 rounded-xl bg-white p-10 shadow">
      <div className="flex flex-row ">
        <div className="mr-10 grid flex-none items-center">
          <Avatar
            img="https://xsgames.co/randomusers/avatar.php?g=male"
            rounded={true}
            alt={offerer.user.first_name}
            size="xl"
          />
        </div>
        <div className="flex flex-col justify-center space-y-2">
          <h4 className="text-lg font-black text-secondary lg:text-2xl">
            {offerer.user.first_name} {offerer.user.last_name}
          </h4>
          <span className="text-sm font-light italic">
            Member since {offerer.start_time}
          </span>
          {offerer.user.addresses.length > 0 && (
            <span className="inline-flex text-sm font-light text-gray-900">
              <GlobeIcon className="mt-0.5 mr-1 h-4 w-4" />
              {offerer.user.addresses[0].country}
            </span>
          )}
        </div>
      </div>
      <div className="block lg:hidden">
        <RatingBadge rating={offerer.rating} />
      </div>
      <div className="flex flex-col justify-between space-x-0 space-y-10 lg:flex-row lg:space-y-0 lg:space-x-10">
        <div className="flex w-full flex-col space-y-2 lg:w-2/3">
          <span className="text-sm font-semibold uppercase text-jobssy-green">
            Description
          </span>
          <p className="text-justify">{offerer.description}</p>
        </div>
        <div className="flex w-full flex-col space-y-2 lg:w-1/3">
          <span className="text-sm font-semibold uppercase text-jobssy-green">
            Contact
          </span>
          <a
            href={`mailto:${offerer.user.email}`}
            className="inline-flex text-sm font-light text-gray-900"
          >
            <AtSymbolIcon className="mt-1 mr-1 h-3 w-3" />
            {offerer.user.email}
          </a>
          <a
            href={`tel:${offerer.user.cellphone}`}
            className="inline-flex text-sm font-light text-gray-900"
          >
            <PhoneIcon className="mt-1 mr-1 h-3 w-3" />
            {offerer.user.cellphone}
          </a>
        </div>
      </div>
      <div className="absolute right-5 top-0 hidden lg:block">
        <RatingBadge rating={offerer.rating} />
      </div>
    </div>
  );
};

export default ProfileCard;
