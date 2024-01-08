import { DropdownItem } from "./DropDownComponents";
import InputField from "../../GeneralComponents/InputField";
import React, { useRef, useState } from "react";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { useDispatch } from "react-redux";
import { constraintsActions } from "../../store/constraints";
import { Container } from "../../GeneralComponents/Containers";

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
  return (
    <Container gap="10px" justifyContent="end">
      {!isEdit && (
        <DropdownItem
          onClick={() => {
            if (type === "teams" || type === "locations") setIsEdit(true);
          }}
          style={{
            cursor:
              type === "teams" || type === "locations" ? "pointer" : "default",
          }}
        >
          {option.label}
        </DropdownItem>
      )}
      {!isEdit && (
        <GeneralButton style={{ width: "20%" }} onClick={handleDeleteOption}>
          X
        </GeneralButton>
      )}
      {isEdit && (
        <InputField defaultValue={option.label} ref={optionInputRef} />
      )}
      {isEdit && (
        <GeneralButton style={{ width: "20%" }} onClick={updateOption}>
          ✅
        </GeneralButton>
      )}
    </Container>
  );
};

export default DropDownItem;
