import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useEffect, useRef, useState } from "react";
import React from "react";
import SearchComponent from "./SearchComponent";
import GeneralButton from "../../../../GeneralComponents/GeneralButton";
import {
  ColumnContainer,
  RowContainer,
} from "../../../../GeneralComponents/Containers";
import { useDispatch, useSelector } from "react-redux";
import { configurationsActions } from "../../../../store/configurations";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../../../Utilities/NotificationWrapper";
import styled from "styled-components";
import InputField from "../../../../GeneralComponents/InputField";
import OnClickMarker from "./OnClickMarker";
import gaps from "../../../../style-utils/gaps";
import text_styles from "../../../../style-utils/text_styles";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import marker_icon from "../../../../icons/marker_icon.png";
import { TextWithWordBreakCSS } from "../../../../GeneralComponents/TextWithoutOverflow";

/**
 *
 * References
 *
 * “React Leaflet.” React Leaflet, n.d. https://react-leaflet.js.org/.
 *
 * Setup.” React Leaflet, n.d. https://react-leaflet.js.org/docs/start-setup/.
 *
 * “Child Components.” React Leaflet, n.d.
 * https://react-leaflet.js.org/docs/api-components/#marker.
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/programmatically-open-popup-with-react-leaflet-y12g0?file=%2Fsrc%2FApp.js.
 *
 * Codesandbox.io, n.d.
 * https://codesandbox.io/p/sandbox/elegant-feather-xgelk?file=%2Fsrc%2FSearchControl.js%3A17%2C15
 */
const Map = () => {
  const { locations } = useSelector((state) => state.configurations);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [addedSuccessfully, setAddedSuccessfully] = useState(false);
  const [showChangeNameInput, setShowChangeNameInput] = useState(false);
  const [isClickMarker, setIsClickMarker] = useState(false);

  const markerRef = useRef(null);
  const dispatch = useDispatch();
  const changeNameRef = useRef();
  console.log(searchedLocation);

  const addNewLocation = (e) => {
    e.stopPropagation();
    if (!searchedLocation.label.trim()) {
      NotificationManager.error(
        ...formatNtf("The location must have a non empty name", "Error")
      );
      return;
    }
    if (
      locations.some(
        (l) =>
          l.coordinates[0] === searchedLocation.coordinates[0] &&
          l.coordinates[1] === searchedLocation.coordinates[1]
      )
    ) {
      NotificationManager.error(
        ...formatNtf(
          "This location already exists as part of the location options!",
          "Error"
        )
      );
      return;
    }
    if (locations.some((l) => l.label === searchedLocation.label)) {
      NotificationManager.error(
        ...formatNtf("There is already a location that has this name!", "Error")
      );
      return;
    }
    dispatch(configurationsActions.addLocation(searchedLocation));
    setShowChangeNameInput(false);
    setAddedSuccessfully(true);
  };

  const onChangeName = (e) => {
    setSearchedLocation((prev) => ({ ...prev, label: e.target.value }));
  };

  const handleAddNewLocation = (e) => {
    if (e.key === "Enter" && showChangeNameInput) addNewLocation(e);
  };

  useEffect(() => {
    setAddedSuccessfully(false);
  }, [searchedLocation]);

  useEffect(() => {
    console.log("Here", changeNameRef.current);
    if (changeNameRef.current) changeNameRef.current.focus();
  }, [searchedLocation]);

  const toggleChangeName = () => {
    if (showChangeNameInput && searchedLocation.label.trim() === "") {
      NotificationManager.error(
        ...formatNtf("The location must have a name", "Error")
      );
      return;
    }
    setShowChangeNameInput((prev) => !prev);
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
                iconUrl: marker_icon,
                shadowUrl: markerShadow,
                iconSize: [41, 41],
                iconAnchor: [21, 41],
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
                {!showChangeNameInput && <Text>{searchedLocation.label}</Text>}
                {showChangeNameInput && (
                  <InputField
                    onChange={onChangeName}
                    onKeyDown={handleAddNewLocation}
                    value={searchedLocation.label}
                    placeholder={isClickMarker ? "Enter name" : ""}
                    ref={changeNameRef}
                    autoFocus={true}
                  />
                )}
                {!addedSuccessfully && (
                  <ButtonGroup>
                    {!isClickMarker && (
                      <PopUpButton onClick={toggleChangeName}>
                        {showChangeNameInput ? "Save" : "Change name"}
                      </PopUpButton>
                    )}
                    <PopUpButton onClick={addNewLocation}>Add</PopUpButton>
                  </ButtonGroup>
                )}
                {addedSuccessfully && <Text>Added successfully!</Text>}
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
          changeNameRef={changeNameRef}
        />
      </MapContainer>
    </React.Fragment>
  );
};

const Text = styled.div`
  width: 100%;
  font-family: ${text_styles.styles.fontFamily};
  font-size: ${text_styles.fonts.xsmall};
  ${TextWithWordBreakCSS};
  text-align: center;
`;

const PopUpButton = styled(GeneralButton)`
  font-size: ${text_styles.fonts.xsmall};
`;

const ButtonGroup = styled(RowContainer)`
  gap: ${gaps.xsmall};
`;

const PopUpDetails = styled(ColumnContainer)`
  height: auto;
  gap: ${gaps.xsmall};
`;

export default Map;
