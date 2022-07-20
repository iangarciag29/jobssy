import { Link } from "react-router-dom";

const Landing = (): JSX.Element => {
  return (
    <section
      className="relative h-full w-full bg-cover bg-center md:h-screen"
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80)",
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
            <div className="flex flex-col items-start justify-start rounded-xl bg-white p-10 shadow-2xl">
              <h4 className="w-full text-3xl font-bold">Signup</h4>
              <div className="relative mt-6 w-full space-y-8">
                <div className="relative flex flex-row space-x-5">
                  <div>
                    <label className="font-medium text-gray-900">
                      First name
                    </label>
                    <input
                      type="text"
                      className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <label className="font-medium text-gray-900">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-lg placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Email</label>
                  <input
                    type="text"
                    className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Enter Your Email Address"
                  />
                </div>
                <div className="relative">
                  <label className="font-medium text-gray-900">Password</label>
                  <input
                    type="password"
                    className="mt-2 block w-full rounded-lg bg-gray-100 px-4 py-4 text-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                    placeholder="Password"
                  />
                </div>
                <div className="relative">
                  <button className="ease inline-block w-full rounded-lg bg-secondary px-5 py-4 text-center text-base font-bold text-white transition duration-200 hover:bg-primary">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
