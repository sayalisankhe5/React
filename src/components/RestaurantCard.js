import { Link } from "react-router-dom";
import { IMG_CDN_URL } from "../constants";
const RestaurantCard = (props) => {
  return (
    <div className="card">
      <img
        alt="card"
        src={IMG_CDN_URL + props.restaurant.data.cloudinaryImageId}
      />

      <h3>{props.restaurant.data?.name}</h3>
      <h4>{props.restaurant.data?.cuisines.join(", ")}</h4>

      <div className="rating-min-cost">
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
