import { useDispatch } from "react-redux";
import GeneralButton from "../../GeneralComponents/GeneralButton";
import { constraintsActions } from "../../store/constraints";
import { useState, useRef, useEffect } from "react";
import { Container } from "../../GeneralComponents/Containers";
import {
  daysOfWeek,
  generateTimeArray,
} from "../../Utilities/PeriodsFunctions";

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
    <Container gap={"10px"}>
      <Container>
        <select
          value={selectedDay}
          onChange={handleDayChange}
          onKeyDown={handleKeyPress}
          ref={daySelectRef}
          style={{ height: "100%", width: "50%" }}
        >
          {daysOfWeek.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          style={{ height: "100%", width: "50%" }}
          value={selectedTime}
          onChange={handleTimeChange}
          onKeyDown={handleKeyPress}
        >
          {timesOfDay.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
      </Container>
      <GeneralButton onClick={() => setFieldVisible(false)}>X</GeneralButton>
    </Container>
  );
};
export default DayAndTimePicker;
