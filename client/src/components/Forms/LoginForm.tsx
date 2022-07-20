import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { mapDispatchToProps } from "../../utils";

type credentialsInputs = {
  email: string;
  password: string;
};

const LoginForm = ({ login }: any): JSX.Element => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<credentialsInputs>();

  const onSubmit: SubmitHandler<credentialsInputs> = (data: any): void => {
    reset();
    login(data, navigate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto flex w-11/12 flex-col justify-around text-center">
          <h2 className="text-2xl font-bold">Welcome</h2>
          <div className="my-5 mx-auto flex w-3/4 flex-col space-y-5 md:w-1/2">
            <div className="text-left">
              <label className="font-medium text-gray-900" htmlFor="emailInput">
                Email
              </label>
              <input
                type="text"
                id="emailInput"
                className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                placeholder="Enter Your Email Address"
                {...register("email", {
                  maxLength: 50,
                  required: true,
                })}
              />
              {errors.email?.type === "required" && (
                <span className="text-xs text-red-700">
                  You must enter your email address.
                </span>
              )}
              {errors.email?.type === "maxLength" && (
                <span className="text-xs text-red-700">
                  The email address cannot be longer than 50 characters.
                </span>
              )}
            </div>
            <div className="text-left">
              <label
                className="text-left font-medium text-gray-900"
                htmlFor="passwordInput"
              >
                Password
              </label>
              <input
                type="password"
                id="passwordInput"
                className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                })}
              />
              {errors.password?.type === "minLength" && (
                <span className="text-xs text-red-700">
                  Password length must be grater than 8 character.
                </span>
              )}
              {errors.password?.type === "required" && (
                <span className="text-xs text-red-700">
                  You must enter a password.
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-5">
              <button
                type="submit"
                className="ease inline-block w-full rounded-lg bg-secondary px-5 py-4 text-center text-base font-bold text-white transition duration-200 hover:bg-primary"
              >
                Login
              </button>
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="mx-auto text-secondary hover:underline"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LoginForm);
