import React, { Suspense } from "react";
import Page from "../containers/Page";
import { connect } from "react-redux";
import { mapStateToProps } from "../utils";
import UserHome from "../components/Content/UserHome";

const Home = ({ auth }: any): JSX.Element => {
  return (
    <Page title="Welcome to Jobssy">
      {auth.user.is_offerer ? (
        <h1>You have a worker profile.</h1>
      ) : (
        <UserHome />
      )}
    </Page>
  );
};

export default connect(mapStateToProps, null)(Home);
