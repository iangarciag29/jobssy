import { useFragment } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { JobStateTimeline_logs$data } from "./__generated__/JobStateTimeline_logs.graphql";
import { ClockIcon } from "@heroicons/react/outline";
import * as timeago from "timeago.js";
import StateToBadge from "../../../utils/StateToBadge";
import { Tooltip } from "flowbite-react";

const JobStateTimeline = ({ job }: any): JSX.Element => {
  const data: JobStateTimeline_logs$data = useFragment(
    graphql`
      fragment JobStateTimeline_logs on Job {
        logs {
          id
          state_from
          state_to
          created_at
        }
      }
    `,
    job,
  );

  const { logs } = data;

  return (
    <ol className="relative border-l border-gray-200 dark:border-gray-700">
      {logs?.map((log: any) => (
        <li className="mb-10 ml-6" key={log.id}>
          <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-jobssy-blue ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <ClockIcon className="h-5 w-5 text-gray-50" />
          </span>
          <div className="items-center justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-600 dark:bg-gray-700 sm:flex">
            <time className="mb-1 inline-flex text-xs font-normal text-gray-400 sm:order-last sm:mb-0">
              <Tooltip content={log.created_at}>
                <ClockIcon className="mt-0.5 mr-1 h-3 w-3" />
              </Tooltip>
              {timeago.format(log.created_at)}
            </time>
            <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
              The status changed from{" "}
              <StateToBadge stateValue={log.state_from as string} /> to{" "}
              <StateToBadge stateValue={log.state_to as string} />.
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default JobStateTimeline;
