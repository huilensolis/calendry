type TProps = {
  title?: string;
};

export function EventBlock({ title }: TProps) {
  return (
    <article className="w-full h-full bg-purple-500">
      {title && <h1>{title}</h1>}
    </article>
  );
}
