import { useMap } from "react-leaflet";
import L from "leaflet";
import "./MovingMarker";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import {
  getCoordinatesOfLocations,
  filterConsecutiveSameLocations,
  calculateDurations,
} from "../../../Utilities/MapFunctions";
import { useEffect, useState } from "react";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png";

function MapMovingMarker({ movingMarkerRef, setPulsatingGames }) {
  const { selectedTeamJourney, selectedTeam, focusedGame, speed } = useSelector(
    (state) => state.solution
  );
  const map = useMap();
  const locations = filterConsecutiveSameLocations(
    getCoordinatesOfLocations(selectedTeamJourney)
  );
  const [index, setIndex] = useState([0]);

  useEffect(() => {
    if (focusedGame !== undefined) movingMarkerRef.current.pause();
  }, [focusedGame]);

  useEffect(() => {
    if (movingMarkerRef.current !== null) {
      movingMarkerRef.current._durations = calculateDurations(
        selectedTeamJourney,
        speed
      );
    }
    // movingMarkerRef.current._durations = Array(locations.length - 1).fill(
    //   speed
    // );
    console.log(calculateDurations(selectedTeamJourney, speed));
  }, [speed]);

  useEffect(() => {
    setIndex([0]);
  }, [selectedTeam]);

  useEffect(() => {
    let offset = 0;
    for (let i = 0; i < index[0]; i++) offset += locations[i].cnt;
    const newGamesInterval = [offset, offset + locations[index[0]].cnt - 1];
    setPulsatingGames(newGamesInterval);
  }, [index, setPulsatingGames]);

  useEffect(() => {
    if (movingMarkerRef.current !== null) {
      movingMarkerRef.current.stop();
      map.removeLayer(movingMarkerRef.current);
    }
    if (locations.length > 1) {
      setIndex([0]);
      movingMarkerRef.current = L.Marker.movingMarker(
        locations.map(({ coordinates }) => coordinates),
        // Array(locations.length - 1).fill(speed),
        calculateDurations(selectedTeamJourney, speed),
        {
          icon: new Icon({
            iconUrl: process.env.PUBLIC_URL + "/team_icon.png",
            shadowUrl,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          }),
          autostart: false,
          loop: false,
        },
        setIndex
      ).addTo(map);

      movingMarkerRef.current.on("click", (e) => {
        if (e.sourceTarget.isRunning()) e.sourceTarget.pause();
        else e.sourceTarget.resume();
      });
      movingMarkerRef.current.start();
    }
  }, [selectedTeam]);
}

export default MapMovingMarker;
