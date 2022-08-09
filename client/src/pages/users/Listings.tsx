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
import { PlusIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import PostListingModal from "../../components/Modals/PostListingModal";

const Listings = ({ auth }: any): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  return (
    <Page
      title={
        auth.user.is_offerer
          ? "Find what people need."
          : "Request a service you need."
      }
      actionBtn={
        <button
          className="inline-flex rounded-xl bg-jobssy-green px-6 py-1 text-green-50 shadow"
          onClick={() => setIsOpen(true)}
        >
          <PlusIcon className=" mr-2 mt-1 h-4 w-4" />
          <span>New</span>
        </button>
      }
    >
      {posts.length <= 0 ? (
        <div className="grid w-full items-center p-20">
          <p className="text-center text-gray-600">
            Sorry, but there are no listings right now. <br /> Create a new one
            with the top right button.
          </p>
        </div>
      ) : (
        <PostList posts={posts} />
      )}
      <PostListingModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </Page>
  );
};

export default connect(mapStateToProps, null)(Listings);
