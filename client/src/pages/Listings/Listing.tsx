import Page from "../../containers/Page";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery, useMutation } from "react-relay";
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
import { Badge, Tooltip } from "flowbite-react";
import { useState } from "react";
import NewBidModal from "../../components/Modals/NewBidModal";
import { HandleGraphQLError } from "../../utils/ErrorHandler";
import { AlertHandler } from "../../utils/AlertHandler";

const Listing = ({ auth }: { auth?: any }): JSX.Element => {
  const { id }: any = useParams();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [fetchKey, setFetchKey] = useState<number>(0);

  const data: ListingQuery$data = useLazyLoadQuery<ListingQuery>(
    graphql`
      query ListingQuery($id: ID!) {
        post(id: $id) {
          id
          title
          description
          price
          currency
          visible
          user {
            id
            first_name
            last_name
            verified
            email
            cellphone
            created_at
            address {
              id
            }
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
    { fetchKey, fetchPolicy: "network-only" },
  );

  const [commitCreateJobMutation] = useMutation(graphql`
    mutation ListingMutation(
      $title: String!
      $description: String!
      $user_id: ID!
      $offerer_id: ID!
      $currency: String!
      $price: Float!
      $address_id: ID!
    ) {
      createJob(
        title: $title
        description: $description
        user_id: $user_id
        offerer_id: $offerer_id
        currency: $currency
        price: $price
        address_id: $address_id
        started_by_offerer: false
      ) {
        id
      }
    }
  `);

  const [commitHidePostMutation] = useMutation(graphql`
    mutation ListingHideMutation($id: ID!) {
      togglePostVisibility(id: $id)
    }
  `);

  const acceptBid = (id: any): void => {
    if (!post || !post.user || !post.user.address) return;
    commitCreateJobMutation({
      variables: {
        title: post.title,
        description: post.description,
        user_id: post.user.id,
        offerer_id: auth.user.id,
        currency: post.currency,
        price: post.price,
        address_id: post.user.address.id,
      },
      onCompleted: (response: any, errors) => {
        if (!HandleGraphQLError(errors)) return;
        const { createJob } = response;
        AlertHandler.fire({
          icon: "success",
          title: "Success",
          text: "You accepted the bid.",
        }).then((_) => {
          commitHidePostMutation({
            variables: {
              id: post.id,
            },
            onCompleted: (response1, errors1) => {
              if (!HandleGraphQLError(errors1)) return;
              navigate(`/app/jobs/${createJob.id}`);
            },
          });
        });
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };

  const { post } = data;

  if (!post) {
    navigate("/app/listings");
    return <></>;
  }

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
          <div className="jobssy-bubble relative flex flex-col space-y-5 px-10 py-5">
            <h4 className="text-xl font-semibold">Author</h4>
            <BasicProfile profile={post.user} />
            {!post.visible ? (
              <div className="absolute top-0 right-5">
                <Badge color="gray">Hidden post</Badge>
              </div>
            ) : (
              <></>
            )}
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
            {auth.user.id !== post.user?.id && auth.user.is_offerer ? (
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
                  onClick={() => setModalOpen(true)}
                  className="bg-green-700 text-green-50"
                  size={BTN_SIZE.SMALL}
                />
              </div>
            ) : (
              <></>
            )}
            <hr className="my-5" />
            {(post.bids && post.bids.length <= 0) || !post.visible ? (
              <p className="mt-10 text-center text-gray-600">
                There are now bids for this listing.
              </p>
            ) : (
              <div className="mt-10 flex flex-col space-y-10">
                {post &&
                  post.bids?.map((bid: any, index: number) => (
                    <div key={bid.id}>
                      <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                          <h5>
                            {bid.offerer.user.first_name}{" "}
                            {bid.offerer.user.last_name}
                          </h5>
                          <p className="inline-flex text-gray-500">
                            <span>
                              <ClockIcon className="mr-1 mt-1 h-3 w-3" />
                            </span>
                            {timeago.format(bid.created_at)}
                          </p>
                          {auth.user.id === post.user?.id ? (
                            <Button
                              text="Accept bid"
                              size={BTN_SIZE.SMALL}
                              className="mt-2"
                              onClick={() => acceptBid(bid.id)}
                            />
                          ) : (
                            <></>
                          )}
                        </div>
                        <div className="grid items-center text-center text-jobssy-blue">
                          <p className="text-3xl font-black">${bid.amount}</p>
                          <span>{bid.currency}</span>
                        </div>
                      </div>
                      {post && post.bids && index !== post.bids.length - 1 ? (
                        <hr className="mt-10" />
                      ) : (
                        <></>
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <NewBidModal
        post={post}
        openModal={modalOpen}
        setOpenModal={setModalOpen}
        setFetchKey={setFetchKey}
      />
    </Page>
  );
};

export default connect(mapStateToProps, null)(Listing);
