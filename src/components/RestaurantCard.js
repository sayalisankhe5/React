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
      <h5>{props.restaurant.data?.deliveryTime} MINS</h5>
    </div>
  );
};

export default RestaurantCard;
