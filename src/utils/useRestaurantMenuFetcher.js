import { useState, useEffect } from "react";
import { FETCH_MENU_URL } from "../constants";

const useRestaurantMenuFetcher = (restaurantID) => {
  const [restaurant, setRestaurant] = useState(null);

  async function getRestaurantInfo() {
    const resData = await fetch(FETCH_MENU_URL + restaurantID);
    const jsonData = await resData.json();
    console.log(jsonData);
    setRestaurant(jsonData?.data);
  }

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  return restaurant;
};

export default useRestaurantMenuFetcher;
