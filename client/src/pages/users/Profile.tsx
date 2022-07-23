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
import { Avatar, Tooltip } from "flowbite-react";
import OffererInfo from "./OffererInfo";

const Profile = ({ auth }: any): JSX.Element => {
  const { id } = auth.user;
  const navigate: any = useNavigate();

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
            first_line
            second_line
            city
            state
            country
            zipcode
            latitude
            longitude
            created_at
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

  return (
    <Page
      title={
        <Tooltip content={`[DEBUG] ${user.id}`} placement="right">
          My profile
        </Tooltip>
      }
    >
      <div className="rounded-xl bg-white p-10 shadow">
        <div className="flex flex-row">
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
              <span>{user.address.first_line}</span>
              {user.address.second_line && <span>{user.email}</span>}
              <span>{user.address.city}</span>
              <span>{user.address.state}</span>
              <span>{user.address.country}</span>
              <span>{user.address.zipcode}</span>
            </div>
          )}
        </div>
        {user.is_offerer && <OffererInfo user={user} />}
      </div>
    </Page>
  );
};

export default connect(mapStateToProps, null)(Profile);
