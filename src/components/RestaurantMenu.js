import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { addItem } from "../utils/cartSlice";
import useRestaurantMenuFetcher from "../utils/useRestaurantMenuFetcher";
import Shimmer from "./Shimmer";
//import Shimmer from "./Shimmer";

const RestaurantMenu = () => {
  const params = useParams();
  const dispatch = useDispatch();
  // const {id} = params;
  // const {id} = useParams();
  console.log(params);
  //const [restaurant, setRestaurant] = useState({});
  //const [restaurant, setRestaurant] = useState(null);
  const handleClick = () => {
    dispatch(addItem(["momo"]));
  };

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };
  const restaurant = useRestaurantMenuFetcher(params.id);
  // if (restaurant) {
  //   let priceValue = restaurant?.costForTwo.toString();
  //   priceValue = priceValue.slice(0, -2);
  // }

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="flex h-60 bg-black px-32">
        <img
          className="h-40 w-64 my-10 mr-5"
          src={IMG_CDN_URL + restaurant.cloudinaryImageId}
        />
        <div className="h-40 my-10 text-white	">
          {/* <h1>Restaurant Id : {restaurant.id}</h1> */}
          <h2 className="max-w-lg	font-normal text-3xl">{restaurant.name}</h2>
          <h3 className="text-sm font-light text-gray-400	 mt-2">
            {restaurant.cuisines?.join(", ")}
          </h3>
          <h2 className="text-sm font-light text-gray-400	 mt-3">
            {restaurant.area}
          </h2>
          <div className="mt- mt-6">
            <div className="pl-0 pr-9 inline-block">
              <div className=" text-white">
                {restaurant.avgRating}
                <span> &#9733;</span>
              </div>
              <div className=" text-gray-400">
                {restaurant.totalRatingsString}
              </div>
            </div>
            <div className="pl-9 pr-9 inline-block">
              <div className=" text-white">
                {restaurant.sla?.deliveryTime} mins
                {/* <span> &#9733;</span> */}
              </div>
              <div className=" text-gray-400">Delivery Time</div>
            </div>
            <div className="pl-9 pr-0 inline-block">
              <div className=" text-white">
                {/* <span> &#8377;</span> */}
                {restaurant?.costForTwoMsg.slice(0, 4)}
              </div>
              <div className=" text-gray-400">Cost for two</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1>Menu Items:</h1>
        <ul>
          {Object.values(restaurant?.menu?.items).map((item) => {
            return (
              <div key={item.id} className="flex align-middle	 border-b-2	w-1/2">
                <div className="flex flex-col w-96 ">
                  {/* <li key={item.id}>{item.name} - </li> */}
                  <div className=" font-semibold">{item.name}</div>
                  <div className="flex flex-row	">
                    <span> &#8377;</span>
                    <div>{item.price.toString().slice(0, -2)}</div>
                  </div>
                  <div className="text-stone-400 whitespace-normal		">
                    {item.description}
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      addFoodItem(item);
                    }}
                    className="p-1 bg-orange-400 border"
                  >
                    Add
                  </button>
                </div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
