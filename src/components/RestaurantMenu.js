import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import Shimmer from "./Shimmer";
//import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const params = useParams();
  // const {id} = params;
  // const {id} = useParams();
  console.log(params);
  //const [restaurant, setRestaurant] = useState({});
  const [restaurant, setRestaurant] = useState(null);

  async function getRestaurantInfo() {
    const resData = await fetch(
      "https://www.swiggy.com/dapi/menu/v4/full?lat=19.45953&lng=72.817498&menuId=" +
        params.id
    );
    const jsonData = await resData.json();
    console.log(jsonData);
    setRestaurant(jsonData?.data);
  }

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return !restaurant ? (
    <Shimmer />
  ) : (
    <>
      <div>
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
