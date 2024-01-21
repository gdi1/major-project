import { DropdownItem } from "./DropDownComponents";
import InputField from "../../GeneralComponents/InputField";
import React, { useRef, useState } from "react";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { useDispatch } from "react-redux";
import { constraintsActions } from "../../store/constraints";
import { RowContainer } from "../../GeneralComponents/Containers";
import styled from "styled-components";

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
          <Option onClick={editAttributeOption}>{option.label}</Option>
          <OptionButton onClick={handleDeleteOption}>X</OptionButton>
        </React.Fragment>
      )}
      {isEdit && (
        <React.Fragment>
          <InputField defaultValue={option.label} ref={optionInputRef} />
          <OptionButton onClick={updateOption}>✅</OptionButton>
        </React.Fragment>
      )}
    </OptionBundle>
  );
};

const OptionBundle = styled(RowContainer)`
  gap: 10px;
  justify-content: end;
`;

const OptionButton = styled(GeneralButton)`
  width: 20%;
`;

const Option = styled(DropdownItem)`
  cursor: ${(props) =>
    props.type === "teams" || props.type === "locations"
      ? "pointer"
      : "default"};
`;

export default DropDownItem;
