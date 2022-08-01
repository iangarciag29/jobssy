import { GoogleMap } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const JobMap = (): JSX.Element => {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteral>(
    () => ({ lat: 37.3551616, lng: -122.0177252 }),
    [],
  );
  const options = useMemo<MapOptions>(
    () => ({
      mapId: "ad6644a2d5ec6ecb",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    [],
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <div className="h-96">
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={options}
        onLoad={onLoad}
      ></GoogleMap>
    </div>
  );
};

const mapOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: true,
  editable: false,
  visible: true,
};

export default JobMap;
