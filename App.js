import React from "react";
import ReactDOM from "react-dom/client";

const root = ReactDOM.createRoot(document.getElementById("root"));

const heading = React.createElement(
  "h1",
  {
    id: "ch1",
    className: "chn1",
    key: "h1",
  },
  "Namaste React from Sayali S"
);
console.log(heading);

//headd is a react element
const headd = (
  <h1 id="a1" key="a1">
    jsx heading and this is a react element
  </h1>
);
const heading2 = React.createElement("h2", { key: "h2" }, "Heading2");
const container = React.createElement(
  "div",
  { some: "value", key: "container" },
  [heading, heading2, headd]
);

const HeaderComponent = () => {
  //return <h1>Hi, from react header functional component</h1>;
  return (
    <div>
      <h1>header1 from react component</h1>
      <h2>header2 from react component</h2>
    </div>
  );
};
var num = 10;
const Title = () => <h3>This is title component</h3>;
const Header1Component = () => (
  <div>
    <h1>header1 from react component</h1>
    <h2>header2 from react component</h2>
    {num}

    {headd}
    {1 + 1}
    {heading}
    {heading2}
    <Title />
    {Title()}
    {console.log("console")}
  </div>
);

//root.render(heading);
//root.render([container, heading2]);
//root.render(container);
root.render(<Header1Component />);
