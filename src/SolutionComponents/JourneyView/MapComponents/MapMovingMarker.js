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
import team_icon from "../../../icons/team_icon.png";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png";

const MapMovingMarker = ({ movingMarkerRef, setPulsatingGames }) => {
  console.log("AA", process.env.PUBLIC_URL);
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
    // console.log(calculateDurations(selectedTeamJourney, speed));
  }, [speed]);

  useEffect(() => {
    setIndex([0]);
  }, [selectedTeam]);

  useEffect(() => {
    let start = 0;
    console.log("Indexx: ", index, selectedTeam);
    for (let i = 0; i < index[0]; i++) start += locations[i].cnt;
    const newGamesInterval = [start, start + locations[index[0]].cnt - 1];
    setPulsatingGames(newGamesInterval);
  }, [index, setPulsatingGames]);

  useEffect(() => {
    if (movingMarkerRef.current !== null) {
      movingMarkerRef.current.stop();
      map.removeLayer(movingMarkerRef.current);
      movingMarkerRef.current = null;
    }
    setIndex([0]);
    if (locations.length > 1) {
      // console.log("Hello, creating new moving marker");
      movingMarkerRef.current = L.Marker.movingMarker(
        locations.map(({ coordinates }) => coordinates),
        // Array(locations.length - 1).fill(speed),
        calculateDurations(selectedTeamJourney, speed),
        {
          icon: new Icon({
            iconUrl: team_icon, //"/team_icon.png",
            // shadowUrl: markerShadow,
            iconSize: [41, 41],
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
};

export default MapMovingMarker;
