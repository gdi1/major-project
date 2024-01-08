import { useSelector } from "react-redux";
import { Label } from "../../GeneralComponents/Labels";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import React, { useCallback, useState } from "react";
import { Container } from "../../GeneralComponents/Containers";
import MapRoute from "./MapRoute";
import { useEffect } from "react";

const JourneyView = () => {
  const { selectedTeam, selectedTeamJourney } = useSelector(
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
    <Container height="85vh">
      {!selectedTeam && (
        <Label>You must first select a team to view its journey.</Label>
      )}
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
    </Container>
  );
};
export default JourneyView;
