import { DropdownItem } from "./DropDownComponents";
import InputField from "../../GeneralComponents/InputField";
import React, { useEffect, useRef, useState } from "react";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { useDispatch, useSelector } from "react-redux";
import { configurationsActions } from "../../store/configurations";
import { RowContainer } from "../../GeneralComponents/Containers";
import styled from "styled-components";
import edit_icon from "./../../icons/edit_icon.png";
import { NotificationManager } from "react-notifications";
import gaps from "../../style-utils/gaps";
import check_icon from "../../icons/check_icon.png";
import delete_icon from "../../icons/delete_icon.png";
import { SmallIcon } from "../../GeneralComponents/Icons";
import text_styles from "../../style-utils/text_styles";
import { formatNtf } from "../../Utilities/NotificationWrapper";
import { TooltipText } from "../../GeneralComponents/TooltipText";

const DropDownItem = ({ id, option, type }) => {
  const [isEdit, setIsEdit] = useState(false);
  const optionInputRef = useRef();
  const dispatch = useDispatch();
  const options = useSelector((state) => state.configurations[type]);
  // const { outdatedConstraints } = useSelector((state) => state.configurations);

  const handleDeleteOption = () => {
    dispatch(configurationsActions.removeOption({ type, id }));
  };

  const updateOption = () => {
    const updatedOption = optionInputRef.current.value.trim();
    if (!updatedOption) {
      NotificationManager.error(
        ...formatNtf("The option must not empty!", "Error")
      );
      return;
    }
    if (
      options.some(
        (op) => op.label === updatedOption && op.label !== option.label
      )
    ) {
      NotificationManager.error(
        ...formatNtf(
          `There is already a ${type.substring(
            0,
            type.length - 1
          )} with this name!`,
          "Error"
        )
      );
      return;
    }
    dispatch(configurationsActions.updateOption({ type, updatedOption, id }));
    setIsEdit(false);
  };

  const editAttributeOption = () => {
    if (type === "teams" || type === "locations") setIsEdit(true);
  };

  useEffect(() => {
    if (isEdit) optionInputRef.current.focus();
  }, [isEdit]);

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") updateOption();
  };

  return (
    <OptionBundle>
      {!isEdit && (
        <React.Fragment>
          <Option>{option.label}</Option>
          {(type === "teams" || type === "locations") && (
            <OptionButton onClick={editAttributeOption}>
              <SmallIcon src={edit_icon} />
              <TooltipText>Edit</TooltipText>
            </OptionButton>
          )}
          {type !== "weeks" && (
            <OptionButton onClick={handleDeleteOption}>
              <SmallIcon src={delete_icon} />
              <TooltipText>Delete</TooltipText>
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
            onKeyDown={handleInputKeyDown}
          />
          <OptionButton onClick={updateOption}>
            <SmallIcon src={check_icon} />
            <TooltipText>Save</TooltipText>
          </OptionButton>
        </React.Fragment>
      )}
    </OptionBundle>
  );
};

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
