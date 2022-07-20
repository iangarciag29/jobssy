import {connect} from "react-redux";
import {LoginAuthAction} from "../../store/actions/auth.action";
import {Link, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useEffect} from "react";

type credentialsInputs = {
    email: string;
    password: string;
}

const Login = ({auth, login}: any): JSX.Element => {

    const navigate = useNavigate();

    const {register, handleSubmit, reset, formState: {errors}} = useForm<credentialsInputs>();

    const onSubmit: SubmitHandler<credentialsInputs> = (data: any): void => {
        reset();
        login(data, navigate);
    }

    useEffect(() => {
        if (auth.isLoggedIn) navigate("/app/");
    }, [auth, navigate]);

    return <div>
        <h1>Login PAGE.</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto flex w-11/12 flex-col justify-around rounded-xl text-center">
                <h2 className="font-bebas-bold text-2xl">Welcome</h2>
                <div className="my-5 mx-auto flex w-3/4 flex-col space-y-2 md:w-1/2">
                    <label
                        htmlFor="emailInput"
                        className="text-left font-gilroy-light"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="emailInput"
                        className="rounded-lg border-0 bg-gray-200 font-helvetica-regular focus:outline-0"
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
                    <label
                        htmlFor="passwordInput"
                        className="text-left font-gilroy-light"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="passwordInput"
                        className="rounded-lg border-0 bg-gray-200 font-helvetica-regular focus:outline-0"
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
                        className="mx-auto mt-5 w-3/4 rounded-xl border border-natgas-azul bg-natgas-azul px-10 py-1 font-semibold text-white shadow-lg transition-all hover:bg-transparent hover:text-natgas-azul md:w-1/2"
                    >
                        Login
                    </button>
                    <Link
                        to="/signup"
                        className="mx-auto font-quicksand-regular text-sm text-natgas-azul hover:underline"
                    >
                        SignUp
                    </Link>
                </div>
            </div>
        </form>
    </div>
}

const mapStateToProps = (state: any) => {
    return {
        auth: state.authState
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (loginState: { email: string; password: string }, navigate: any) => {
            dispatch(LoginAuthAction(loginState, navigate));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);