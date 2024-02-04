import { useMap } from "react-leaflet";
import { useMapEvents } from "react-leaflet";

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
