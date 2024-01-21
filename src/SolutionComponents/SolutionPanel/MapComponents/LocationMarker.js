import { Marker, Popup } from "react-leaflet";
import { useEffect, useRef, useState } from "react";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png";
const startIconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";
const endIconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png";
const middleIconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png";

const LocationMarker = ({ coordinates, games }) => {
  const markerRef = useRef();
  const { focusedGame, selectedTeamJourney } = useSelector(
    (state) => state.solution
  );

  useEffect(() => {
    if (
      focusedGame !== undefined &&
      JSON.stringify(selectedTeamJourney[focusedGame].coordinates) ===
        JSON.stringify(coordinates)
    )
      markerRef.current.openPopup();
    else markerRef.current.closePopup();
  }, [focusedGame]);
  return (
    <Marker
      position={coordinates}
      icon={
        new Icon({
          iconUrl: startIconUrl,
          shadowUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
      ref={markerRef}
    >
      <Popup>Games played here: {games.join(", ")}</Popup>
    </Marker>
  );
};
export default LocationMarker;
