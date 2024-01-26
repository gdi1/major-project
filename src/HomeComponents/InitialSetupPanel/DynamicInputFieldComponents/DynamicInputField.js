import React, { useState, useRef } from "react";
import DayAndTimePicker from "./DayAndTimePicker";
import AddLocationModal from "./LocationSetup/AddLocationModal";
import InputField from "../../../GeneralComponents/InputField";
import { constraintsActions } from "../../../store/constraints";
import { useDispatch } from "react-redux";
import { RowContainer } from "../../../GeneralComponents/Containers";
import GeneralButton from "../../../GeneralComponents/GeneralButton";
import styled from "styled-components";

const updateFunctionMap = {
  teams: constraintsActions.addTeam,
  locations: constraintsActions.addLocation,
  periods: constraintsActions.addPeriod,
  weeks: constraintsActions.addWeeks,
};

const DynamicInputField = ({ type }) => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [showInputField, setShowInputField] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      dispatch(updateFunctionMap[type](inputValue));
      setInputValue("");
    }
  };

  const toggleShowInputField = () => setShowInputField((prev) => !prev);

  return (
    <InputFieldBody>
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
                style={{ width: "70%", height: "100%" }}
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
  gap: 10px;
`;

export default DynamicInputField;
