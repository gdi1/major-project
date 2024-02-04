import { DropdownItem } from "./DropDownComponents";
import InputField from "../../GeneralComponents/InputField";
import React, { useRef, useState } from "react";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { useDispatch } from "react-redux";
import { constraintsActions } from "../../store/constraints";
import { RowContainer } from "../../GeneralComponents/Containers";
import styled from "styled-components";
import edit_icon from "./../../icons/edit_icon.png";
import { NotificationManager } from "react-notifications";

const DropDownItem = ({ id, option, type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const optionInputRef = useRef();
  const dispatch = useDispatch();

  const handleDeleteOption = () => {
    dispatch(constraintsActions.removeOption({ type, id }));
  };

  const updateOption = () => {
    const updatedOption = optionInputRef.current.value;
    if (!updatedOption) {
      NotificationManager.error("The option must not empty!");
      alert("Option must not be empty!");
      return;
    }
    dispatch(constraintsActions.updateOption({ type, updatedOption, id }));
    setIsEdit(false);
  };

  const editAttributeOption = () => {
    if (type === "teams" || type === "locations") setIsEdit(true);
  };
  return (
    <OptionBundle>
      {!isEdit && (
        <React.Fragment>
          <Option>{option.label}</Option>
          {(type === "teams" || type === "locations") && (
            <OptionButton onClick={editAttributeOption}>
              <Icon src={edit_icon} />
            </OptionButton>
          )}
          {type !== "weeks" && (
            <OptionButton onClick={handleDeleteOption}>X</OptionButton>
          )}
        </React.Fragment>
      )}
      {isEdit && (
        <React.Fragment>
          <InputField
            style={{ boxSizing: "border-box", height: "100%" }}
            defaultValue={option.label}
            ref={optionInputRef}
          />
          <OptionButton onClick={updateOption}>✅</OptionButton>
        </React.Fragment>
      )}
    </OptionBundle>
  );
};

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

const OptionBundle = styled(RowContainer)`
  gap: 10px;
  justify-content: end;
  box-sizing: border-box;
`;

const OptionButton = styled(GeneralButton)``;

const Option = styled(DropdownItem)`
  cursor: ${(props) =>
    props.type === "teams" || props.type === "locations"
      ? "pointer"
      : "default"};
`;

export default DropDownItem;
