import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div>
      <h1 className="font-bold text-3x">Cart Items</h1>
    </div>
  );
};

export default Cart;
