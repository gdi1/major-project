import { useDispatch } from "react-redux";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { constraintsActions } from "../../store/constraints";
import { useState, useRef, useEffect } from "react";
import { Container, RowContainer } from "../../GeneralComponents/Containers";
import {
  daysOfWeek,
  generateTimeArray,
} from "../../Utilities/PeriodsFunctions";
import styled from "styled-components";

const DayAndTimePicker = ({ setFieldVisible }) => {
  const timesOfDay = generateTimeArray();
  const daySelectRef = useRef();
  const dispatch = useDispatch();

  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedTime, setSelectedTime] = useState("12:00");

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  const addNewPeriod = () => {
    dispatch(constraintsActions.addPeriod(`${selectedDay} ${selectedTime}`));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addNewPeriod();
  };

  useEffect(() => {
    if (daySelectRef.current) daySelectRef.current.focus();
  }, []);
  return (
    <DateSelectionBody>
      <Container>
        <DateSelect
          value={selectedDay}
          onChange={handleDayChange}
          onKeyDown={handleKeyPress}
          ref={daySelectRef}
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </DateSelect>
        <DateSelect
          value={selectedTime}
          onChange={handleTimeChange}
          onKeyDown={handleKeyPress}
        >
          {timesOfDay.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </DateSelect>
      </Container>
      <GeneralButton onClick={() => setFieldVisible(false)}>X</GeneralButton>
    </DateSelectionBody>
  );
};

const DateSelect = styled.select`
  height: 100%;
  width: 50%;
`;

const DateSelectionBody = styled(RowContainer)`
  gap: 10px;
`;
export default DayAndTimePicker;
