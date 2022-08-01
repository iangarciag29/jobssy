import axios from "axios";

const AUTH_ACTION_TYPE = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAIL: "LOGIN_FAIL",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
};

const LoginAuthAction = (
  credentials: { email: string; password: string },
  navigate: any,
) => {
  return async (dispatch: any) => {
    try {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/login`, credentials, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const { data } = res;
          if (data.success) {
            dispatch({
              type: AUTH_ACTION_TYPE.LOGIN_SUCCESS,
              payload: data,
            });
            navigate("/app/");
          } else {
            dispatch({
              type: AUTH_ACTION_TYPE.LOGIN_FAIL,
              payload: data,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          if (error.response.data.error) {
            dispatch({
              type: AUTH_ACTION_TYPE.LOGIN_FAIL,
              payload: error.response.data.error,
            });
          }
        });
    } catch (error: any) {
      console.error(error);
      if (error.response.data.error) {
        dispatch({
          type: AUTH_ACTION_TYPE.LOGIN_FAIL,
          payload: error.response.data.error,
        });
      }
    }
  };
};

const LogoutAction = (navigate: any) => {
  return (dispatch: any) => {
    navigate("/");
    dispatch({
      type: AUTH_ACTION_TYPE.LOGOUT_SUCCESS,
      payload: {},
    });
  };
};

export { AUTH_ACTION_TYPE, LoginAuthAction, LogoutAction };
