import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useCallback, useMemo, useRef } from "react";
import ToolsIcon from "../../assets/img/ToolsIcon.png";

type LatLngLiteral = google.maps.LatLngLiteral;
type MapOptions = google.maps.MapOptions;

const JobMap = ({ address }: any): JSX.Element => {
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

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const center = useMemo<LatLngLiteral>(
    () => ({
      lat: address.latitude,
      lng: address.longitude,
    }),
    [],
  );

  return (
    <div className="relative h-96">
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
            url: ToolsIcon,
            scaledSize: new window.google.maps.Size(30, 30),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default JobMap;
