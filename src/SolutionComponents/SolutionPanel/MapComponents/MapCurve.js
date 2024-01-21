import L from "leaflet";
import "@elfalem/leaflet-curve";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { calculateBezierCurve } from "../../../Utilities/MapFunctions";
import { formatJourneyCurvesEnds } from "../../../Utilities/MapFunctions";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const curves = [];
const MapCurve = () => {
  const map = useMap();
  const { selectedTeam, selectedTeamJourney } = useSelector(
    (state) => state.solution
  );

  useEffect(() => {
    curves.forEach((curvedPath) => map.removeLayer(curvedPath));
    const points = formatJourneyCurvesEnds(selectedTeamJourney);
    points.forEach(({ startpoint, endpoint }) => {
      const bezierCurvePoints = calculateBezierCurve(startpoint, endpoint);
      const pathOptions = {
        color: "red",
        weight: 2,
        animate: {
          duration: 2000,
          iterations: Infinity,
        },
      };
      const curvedPath = L.curve(
        [
          "M",
          bezierCurvePoints[0],
          "Q",
          bezierCurvePoints[1],
          bezierCurvePoints[2],
        ],
        pathOptions
      ).addTo(map);
      curves.push(curvedPath);
    });
  }, [selectedTeam]);
};
export default MapCurve;
