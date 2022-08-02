import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";
import HouseMapIcon from "../../assets/img/HomeMapIcon.png";

type MapOptions = google.maps.MapOptions;
type LatLngLiteral = google.maps.LatLngLiteral;

const ProfileMap = ({ user }: any): JSX.Element => {
  const mapRef = useRef<GoogleMap>();

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "ad6644a2d5ec6ecb",
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: false,
    }),
    [],
  );

  const center = useMemo<LatLngLiteral>(
    () => ({
      lat: user.address.latitude,
      lng: user.address.longitude,
    }),
    [user],
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  if (!user.address) return <></>;

  return (
    <div className="h-96">
      <GoogleMap
        zoom={12}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={options}
        onLoad={onLoad}
      >
        <MarkerF
          position={center}
          icon={{
            url: HouseMapIcon,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default ProfileMap;
