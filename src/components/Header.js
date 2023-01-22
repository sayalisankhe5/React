import { useState } from "react";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";

const Title = () => {
  return (
    <img
      alt="Foodista"
      style={{ height: "100%" }}
      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStM2R-rQelW8r208neDHWDITYKee5beT2-fw&usqp=CAU"
      //src="https://cdn.octopix.in/uploads/company-logo/2020/11/19/food-villa-pSJVhwoN8KxgwV9jtuB1MlosJ0ejoKfiBiVO1jJPLM61shyarbxVvjIFy3DVpbUML8eBxcUo7BOWXQcd-350x350.jpg"
    />
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();
  return (
    <div className="header">
      {/* {appTitle} */}
      <Title />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/about">About us </Link>
          </li>

          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>Cart</li>
          <li>
            <Link to="/instamart">InstaMart</Link>
          </li>
        </ul>
      </div>
      <h1>{isOnline ? <span>&#128994;</span> : <span>&#128308;</span>}</h1>
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
