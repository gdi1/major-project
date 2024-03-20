import styled from "styled-components";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import InputField from "../../GeneralComponents/InputField";
import edit_icon from "./../../icons/edit_icon.png";
import check_icon from "./../../icons/check_icon.png";
import { RowContainer } from "../../GeneralComponents/Containers";
import { Label } from "../../GeneralComponents/Labels";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configurationsActions } from "../../store/configurations";
import text_styles from "../../style-utils/text_styles";
import { SmallIcon } from "../../GeneralComponents/Icons";
import { TooltipText } from "../../GeneralComponents/TooltipText";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../Utilities/NotificationWrapper";
import { fadeIn } from "../../GeneralComponents/animations";

const NoOfWeeksOptions = () => {
  const { weeks } = useSelector((state) => state.configurations);
  const [isEdit, setIsEdit] = useState(weeks.length === 0);
  const [noOfWeeks, setNoOfWeeks] = useState(weeks.length);
  const noOfWeeksRef = useRef();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    let sanitizedValue = e.target.value.replace(/\D/g, "");
    setNoOfWeeks(sanitizedValue);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") toggleButton();
  };

  const toggleButton = () => {
    if (!isEdit) setIsEdit(true);
    else {
      if (noOfWeeks === "" || parseInt(noOfWeeks) === 0) {
        NotificationManager.error(
          ...formatNtf("The number of weeks must be positive!", "Error")
        );
        return;
      }
      setIsEdit(false);
      dispatch(configurationsActions.addWeeks(parseInt(noOfWeeks)));
    }
  };

  return (
    <WeeksDetailsBody>
      <SmallerLabel>Number of weeks:</SmallerLabel>
      {isEdit && (
        <InputField
          defaultValue={weeks.length}
          type="number"
          value={noOfWeeks}
          ref={noOfWeeksRef}
          onKeyDown={handleInputKeyDown}
          onChange={handleChange}
          autoFocus={true}
          style={{ width: "5vw" }}
        />
      )}
      {!isEdit && <SmallerLabel>{weeks.length}</SmallerLabel>}
      <GeneralButton onClick={toggleButton}>
        <SmallIcon src={isEdit ? check_icon : edit_icon} />
        <TooltipText>{isEdit ? "Save" : "Edit"}</TooltipText>
      </GeneralButton>
    </WeeksDetailsBody>
  );
};

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
