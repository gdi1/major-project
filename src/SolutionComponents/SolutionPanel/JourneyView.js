import { useSelector } from "react-redux";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import { MapContainer, TileLayer } from "react-leaflet";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import borders from "../../style-utils/borders";
import SelectedTeamGamesDescription from "./SelectedTeamGamesDescription";
import FitMapBounds from "./MapComponents/FitMapBounds";
import {
  calculateCenterCoordinates,
  formatMarkers,
  filterConsecutiveSameLocations,
  getCoordinatesOfLocations,
} from "../../Utilities/MapFunctions";
import LocationMarker from "./MapComponents/LocationMarker";
import MapMovingMarker from "./MapComponents/MapMovingMarker";
import FlyToOnMap from "./MapComponents/FlyToOnMap";
import ButtonControl from "./MapComponents/ButtonControl";

const controlButtonTypes = ["increase", "decrease", "start", "pause", "stop"];

const JourneyView = () => {
  const { selectedTeam, selectedTeamJourney, focusedGame } = useSelector(
    (state) => state.solution
  );

  const movingMarkerRef = useRef(null);

  const [flyToPoint, setFlyToPoint] = useState(undefined);
  const [pulsatingGames, setPulsatingGames] = useState([]);

  const center = calculateCenterCoordinates(selectedTeamJourney);
  const markers = formatMarkers(selectedTeamJourney);

  useEffect(() => {
    if (!selectedTeam) return;
    const leafletTopRightDiv = document.querySelector(
      ".leaflet-top.leaflet-right"
    );
    if (leafletTopRightDiv) leafletTopRightDiv.remove();
  }, [selectedTeam]);

  useEffect(() => {
    if (focusedGame !== undefined) {
      setFlyToPoint(selectedTeamJourney[focusedGame].coordinates);
      setPulsatingGames([]);
    }
  }, [focusedGame]);

  return (
    <JourneyBody>
      {!selectedTeam && (
        <CenteredLabel>
          You must first select a team to view its journey.
        </CenteredLabel>
      )}
      {selectedTeam && (
        <React.Fragment>
          <JourneyDetailedItinerary>
            <CenteredLabel>Games</CenteredLabel>
            <SelectedTeamGamesDescription pulsatingGames={pulsatingGames} />
          </JourneyDetailedItinerary>
          <JourneyMapBody>
            {selectedTeam && (
              <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={center}
                zoom={5}
                scrollWheelZoom={false}
                id="leafletmap"
                doubleClickZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <FitMapBounds />
                {markers.map(({ coordinates, games, label }, idx) => (
                  <LocationMarker
                    coordinates={coordinates}
                    games={games}
                    label={label}
                    key={`${selectedTeam}-${idx}`}
                  />
                ))}
                <MapMovingMarker
                  movingMarkerRef={movingMarkerRef}
                  setPulsatingGames={setPulsatingGames}
                  pulsatingGames={pulsatingGames}
                />
                {focusedGame !== undefined && <FlyToOnMap point={flyToPoint} />}
                {filterConsecutiveSameLocations(
                  getCoordinatesOfLocations(selectedTeamJourney)
                ).length > 1 &&
                  controlButtonTypes.map((type, idx) => (
                    <ButtonControl
                      type={type}
                      movingMarkerRef={movingMarkerRef}
                      key={idx}
                    />
                  ))}
              </MapContainer>
            )}
          </JourneyMapBody>
        </React.Fragment>
      )}
    </JourneyBody>
  );
};

const JourneyBody = styled(RowContainer)`
  gap: 10px;
  justify-content: space-between;
`;

const JourneyMapBody = styled(RowContainer)`
  height: 85vh;
  width: 70%;
`;

const JourneyDetailedItinerary = styled(ColumnContainer)`
  width: 25%;
  justify-content: start;
  height: 83vh;
  gap: 5px;
  border: ${borders.small};
  padding: 10px;
`;

export default JourneyView;

// whenReady={(map) => {
//   console.log("created", map);
// }}

// {/* <MapRoute waypoints={waypoints} /> */}
//                 {/* <MapCurve points={undefined} /> */}
