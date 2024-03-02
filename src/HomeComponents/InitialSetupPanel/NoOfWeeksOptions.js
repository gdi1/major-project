import styled, { keyframes } from "styled-components";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import InputField from "../../GeneralComponents/InputField";
import edit_icon from "./../../icons/edit_icon.png";
import check_icon from "./../../icons/check_icon.png";
import { RowContainer } from "../../GeneralComponents/Containers";
import { Label } from "../../GeneralComponents/Labels";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constraintsActions } from "../../store/constraints";
import text_styles from "../../style-utils/text_styles";
import { SmallIcon } from "../../GeneralComponents/Icons";
import { TooltipText } from "../../GeneralComponents/TooltipText";

const NoOfWeeksOptions = () => {
  const { weeks } = useSelector((state) => state.constraints);
  const [isEdit, setIsEdit] = useState(weeks.length === 0);
  const [noOFWeeks, setNoOfWeeks] = useState(weeks.length);
  const noOfWeeksRef = useRef();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.value < 0) return;
    setNoOfWeeks(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") {
      setIsEdit(false);
      dispatch(constraintsActions.addWeeks(noOFWeeks));
    }
  };

  useEffect(() => {
    if (isEdit) noOfWeeksRef.current.focus();
  }, [isEdit]);

  return (
    <WeeksDetailsBody>
      <SmallerLabel>Number of weeks:</SmallerLabel>
      {isEdit && (
        <InputField
          defaultValue={weeks.length}
          type="number"
          value={noOFWeeks}
          ref={noOfWeeksRef}
          onKeyDown={handleInputKeyDown}
          onChange={handleChange}
          style={{ width: "5vw" }}
        />
      )}
      {!isEdit && <SmallerLabel>{weeks.length}</SmallerLabel>}
      <GeneralButton
        onClick={() => {
          if (!isEdit) setIsEdit(true);
          else {
            setIsEdit(false);
            dispatch(constraintsActions.addWeeks(noOFWeeks));
          }
        }}
      >
        <SmallIcon src={isEdit ? check_icon : edit_icon} />
        <TooltipText>{isEdit ? "Save" : "Edit"}</TooltipText>
      </GeneralButton>
      {/* {isEdit && (
        <GeneralButton
          onClick={() => {
            setIsEdit(false);
            setNoOfWeeks(weeks.length);
          }}
        >
          X
        </GeneralButton>
      )} */}
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

const SmallerLabel = styled(Label)`
  width: auto;
  fontsize: ${text_styles.fonts.small};
`;

const WeeksDetailsBody = styled(RowContainer)`
  animation: ${fadeIn} 0.3s ease-in-out;
  justify-content: start;
  gap: 1vw;
`;

export default NoOfWeeksOptions;
