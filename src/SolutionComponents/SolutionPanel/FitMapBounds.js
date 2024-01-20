import { useMap } from "react-leaflet";
import L from "leaflet";

const FitMapBounds = ({ points }) => {
  const map = useMap();
  const bounds = new L.LatLngBounds();

  points.forEach((point) => {
    bounds.extend(point);
  });
  map.fitBounds(bounds);
  return null;
};

export default FitMapBounds;
