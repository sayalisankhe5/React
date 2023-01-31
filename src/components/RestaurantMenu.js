import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import useRestaurantMenuFetcher from "../utils/useRestaurantMenuFetcher";
import Shimmer from "./Shimmer";
//import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const params = useParams();
  // const {id} = params;
  // const {id} = useParams();
  console.log(params);
  //const [restaurant, setRestaurant] = useState({});
  //const [restaurant, setRestaurant] = useState(null);

  const restaurant = useRestaurantMenuFetcher(params.id);

  return !restaurant ? (
    <Shimmer />
  ) : (
    <>
      <div className="menu-banner">
        <img src={IMG_CDN_URL + restaurant.cloudinaryImageId} />
        <h1>Restaurant Id : {restaurant.id}</h1>
        <h2>Restaurant name : {restaurant.name}</h2>
        <h2>Restaurant address : {restaurant.area}</h2>
        <h3>Restaurant cuisines : {restaurant.cuisines?.join(", ")}</h3>
      </div>
      <div>
        <h1>Menu Items:</h1>
        <ul>
          {Object.values(restaurant?.menu?.items).map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ul>
      </div>
    </>
  );
};

export default RestaurantMenu;
