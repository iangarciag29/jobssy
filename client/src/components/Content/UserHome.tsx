// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { useLazyLoadQuery } from "react-relay";
import { Link } from "react-router-dom";
import {
  UserHomeQuery,
  UserHomeQuery$data,
} from "./__generated__/UserHomeQuery.graphql";
import OffererAd from "../Alerts/OffererAd";

const UserHome = (): JSX.Element => {
  const data: UserHomeQuery$data = useLazyLoadQuery<UserHomeQuery>(
    graphql`
      query UserHomeQuery {
        offerers {
          id
          user {
            id
            first_name
            last_name
          }
          start_time
          description
          jobs_completed
          rating
        }
      }
    `,
    {},
  );

  const { offerers } = data;

  return (
    <div>
      <OffererAd />
      <div className="grid grid-cols-1 gap-5">
        <h3>Find a worker now</h3>
        {offerers?.map((offerer: any) => (
          <Link
            to={`/app/workers/${offerer.id}`}
            key={offerer.id}
            className="rounded-xl bg-white p-5 shadow"
          >
            <h4>
              {offerer.user.first_name} [{offerer.id}]
            </h4>
            <p className="text-sm font-light">{offerer.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
