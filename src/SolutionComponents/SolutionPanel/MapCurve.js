import L from "leaflet";
import "@elfalem/leaflet-curve";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import { useMap } from "react-leaflet";
import { calculateBezierCurve } from "../../Utilities/MapFunctions";

const MapCurve = ({ points = [] }) => {
  const map = useMap();
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
    L.curve(
      [
        "M",
        bezierCurvePoints[0],
        "Q",
        bezierCurvePoints[1],
        bezierCurvePoints[2],
      ],
      pathOptions
    ).addTo(map);
  });
};
export default MapCurve;
