import { useState, useRef, useEffect } from "react";
import { RowContainer } from "../../GeneralComponents/Containers";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { Label } from "../../GeneralComponents/Labels";
import InputField from "../../GeneralComponents/InputField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownList } from "./DropDownComponents";
import DropDownItem from "./DropDownItem";
import DayAndTimePicker from "./DayAndTimePicker";
import AddLocationModal from "./LocationSetup/AddLocationModal";
import styled from "styled-components";
import borders from "../../style-utils/borders";
import paddings from "../../style-utils/paddings";

const InputSection = ({ updateFunction, title, type }) => {
  const [fieldVisible, setFieldVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const options = useSelector((state) => state.constraints[type]);
  const inputRef = useRef();
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      dispatch(updateFunction(inputValue));
      setInputValue("");
    }
  };

  const toggleShowDropDownOptions = () => {
    setShowDropdown((prev) => !prev);
    setFieldVisible(false);
  };

  useEffect(() => {
    if (fieldVisible && inputRef.current) inputRef.current.focus();
  }, [fieldVisible]);

  return (
    <React.Fragment>
      <InputSectionHeader>
        <AttributeLabel>{title}</AttributeLabel>
        <GeneralButton onClick={toggleShowDropDownOptions}>
          {showDropdown ? "Close" : "Show"}
        </GeneralButton>
      </InputSectionHeader>
      {showDropdown && (
        <DropdownList>
          {(!fieldVisible || type === "locations") && (
            <GeneralButton onClick={() => setFieldVisible(true)}>
              +
            </GeneralButton>
          )}
          {fieldVisible && type === "teams" && (
            <InputBundle>
              <InputField
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type and press Enter"
                style={{ width: "70%", height: "100%" }}
                ref={inputRef}
              />
              <InputButton onClick={() => setFieldVisible(false)}>
                X
              </InputButton>
            </InputBundle>
          )}
          {fieldVisible && type === "periods" && (
            <DayAndTimePicker setFieldVisible={setFieldVisible} />
          )}
          {fieldVisible && type === "locations" && (
            <AddLocationModal
              setIsModalOpen={setFieldVisible}
              isModalOpen={fieldVisible}
            />
          )}
          {fieldVisible && type === "weeks" && (
            <InputBundle>
              <InputField
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                ref={inputRef}
                style={{ width: "70%", height: "100%" }}
                type="number"
                placeholder="Enter no. of weeks"
              />
              <InputButton onClick={() => setFieldVisible(false)}>
                X
              </InputButton>
            </InputBundle>
          )}

          {options.map((option, idx) => (
            <DropDownItem key={idx} id={idx} option={option} type={type} />
          ))}
        </DropdownList>
      )}
    </React.Fragment>
  );
};

const AttributeLabel = styled(Label)`
  margin-bottom: 5px;
`;

const InputSectionHeader = styled(RowContainer)`
  align-items: start;
  justify-content: start;
  border: ${borders.small};
  padding: ${paddings.small};
  box-sizing: border-box;
`;

const InputBundle = styled(RowContainer)`
  gap: 10px;
`;

const InputButton = styled(GeneralButton)`
  width: 20%;
`;

export default InputSection;
