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
    const locationsCoordinates = getCoordinatesOfLocations(selectedTeamJourney);
    if (locationsCoordinates.length > 0) {
      locationsCoordinates.forEach((coords) => {
        bounds.extend(coords);
      });
      map.fitBounds(bounds);
    }
  }, [selectedTeamJourney, focusedGame]);

  return null;
};

export default FitMapBounds;
