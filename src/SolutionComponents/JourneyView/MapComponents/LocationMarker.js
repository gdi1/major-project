import { Marker, Popup } from "react-leaflet";
import { useEffect, useRef } from "react";
import { Icon } from "leaflet";
import { useSelector } from "react-redux";
import styled from "styled-components";
import text_styles from "../../../style-utils/text_styles";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import marker_icon from "../../../icons/marker_icon.png";
import { TextWithWordBreakCSS } from "../../../GeneralComponents/TextWithoutOverflow";

/**
 * References
 *
 * “Child Components.” React Leaflet, n.d.
 * https://react-leaflet.js.org/docs/api-components/#marker.
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/programmatically-open-popup-with-react-leaflet-y12g0?file=%2Fsrc%2FApp.js.
 */
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
  ${TextWithWordBreakCSS};
  white-space: normal;
`;

const GamesDetails = styled.div`
  font-size: ${text_styles.fonts.xxsmall};
  font-family: ${text_styles.styles.fontFamily};
`;
export default LocationMarker;
