import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { AWS_POST_DATA_URL, IMG_CDN_URL } from "../constants";
import { MENU_IMG_CDN_URL } from "../constants";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import { addItem } from "../utils/cartSlice";
import useRestaurantMenuFetcher from "../utils/useRestaurantMenuFetcher";
import Shimmer from "./Shimmer";
import NoImageAvailable from "../NoImageAvailable.jpg";
import { filterMenuData } from "../utils/helper";
import { restaurants } from "./filedata";
//import Shimmer from "./Shimmer";
ChartJS.register(ArcElement, Tooltip, Legend);

const RestaurantMenuNew = () => {
  const [filteredData, setFilteredData] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  let data = {};
  const cartItems = useSelector((store) => store.cart.items);
  const userInfo = useSelector((store) => store.user.user);
  const addFoodItem = (item) => {
    dispatch(addItem(item));
    console.log(cartItems, "carttttt");
  };
  const postAWSData = (restaurantInfo) => {
    let data = {};
    if (restaurantInfo && userInfo.uid != "") {
      data = {
        restaurantMenuUrl: window.location.href,
        userId: userInfo.uid,
        cloudinaryImageId: restaurantInfo.cloudinaryImageId,
        restaurantId: restaurantInfo.id,
        restaurantName: restaurantInfo.name,
        restaurantAvgRating: restaurantInfo.avgRating,
        restaurantDeliveryTime: restaurantInfo.sla.deliveryTime,
        restaurantCostForTwo: restaurantInfo.costForTwo,
      };
      fetch(AWS_POST_DATA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => console.log("aws post", data));
    }
  };
  useEffect(() => {
    const restaurantInfo = restaurants.find((r) => r.id == params.id);
    console.log("resINFO", restaurantInfo);
    if (restaurantInfo || Object.keys(restaurantInfo).length > 0) {
      postAWSData(restaurantInfo);
    }
  }, []);

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
    console.log("myrest", restaurant);
    let allMenuData =
      restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.map(
        (item) => item
      );
    if (allMenuData == undefined) {
      return (
        <p className="text-center text-2xl">
          Oops!! Restaurant is temporarily closed... Try again after some time
        </p>
      );
    }
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

    const categoryWiseCount = newMenuData.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + 1;
      return acc;
    }, {});
    // const vegNonVegWiseCount = newMenuData.reduce(
    //   (acc, curr) => {
    //     if (
    //       curr.itemAttribute.vegClassifier.toLowerCase() == "VEG".toLowerCase()
    //     ) {
    //       acc[Veg] = acc[Veg] + 1;
    //     }
    //     if (
    //       curr.itemAttribute.vegClassifier.toLowerCase() ==
    //       "NONVEG".toLowerCase()
    //     ) {
    //       //acc[NonVeg] = acc[NonVeg] + 1;
    //     }
    //     return acc;
    //   },
    //   { Veg: 0, NonVeg: 0 }
    // );
    // console.log(vegNonVegWiseCount, "vegNonVegWiseCount");

    console.log(categoryWiseCount, "categoryWiseCount");
    let numValues = Object.keys(categoryWiseCount).map(function (key) {
      // Using Number() to convert key to number type
      // Using obj[key] to retrieve key value
      return categoryWiseCount[key];
    });
    data = {
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      labels: [...new Set(Object.keys(categoryWiseCount))],

      datasets: [
        {
          //label: "# of Votes",
          data: numValues,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };
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
          {/* {data && <Pie data={data} />} */}
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
                  {!cartItems.includes(item.id) ? (
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
                  ) : (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => decrease(item)}
                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <div>
                        {/* <input
                            type="number"
                            id="first_product"
                            className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="1"
                            required
                          /> */}
                        <div className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                          {item.quantity}
                        </div>
                      </div>
                      <button
                        onClick={() => increase(item)}
                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-4 h-4"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  )}
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
