import { useState } from "react";
import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";

function filterData(searchWord, restoList) {
  return restoList.filter((r) => r.data.name.includes(searchWord));
}

const Body = () => {
  //const searchTxt = "KFC";
  const [searchInput, setSearchInput] = useState();
  const [searchClicked, setSearchClicked] = useState("false");
  const [restaurants, setRestaurants] = useState(restaurantList);

  return (
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
            const filteredData = filterData(searchInput, restaurants);
            setRestaurants(filteredData);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {restaurants.map((restaurant) => {
          return (
            <RestaurantCard key={restaurant.data.id} restaurant={restaurant} />
          );
          //return <RestaurantCard {...restaurant.data} />;
        })}

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
