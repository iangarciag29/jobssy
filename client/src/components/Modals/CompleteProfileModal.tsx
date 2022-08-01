import { Modal, Spinner } from "flowbite-react";
import React, { useId, useRef, useState } from "react";
import Button from "../Generics/Button";
import { BTN_SIZE } from "../../types";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../utils";
import { AlertHandler } from "../../utils/AlertHandler";
import { useNavigate } from "react-router-dom";
import { SweetAlertResult } from "sweetalert2";
import AddressPicker from "../Address/AddressPicker";
import { useLoadScript } from "@react-google-maps/api";

const CompleteProfileModal = ({
  isOpen,
  setIsOpen,
  data,
  login,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data: any;
  login: any;
}): JSX.Element => {
  const cellphoneId = useId();
  const genderId = useId();
  const birthdateId = useId();

  const cellphoneRef = useRef<any>();
  const genderRef = useRef<any>();
  const birthdateRef = useRef<any>();

  const navigate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
    libraries: ["places"],
  });

  const [address, setAddress] = useState<{
    name: String;
    lat: number;
    lng: number;
  }>({ name: "", lat: 0, lng: 0 });

  const createUser = (): void => {
    if (address.name === "") {
      AlertHandler.fire({
        icon: "warning",
        title: "Warning",
        text: "You must select a valid address.",
        confirmButtonColor: "#384E77",
      });
      return;
    }

    const userData = {
      ...data,
      birthdate: moment(birthdateRef.current.value).format("YYYY/MM/DD"),
      cellphone: cellphoneRef.current.value,
      gender: genderRef.current.value,
      address_name: address.name,
      address_lat: address.lat,
      address_lng: address.lng,
    };

    (async () => {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/register`, userData)
        .then((res) => {
          const { data } = res;
          if (data.success) {
            AlertHandler.fire({
              icon: "success",
              title: "Welcome",
              text: "You have been registered successfully.",
              confirmButtonColor: "#384E77",
            }).then((_: SweetAlertResult) => {
              login(
                { email: userData.email, password: userData.password },
                navigate,
              );
            });
          }
        });
    })();
  };

  return (
    <Modal
      show={isOpen}
      size="2xl"
      popup={true}
      onClose={() => setIsOpen(false)}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
          <h3 className="text-xl font-medium text-gray-900 dark:text-white">
            Please complete your profile
          </h3>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              id={cellphoneId}
              ref={cellphoneRef}
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 focus:border-jobssy-blue focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-blue-500"
              placeholder=" "
              required
            />
            <label
              htmlFor={cellphoneId}
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-jobssy-blue"
            >
              Phone number (123-456-7890)
            </label>
          </div>
          <div className="flex flex-col space-x-0 space-y-10 lg:flex-row lg:space-x-10 lg:space-y-0">
            <div className="group relative z-0 mb-6 w-full">
              <label
                htmlFor={genderId}
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-400"
              >
                Select your gender
              </label>
              <select
                id={genderId}
                ref={genderRef}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="U">Don't want to say</option>
              </select>
            </div>
            <div className="group relative z-0 mb-6 w-full">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Your birthdate
                </label>
                <input
                  type="date"
                  id={birthdateId}
                  ref={birthdateRef}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  required={true}
                />
              </div>
            </div>
          </div>
          <div>
            {!isLoaded ? (
              <Spinner size="lg" />
            ) : (
              <AddressPicker setAddress={setAddress} />
            )}
          </div>
          <div className="flex w-full justify-end">
            <Button
              text="Sign up"
              size={BTN_SIZE.SMALL}
              onClick={() => createUser()}
            />
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default connect(null, mapDispatchToProps)(CompleteProfileModal);
