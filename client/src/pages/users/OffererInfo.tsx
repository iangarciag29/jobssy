import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  OffererInfoQuery,
  OffererInfoQuery$data,
} from "./__generated__/OffererInfoQuery.graphql";

const OffererInfo = ({ user }: any) => {
  const { id } = user;

  const data: OffererInfoQuery$data = useLazyLoadQuery<OffererInfoQuery>(
    graphql`
      query OffererInfoQuery($id: ID!) {
        offererByUser(id: $id) {
          description
          jobs_completed
          rating
          bids {
            id
            amount
            currency
            created_at
          }
          jobs {
            id
            currency
            price
            description
            user {
              first_name
              last_name
            }
            rate {
              comment
              value
              created_at
            }
            state
          }
        }
      }
    `,
    { id },
  );

  return <div></div>;
};

export default OffererInfo;
