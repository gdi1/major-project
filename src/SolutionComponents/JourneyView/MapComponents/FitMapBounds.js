import { useMap } from "react-leaflet";
import L from "leaflet";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { getCoordinatesOfLocations } from "../../../Utilities/MapFunctions";

const FitMapBounds = () => {
  const map = useMap();
  const bounds = new L.LatLngBounds();
  const { selectedTeamJourney, focusedGame } = useSelector(
    (state) => state.solution
  );

  useEffect(() => {
    const points = getCoordinatesOfLocations(selectedTeamJourney);
    if (points.length > 0) {
      points.forEach((point) => {
        bounds.extend(point);
      });
      map.fitBounds(bounds);
    }
  }, [selectedTeamJourney, focusedGame]);

  return null;
};

export default FitMapBounds;
