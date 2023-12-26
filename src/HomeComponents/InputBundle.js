import { useState, useRef, useEffect } from "react";
import Container from "../GeneralComponents/Container";
import GeneralButton from "../GeneralComponents/GeneralButton";
import Label from "../GeneralComponents/Label";
import InputField from "../GeneralComponents/InputField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropdownList } from "./DropDownList";
import DropDownItem from "./DropDownItem";

const InputBundle = ({ updateFunction, title, type }) => {
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

  useEffect(() => {
    if (fieldVisible && inputRef.current) inputRef.current.focus();
  }, [fieldVisible]);

  return (
    <React.Fragment>
      <Container
        justifyContent={"start"}
        alignItems={"start"}
        style={{
          borderBottom: "1px solid black",
          padding: "10px",
          boxSizing: "border-box",
        }}
      >
        <Label style={{ marginRight: "5px" }}>{title}</Label>
        <GeneralButton
          onClick={() => {
            setShowDropdown((prev) => !prev);
            setFieldVisible(false);
          }}
        >
          {showDropdown ? "Close" : "Show"}
        </GeneralButton>
      </Container>
      {showDropdown && (
        <DropdownList>
          {!fieldVisible && (
            <GeneralButton onClick={() => setFieldVisible(true)}>
              +
            </GeneralButton>
          )}
          {fieldVisible && (
            <Container gap={"10px"}>
              <InputField
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                placeholder="Type and press Enter"
                style={{ width: "70%", height: "100%" }}
                ref={inputRef}
              />
              <GeneralButton
                style={{ width: "20%" }}
                onClick={() => setFieldVisible(false)}
              >
                X
              </GeneralButton>
            </Container>
          )}
          {options.map((option, idx) => (
            <Container key={idx}>
              <DropDownItem id={idx} option={option} type={type} />
            </Container>
          ))}
        </DropdownList>
      )}
    </React.Fragment>
  );
};
export default InputBundle;
