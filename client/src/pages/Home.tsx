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

const Home = ({ auth }: any): JSX.Element => {
  const data: HomeQuery$data = useLazyLoadQuery<HomeQuery>(
    graphql`
      query HomeQuery($id: ID!) {
        dashboardData(id: $id) {
          total_jobs
          total_bids
          total_rates
          total_listings
          total_active_jobs
        }
      }
    `,
    { id: auth.user.id },
  );

  const { dashboardData } = data;

  if (!dashboardData) return <></>;

  return (
    <Page title="Welcome to Jobssy">
      {!auth.user.is_offerer ? <OffererAd /> : <></>}
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
        {auth.user.is_offerer && (
          <StatsCard
            value={dashboardData.total_rates}
            text="Rates received"
            className="bg-secondary text-indigo-50"
          />
        )}
        {auth.user.is_offerer && (
          <StatsCard
            value={dashboardData.total_bids}
            text="Bids received"
            className="bg-jobssy-blue text-sky-50"
          />
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
    </Page>
  );
};

export default connect(mapStateToProps, null)(Home);
