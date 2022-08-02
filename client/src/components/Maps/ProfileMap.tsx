import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";

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
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default ProfileMap;
