import { useState, useEffect } from "react";
import { restaurantList } from "../constants";
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [searchInput, setSearchInput] = useState();
  const [searchClicked, setSearchClicked] = useState("false");

  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);

  async function getAllRestaurants() {
    const streamData = await fetch(
      //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.45953&lng=72.817498&offset=47&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING"
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

  const online = useOnline();

  if (!online) {
    return <h1>You are offline, please check your internet connection</h1>;
  }

  return allRestaurants.length === 0 ? (
    // <h2>Wait it is loading</h2>
    <Shimmer />
  ) : (
    <>
      {console.log(searchClicked)}
      <div className="search-container  mt-7 mr-20 mb-7 ml-20 px-14">
        <input
          //style={{ width: "20%", padding: "5px", borderRadius: "10px" }}
          type="text"
          className="border px-1 py-1 w-72 rounded-lg border-black"
          placeholder="Find your favorite restaurant here.."
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          //style={{ padding: "5px", borderRadius: "10px" }}
          className="px-1 py-1 mx-1 rounded-lg bg-orange-400	"
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
      <div className="restaurant-list pb-12 flex flex-wrap my-0 mx-20 px-9">
        {filteredRestaurants.length === 0 ? (
          <h2>No restaurants found</h2>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                //style={{ textDecoration: "none" }}
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
