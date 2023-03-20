import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
import { MENU_IMG_CDN_URL } from "../constants";

import { addItem } from "../utils/cartSlice";
import useRestaurantMenuFetcher from "../utils/useRestaurantMenuFetcher";
import Shimmer from "./Shimmer";
import NoImageAvailable from "../NoImageAvailable.jpg";
import { filterMenuData } from "../utils/helper";
//import Shimmer from "./Shimmer";

const RestaurantMenuNew = () => {
  const [filteredData, setFilteredData] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();

  const addFoodItem = (item) => {
    dispatch(addItem(item));
  };

  const restaurant = useRestaurantMenuFetcher(params.id);

  var categories = [];
  const getUniqueCategories = (data, propertyName) => {
    let newValues = data?.map((eachItem) => {
      return eachItem[propertyName];
    });
    return ["All", ...new Set(newValues)];
  };

  let newMenuData = [];

  if (restaurant) {
    let allMenuData =
      restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(
        (item) => item
      );
    for (let i = 0; i < allMenuData.length; i++) {
      if (allMenuData[i].card?.card?.itemCards != undefined) {
        for (let j = 0; j < allMenuData[i].card?.card?.itemCards.length; j++) {
          newMenuData.push(allMenuData[i].card?.card?.itemCards[j].card.info);
        }
      }
    }

    newMenuData = newMenuData.filter((item) => item != undefined);
    console.log("nmd", newMenuData);

    let uniqueIds = [...new Set(newMenuData.map((i) => i.id))];
    console.log("unn", uniqueIds);
    let finalDataArray = uniqueIds.map((id) =>
      newMenuData.find((item) => item.id == id)
    );
    console.log("final", finalDataArray);
    newMenuData = [...finalDataArray];
    categories = getUniqueCategories(newMenuData, "category");
  }

  const categoriesFilter = (categoryName) => {
    let newData = filterMenuData(newMenuData, categoryName);
    setFilteredData(newData);
  };

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="pb-12">
      <div className="flex h-60 bg-teal-600 px-32">
        <img
          className="h-40 w-64 my-10 mr-5"
          src={
            IMG_CDN_URL +
            restaurant?.cards[0]?.card?.card?.info.cloudinaryImageId
          }
        />
        <div className="h-40 my-10 text-white	">
          <h2 className="	font-normal text-3xl">
            {restaurant?.cards[0]?.card?.card?.info.name}
          </h2>
          <h3 className="text-sm font-light text-gray-200	 mt-2">
            {restaurant?.cards[0]?.card?.card?.info.cuisines?.join(", ")}
          </h3>
          <h2 className="text-sm font-light text-gray-200		 mt-3">
            {restaurant?.cards[0]?.card?.card?.info.areaName}
          </h2>
          <div className="mt- mt-6">
            <div className="pl-0 pr-9 inline-block">
              <div className=" text-white">
                {restaurant?.cards[0]?.card?.card?.info.avgRating > 0
                  ? restaurant?.cards[0]?.card?.card?.info.avgRating
                  : "--"}
                <span> &#9733;</span>
              </div>
              <div className=" text-gray-200	">
                {restaurant?.cards[0]?.card?.card?.info.totalRatingsString}
              </div>
            </div>
            <div className="pl-9 pr-9 inline-block">
              <div className=" text-white">
                {restaurant?.cards[0]?.card?.card?.info.sla?.deliveryTime} mins
                {/* <span> &#9733;</span> */}
              </div>
              <div className=" text-gray-200	">Delivery Time</div>
            </div>
            <div className="pl-9 pr-0 inline-block">
              <div className=" text-white">
                {/* <span> &#8377;</span> */}
                {restaurant?.cards[0]?.card?.card?.info?.costForTwoMessage.slice(
                  0,
                  4
                )}
              </div>
              <div className=" text-gray-200	">Cost for two</div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-flow-col m-auto w-3/4">
        <div className="col-span-2 flex flex-col border-r-2 mt-5">
          <h2 className="font-semibold">Categories</h2>
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {categories.map((category) => {
              return (
                <li
                  className="my-2 cursor-pointer"
                  key={category}
                  onClick={() => categoriesFilter(category)}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="ml-2 col-span-10">
          {console.log("nm", newMenuData)}
          {console.log("fd", filteredData)}

          {(filteredData.length > 0 ? filteredData : newMenuData).map(
            (item) => {
              return (
                <div key={item.id} className="flex w-full border-b-2 py-5	">
                  <div className="self-center w-1/6">
                    {item.imageId ? (
                      <img
                        alt="card"
                        className=" h-20"
                        src={MENU_IMG_CDN_URL + item.imageId}
                      />
                    ) : (
                      <img
                        alt="card"
                        className="ml-4 h-20"
                        src={NoImageAvailable}
                      />
                    )}
                  </div>
                  <div className="flex flex-col w-1/2 mx-5 ">
                    <div className=" font-semibold">{item.name}</div>
                    <div className="flex flex-row	">
                      <span> &#8377;</span>
                      <div>
                        {item.price > 0
                          ? item.price.toString().slice(0, -2)
                          : item.defaultPrice.toString().slice(0, -2)}
                        {}
                      </div>
                    </div>
                    <div className="text-stone-400 whitespace-normal		">
                      {item.description}
                    </div>
                  </div>
                  <div className="self-center	">
                    <button
                      onClick={() => {
                        addFoodItem(item);
                      }}
                      className="p-1 text-orange-400 border rounded-lg border-orange-400"
                    >
                      Add
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenuNew;
