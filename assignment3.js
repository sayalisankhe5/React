import ReactDOM from "react-dom/client";
import SSlogo from "./logo.jpg";
import { FaUser } from "react-icons/fa";
const root = ReactDOM.createRoot(document.getElementById("root"));

/**
 * ASSIGNMENT 3
 *
 */

// Create a nested header element using react.createelement inside div with class =title

/*const headingOne = React.createElement("h1", {}, "This is heading One");
const headingTwo = React.createElement("h2", {}, "This is heading 2");
const headingThree = React.createElement("h3", {}, "This is heading 3");

const divContainer = React.createElement("div", { className: "title" }, [
  headingOne,
  headingTwo,
  headingThree,
]);
root.render(divContainer); */

// Create same elements using JSX

/*const headingOne = <h1>This is heading One</h1>;
const headingTwo = <h2>This is heading Two</h2>;
const headingThree = <h3>This is heading 3</h3>;

const divContainer = (
  <div>
    {headingOne}
    {headingTwo}
    {headingThree}
  </div>
);
root.render(divContainer);*/

// Create same using functional components
// Pass attributes into the tag in JSX
//Composition of components
/*const HeadingOne = () => {
  return (
    <h1 id="h1" className="h1Class">
      This is heading One
    </h1>
  );
};

const HeadingTwo = () => {
  return <h2>This is heading Two from functional component</h2>;
};

const HeadingThree = () => {
  return <h3>This is heading 3</h3>;
};

const DivContainer = () => {
  return (
    <div>
      <HeadingOne />
      <HeadingTwo></HeadingTwo>
      {HeadingThree()}
    </div>
  );
};

root.render(<DivContainer />); */

//Create a header component from scratch using logo,search bar, user icon and add css

const Logo = () => {
  return <img src={SSlogo} width="75rem"></img>;
};

const SearchBar = () => {
  return (
    <input
      className="searchbar"
      type="search"
      placeholder="Search here"
    ></input>
  );
};

const UserIcon = () => {
  return <FaUser style={{ width: "2rem", height: "5rem" }} />;
};

const HeaderNavComponent = () => {
  return (
    <div className="divContainer">
      <Logo />
      <SearchBar />
      <UserIcon />
    </div>
  );
};

root.render(<HeaderNavComponent />);
