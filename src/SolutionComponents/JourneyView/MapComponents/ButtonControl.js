import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import { useDispatch } from "react-redux";
import { solutionActions } from "../../../store/solution";

const titles = {
  increase: "Increase Speed",
  decrease: "Decrease Speed",
  pause: "Pause Animation",
  start: "Start/Restart Animation",
  stop: "Stop Animation",
};
/**
 *
 * References
 *
 * “Custom Button on the Leaflet Map with React-Leaflet Version3.” Stack Overflow, n.d.
 * https://stackoverflow.com/questions/68414583/custom-button-on-the-leaflet-map-with-react-leaflet-version3.
 */
const CreateButtonControl = ({ type, movingMarkerRef }) => {
  const dispatch = useDispatch();
  const MapButton = L.Control.extend({
    onAdd: (map) => {
      const button = L.DomUtil.create("button", "");
      button.innerHTML = titles[type];
      button.style.cursor = "pointer";
      button.addEventListener("click", () => {
        if (type === "increase") dispatch(solutionActions.increaseSpeed());
        else if (type === "decrease") dispatch(solutionActions.reduceSpeed());
        else if (movingMarkerRef.current !== null) {
          if (type === "pause" && movingMarkerRef.current.isRunning()) {
            movingMarkerRef.current.pause();
          } else if (type === "start") {
            dispatch(solutionActions.resetFocusedGame());
            movingMarkerRef.current.start();
          } else if (type === "stop") {
            movingMarkerRef.current.stop();
          }
        }
      });
      return button;
    },
  });
  return new MapButton({ position: "topleft" });
};

const ButtonControl = createControlComponent(CreateButtonControl);

export default ButtonControl;
