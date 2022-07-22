import Page from "../../containers/Page";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";

const Listings = ({ auth }: any): JSX.Element => {
  return (
    <Page
      title={
        auth.user.is_offerer
          ? "Find what people need."
          : "Request a service you need."
      }
    >
      <h1>These are all the user listings</h1>
    </Page>
  );
};

export default connect(mapStateToProps, null)(Listings);
