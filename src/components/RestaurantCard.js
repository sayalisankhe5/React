import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
const RestaurantCard = (props) => {
  const { restaurant } = props;
  return (
    <div className="card w-72 h-80 my-5 mx-4 p-2  hover:border border-solid ">
      <img
        alt="card"
        className="w-full"
        src={IMG_CDN_URL + restaurant.cloudinaryImageId}
      />

      <h3 className="break-words	font-semibold mt-3 mb-0 ">{restaurant.name}</h3>
      <h4 className="text-gray-500 whitespace-nowrap text-ellipsis overflow-hidden font-normal mt-1 mb-0">
        {restaurant.cuisines?.join(", ")}
      </h4>

      <div className="rating-min-cost font-light text-zinc-600	 flex justify-between items-center mt-4">
        <div>
          {restaurant.avgRating}
          <span> &#9733;</span>
        </div>
        <div>•</div>
        <h5>{restaurant.deliveryTime || restaurant.sla?.deliveryTime} MINS</h5>
        <div>•</div>
        <div>{restaurant.costForTwo}</div>
      </div>
    </div>
  );
};

export const withRecommendedLabel = (InputComponent) => {
  return (props) => {
    return (
      <>
        <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
          RECOMMENDED
        </label>
        <InputComponent {...props} />
      </>
    );
  };
};

export default RestaurantCard;
