import { useMap } from "react-leaflet";
import L from "leaflet";
import "../../../MovingMarker";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import {
  getCoordinatesOfLocations,
  filterConsecutiveSameLocations,
} from "../../../Utilities/MapFunctions";
import { useEffect } from "react";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png";

function MapMovingMarker({ movingMarkerRef }) {
  const { selectedTeamJourney, selectedTeam, focusedGame, speed } = useSelector(
    (state) => state.solution
  );
  const map = useMap();
  const locations = filterConsecutiveSameLocations(
    getCoordinatesOfLocations(selectedTeamJourney)
  );

  useEffect(() => {
    if (movingMarkerRef.current !== null) {
      movingMarkerRef.current.stop();
      map.removeLayer(movingMarkerRef.current);
    }
    if (locations.length > 1) {
      movingMarkerRef.current = L.Marker.movingMarker(
        locations,
        Array(locations.length - 1).fill(speed),
        {
          icon: new Icon({
            iconUrl: process.env.PUBLIC_URL + "/team_icon.png",
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
          autostart: true,
          loop: true,
        }
      ).addTo(map);

      movingMarkerRef.current.on("click", (e) => {
        if (e.sourceTarget.isRunning()) e.sourceTarget.pause();
        else e.sourceTarget.resume();
      });
    }
  }, [selectedTeam]);

  useEffect(() => {
    console.log("Here12");
    if (focusedGame !== undefined) movingMarkerRef.current.pause();
    // else movingMarkerRef.current.resume();
  }, [focusedGame]);

  useEffect(() => {
    if (movingMarkerRef.current !== null)
      movingMarkerRef.current._durations = Array(locations.length - 1).fill(
        speed
      );
  }, [speed]);
}

export default MapMovingMarker;
