import { useDispatch, useSelector } from "react-redux";
import GeneralButton from "../../../GeneralComponents/GeneralButton";
import { configurationsActions } from "../../../store/configurations";
import { useState, useRef, useEffect } from "react";
import { RowContainer } from "../../../GeneralComponents/Containers";
import { weekdays, generateTimes } from "../../../Utilities/PeriodsFunctions";
import styled from "styled-components";
import { NotificationManager } from "react-notifications";
import { formatNtf } from "../../../Utilities/NotificationWrapper";
import text_styles from "../../../style-utils/text_styles";
import { SmallIcon } from "../../../GeneralComponents/Icons";
import check_icon from "../../../icons/check_icon.png";
import React from "react";
import { TooltipText } from "../../../GeneralComponents/TooltipText";

const DayAndTimePicker = () => {
  const { periods } = useSelector((state) => state.configurations);
  const times = generateTimes();
  const daySelectRef = useRef();
  const dispatch = useDispatch();

  const [day, setDay] = useState("Mon");
  const [time, setTime] = useState("12:00");

  const changeDay = (e) => {
    setDay(e.target.value);
  };

  const changeTime = (e) => {
    setTime(e.target.value);
  };

  const addNewPeriod = () => {
    const newPeriod = `${day} ${time}`;
    if (periods.some((period) => period.label === newPeriod)) {
      NotificationManager.error(
        ...formatNtf("This period has already been selected.", "Error")
      );
      return;
    }
    dispatch(configurationsActions.addPeriod(newPeriod));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addNewPeriod();
  };

  useEffect(() => {
    if (daySelectRef.current) daySelectRef.current.focus();
  }, []);
  return (
    <React.Fragment>
      <DateSelectionBody>
        <DateSelect
          value={day}
          onChange={changeDay}
          onKeyDown={handleKeyPress}
          ref={daySelectRef}
        >
          {weekdays.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </DateSelect>
        <DateSelect
          value={time}
          onChange={changeTime}
          onKeyDown={handleKeyPress}
        >
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </DateSelect>
      </DateSelectionBody>
      <GeneralButton onClick={addNewPeriod}>
        <SmallIcon src={check_icon} />
        <TooltipText>Save</TooltipText>
      </GeneralButton>
    </React.Fragment>
  );
};

const DateSelect = styled.select`
  height: 100%;
  width: 50%;
  font-size: ${text_styles.fonts.xxsmall};
  font-family: ${text_styles.styles.fontFamily};
`;

const DateSelectionBody = styled(RowContainer)`
  gap: 10px;
`;
export default DayAndTimePicker;
