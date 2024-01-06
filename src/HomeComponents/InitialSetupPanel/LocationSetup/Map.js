import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useEffect, useRef, useState } from "react";
import React from "react";
// import RoutingMachine from "./RoutingMachine";
import SearchComponent from "./SearchComponent";
import GeneralButton from "../../../GeneralComponents/GeneralButton";
import Container from "../../../GeneralComponents/Container";
import { useDispatch } from "react-redux";
import { constraintsActions } from "../../../store/constraints";

const Map = () => {
  const [searchedLocation, setSearchedLocation] = useState(null);
  const markerRef = useRef(null);
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <MapContainer
        style={{ height: "100%" }}
        center={[56.34045804737987, -2.8089025148829703]}
        zoom={13}
        id="leafletmap"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {searchedLocation && (
          <Marker
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
            position={searchedLocation.coordinates}
            ref={markerRef}
            eventHandlers={{
              add: () => {
                const marker = markerRef.current;
                if (marker) {
                  marker.openPopup();
                }
              },
            }}
          >
            <Popup>
              {searchedLocation.label}
              <Container>
                <GeneralButton
                  onClick={() => {
                    console.log(searchedLocation);
                    dispatch(constraintsActions.addLocation(searchedLocation));
                    setSearchedLocation(undefined);
                  }}
                  style={{ fontSize: "small" }}
                >
                  Add
                </GeneralButton>
              </Container>
            </Popup>
          </Marker>
        )}
        <SearchComponent onLocationChange={setSearchedLocation} />
      </MapContainer>
    </React.Fragment>
  );
};

export default Map;
