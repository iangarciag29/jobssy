import Page from "../../containers/Page";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import WorkerJobList from "./Worker/WorkerJobList";
import UserJobList from "./User/UserJobList";

const Jobs = ({ auth }: { auth: any }): JSX.Element => {
  return (
    <Page title="My jobs">
      {auth.user.is_offerer ? <WorkerJobList /> : <UserJobList />}
    </Page>
  );
};

export default connect(mapStateToProps, null)(Jobs);
