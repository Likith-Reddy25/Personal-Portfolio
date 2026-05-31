import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Likith Reddy Goddilla — Software Developer" },
      {
        name: "description",
        content:
          "Likith Reddy Goddilla — Software Developer specializing in scalable backend systems, REST APIs and full-stack web applications.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/portfolio.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", background: "#07070b", color: "#ecebf4",
      display: "grid", placeItems: "center", fontFamily: "system-ui" }}>
      Loading portfolio…
    </div>
  );
}
