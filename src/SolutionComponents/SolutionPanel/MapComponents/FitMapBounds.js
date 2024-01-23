import { useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { getCoordinatesOfLocations } from "../../../Utilities/MapFunctions";

const FitMapBounds = () => {
  const map = useMap();
  const bounds = new L.LatLngBounds();
  const { selectedTeamJourney } = useSelector((state) => state.solution);
  const points = getCoordinatesOfLocations(selectedTeamJourney);

  points.forEach((point) => {
    bounds.extend(point);
  });
  map.fitBounds(bounds);
  return null;
};

export default FitMapBounds;
