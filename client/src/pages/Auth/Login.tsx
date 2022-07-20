import {connect} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {mapStateToProps} from "../../utils";
import loginSplash from '../../assets/img/loginsplash.jpg'
import LoginForm from "../../components/Forms/LoginForm";


const Login = ({auth}: any): JSX.Element => {

    const year = new Date().getFullYear();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isLoggedIn) navigate("/app/");
    }, [auth, navigate]);

    return <div className="flex flex-col md:flex-row w-full h-screen">
        <div className="w-full md:w-1/2 flex flex-col justify-around text-center">
            <div>
                <h1 className="text-3xl font-black text-primary"><Link to="/">Jobssy</Link> | Login</h1>
            </div>
            <div>
                <LoginForm/>
            </div>
            <div>
                <p className="text-sm text-gray-500">Jobssy &copy; {year}</p>
            </div>
        </div>
        <div className="w-1/2 hidden md:block relative" style={{
            background: `url(${loginSplash}) center center no-repeat`,
            backgroundSize: "cover",
            backgroundPosition: "right"
        }}>
            <div className="absolute inset-0 bg-gradient-to-br from-jobssy-blue via-jobssy-blue to-jobssy-green opacity-50"/>
        </div>
    </div>
}

export default connect(mapStateToProps, null)(Login);