import { useSelector } from "react-redux";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import borders from "../../style-utils/borders";
import MapCurve from "./MapCurve";
import SelectedTeamGamesDescription from "./SelectedTeamGamesDescription";
import FitMapBounds from "./FitMapBounds";
import {
  formatJourneyCurvesEnds,
  calculateCenterCoordinates,
  formatMarkers,
} from "../../Utilities/MapFunctions";
import FlyToOnMap from "./FlyToOnMap";
import LocationMarker from "./LocationMarker";

const JourneyView = () => {
  const { selectedTeam, selectedTeamJourney, focusedGame } = useSelector(
    (state) => state.solution
  );
  const selectedTeamJourneyBezierCurvesEnds =
    formatJourneyCurvesEnds(selectedTeamJourney);
  const [center, setCenter] = useState(
    calculateCenterCoordinates(selectedTeamJourney)
  );
  const fitBoundsPoints = selectedTeamJourney.map(
    ({ coordinates }) => coordinates
  );
  const [flyToPoint, setFlyToPoint] = useState(undefined);
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
      console.log("focsued", focusedGame, selectedTeamJourney);
      setFlyToPoint(selectedTeamJourney[focusedGame].coordinates);
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
            <SelectedTeamGamesDescription />
          </JourneyDetailedItinerary>
          <JourneyMapBody>
            {selectedTeam && (
              <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={center}
                zoom={5}
                scrollWheelZoom={false}
                id="leafletmap"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* <MapRoute waypoints={waypoints} /> */}
                <MapCurve points={selectedTeamJourneyBezierCurvesEnds} />
                <FitMapBounds points={fitBoundsPoints} />
                {markers.map(({ coordinates, games }) => (
                  <LocationMarker coordinates={coordinates} games={games} />
                ))}
                {focusedGame !== undefined && <FlyToOnMap point={flyToPoint} />}
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
`;

const JourneyMapBody = styled(RowContainer)`
  height: 85vh;
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

//[56.34045804737987, -2.8089025148829703]

// [
//   {
//     startpoint: [50.54136296522163, 28.520507812500004],
//     endpoint: [48.45835188280866, 33.57421875000001],
//   },
// ]

// const waypoints = [
//   {
//     label: "A",
//     value: 1,
//     coordinates: [33.52001088075479, 36.26829385757446],
//   },
//   {
//     label: "B",
//     value: 2,
//     coordinates: [33.51001088075479, 36.27829385757446],
//   },
//   {
//     label: "C",
//     value: 3,
//     coordinates: [33.50546582848033, 36.29547681726967],
//   },
//   {
//     label: "A",
//     value: 1,
//     coordinates: [33.52001088075479, 36.26829385757446],
//   },
//   {
//     label: "B",
//     value: 2,
//     coordinates: [33.51001088075479, 36.27829385757446],
//   },
//   {
//     label: "A",
//     value: 1,
//     coordinates: [33.52001088075479, 36.26829385757446],
//   },
//   {
//     label: "way 5",
//     value: 2,
//     coordinates: [33.51001088075479, 36.27829385757446],
//   },
// ];
