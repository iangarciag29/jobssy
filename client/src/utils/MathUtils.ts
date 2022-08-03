type LatLngLiteral = google.maps.LatLngLiteral;

export const isWithinBounds = (marker: LatLngLiteral, bounds: any): boolean => {
  if (!marker.lat || !marker.lng || !bounds.ne || !bounds.sw) return false;
  return (
    marker.lat >= bounds.sw.lat &&
    marker.lat <= bounds.ne.lat &&
    marker.lng >= bounds.sw.lng &&
    marker.lng <= bounds.ne.lng
  );
};
