import { useSelector } from "react-redux";
import { CenteredLabel } from "../../GeneralComponents/Labels";
import { MapContainer, TileLayer } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import {
  ColumnContainer,
  RowContainer,
} from "../../GeneralComponents/Containers";
import MapRoute from "./MapRoute";
import React, { useEffect } from "react";
import styled from "styled-components";
import { TextWithEllipsis } from "../../GeneralComponents/TextWithEllipsis";
import borders from "../../style-utils/borders";
import colors from "../../style-utils/colors";

const JourneyView = () => {
  const { selectedTeam, selectedTeamJourney, selectedTeamGames } = useSelector(
    (state) => state.solution
  );

  const waypoints = [
    {
      label: "A",
      value: 1,
      coordinates: [33.52001088075479, 36.26829385757446],
    },
    {
      label: "B",
      value: 2,
      coordinates: [33.51001088075479, 36.27829385757446],
    },
    {
      label: "C",
      value: 3,
      coordinates: [33.50546582848033, 36.29547681726967],
    },
    {
      label: "A",
      value: 1,
      coordinates: [33.52001088075479, 36.26829385757446],
    },
    {
      label: "B",
      value: 2,
      coordinates: [33.51001088075479, 36.27829385757446],
    },
    {
      label: "A",
      value: 1,
      coordinates: [33.52001088075479, 36.26829385757446],
    },
    {
      label: "way 5",
      value: 2,
      coordinates: [33.51001088075479, 36.27829385757446],
    },
  ];

  useEffect(() => {
    console.log(selectedTeamJourney);
    if (!selectedTeam) return;
    const leafletTopRightDiv = document.querySelector(
      ".leaflet-top.leaflet-right"
    );
    if (leafletTopRightDiv) leafletTopRightDiv.remove();
  }, [selectedTeam]);

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
            <GamesDescription>
              {selectedTeamGames.map(({ game, period, week }) => (
                <GameCard>
                  <GameDetailsSection
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>Week: {week}</div>
                    <div> Period: {period}</div>
                  </GameDetailsSection>
                  <GameDetailsSection>
                    <LeftTeam>{game.teamA}</LeftTeam>
                    <div>vs</div>
                    <RightTeam>{game.teamB}</RightTeam>
                  </GameDetailsSection>
                  <GameDetailsSection>
                    <Location>Location: {game.location}</Location>
                  </GameDetailsSection>
                  <GameDetailsSection></GameDetailsSection>
                </GameCard>
              ))}
            </GamesDescription>
          </JourneyDetailedItinerary>
          <JourneyMapBody>
            {selectedTeam && (
              <MapContainer
                style={{ height: "100%", width: "100%" }}
                center={[56.34045804737987, -2.8089025148829703]}
                zoom={13}
                scrollWheelZoom={false}
                id="leafletmap"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapRoute waypoints={waypoints} />
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

const GamesDescription = styled(ColumnContainer)`
  justify-content: start;
  height: 85vh;
  gap: 5px;
  overflow: scroll;
`;

const Location = styled(TextWithEllipsis)`
  width: 60%;
  text-align: center;
`;

const LeftTeam = styled(TextWithEllipsis)`
  width: 40%;
  text-align: right;
`;

const RightTeam = styled(TextWithEllipsis)`
  width: 40%;
  text-align: left;
`;

const GameCard = styled(ColumnContainer)`
  border: ${borders.small};
  cursor: pointer;
  &: hover {
    background-color: ${colors.creme};
  }
`;
const GameDetailsSection = styled(RowContainer)`
  gap: 10px;
`;

export default JourneyView;
