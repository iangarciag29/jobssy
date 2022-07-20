import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const PageSwitchAccessibility = (): JSX.Element => {
  const [announcement, setAnnouncement] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.slice(1)) {
      setTimeout(
        () =>
          setAnnouncement(`Navigated to ${location.pathname.slice(1)} page.`),
        500,
      );
    } else {
      setAnnouncement("");
    }
  }, [location]);

  return (
    <span
      className="sr-only"
      role="status"
      aria-live="polite"
      aria-atomic={true}
    >
      {announcement}
    </span>
  );
};

export default PageSwitchAccessibility;
