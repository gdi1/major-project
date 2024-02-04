import styled, { keyframes } from "styled-components";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import InputField from "../../GeneralComponents/InputField";
import edit_icon from "./../../icons/edit_icon.png";
import check_icon from "./../../icons/check_icon.png";
import { RowContainer } from "../../GeneralComponents/Containers";
import { Label } from "../../GeneralComponents/Labels";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constraintsActions } from "../../store/constraints";

const NoOfWeeksOptions = () => {
  const { weeks } = useSelector((state) => state.constraints);
  const [isEdit, setIsEdit] = useState(weeks.length === 0);
  const [noOFWeeks, setNoOfWeeks] = useState(weeks.length);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value < 0) return;
    setNoOfWeeks(e.target.value);
  };
  return (
    <WeeksDetailsBody>
      <Label style={{ width: "auto" }}>Number of weeks:</Label>
      {isEdit && (
        <InputField
          defaultValue={weeks.length}
          type="number"
          value={noOFWeeks}
          onChange={handleChange}
        />
      )}
      {!isEdit && <Label style={{ width: "auto" }}>{weeks.length}</Label>}
      <GeneralButton
        onClick={() => {
          if (!isEdit) setIsEdit(true);
          else {
            setIsEdit(false);
            dispatch(constraintsActions.addWeeks(noOFWeeks));
          }
        }}
      >
        <Icon src={isEdit ? check_icon : edit_icon} />
      </GeneralButton>
      {isEdit && (
        <GeneralButton
          onClick={() => {
            setIsEdit(false);
            setNoOfWeeks(weeks.length);
          }}
        >
          X
        </GeneralButton>
      )}
    </WeeksDetailsBody>
  );
};

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const WeeksDetailsBody = styled(RowContainer)`
  animation: ${fadeIn} 0.3s ease-in-out;
  justify-content: start;
  gap: 20px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
export default NoOfWeeksOptions;
