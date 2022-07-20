import {BTN_SIZE} from "../../types";
import {translateSize} from "../../utils";

const Button = ({
                    text,
                    onClick,
                    size = BTN_SIZE.SMALL
                }: { text: string, onClick?: () => void, size: BTN_SIZE }): JSX.Element => {
    return <button onClick={onClick} className={`jobssy-btn ${translateSize(size)}`}>{text}</button>
}

export default Button;