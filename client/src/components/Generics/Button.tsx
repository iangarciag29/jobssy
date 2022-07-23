import { BTN_SIZE } from "../../types";
import { translateSize } from "../../utils";

const Button = ({
  text,
  onClick,
  size = BTN_SIZE.SMALL,
  className,
  type,
  disabled = false,
}: {
  text: string;
  onClick?: () => void;
  size: BTN_SIZE;
  className?: string;
  type?: any;
  disabled?: boolean;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`jobssy-btn ${translateSize(size)} ${
        className ? className : ""
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
