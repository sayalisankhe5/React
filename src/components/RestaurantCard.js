import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
const RestaurantCard = (props) => {
  return (
    <div className="card w-72 h-80 my-5 mx-4 p-2  hover:border border-solid ">
      <img
        alt="card"
        className="w-full"
        src={IMG_CDN_URL + props.restaurant.data.cloudinaryImageId}
      />

      <h3 className="break-words	font-semibold mt-3 mb-0 ">
        {props.restaurant.data?.name}
      </h3>
      <h4 className="text-gray-500 font-normal mt-1 mb-0">
        {props.restaurant.data?.cuisines.join(", ")}
      </h4>

      <div className="rating-min-cost font-light text-zinc-600	 flex justify-between items-center mt-4">
        <div>
          {props.restaurant.data?.avgRating}
          <span> &#9733;</span>
        </div>
        <div>•</div>
        <h5>{props.restaurant.data?.deliveryTime} MINS</h5>
        <div>•</div>
        <div>{props.restaurant.data?.costForTwoString}</div>
      </div>
    </div>
  );
};

export default RestaurantCard;
