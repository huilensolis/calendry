export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full flex max-h-screen">{children}</div>;
}
