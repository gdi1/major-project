import { useMap } from "react-leaflet";

const FlyToOnMap = ({ point = undefined }) => {
  const map = useMap();
  if (point) map.flyTo(point, 11, { duration: 2 });
  return null;
};
export default FlyToOnMap;
