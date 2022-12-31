import React from "react";
import ReactDOM from "react-dom/client";

const heading = React.createElement(
  "h1",
  {
    id: "ch1",
    className: "chn1",
  },
  "Namaste React from Sayali S"
);
const heading2 = React.createElement("h2", {}, "Heading2");
const container = React.createElement("div", { some: "value" }, [
  heading,
  heading2,
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(heading);
root.render([container, heading2]);
