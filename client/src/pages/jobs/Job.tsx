import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery, useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { JobQuery, JobQuery$data } from "./__generated__/JobQuery.graphql";
import Page from "../../containers/Page";
import {
  ArrowLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  GlobeIcon,
  LocationMarkerIcon,
} from "@heroicons/react/outline";
import StateToBadge from "../../utils/StateToBadge";
import { Spinner, Tooltip } from "flowbite-react";
import JobStateTimeline from "../../components/Generics/Timeline/JobStateTimeline";
import BasicProfile from "../../components/Generics/Cards/BasicProfile";
import { useRef, useState } from "react";
import Button from "../../components/Generics/Button";
import { BTN_SIZE, JOB_STATE } from "../../types";
import { SaveAsIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { mapStateToProps } from "../../utils";
import { useLoadScript } from "@react-google-maps/api";
import JobMap from "../../components/Maps/JobMap";
import { libraries } from "../../utils/GMapsLibraries";
import { HandleGraphQLError } from "../../utils/ErrorHandler";
import EditButton from "../../components/Bidding/buttons/EditButton";
import ControBar from "../../components/Bidding/ControBar";

const Job = ({ auth }: any): JSX.Element => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const titleRef = useRef<any>();
  const descriptionRef = useRef<any>();
  const priceRef = useRef<any>();
  const currencyRef = useRef<any>();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries,
  });

  if (!id) throw new Error();

  const data: JobQuery$data = useLazyLoadQuery<JobQuery>(
    graphql`
      query JobQuery($id: ID!) {
        job(id: $id) {
          id
          title
          description
          rate {
            id
          }
          offerer {
            id
            user {
              id
              first_name
              last_name
              email
              cellphone
              verified
              created_at
            }
          }
          address {
            name
            longitude
            latitude
          }
          user {
            id
            first_name
            last_name
            email
            cellphone
            verified
            created_at
          }
          price
          currency
          state
          created_at
          ...JobStateTimeline_logs
        }
      }
    `,
    { id },
    { fetchPolicy: "network-only" },
  );

  const { job } = data;

  if (!job) throw new Error();

  const [commitMutation] = useMutation(graphql`
    mutation JobUpdateMutation(
      $id: ID!
      $title: String!
      $description: String!
      $price: Float!
      $currency: String!
    ) {
      updateJob(
        id: $id
        title: $title
        description: $description
        price: $price
        currency: $currency
      ) {
        id
        title
        description
        price
        currency
        user {
          id
        }
      }
    }
  `);

  const [commitStateChangeMutation] = useMutation(graphql`
    mutation JobStateUpdateMutation(
      $id: ID!
      $new_state: JobState!
      $author_id: ID!
    ) {
      updateState(id: $id, new_state: $new_state, author_id: $author_id) {
        state
        logs {
          id
          state_to
          state_from
          created_at
        }
      }
    }
  `);

  const updateJobDetails = (): void => {
    setIsEditing(false);
    commitMutation({
      variables: {
        id,
        title: titleRef.current.value,
        description: descriptionRef.current.value,
        price: parseFloat(priceRef.current.value),
        currency: currencyRef.current.value,
      },
      onCompleted: (data: any) => {
        const { id, user } = data.updateJob;
        commitStateChangeMutation({
          variables: {
            id,
            new_state:
              auth.user.id === user.id
                ? JOB_STATE.USER_CHANGES
                : JOB_STATE.OFFERER_CHANGES,
            author_id: auth.user.id,
          },
          onCompleted: (response, errors) => {
            if (!HandleGraphQLError(errors)) return;
          },
          onError: (error: Error) => {
            console.error(error);
          },
        });
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
  };

  return (
    <Page
      title={`Job - ${job.title} ${isEditing ? "[EDIT MODE]" : ""}`}
      actionBtn={
        <Button
          onClick={() => navigate("/app/jobs")}
          text={
            <p className="inline-flex">
              <ArrowLeftIcon className="mt-1 mr-2 h-4 w-4" />
              <span>Back</span>
            </p>
          }
          size={BTN_SIZE.MEDIUM}
        />
      }
    >
      <div className="mb-10 flex flex-col space-y-10">
        <div className="relative rounded-xl bg-white px-10 pt-10 pb-5 shadow">
          <div className="flex flex-col lg:flex-row">
            <div className="flex w-full flex-col space-y-5 pr-0 lg:w-3/5 lg:pr-10">
              {isEditing && (
                <div className="flex flex-col space-y-5">
                  <span className="jobssy-span">Title</span>
                  <input
                    ref={titleRef}
                    defaultValue={job.title}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder="Please provide a job title."
                  />
                </div>
              )}
              <span className="jobssy-span">Description</span>
              {!isEditing && <p>{job.description}</p>}
              {isEditing && (
                <textarea
                  rows={4}
                  ref={descriptionRef}
                  defaultValue={job.description}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Please provide a detailed description of the job you are requesting."
                />
              )}
            </div>
            <div className="flex w-full flex-col space-y-5 lg:w-1/3">
              <span className="jobssy-span mb-4">Details</span>
              <p className="inline-flex">
                <CurrencyDollarIcon className="mt-1 mr-2 h-4 w-4" />
                <span className="mr-5 font-semibold">Price:</span>{" "}
                {!isEditing ? (
                  <span>
                    ${job.price} {job.currency}
                  </span>
                ) : (
                  <span className="-mt-2 flex max-w-xs flex-row space-x-1">
                    <input
                      type="number"
                      ref={priceRef}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-jobssy-blue"
                      defaultValue={job.price}
                      required
                    />
                    <input
                      type="text"
                      ref={currencyRef}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-jobssy-blue"
                      defaultValue={job.currency}
                      maxLength={3}
                      minLength={3}
                      required
                    />
                  </span>
                )}
              </p>
              <p className="inline-flex">
                <ClockIcon className="mt-1 mr-2 h-4 w-4" />
                <span className="mr-5 font-semibold">Created on:</span>
                {job.created_at}
              </p>
            </div>
          </div>
          {isEditing && (
            <div className="flex flex-row justify-end space-x-5">
              <Button
                onClick={() => setIsEditing(false)}
                text="Cancel"
                size={BTN_SIZE.MEDIUM}
                className="bg-gray-400"
              />
              <Button
                text={
                  <p className="inline-flex">
                    <SaveAsIcon className="mt-0.5 mr-2 h-5 w-5" />
                    <span>Save</span>
                  </p>
                }
                size={BTN_SIZE.MEDIUM}
                className="bg-jobssy-green text-green-50"
                onClick={() => updateJobDetails()}
              />
            </div>
          )}
          <div className="absolute top-5 right-5 text-right">
            {!isEditing && (
              <EditButton
                setIsEditing={setIsEditing}
                jobState={job.state as string}
              />
            )}
            <Tooltip content="Status">
              <StateToBadge stateValue={job.state as string} />
            </Tooltip>
          </div>
          <ControBar job={job} />
        </div>
        <div className="flex flex-col space-y-5 space-x-0 lg:flex-row lg:space-y-0 lg:space-x-10">
          <div className="flex w-full flex-col space-y-5 rounded-xl bg-white p-10 shadow lg:w-1/2">
            <h4 className="text-lg font-bold">Customer details</h4>
            <BasicProfile profile={job.user} />
            <h4 className="text-lg font-bold">Worker details</h4>
            <BasicProfile profile={job.offerer?.user} />
          </div>
          <div className="h-max w-full rounded-xl bg-white px-10 pt-5 pb-10 shadow lg:w-1/2">
            <h5 className="mb-5 font-semibold">Job location</h5>

            {!isLoaded || !job.address ? (
              <div className="grid h-96 items-center text-center">
                <Spinner size="xl" />
              </div>
            ) : (
              <>
                <div className="mb-5">
                  <p className="inline-flex text-sm">
                    <span>
                      <LocationMarkerIcon className="mr-2 h-5 w-5" />
                    </span>
                    {job.address?.name}
                  </p>
                </div>
                <JobMap address={job.address} />
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col space-x-0 space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0">
          <div className="h-max max-h-full w-full rounded-xl bg-white px-10 py-5 shadow lg:w-3/4">
            <h4 className="mb-5 text-lg font-semibold">Timeline</h4>
            <JobStateTimeline job={job} />
          </div>
        </div>
      </div>
    </Page>
  );
};

export default connect(mapStateToProps, null)(Job);
