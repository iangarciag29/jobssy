import {Link} from "react-router-dom";

const Landing = (): JSX.Element => {
    return <section className="relative w-full bg-center bg-cover h-full md:h-screen"
                    style={{backgroundImage: "url(https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=2850&amp;q=80)"}}>

        <div className="absolute inset-0 bg-gradient-to-br from-primary via-jobssy-blue to-secondary opacity-90"/>

        <div className="mx-auto max-w-7xl">

            <div className="relative flex items-center justify-between h-24 px-10">
                <Link to="/"
                      className="flex items-center mb-4 font-medium text-gray-100 lg:order-none lg:w-auto lg:items-center lg:justify-center md:mb-0">
                    <span className="text-2xl font-black leading-none text-gray-100 select-none logo">Jobssy.</span>
                </Link>

                <Link to="/login"
                      className="relative text-lg font-medium tracking-wide text-blue-100 transition duration-150 ease-out hover:text-white">
                    <span className="block">Login</span>
                </Link>
            </div>

            <div className="flex flex-col items-center px-10 pt-20 pb-40 lg:flex-row">
                <div className="relative w-full max-w-2xl bg-cover lg:w-7/12">
                    <div className="relative flex flex-col items-center justify-center w-full h-full lg:pr-10">
                        <div className="flex flex-col items-start space-y-8">
                            <div className="relative">
                                <h1 className="text-5xl font-extrabold leading-tight text-gray-100 sm:text-7xl md:text-8xl">Request,
                                    Find and Offer jobs</h1>
                            </div>
                            <p className="text-2xl text-blue-300">Find what you really need and get connected with top
                                rated workers.</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 w-full max-w-2xl mt-20 lg:mt-0 lg:w-5/12">
                    <div className="flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl">
                        <h4 className="w-full text-3xl font-bold">Signup</h4>
                        <div className="relative w-full mt-6 space-y-8">
                            <div className="relative flex flex-row space-x-5">
                                <div>
                                    <label className="font-medium text-gray-900">First name</label>
                                    <input type="text"
                                           className="block w-full px-4 py-4 mt-2 text-lg placeholder-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                                           placeholder="Enter your first name"/></div>
                                <div>
                                    <label className="font-medium text-gray-900">Last name</label>
                                    <input type="text"
                                           className="block w-full px-4 py-4 mt-2 text-lg placeholder-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                                           placeholder="Enter your last name"/>
                                </div>
                            </div>
                            <div className="relative">
                                <label className="font-medium text-gray-900">Email</label>
                                <input type="text"
                                       className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                                       placeholder="Enter Your Email Address"/>
                            </div>
                            <div className="relative">
                                <label className="font-medium text-gray-900">Password</label>
                                <input type="password"
                                       className="block w-full px-4 py-4 mt-2 text-xl placeholder-gray-400 bg-gray-100 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-600 focus:ring-opacity-50"
                                       placeholder="Password"/>
                            </div>
                            <div className="relative">
                                <button
                                    className="inline-block w-full px-5 py-4 text-base font-bold text-center text-white transition duration-200 bg-secondary rounded-lg hover:bg-primary ease">Create
                                    Account
                                </button>
                            </div>
                        </div>
                        <div className="mx-auto mt-5 -mb-5">
                            <p className="text-xs text-gray-400">Jobssy &copy; 2022 | Rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
}

export default Landing;