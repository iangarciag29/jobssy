import { JOB_STATE } from "../types";

const StateToBadge = ({ stateValue }: { stateValue: string }) => {
  const state: JOB_STATE = JOB_STATE[stateValue as keyof typeof JOB_STATE];
  switch (state) {
    case JOB_STATE.USER_CREATED:
      return (
        <span className="rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
          User sent job request
        </span>
      );

    case JOB_STATE.OFFERER_CREATED:
      return (
        <span className="rounded bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
          Worker sent job request
        </span>
      );

    case JOB_STATE.DENIED_BY_USER:
      return (
        <span className="rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
          User denied the job
        </span>
      );

    case JOB_STATE.DENIED_BY_OFFERER:
      return (
        <span className="rounded bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-800 dark:bg-red-200 dark:text-red-900">
          Worker denied the job
        </span>
      );

    case JOB_STATE.STARTED:
      return (
        <span className="rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900">
          Job started
        </span>
      );

    case JOB_STATE.OFFERER_APPROVED:
      return (
        <span className="rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-200 dark:text-purple-900">
          Worker approved
        </span>
      );

    case JOB_STATE.USER_APPROVED:
      return (
        <span className="rounded bg-purple-100 px-2.5 py-0.5 text-xs font-semibold text-purple-800 dark:bg-purple-200 dark:text-purple-900">
          User approved
        </span>
      );

    case JOB_STATE.PENDING_START:
      return (
        <span className="rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-semibold text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
          Pending to start
        </span>
      );

    case JOB_STATE.USER_CHANGES:
      return (
        <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          Waiting for worker approval
        </span>
      );

    case JOB_STATE.OFFERER_CHANGES:
      return (
        <span className="mr-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800">
          Waiting for user approval
        </span>
      );

    default:
      return (
        <span className="rounded bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          UNKNOWN STATE
        </span>
      );
  }
};

export default StateToBadge;
