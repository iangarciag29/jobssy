import { BTN_SIZE } from "../../types";
import { translateSize } from "../../utils";

const Button = ({
  text,
  onClick,
  size = BTN_SIZE.SMALL,
  className,
}: {
  text: string;
  onClick?: () => void;
  size: BTN_SIZE;
  className?: string;
}): JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`jobssy-btn ${translateSize(size)} ${
        className ? className : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
