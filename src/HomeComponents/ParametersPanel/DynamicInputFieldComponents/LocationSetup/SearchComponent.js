import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

const SearchComponent = ({
  onLocationChange,
  setAddedSuccessfully,
  markerRef,
  setShowChangeNameInput,
  setIsClickMarker,
}) => {
  const map = useMap();

  useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      showMarker: false,
      autoComplete: true,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      searchLabel: "Enter address",
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (event) => {
      const { x, y, label } = event.location;
      console.log(x, y, label);
      onLocationChange({ coordinates: [y, x], label });
      setAddedSuccessfully(false);
      setShowChangeNameInput(false);
      setIsClickMarker(false);

      if (markerRef.current) markerRef.current.openPopup();
    });

    const searchControlContainer = searchControl.getContainer();
    const anchorElement = searchControlContainer.querySelector(
      ".leaflet-bar-part-single"
    );

    if (anchorElement) {
      anchorElement.remove();
    }

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map]);

  return null;
};

export default SearchComponent;
