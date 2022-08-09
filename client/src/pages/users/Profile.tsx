import Page from "../../containers/Page";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import {
  ProfileQuery,
  ProfileQuery$data,
} from "./__generated__/ProfileQuery.graphql";
import { useNavigate } from "react-router-dom";
import { Avatar, Spinner, Tooltip } from "flowbite-react";
import OffererInfo from "./OffererInfo";
import { useLoadScript } from "@react-google-maps/api";
import ProfileMap from "../../components/Maps/ProfileMap";
import { ClockIcon, HomeIcon, RefreshIcon } from "@heroicons/react/outline";
import * as timeago from "timeago.js";
import Button from "../../components/Generics/Button";
import { BTN_SIZE } from "../../types";
import { PencilIcon } from "@heroicons/react/solid";
import { libraries } from "../../utils/GMapsLibraries";
import UpdateAddressModal from "../../components/Modals/UpdateAddressModal";
import { useState } from "react";

const Profile = ({ auth }: any): JSX.Element => {
  const { id } = auth.user;
  const navigate: any = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  const data: ProfileQuery$data = useLazyLoadQuery<ProfileQuery>(
    graphql`
      query ProfileQuery($id: ID!) {
        user(id: $id) {
          id
          first_name
          last_name
          email
          gender
          picture
          is_offerer
          address {
            id
            name
            latitude
            longitude
            created_at
            updated_at
          }
          verified
          posts {
            title
            description
            created_at
            visible
            slug
          }
        }
      }
    `,
    { id },
  );

  const { user } = data;

  if (!user) {
    navigate("/app");
    return <></>;
  }

  let addressParts = user.address?.name.split(",");

  return (
    <Page
      title={
        <Tooltip content={`[DEBUG] ${user.id}`} placement="right">
          My profile
        </Tooltip>
      }
    >
      <div className="mb-10 flex flex-col space-y-10">
        <div className="rounded-xl bg-white p-10 shadow">
          <div className="flex flex-col lg:flex-row">
            <div className="relative w-full text-center lg:w-1/4">
              <Avatar
                img="https://randomuser.me/api/portraits/men/41.jpg"
                rounded={false}
                size="xl"
                className="mx-auto"
              />
            </div>
            <div className="flex w-full flex-col space-y-4 pr-10 lg:w-1/2">
              <span className="text-sm uppercase text-jobssy-green">
                Basic information
              </span>
              <div className="flex flex-row space-x-5">
                <h4 className="font-semibold">Name:</h4>
                <span>
                  {user.first_name} {user.last_name}
                </span>
              </div>
              <div className="flex flex-row space-x-5">
                <h4 className="font-semibold">Email:</h4>
                <span>{user.email}</span>
              </div>
              {user.gender !== "U" && (
                <div className="flex flex-row space-x-5">
                  <h4 className="font-semibold">Gender:</h4>
                  <span>{user.gender === "M" ? "Male" : "Female"}</span>
                </div>
              )}
            </div>
            {user.address && (
              <div className="flex w-full flex-col space-y-3 lg:w-1/4">
                <span className="text-sm uppercase text-jobssy-green">
                  My Address
                </span>
                <span>{user.address.name}</span>
              </div>
            )}
          </div>
          {user.is_offerer && <OffererInfo user={user} />}
        </div>
        <div className="flex h-96 flex-col rounded-xl bg-white shadow lg:flex-row">
          <div className="relative flex w-full flex-col space-y-2 p-10 lg:w-1/3">
            <h4 className="mb-4 inline-flex text-lg font-semibold">
              <span>
                <HomeIcon className="mt-1 mr-2 h-5 w-5" />
              </span>
              My address
            </h4>
            {addressParts?.map((line: String, idx: number) => (
              <p className="inline-flex" key={idx}>
                {line}
              </p>
            ))}
            <div className="absolute top-3 right-5">
              <Button
                size={BTN_SIZE.SMALL}
                text={<PencilIcon className="h-4 w-4" />}
                className="px-2"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
            {user.address && (
              <div className="absolute bottom-2 right-4 flex flex-col">
                <p className=" inline-flex text-sm text-gray-500">
                  <span>
                    <ClockIcon className="mt-1 mr-1 h-3 w-3" />
                  </span>
                  Address registered{" "}
                  {timeago.format(new Date(user.address?.created_at))}
                </p>
                <p className=" inline-flex text-sm text-gray-500">
                  <span>
                    <RefreshIcon className="mt-1 mr-1 h-3 w-3" />
                  </span>
                  Last edited{" "}
                  {timeago.format(new Date(user.address?.updated_at))}
                </p>
              </div>
            )}
          </div>
          {!isLoaded ? (
            <div className="grid w-full items-center text-center">
              <Spinner size="xl" />
            </div>
          ) : (
            <div className="w-full lg:w-2/3">
              <ProfileMap user={user} />
            </div>
          )}
        </div>
      </div>
      <UpdateAddressModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Page>
  );
};

export default connect(mapStateToProps, null)(Profile);
