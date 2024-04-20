export function TimeAside() {
  const hours = Array(25)
    .fill("")
    .map((_, i) => `${i > 9 ? i : `0${i}`}:00`);

  return (
    <ul className="bg-neutral-100 flex flex-col w-full">
      {hours.map((hour, i) => (
        <li key={i} className="text-end [height:_100px] pr-1">
          {hour}
        </li>
      ))}
    </ul>
  );
}
