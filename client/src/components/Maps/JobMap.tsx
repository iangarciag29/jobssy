import { GoogleMap, Marker } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const JobMap = ({ address }: any): JSX.Element => {
  const mapRef = useRef<GoogleMap>();

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "ad6644a2d5ec6ecb",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const center = useMemo<LatLngLiteral>(
    () => ({
      lat: address.latitude,
      lng: address.longitude,
    }),
    [],
  );

  return (
    <div className="h-96">
      <GoogleMap
        zoom={6}
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

export default JobMap;
