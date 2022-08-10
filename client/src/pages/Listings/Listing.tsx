import Page from "../../containers/Page";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import {
  ListingQuery,
  ListingQuery$data,
} from "./__generated__/ListingQuery.graphql";
import Button from "../../components/Generics/Button";
import { BTN_SIZE } from "../../types";
import {
  ChevronDoubleLeftIcon,
  ClockIcon,
  PlusSmIcon,
} from "@heroicons/react/outline";
import BasicProfile from "../../components/Generics/Cards/BasicProfile";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import * as timeago from "timeago.js";
import { Tooltip } from "flowbite-react";

const Listing = ({ auth }: { auth?: any }): JSX.Element => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const data: ListingQuery$data = useLazyLoadQuery<ListingQuery>(
    graphql`
      query ListingQuery($id: ID!) {
        post(id: $id) {
          id
          title
          description
          price
          currency
          user {
            id
            first_name
            last_name
            verified
            email
            cellphone
            created_at
          }
          bids {
            id
            offerer {
              user {
                first_name
                last_name
                email
              }
            }
            amount
            currency
            created_at
          }
          category {
            id
            name
          }
          slug
          created_at
          updated_at
        }
      }
    `,
    { id },
  );

  const { post } = data;

  if (!post) {
    navigate("/app/listings");
    return <></>;
  }

  console.log(post);

  return (
    <Page
      title={post.title}
      actionBtn={
        <Button
          size={BTN_SIZE.SMALL}
          onClick={() => navigate("/app/listings")}
          text={<ChevronDoubleLeftIcon className="h-5 w-5" />}
        />
      }
    >
      <div className="flex flex-col space-y-10 space-x-0 px-10 lg:flex-row lg:space-y-0 lg:space-x-10">
        <div className="flex w-full flex-col space-y-10 lg:w-2/3">
          <div className="jobssy-bubble flex flex-col space-y-5 px-10 py-5">
            <h4 className="text-xl font-semibold">Author</h4>
            <BasicProfile profile={post.user} />
          </div>
          <div className="jobssy-bubble relative flex flex-col space-y-10 p-10">
            <span className="jobssy-span">Description</span>
            <p>{post.description}</p>
            {post.category && (
              <span className="absolute top-0 right-5 mr-2 rounded bg-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-indigo-800 dark:bg-indigo-200 dark:text-indigo-900">
                {post.category.name}
              </span>
            )}
          </div>
          <p className="inline-flex px-5 text-sm text-gray-500">
            <span>
              <Tooltip content={post.created_at}>
                <ClockIcon className="mr-2 h-5 w-5" />
              </Tooltip>
            </span>
            Post created {timeago.format(post.created_at)}.
          </p>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="jobssy-bubble p-10">
            <h4 className="text-center text-xl font-semibold">
              Bids for this job
            </h4>
            {auth.user.id !== post.user?.id && (
              <div className="mt-5 w-full text-center">
                <Button
                  text={
                    <p className="inline-flex">
                      <span>
                        <PlusSmIcon className="mr-2 h-5 w-5" />
                      </span>
                      Make a bid
                    </p>
                  }
                  className="bg-green-700 text-green-50"
                  size={BTN_SIZE.SMALL}
                />
              </div>
            )}
            <hr className="my-5" />
            {post.bids && post.bids.length <= 0 ? (
              <p className="mt-10 text-center text-gray-600">
                There are now bids for this job.
              </p>
            ) : (
              post.bids?.map((bid: any) => (
                <div>{bid.offerer.user.first_name}</div>
              ))
            )}
          </div>
        </div>
      </div>
    </Page>
  );
};

export default connect(mapStateToProps, null)(Listing);
