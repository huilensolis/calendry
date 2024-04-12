export const ORIGIN =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_ORIGIN
    : "http://localhost:3000";
