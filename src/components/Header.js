import { useState } from "react";
import { Link } from "react-router-dom";

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
  return (
    <div className="header">
      {/* {appTitle} */}
      <Title />
      <div className="nav-items">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>

          <Link to="/about">
            <li>About us</li>
          </Link>

          <li>
            <Link to="/contact">Contact us</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
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
