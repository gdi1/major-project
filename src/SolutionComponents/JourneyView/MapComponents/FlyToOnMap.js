import { useMap } from "react-leaflet";

const FlyToOnMap = ({ point = undefined }) => {
  const map = useMap();
  if (point) map.flyTo(point, Math.min(map.getZoom() + 3, 18), { duration: 1 });
  return null;
};

export default FlyToOnMap;
