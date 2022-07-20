import {BTN_SIZE} from "../types";

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

export const mapStateToProps = (state: any) => {
    return {
        auth: state.authState,
    };
};