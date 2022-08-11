import { StarIcon } from "@heroicons/react/solid";
import { ClockIcon } from "@heroicons/react/outline";
import { useFragment } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";

const ReviewsList = ({ offerer, user }: { offerer: any; user: any }) => {
  const data = useFragment(
    graphql`
      fragment ReviewsList_rates on Offerer {
        jobs {
          rate {
            id
            comment
            anonymous
            job {
              user {
                first_name
                last_name
              }
            }
            value
            created_at
          }
        }
      }
    `,
    offerer,
  );

  const { jobs } = data;

  if (!jobs || jobs.length <= 0)
    return (
      <div className="py-5 text-center">
        <p className="text-gray-500">
          {user.first_name} does not have any reviews.
        </p>
      </div>
    );

  return (
    <div className="flex flex-col space-y-5">
      <hr className="mt-5" />
      {jobs.map(
        (job: any) =>
          job.rate && (
            <div className="relative flex flex-row space-x-8" key={job.rate.id}>
              <div className="flex flex-col space-y-2">
                <div className="flex flex-row justify-between">
                  <div>
                    {job.rate.anonymous ? (
                      <h4 className="font-semibold">Anonymous</h4>
                    ) : (
                      <h4 className="font-semibold">
                        {job.rate.job?.user.first_name}
                      </h4>
                    )}
                    <span className="inline-flex text-sm font-light text-gray-900">
                      <ClockIcon className="mt-1 mr-1 h-3 w-3" />
                      {job.rate.created_at}
                    </span>
                    <p className="mt-5 text-justify">{job.rate.comment}</p>
                  </div>
                  <div className="absolute top-0 right-0 grid items-center">
                    <div className="flex flex-row space-x-1 text-yellow-400">
                      <p className="text-2xl font-bold">{job.rate.value}</p>
                      <StarIcon className="mt-1 h-6 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ),
      )}
    </div>
  );
};

export default ReviewsList;
