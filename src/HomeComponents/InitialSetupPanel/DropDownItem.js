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
import gaps from "../../style-utils/gaps";
import check_icon from "../../icons/check_icon.png";
import delete_icon from "../../icons/delete_icon.png";
import { SmallIcon } from "../../GeneralComponents/Icons";
import text_styles from "../../style-utils/text_styles";

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
            <OptionButton onClick={handleDeleteOption}>
              <SmallIcon src={delete_icon} />
            </OptionButton>
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
          <OptionButton onClick={updateOption}>
            <SmallIcon src={check_icon} />
          </OptionButton>
        </React.Fragment>
      )}
    </OptionBundle>
  );
};

const Icon = styled.img`
  width: 1vw;
  height: 1vw;
`;

const OptionBundle = styled(RowContainer)`
  gap: ${gaps.xsmall};
  box-sizing: border-box;
`;
//justify-content: end;

const OptionButton = styled(GeneralButton)``;

const Option = styled(DropdownItem)`
  font-size: ${text_styles.fonts.xsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

export default DropDownItem;
