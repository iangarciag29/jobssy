import axios from "axios";
import {AUTH_ACTION_TYPE} from "../actions/auth.action";

const authState = {
    isLoggedIn: false,
    user: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        cellphone: "",
        gender: "",
        birthdate: "",
        verified: false,
        is_offerer: false,
        picture: "",
        created_at: "",
        updated_at: "",
    },
    token: ""
}

const getAuthState = () => {
    const auth: any = localStorage.getItem("auth");
    try {
        const authObj = JSON.parse(auth);
        const {token} = authObj;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return authObj;
    } catch (error) {
        return authState;
    }
}

const newAuth = getAuthState();

const authReducer = (state: any = newAuth, action: any) => {
    switch (action.type) {
        case AUTH_ACTION_TYPE.LOGIN_SUCCESS:
            const loginAuthState = {
                isLoggedIn: true,
                user: action.payload.user,
                token: action.payload.token
            }
            axios.defaults.headers.common["Authorization"] = `Bearer ${action.payload.token}`;
            localStorage.setItem("auth", JSON.stringify(loginAuthState));
            return loginAuthState;
        case AUTH_ACTION_TYPE.LOGOUT_SUCCESS:
            localStorage.removeItem("auth");
            return authState;
        default:
            return state;
    }
};

export default authReducer;