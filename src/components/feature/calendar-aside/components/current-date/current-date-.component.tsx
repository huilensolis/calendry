export function CurrentDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <span className="font-bold">
      {months[new Date().getMonth()]} {new Date().getFullYear()}
    </span>
  );
}
