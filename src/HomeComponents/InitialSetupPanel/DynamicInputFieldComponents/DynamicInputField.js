import React, { useState, useRef } from "react";
import DayAndTimePicker from "./DayAndTimePicker";
import AddLocationModal from "./LocationSetup/AddLocationModal";
import InputField from "../../../GeneralComponents/InputField";
import { constraintsActions } from "../../../store/constraints";
import { useDispatch, useSelector } from "react-redux";
import { RowContainer } from "../../../GeneralComponents/Containers";
import GeneralButton from "../../../GeneralComponents/GeneralButton";
import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../../Utilities/NotificationWrapper";
import gaps from "../../../style-utils/gaps";
import { SmallIcon } from "../../../GeneralComponents/Icons";
import check_icon from "../../../icons/check_icon.png";

const updateFunctionMap = {
  teams: constraintsActions.addTeam,
  locations: constraintsActions.addLocation,
  periods: constraintsActions.addPeriod,
  weeks: constraintsActions.addWeeks,
};

const DynamicInputField = ({ type }) => {
  const { teams } = useSelector((state) => state.constraints);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [showInputField, setShowInputField] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewOption = () => {
    if (
      type === "teams" &&
      teams.some((team) => team.label === inputValue.trim())
    ) {
      NotificationManager.error(
        ...formatNtf("There is already a team with this name!", "Error")
      );
      return;
    }
    if (!inputValue.trim()) {
      NotificationManager.error(
        ...formatNtf("Teams must have a name!", "Error")
      );
      return;
    }
    dispatch(updateFunctionMap[type](inputValue));
    setInputValue("");
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") addNewOption();
  };

  const toggleShowInputField = () => setShowInputField((prev) => !prev);

  return (
    <InputFieldBody showInputField={showInputField}>
      {!showInputField && (
        <GeneralButton onClick={toggleShowInputField} style={{ width: "100%" }}>
          +
        </GeneralButton>
      )}
      {showInputField && (
        <React.Fragment>
          {type === "teams" && (
            <React.Fragment>
              <InputField
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type and press Enter"
                style={{ width: "70%", height: "100%" }}
                ref={inputRef}
              />
              <GeneralButton onClick={addNewOption}>
                <SmallIcon src={check_icon} />
              </GeneralButton>
              <GeneralButton onClick={toggleShowInputField}>X</GeneralButton>
            </React.Fragment>
          )}
          {type === "locations" && (
            <AddLocationModal
              setIsModalOpen={setShowInputField}
              isModalOpen={showInputField}
            />
          )}
          {type === "periods" && (
            <React.Fragment>
              <DayAndTimePicker setFieldVisible={setShowInputField} />
              <GeneralButton onClick={toggleShowInputField}>X</GeneralButton>
            </React.Fragment>
          )}
          {type === "weeks" && (
            <React.Fragment>
              <InputField
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                ref={inputRef}
                style={{ width: "50%", height: "100%" }}
                type="number"
                placeholder="Enter no. of weeks"
              />
              <GeneralButton onClick={toggleShowInputField}>X</GeneralButton>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </InputFieldBody>
  );
};

const InputFieldBody = styled(RowContainer)`
  gap: ${gaps.small};
  width: ${(props) => (props.showInputField ? "15vw" : "10vw")};
`;

export default DynamicInputField;
