import {BTN_SIZE} from "../types";
import {LoginAuthAction, LogoutAction} from "../store/actions/auth.action";

/**
 * Translates the button size enum into a CSS class.
 * @param size BTN_SIZE enum.
 */
export const translateSize = (size: BTN_SIZE): string => {
    switch (size) {
        case BTN_SIZE.LARGE:
            return "jobssy-lg";
        case BTN_SIZE.MEDIUM:
            return "jobssy-md";
        case BTN_SIZE.SMALL:
            return "jobssy-sm";
        case BTN_SIZE.EXTRA_SMALL:
            return "jobssy-xs";
    }
    return "jobssy-sm"
}

/**
 * Redux method that passes state to props.
 * @param state
 */
export const mapStateToProps = (state: any) => {
    return {
        auth: state.authState,
    };
};

/**
 * Redux method that passes dispatch function to props.
 * @param dispatch
 */
export const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (loginState: { email: string; password: string }, navigate: any) => {
            dispatch(LoginAuthAction(loginState, navigate));
        },
        logout: (navigate: any) => {
            dispatch(LogoutAction(navigate));
        },
    }
};