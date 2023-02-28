import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearcart } from "../utils/cartSlice";

/* const cartItems = [
  {
    item: { id: 1, name: "noodles", price: 5000 },
    quantity: 1,
    totalPrice: 1,
  },
  { item: { id: 2, name: "cake", price: 5000 }, quantity: 1, totalPrice: 1 },
]; */

const Cart = () => {
  //const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();
  /* const calculateTotal = (qty, price) => {
    setTotalPrice(qty * price);
  }; */
  const clearCart = () => {
    dispatch(clearcart());
  };

  return (
    <>
      <div className="m- w-full">
        {cartItems?.length > 0 ? (
          <>
            <div className="m-auto w-1/4">
              <button
                className=" p-2 rounded-md bg-green-600 text-white"
                onClick={clearCart}
              >
                Clear cart
              </button>
            </div>
            <div className="flex w-full px-5 py-2 justify-between	 border-b-2	">
              <div className="flex flex-col w-1/2 ">
                <div className=" font-semibold">Item</div>
              </div>
              <div className=" font-semibold w-1/6">Quantity</div>
              <div className=" font-semibold w-1/6">Total</div>
              <div></div>
            </div>
            {cartItems.map((item) => {
              return (
                <div
                  key={item.id}
                  className="flex w-full p-5 justify-between	 border-b-2	"
                >
                  <div className="flex flex-col w-1/2 ">
                    {/* <li key={item.id}>{item.name} - </li> */}
                    <div className=" font-semibold">{item.name}</div>
                    <div className="flex flex-row	">
                      <span> &#8377;</span>
                      <div>{item.price.toString().slice(0, -2)}</div>
                    </div>

                    {/* <div className="text-stone-400 whitespace-normal		">
                    {item.description}
                  </div> */}
                  </div>
                  <div className="self-center w-1/6">
                    <button>-</button>
                    <span>{item.quantity}</span>
                    <button>+</button>
                  </div>
                  <div className=" font-semibold self-center w-1/6">
                    {item.quantity * Number(item.price.toString().slice(0, -2))}
                  </div>
                  <div className="self-center w-1/6	">
                    <button
                      onClick={() => {
                        addFoodItem(item);
                      }}
                      className="p-1 bg-orange-400 border"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <h1 className="font-bold text-3x">
            Please add some items to the Cart
          </h1>
        )}
      </div>
    </>
  );
};

export default Cart;
