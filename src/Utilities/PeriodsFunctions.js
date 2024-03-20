export const generateTimes = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    const hour = i < 10 ? `0${i}` : `${i}`;
    times.push(`${hour}:00`);
    times.push(`${hour}:30`);
  }
  return times;
};

export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const mapDayToIndex = {
  Mon: "1",
  Tue: "2",
  Wed: "3",
  Thu: "4",
  Fri: "5",
  Sat: "6",
  Sun: "7",
};

export const sortPeriodsPair = ({ label: p1 }, { label: p2 }) => {
  p1 = mapDayToIndex[p1.substring(0, 3)] + p1.substring(4, 6) + p1.substring(7);
  p2 = mapDayToIndex[p2.substring(0, 3)] + p2.substring(4, 6) + p2.substring(7);
  return p1 - p2;
};

export const sortPeriods = (periods) => periods.sort(sortPeriodsPair);
