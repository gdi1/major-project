import { Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import styled from "styled-components";
import text_styles from "../../../style-utils/text_styles";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import marker_icon from "../../../icons/marker_icon.png";

const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png";
const iconUrl =
  "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png";

const LocationMarker = ({ coordinates, games, label }) => {
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
          iconUrl: marker_icon,
          shadowUrl: markerShadow,
          iconSize: [41, 41],
          iconAnchor: [21, 41],
        })
      }
      ref={markerRef}
    >
      <Popup>
        <LocationLabel>{label}</LocationLabel>
        <GamesDetails>Games played here: {games.join(", ")}</GamesDetails>
      </Popup>
    </Marker>
  );
};

const LocationLabel = styled.div`
  text-align: center;
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
  font-weight: bold;
`;

const GamesDetails = styled.div`
  font-size: ${text_styles.fonts.xxsmall};
  font-family: ${text_styles.styles.fontFamily};
`;
export default LocationMarker;
