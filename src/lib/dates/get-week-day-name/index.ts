export function getWeekDayName({ date }: { date: Date }) {
  const namesOfDaysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  let dayOfWeek = date.getDay() - 1;
  if (dayOfWeek < 0) {
    dayOfWeek = 6;
  }

  return namesOfDaysOfWeek[dayOfWeek];
}
