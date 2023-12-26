import { useDispatch } from "react-redux";
import GeneralButton from "../GeneralComponents/GeneralButton";
import { constraintsActions } from "../store/constraints";
import { useState, useRef, useEffect } from "react";
import Container from "../GeneralComponents/Container";

const generateTimeArray = () => {
  const timesArray = [];
  for (let hour = 0; hour < 24; hour++) {
    timesArray.push(`${hour.toString().padStart(2, "0")}:00`);
    timesArray.push(`${hour.toString().padStart(2, "0")}:30`);
  }
  return timesArray;
};

const DayAndTimePicker = ({ setFieldVisible }) => {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      dispatch(constraintsActions.addPeriod(`${selectedDay} ${selectedTime}`));
    }
  };

  useEffect(() => {
    if (daySelectRef.current) daySelectRef.current.focus();
  }, []);
  return (
    <Container>
      <select
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
      </select>
      <select
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
      <GeneralButton onClick={() => setFieldVisible(false)}>X</GeneralButton>
    </Container>
  );
};
export default DayAndTimePicker;
