import React from "react";
import Page from "../containers/Page";
import { connect } from "react-redux";
import { mapStateToProps } from "../utils";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import OffererAd from "../components/Alerts/OffererAd";
import { HomeQuery, HomeQuery$data } from "./__generated__/HomeQuery.graphql";
import StatsCard from "../components/Generics/Cards/StatsCard";
import { Link, useNavigate } from "react-router-dom";
import { Tooltip } from "flowbite-react";
import StateToBadge from "../utils/StateToBadge";

const Home = ({ auth }: any): JSX.Element => {
  const navigate = useNavigate();

  const data: HomeQuery$data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery($id: ID!) {
        dashboardData(id: $id) {
          total_jobs
          total_bids
          total_rates
          total_listings
          total_active_jobs
          active_jobs {
            id
            title
            state
            price
            currency
          }
          listings {
            id
            title
            bids {
              id
            }
            price
            currency
            category {
              id
              name
            }
            created_at
          }
        }
      }
    `,
    { id: auth.user.id },
    { fetchPolicy: "network-only" },
  );

  const { dashboardData } = data;

  if (!dashboardData) return <></>;

  return (
    <Page title="Welcome to Jobssy">
      {!auth.user.is_offerer ? <OffererAd /> : <></>}
      <div className="flex flex-col space-y-10">
        <div
          className={`relative grid grid-cols-1 gap-x-0 gap-y-5  pb-8 ${
            auth.user.is_offerer ? "lg:grid-cols-5" : "lg:grid-cols-3"
          } lg:gap-x-5 lg:gap-y-0`}
        >
          <StatsCard
            value={dashboardData.total_jobs}
            text="Total jobs"
            className="bg-cyan-700 text-sky-50"
          />
          {auth.user.is_offerer ? (
            <StatsCard
              value={dashboardData.total_rates}
              text="Rates received"
              className="bg-secondary text-indigo-50"
            />
          ) : (
            <></>
          )}
          {auth.user.is_offerer ? (
            <StatsCard
              value={dashboardData.total_bids}
              text="Bids received"
              className="bg-jobssy-blue text-sky-50"
            />
          ) : (
            <></>
          )}
          <StatsCard
            value={dashboardData.total_listings}
            text="Listings posted"
            className="bg-primary text-blue-50"
          />
          <StatsCard
            value={dashboardData.total_active_jobs}
            text="Active jobs"
            className="bg-jobssy-green text-sky-50"
          />
          <span className="absolute bottom-0 right-0 hidden text-xs uppercase text-gray-500 lg:block">
            Information up to date.
          </span>
        </div>
        <div className="flex flex-col space-x-0 space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0">
          <div className="jobssy-bubble w-full lg:w-2/3">
            <h4 className="m-5 text-xl font-semibold">My active jobs</h4>
            <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 lg:table-fixed">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Title
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
                {dashboardData.active_jobs?.map((job: any, idx: number) => (
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
          <div className="jobssy-bubble min-h-max w-full lg:w-1/3">
            <h4 className="m-5 text-xl font-semibold">My listings</h4>
            <table className="w-full table-auto text-left text-sm text-gray-500 dark:text-gray-400 lg:table-fixed">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    Title
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Category
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
                {dashboardData.listings?.map((post: any, idx: number) => (
                  <tr
                    className={`border-b ${
                      idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } dark:border-gray-700 dark:bg-gray-900`}
                    key={post.id}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap py-4 px-6 font-medium text-gray-900 dark:text-white"
                    >
                      <Link to={`/app/listings/${post.id}`}>
                        <Tooltip content={`[DEBUG] ${post.id}`}>
                          {post.title}
                        </Tooltip>
                      </Link>
                    </th>
                    <td className="py-4 px-6">
                      <span className="mr-2 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900">
                        {post.category.name}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      ${post.price} {post.currency}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={() => navigate(`/app/listings/${post.id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default connect(mapStateToProps, null)(Home);
