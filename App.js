const heading = React.createElement(
  "h1",
  {
    id: "ch1",
    className: "chn1",
  },
  "Namaste React from SS"
);
const heading2 = React.createElement("h2", {}, "Heading2");
const container = React.createElement("div", {}, [heading, heading2]);
const root = ReactDOM.createRoot(document.getElementById("root"));
//root.render(heading);
root.render([container, heading2]);
