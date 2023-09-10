import { useState, useEffect } from "react";
import {
  AWS_GET_DATA_URL,
  AWS_POST_DATA_URL,
  restaurantList,
} from "../constants";
import RestaurantCard, { withRecommendedLabel } from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { restaurants } from "./filedata";
import { useSelector } from "react-redux";

const Body = () => {
  const [searchInput, setSearchInput] = useState();
  const [searchClicked, setSearchClicked] = useState("false");
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] =
    useState(allRestaurants);
  const userInfo = useSelector((store) => store.user.user);
  const RecommendedRestaurantCard = withRecommendedLabel(RestaurantCard);
  async function getAllRestaurants() {
    // const streamData = await fetch(
    //   //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.45953&lng=72.817498&offset=47&sortBy=RELEVANCE&pageType=SEE_ALL&page_type=DESKTOP_SEE_ALL_LISTING"
    //   //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.45953&lng=72.817498&page_type=DESKTOP_WEB_LISTING"
    //   //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.1178548&lng=72.8631304&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //   "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.4559185&lng=72.7762815&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    // );
    console.log(userInfo, "userinfo");

    // const jsonData = await streamData.json();

    // console.log("jjjjSayali", jsonData.data);
    // let response = jsonData?.data?.cards.filter(
    //   (r) => r?.card?.card?.id == "restaurant_grid_listing"
    // );
    // console.log("resssss", response);
    // console.log(
    //   "jjjjSayali2222",
    //   jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle
    //     ?.restaurants
    // );
    // let newData =
    //   jsonData?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants.map(
    //     (r) => r.info
    //   );
    // console.log("neewww", newData);
    setAllRestaurants(restaurants);
    if (userInfo.uid != "") {
      const awsData = await fetch(`${AWS_GET_DATA_URL}${userInfo.uid}`);
      const awsJsonData = await awsData.json();
      if (awsJsonData.data.length > 0) {
        function compareVisitCount(a, b) {
          return b.restaurantVisitCount - a.restaurantVisitCount;
        }
        setRecommendedRestaurants(awsJsonData.data.sort(compareVisitCount));
      }
    }
    setFilteredRestaurants(restaurants);

    //console.log(jsonData?.data?.cards[2]?.data?.data?.cards.length, "hi");
  }

  const getAWSData = () => {
    fetch(`${AWS_GET_DATA_URL}649072374362997177df4879`)
      .then((res) => res.json())
      .then((data) => console.log(data, "data"));
  };

  useEffect(() => {
    getAllRestaurants();
    //postAWSData();
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
      {recommendedRestaurants.length > 0 ? (
        <div className="restaurant-list flex flex-wrap my-0 mx-20 px-9 border-b-2">
          {recommendedRestaurants.length === 0 ? (
            <h2>No recommended restaurants found</h2>
          ) : (
            (recommendedRestaurants.length >= 5
              ? recommendedRestaurants.slice(0, 4)
              : recommendedRestaurants
            ).map((restaurant) => {
              return (
                <Link
                  //style={{ textDecoration: "none" }}
                  to={"/restaurant/" + restaurant?.restaurantId}
                >
                  <RecommendedRestaurantCard
                    key={restaurant.restaurantId}
                    restaurant={restaurant}
                  />{" "}
                </Link>
              );
              //return <RestaurantCard {...restaurant.data} />;
            })
          )}
        </div>
      ) : null}
      <div className="restaurant-list pb-12 flex flex-wrap my-0 mx-20 px-9">
        {filteredRestaurants.length === 0 ? (
          <h2>No restaurants found</h2>
        ) : (
          filteredRestaurants.map((restaurant) => {
            return (
              <Link
                //style={{ textDecoration: "none" }}
                to={"/restaurant/" + restaurant?.id}
              >
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />{" "}
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
