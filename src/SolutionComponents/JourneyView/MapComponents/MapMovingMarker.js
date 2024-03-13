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

/**
 *
 * References
 *
 * “Ewoken/Leaflet.Movingmarker: A Leaflet Plug-in to Create Moving Marker.” GitHub, n.d.
 * https://github.com/ewoken/Leaflet.MovingMarker.
 */

const MapMovingMarker = ({ movingMarkerRef, setPulsatingGames }) => {
  const { selectedTeamJourney, selectedTeam, focusedGame, speed } = useSelector(
    (state) => state.solution
  );
  const map = useMap();
  const locations = filterConsecutiveSameLocations(
    getCoordinatesOfLocations(selectedTeamJourney)
  );
  const [index, setIndex] = useState([0]);

  useEffect(() => {
    if (focusedGame !== undefined && movingMarkerRef.current !== null)
      movingMarkerRef.current.pause();
  }, [focusedGame]);

  useEffect(() => {
    if (movingMarkerRef.current !== null) {
      movingMarkerRef.current._durations = calculateDurations(
        selectedTeamJourney,
        speed
      );
    }
  }, [speed]);

  useEffect(() => {
    setIndex([0]);
  }, [selectedTeam]);

  useEffect(() => {
    let start = 0;
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
      movingMarkerRef.current = L.Marker.movingMarker(
        locations.map(({ coordinates }) => coordinates),
        calculateDurations(selectedTeamJourney, speed),
        {
          icon: new Icon({
            iconUrl: team_icon,
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
