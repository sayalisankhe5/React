import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useContext } from "react";
import UserContext from "../utils/UserContext";

const Title = () => {
  return (
    <img
      alt="Foodista"
      //style={{ height: "100%" }}
      className="h-full"
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM2R-rQelW8r208neDHWDITYKee5beT2-fw&usqp=CAU"
      //src="https://cdn.octopix.in/uploads/company-logo/2020/11/19/food-villa-pSJVhwoN8KxgwV9jtuB1MlosJ0ejoKfiBiVO1jJPLM61shyarbxVvjIFy3DVpbUML8eBxcUo7BOWXQcd-350x350.jpg"
    />
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();

  const userObj = useContext(UserContext);

  return (
    // <div className="header">
    <div className=" border border-black flex h-20 justify-between my-2 mx-20 px-1">
      {/* {appTitle} */}
      <Title />
      <div className="nav-items">
        <ul className="flex py-10">
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>

          <li className="px-2">
            <Link to="/about">About us </Link>
          </li>

          <li className="px-2">
            <Link to="/contact">Contact us</Link>
          </li>
          <li className="px-2">Cart</li>
          <li className="px-2">
            <Link to="/instamart">InstaMart</Link>
          </li>
        </ul>
      </div>
      <h1>{isOnline ? <span>&#128994;</span> : <span>&#128308;</span>}</h1>
      <span className="font-bold p-10">{userObj?.user.name}</span>
      {isLoggedIn ? (
        <button
          onClick={() => {
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>
      ) : (
        <button
          onClick={() => {
            setIsLoggedIn(true);
          }}
        >
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
