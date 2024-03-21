import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { useMap } from "react-leaflet";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";

/**
 *
 * References
 *
 * “React Leaflet.” React Leaflet, n.d. https://react-leaflet.js.org/.
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/search-box-implementation-in-react-leaflet-v310-sx0rp?file=%2Fsrc%2FMapWrapper.jsx.
 *
 * Codesandbox.io, n.d. https://codesandbox.io/p/sandbox/elegant-feather-xgelk?file=%2Fsrc%2FSearchControl.js%3A17%2C15.
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/programmatically-open-popup-with-react-leaflet-y12g0?file=%2Fsrc%2FApp.js.
 *
 * “Usage.” Leaflet GeoSearch, n.d. https://smeijer.github.io/leaflet-geosearch/usage.
 *
 * “Introduction.” Leaflet GeoSearch, n.d. https://smeijer.github.io/leaflet-geosearch/.
 *
 * Smeijer. “Smeijer/Leaflet-Geosearch: A Geocoding/Address-Lookup Library Supporting Various API Providers.” GitHub, n.d.
 * https://github.com/smeijer/leaflet-geosearch.
 *
 * OpenStreetMap, n.d. https://www.openstreetmap.org/#map=6/54.910/-3.432.
 */
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
      retainZoomLevel: false,
      animateZoom: true,
      autoClose: true,
      searchLabel: "Enter address",
      keepResult: true,
    });

    map.addControl(searchControl);

    map.on("geosearch/showlocation", (event) => {
      const { x, y, label } = event.location;
      onLocationChange({ coordinates: [y, x], label });
      setAddedSuccessfully(false);
      setShowChangeNameInput(false);
      setIsClickMarker(false);

      if (markerRef.current) markerRef.current.openPopup();
    });

    const searchBarContainer = searchControl.getContainer();
    const elementToRemove = searchBarContainer.querySelector(
      ".leaflet-bar-part-single"
    );

    if (elementToRemove) {
      elementToRemove.remove();
    }

    return () => {
      map.removeControl(searchControl);
      map.off("geosearch/showlocation");
    };
  }, [map]);

  return null;
};

export default SearchComponent;
