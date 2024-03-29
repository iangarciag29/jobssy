import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import CompleteProfileModal from "../components/Modals/CompleteProfileModal";
import { AlertHandler } from "../utils/AlertHandler";

import BackgroundImage from "../assets/img/landingsplash.jpg";

const Landing = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [data, setData] = useState<any>({});

  const firstNameRef = useRef<any>();
  const lastNameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passwordRef = useRef<any>();
  const passwordConfirmationRef = useRef<any>();

  const registerUser = (): void => {
    let errors = false;
    setData({
      first_name: firstNameRef.current.value,
      last_name: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value,
    });
    if (
      data.first_name === "" ||
      data.last_name === "" ||
      data.email === "" ||
      data.password === "" ||
      data.password_confirmation === ""
    ) {
      AlertHandler.fire({
        icon: "error",
        title: "Oh!",
        text: "Please fill out all the required fields.",
        confirmButtonColor: "#384E77",
      });
      errors = true;
    }
    if (data.password !== data.password_confirmation) {
      AlertHandler.fire({
        icon: "error",
        title: "Oh!",
        text: "The passwords does not match.",
        confirmButtonColor: "#384E77",
      });
      errors = true;
    }
    if (data.password.length < 8) {
      AlertHandler.fire({
        icon: "error",
        title: "Oh!",
        text: "The passwords must be greater than 8 characters.",
        confirmButtonColor: "#384E77",
      });
      errors = true;
    }
    setIsOpen(!errors);
  };

  return (
    <section
      className="relative h-full min-h-screen w-full bg-cover bg-center"
      style={{
        background: `url(${BackgroundImage}) center center no-repeat`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-jobssy-blue to-secondary opacity-90" />

      <div className="mx-auto max-w-7xl">
        <div className="relative flex h-24 items-center justify-between px-10">
          <Link
            to="/"
            className="mb-4 flex items-center font-medium text-gray-100 md:mb-0 lg:order-none lg:w-auto lg:items-center lg:justify-center"
          >
            <span className="logo select-none text-2xl font-black leading-none text-gray-100">
              Jobssy.
            </span>
          </Link>

          <Link
            to="/login"
            className="relative text-lg font-medium tracking-wide text-blue-100 transition duration-150 ease-out hover:text-white"
          >
            <span className="block">Login</span>
          </Link>
        </div>

        <div className="flex flex-col items-center px-10 pt-20 pb-40 lg:flex-row">
          <div className="relative w-full max-w-2xl bg-cover lg:w-7/12">
            <div className="relative flex h-full w-full flex-col items-center justify-center lg:pr-10">
              <div className="flex flex-col items-start space-y-8">
                <div className="relative">
                  <h1 className="text-5xl font-extrabold leading-tight text-gray-100 sm:text-7xl md:text-8xl">
                    Request, Find and Offer jobs
                  </h1>
                </div>
                <p className="text-2xl text-blue-300">
                  Find what you really need and get connected with top rated
                  workers.
                </p>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-20 w-full max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-start justify-start rounded-xl bg-white px-10 pt-5 pb-10 shadow-2xl">
              <h4 className="w-full text-3xl font-bold">Signup</h4>
              <div className="relative mt-6 w-full space-y-5">
                <div className="relative flex flex-row space-x-5">
                  <div>
                    <label className="font-medium text-gray-900">
                      First name
                    </label>
                    <input
                      type="text"
                      ref={firstNameRef}
                      className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter your first name"
                      required={true}
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-900">
                      Last name
                    </label>
                    <input
                      type="text"
                      ref={lastNameRef}
                      className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter your last name"
                      required={true}
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Email</label>
                  <input
                    type="text"
                    ref={emailRef}
                    className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Enter Your Email Address"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    ref={passwordRef}
                    className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Password"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">
                    Confirm your password
                  </label>
                  <input
                    type="password"
                    ref={passwordConfirmationRef}
                    className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Password confirmation"
                    required={true}
                  />
                </div>
                <div className="relative">
                  <button
                    className="ease inline-block w-full rounded-lg bg-secondary px-5 py-4 text-center text-base font-bold text-white transition duration-200 hover:bg-primary"
                    onClick={() => registerUser()}
                  >
                    Create Account
                  </button>
                </div>
              </div>
              <div className="mx-auto mt-5 -mb-5">
                <p className="text-xs text-gray-400">
                  Jobssy &copy; 2022 | Rights reserved.
                </p>
              </div>
            </div>
            <CompleteProfileModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              data={data}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
