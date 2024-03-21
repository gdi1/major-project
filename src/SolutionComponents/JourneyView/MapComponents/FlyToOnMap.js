import { useMap } from "react-leaflet";

/**
 * References
 *
 * “React Leaflet.” React Leaflet, n.d. https://react-leaflet.js.org/.
 */
const FlyToOnMap = ({ point = undefined }) => {
  const map = useMap();
  if (point) map.flyTo(point, Math.min(map.getZoom() + 3, 18));
  return null;
};

export default FlyToOnMap;
