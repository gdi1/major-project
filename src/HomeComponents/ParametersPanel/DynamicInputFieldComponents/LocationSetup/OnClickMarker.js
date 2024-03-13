import { useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

/**
 *
 * References
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/programmatically-open-popup-with-react-leaflet-y12g0?file=%2Fsrc%2FApp.js.
 *
 * “Child Components.” React Leaflet, n.d. https://react-leaflet.js.org/docs/api-components/#marker.
 */
const OnClickMarker = ({
  setSearchedLocation,
  markerRef,
  setShowChangeNameInput,
  setIsClickMarker,
}) => {
  const map = useMapEvents({
    click(e) {
      const { lng, lat } = e.latlng;
      setSearchedLocation({ coordinates: [lat, lng], label: "" });
      setShowChangeNameInput(true);
      setIsClickMarker(true);
      if (markerRef.current) markerRef.current.openPopup();
      map.flyTo(e.latlng, map.getZoom());
    },
  });
};
export default OnClickMarker;
