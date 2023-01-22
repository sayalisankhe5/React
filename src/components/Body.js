import { useState, useEffect } from "react";
import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";

function filterData(searchWord, restoList) {
  return restoList.filter((r) =>
    r.data.name.toLowerCase().includes(searchWord.toLowerCase())
  );
}

const Body = () => {
  //const searchTxt = "KFC";
  const [searchInput, setSearchInput] = useState();
  const [searchClicked, setSearchClicked] = useState("false");

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);

  async function getAllRestaurants() {
    const streamData = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.45953&lng=72.817498&page_type=DESKTOP_WEB_LISTING"
    );
    const jsonData = await streamData.json();
    console.log("j", jsonData.data);
    setAllRestaurants(jsonData?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(jsonData?.data?.cards[2]?.data?.data?.cards);
    console.log(jsonData?.data?.cards[2]?.data?.data?.cards.length, "hi");
  }

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return allRestaurants.length === 0 ? (
    // <h2>Wait it is loading</h2>
    <Shimmer />
  ) : (
    <>
      {console.log(searchClicked)}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="search-btn"
          onClick={() => {
            if (searchClicked === "true") {
              setSearchClicked("false");
            } else {
              setSearchClicked("true");
            }
            const filteredData = filterData(searchInput, allRestaurants);
            setFilteredRestaurants(filteredData);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.length === 0 ? (
          <h2>No restaurants found</h2>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                style={{ textDecoration: "none" }}
                to={"/restaurant/" + restaurant?.data?.id}
              >
                <RestaurantCard
                  key={restaurant.data.id}
                  restaurant={restaurant}
                />{" "}
              </Link>
            );
            //return <RestaurantCard {...restaurant.data} />;
          })
        )}

        {/* <RestaurantCard restaurant={restaurantList[0]} />
        <RestaurantCard restaurant={restaurantList[1]} />
        <RestaurantCard restaurant={restaurantList[2]} />
        <RestaurantCard restaurant={restaurantList[3]} /> */}
        {/* <RestaurantCard {...restaurantList[0].data} /> */}
      </div>
    </>
  );
};

export default Body;
