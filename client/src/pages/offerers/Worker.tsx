import { useNavigate, useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import Page from "../../containers/Page";
import ProfileCard from "../../components/Generics/Cards/Offerers/ProfileCard";
import ServiceList from "../../components/Generics/Lists/ServiceList";
import ReviewsList from "./ReviewsList";
import {
  WorkerQuery,
  WorkerQuery$data,
} from "./__generated__/WorkerQuery.graphql";

const Worker = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) throw new Error();

  const data: WorkerQuery$data = useLazyLoadQuery<WorkerQuery>(
    graphql`
      query WorkerQuery($id: ID!) {
        offerer(id: $id) {
          description
          jobs_completed
          start_time
          created_at
          rating
          updated_at
          user {
            first_name
            last_name
            email
            cellphone
            address {
              country
              state
            }
          }
          ...ServiceList_services
          ...ReviewsList_rates
        }
      }
    `,
    { id },
  );

  if (!data.offerer) {
    navigate("/app");
    return <></>;
  }

  const { offerer } = data;

  return (
    <Page title="">
      <div className="-mt-5 mb-10 flex flex-col space-y-10">
        <ProfileCard offerer={offerer} />
        <div className="flex flex-col space-y-10 lg:flex-row lg:space-y-0">
          <div className="w-full lg:w-2/3">
            <div className="w-full space-y-5 rounded-xl bg-white px-10 py-5 shadow lg:w-11/12">
              <h4 className="font-semibold">
                Services offered by {offerer.user?.first_name}
              </h4>
              <hr />
              <ServiceList offerer={offerer} />
            </div>
          </div>
          <div className="w-full lg:w-1/3">
            <div className="ml-auto w-full rounded-xl bg-white px-10 py-5 shadow">
              <h4 className="font-semibold">Customer reviews</h4>
              <ReviewsList offerer={offerer} user={offerer.user} />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Worker;
