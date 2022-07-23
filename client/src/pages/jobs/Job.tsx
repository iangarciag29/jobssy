import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { JobQuery, JobQuery$data } from "./__generated__/JobQuery.graphql";
import Page from "../../containers/Page";
import { ClockIcon, CurrencyDollarIcon } from "@heroicons/react/outline";

const Job = (): JSX.Element => {
  const { id } = useParams();

  if (!id) throw new Error();

  // @ts-ignore
  const data: JobQuery$data = useLazyLoadQuery<JobQuery>(
    graphql`
      query JobQuery($id: ID!) {
        job(id: $id) {
          id
          title
          description
          offerer {
            id
            user {
              id
              first_name
              last_name
            }
          }
          user {
            id
            first_name
            last_name
          }
          price
          currency
          logs {
            id
            state_from
            state_to
            created_at
          }
          created_at
        }
      }
    `,
    { id },
  );

  const { job } = data;

  if (!job) throw new Error();

  return (
    <Page title={`Job - ${job.title}`}>
      <div className="rounded-xl bg-white p-10 shadow">
        <div className="flex flex-row">
          <div className="flex w-full flex-col space-y-5 lg:w-2/3">
            <span className="jobssy-span">Description</span>
            <p>{job.description}</p>
          </div>
          <div className="flex w-full flex-col space-y-2 lg:w-1/3">
            <span className="jobssy-span mb-4">Details</span>
            <p className="inline-flex">
              <CurrencyDollarIcon className="mt-1 mr-2 h-4 w-4" />
              <span className="mr-5 font-semibold">Price:</span> ${job.price}{" "}
              {job.currency}
            </p>
            <p className="inline-flex">
              <ClockIcon className="mt-1 mr-2 h-4 w-4" />
              <span className="mr-5 font-semibold">Created on:</span>
              {job.created_at}
            </p>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Job;
