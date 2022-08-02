import { useCallback, useMemo, useRef } from "react";
import { GoogleMap, MarkerClusterer, MarkerF } from "@react-google-maps/api";

type MapOptions = google.maps.MapOptions;

const WorkersMap = ({ addresses, selectOfferer }: any): JSX.Element => {
  const mapRef = useRef<GoogleMap>();

  const center = useMemo(
    () => ({ lat: 37.4820967332291, lng: -122.16371302583619 }),
    [],
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "ad6644a2d5ec6ecb",
      disableDefaultUI: true,
      clickableIcons: false,
      draggable: true,
      minZoom: 5,
      maxZoom: 10,
    }),
    [],
  );

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      onLoad={onLoad}
      options={options}
    >
      <MarkerClusterer>
        {(cluster) =>
          addresses.map((item: any) => (
            <MarkerF
              key={item.address.id}
              onClick={() => selectOfferer(item.offerer)}
              position={{
                lat: parseFloat(item.address.latitude),
                lng: parseFloat(item.address.longitude),
              }}
              clusterer={cluster}
            />
          ))
        }
      </MarkerClusterer>
    </GoogleMap>
  );
};

export default WorkersMap;
