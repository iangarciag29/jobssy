import { useMutation } from "react-relay";
// @ts-ignore
import { graphql } from "babel-plugin-relay/macro";
import { HandleGraphQLError } from "../../utils/ErrorHandler";
import { AlertHandler } from "../../utils/AlertHandler";
import { useId, useRef, useState } from "react";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";

const NewRateForm = ({ job, setOpenModal }: any): JSX.Element => {
  const anonymousId = useId();

  const [rateValue, setRateValue] = useState<number>(1);
  const commentRef = useRef<any>(null);
  const anonymousRef = useRef<any>(null);

  const [commitStateMutation] = useMutation(graphql`
    mutation NewRateFormMutation(
      $offerer_id: ID!
      $job_id: ID!
      $value: Int!
      $comment: String!
      $anonymous: Boolean!
    ) {
      createRate(
        offerer_id: $offerer_id
        job_id: $job_id
        value: $value
        comment: $comment
        anonymous: $anonymous
      ) {
        id
      }
    }
  `);

  const handleClick = (): void => {
    commitStateMutation({
      variables: {
        offerer_id: job.offerer.id,
        job_id: job.id,
        value: rateValue,
        comment: commentRef.current.value,
        anonymous: anonymousRef.current.checked,
      },
      onCompleted: (response, errors) => {
        if (!HandleGraphQLError(errors)) return;
        AlertHandler.fire({
          icon: "success",
          title: "Sent!",
          text: "The rate has been submitted to the worker.",
          confirmButtonColor: "#384E77",
        }).then((_) => {
          setOpenModal(false);
        });
      },
      onError: (error: Error) => {
        console.error(error);
      },
    });
  };

  return (
    <div className="flex flex-col space-y-10">
      <div>
        <label
          htmlFor="steps-range"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Rate: <span className="font-black">{rateValue}</span>
        </label>
        <input
          id="steps-range"
          type="range"
          min={1}
          max={5}
          value={rateValue}
          step={1}
          onChange={(e) => setRateValue(parseInt(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
        >
          Your comment
        </label>
        <textarea
          id="message"
          rows={5}
          ref={commentRef}
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-jobssy-blue focus:ring-jobssy-blue"
          placeholder="Your message..."
        ></textarea>
      </div>
      <div className="flex items-center">
        <input
          id={anonymousId}
          ref={anonymousRef}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-jobssy-blue focus:ring-2 focus:ring-jobssy-blue"
        />
        <label
          htmlFor={anonymousId}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Anonymous rate.
        </label>
      </div>
      <div className="text-right">
        <Button text="Send" size={BTN_SIZE.SMALL} onClick={handleClick} />
      </div>
    </div>
  );
};

export default NewRateForm;
