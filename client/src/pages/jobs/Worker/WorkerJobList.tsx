import {
  UserJobListQuery,
  UserJobListQuery$data,
} from "../User/__generated__/UserJobListQuery.graphql";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { connect } from "react-redux";
import { mapStateToProps } from "../../../utils";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import StateToBadge from "../../../utils/StateToBadge";
import { JOB_STATE } from "../../../types";

const WorkerJobList = ({ auth }: { auth?: any }): JSX.Element => {
  const { id } = auth.user;
  const navigate = useNavigate();

  const data: UserJobListQuery$data = useLazyLoadQuery<UserJobListQuery>(
    graphql`
      query WorkerJobListQuery($id: ID!) {
        jobsByEntity(id: $id, offerer: true) {
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
    { fetchPolicy: "network-only" },
  );

  const { jobsByEntity } = data;

  if (jobsByEntity && jobsByEntity?.length <= 0) {
    return (
      <div className="my-20 grid items-center text-center">
        <p className="text-gray-700">You do not have any jobs.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-10">
      <h4 className="text-lg font-semibold">Ongoing jobs</h4>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 lg:table-fixed">
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
            {jobsByEntity
              ?.filter(
                (job: any) =>
                  job.state === JOB_STATE.WORKING ||
                  job.state === JOB_STATE.PENDING_START ||
                  job.state === JOB_STATE.STARTED,
              )
              .map((job: any, idx: number) => (
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
                      <Tooltip content={`[DEBUG] ${job.id}`}>
                        {job.title}
                      </Tooltip>
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
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => navigate(`/app/jobs/${job.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-lg font-semibold">Jobs that require action</h4>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 lg:table-fixed">
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
            {jobsByEntity
              ?.filter(
                (job: any) =>
                  job.state === JOB_STATE.USER_CREATED ||
                  job.state === JOB_STATE.OFFERER_CREATED ||
                  job.state === JOB_STATE.PENDING_START ||
                  job.state === JOB_STATE.USER_APPROVED ||
                  job.state === JOB_STATE.OFFERER_APPROVED ||
                  job.state === JOB_STATE.USER_CHANGES ||
                  job.state === JOB_STATE.OFFERER_CHANGES,
              )
              .map((job: any, idx: number) => (
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
                      <Tooltip content={`[DEBUG] ${job.id}`}>
                        {job.title}
                      </Tooltip>
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
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => navigate(`/app/jobs/${job.id}`)}
                    >
                      {" "}
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <h4 className="text-lg font-semibold">Past jobs</h4>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 lg:table-fixed">
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
            {jobsByEntity
              ?.filter(
                (job: any) =>
                  job.state === JOB_STATE.FINISHED ||
                  job.state === JOB_STATE.DENIED_BY_OFFERER ||
                  job.state === JOB_STATE.DENIED_BY_USER,
              )
              .map((job: any, idx: number) => (
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
                      <Tooltip content={`[DEBUG] ${job.id}`}>
                        {job.title}
                      </Tooltip>
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
                    <button
                      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      onClick={() => navigate(`/app/jobs/${job.id}`)}
                    >
                      {" "}
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, null)(WorkerJobList);
