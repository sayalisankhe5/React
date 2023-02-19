import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="m-auto w-96">
      {cartItems?.length > 0 ? (
        <>
          {cartItems.map((item) => {
            return (
              <div key={item.id} className="flex w-full	 border-b-2	">
                <div className="flex flex-col w-96 ">
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
                <div className="self-center	">
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
        <h1 className="font-bold text-3x">Cart Items</h1>
      )}
    </div>
  );
};

export default Cart;
