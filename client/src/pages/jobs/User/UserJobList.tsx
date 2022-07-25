import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils";
import {
  UserJobListQuery,
  UserJobListQuery$data,
} from "./__generated__/UserJobListQuery.graphql";
import { Tooltip } from "flowbite-react";
import { Link } from "react-router-dom";
import StateToBadge from "../../../utils/StateToBadge";

const UserJobList = ({ auth }: any): JSX.Element => {
  const { id } = auth.user;

  const data: UserJobListQuery$data = useLazyLoadQuery<UserJobListQuery>(
    graphql`
      query UserJobListQuery($id: ID!) {
        jobsByUser(id: $id) {
          id
          title
          description
          user {
            id
            first_name
            last_name
          }
          state
          price
          currency
        }
      }
    `,
    { id },
  );

  const { jobsByUser } = data;

  console.log(jobsByUser);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-fixed text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Status
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobsByUser?.map((job: any, idx: number) => (
              <tr
                className={`border-b ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } dark:border-gray-700 dark:bg-gray-900`}
                key={job.id}
              >
                <th
                  scope="row"
                  className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                >
                  <Link to={`/app/jobs/${job.id}`}>
                    <Tooltip content={`[DEBUG] ${job.id}`}>{job.title}</Tooltip>
                  </Link>
                </th>
                <td className="truncate py-4 px-6">{job.description}</td>
                <td className="py-4 px-6">
                  <StateToBadge stateValue={job.state as string} />
                </td>
                <td className="py-4 px-6">
                  ${job.price} {job.currency}
                </td>
                <td className="py-4 px-6">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Edit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(UserJobList);
