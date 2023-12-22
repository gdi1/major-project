import { useState } from "react";
import Container from "../GeneralComponents/Container";
import GeneralButton from "../GeneralComponents/GeneralButton";
import Label from "../GeneralComponents/Label";
import InputField from "../GeneralComponents/InputField";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const InputBundle = ({ updateFunction, title, type }) => {
  const [fieldVisible, setFieldVisible] = useState(false);
  const options = useSelector((state) => state.constraints[type]);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState("");
  //   const [options, setOptions] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      //   setOptions([...options, inputValue.trim()]);
      dispatch(updateFunction(inputValue));
      setInputValue("");
    }
  };

  const handleDeleteOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    // setOptions(newOptions);
  };

  return (
    <Container justifyContent={"start"} alignItems={"start"}>
      <Label>{title}</Label>
      {!fieldVisible && (
        <GeneralButton onClick={() => setFieldVisible(true)}>Add</GeneralButton>
      )}
      {fieldVisible && (
        <React.Fragment>
          <InputField
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
            placeholder="Type and press Enter"
          />
          <GeneralButton onClick={() => setFieldVisible(false)}>
            Close
          </GeneralButton>
        </React.Fragment>
      )}
    </Container>
  );
};
export default InputBundle;
