import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useRef, useState } from "react";
import React from "react";
import SearchComponent from "./SearchComponent";
import GeneralButton from "../../../../GeneralComponents/GeneralButton";
import {
  ColumnContainer,
  RowContainer,
} from "../../../../GeneralComponents/Containers";
import { useDispatch, useSelector } from "react-redux";
import { constraintsActions } from "../../../../store/constraints";
import { NotificationManager } from "react-notifications";
import styled from "styled-components";
import InputField from "../../../../GeneralComponents/InputField";
import OnClickMarker from "./OnClickMarker";
import gaps from "../../../../style-utils/gaps";
import text_styles from "../../../../style-utils/text_styles";

const Map = () => {
  const { locations } = useSelector((state) => state.constraints);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [showChangeNameInput, setShowChangeNameInput] = useState(false);
  const [isClickMarker, setIsClickMarker] = useState(false);

  const markerRef = useRef(null);
  const dispatch = useDispatch();
  console.log(searchedLocation);

  const addNewLocation = (e) => {
    if (showChangeNameInput) {
      NotificationManager.error(
        "The location must have a non empty name",
        "Error"
      );
      return;
    }
    e.stopPropagation();
    if (
      locations.some(
        (l) =>
          l.coordinates[0] == searchedLocation.coordinates[0] &&
          l.coordinates[1] == searchedLocation.coordinates[1]
      )
    ) {
      NotificationManager.error(
        "This location already exists as part of the location options!",
        "Error"
      );
      return;
    }
    dispatch(constraintsActions.addLocation(searchedLocation));
    setShowChangeNameInput(false);
    setAddedSuccessfully(true);
  };

  const onChangeName = (e) => {
    setSearchedLocation((prev) => ({ ...prev, label: e.target.value }));
  };

  return (
    <React.Fragment>
      <MapContainer
        style={{ height: "100%" }}
        center={[56.34045804737987, -2.8089025148829703]}
        zoom={13}
        scrollWheelZoom={false}
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
              <PopUpDetails>
                {!showChangeNameInput && (
                  <div
                    style={{
                      fontSize: `${text_styles.fonts.xsmall}`,
                      textAlign: "center",
                    }}
                  >
                    {searchedLocation.label}
                  </div>
                )}
                {showChangeNameInput && (
                  <InputField
                    onChange={onChangeName}
                    value={searchedLocation.label}
                    placeholder={isClickMarker ? "Enter name" : ""}
                  />
                )}
                {!addedSuccessfully && (
                  <RowContainer style={{ gap: `${gaps.xsmall}` }}>
                    <GeneralButton
                      onClick={() => {
                        if (searchedLocation.label.trim() === "") {
                          NotificationManager.error(
                            "The location must have a name",
                            "Error"
                          );
                          return;
                        }
                        setShowChangeNameInput((prev) => !prev);
                      }}
                      style={{ fontSize: `${text_styles.fonts.xsmall}` }}
                    >
                      {showChangeNameInput ? "Save" : "Change name"}
                    </GeneralButton>
                    <GeneralButton
                      onClick={addNewLocation}
                      style={{ fontSize: `${text_styles.fonts.xsmall}` }}
                    >
                      Add
                    </GeneralButton>
                  </RowContainer>
                )}
                {addedSuccessfully && <div>Added successfully!</div>}
              </PopUpDetails>
            </Popup>
          </Marker>
        )}
        <SearchComponent
          onLocationChange={setSearchedLocation}
          setAddedSuccessfully={setAddedSuccessfully}
          markerRef={markerRef}
          setShowChangeNameInput={setShowChangeNameInput}
          setIsClickMarker={setIsClickMarker}
        />
        <OnClickMarker
          setSearchedLocation={setSearchedLocation}
          markerRef={markerRef}
          setShowChangeNameInput={setShowChangeNameInput}
          setIsClickMarker={setIsClickMarker}
        />
      </MapContainer>
    </React.Fragment>
  );
};

const PopUpDetails = styled(ColumnContainer)`
  height: auto;
  gap: ${gaps.xsmall};
`;

export default Map;
