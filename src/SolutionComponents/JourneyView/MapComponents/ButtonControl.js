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
const CreateButtonControl = ({ type, movingMarkerRef }) => {
  const dispatch = useDispatch();
  const MapButton = L.Control.extend({
    onAdd: (map) => {
      const button = L.DomUtil.create("button", "");
      button.innerHTML = titles[type];
      button.style.cursor = "pointer";
      // add the event listener that will create a marker on the map
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

// if (movingMarkerRef.current.isPaused())
//   movingMarkerRef.current.resume();
// else if (movingMarkerRef.current.isEnded())
//   movingMarkerRef.current.start();
