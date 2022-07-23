import Page from "../../containers/Page";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  ListingsQuery,
  ListingsQuery$data,
} from "./__generated__/ListingsQuery.graphql";
import PostList from "../../components/Generics/Lists/PostList";

const Listings = ({ auth }: any): JSX.Element => {
  const navigate = useNavigate();

  const data: ListingsQuery$data = useLazyLoadQuery<ListingsQuery>(
    graphql`
      query ListingsQuery {
        posts(fetch_invisible: false) {
          id
          title
          description
          slug
          price
          currency
          user {
            first_name
            last_name
            picture
          }
          created_at
        }
      }
    `,
    {},
  );

  const { posts } = data;

  if (!posts) {
    navigate("/app");
    return <></>;
  }

  if (posts?.length <= 0)
    return (
      <div>
        <p>Sorry, but there are no listings right now.</p>
      </div>
    );

  return (
    <Page
      title={
        auth.user.is_offerer
          ? "Find what people need."
          : "Request a service you need."
      }
    >
      <h1>These are all the user listings</h1>
      <PostList posts={posts} />
    </Page>
  );
};

export default connect(mapStateToProps, null)(Listings);
