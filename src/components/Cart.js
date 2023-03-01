import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "../constants";
import { clearcart } from "../utils/cartSlice";
/* import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button"; */

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

  //return {
  /* <>
      <div classNameName="">
        {cartItems?.length > 0 ? (
          <>
            <table className="table-auto">
              <thead>
                <tr>
                  <th>
                    <button
                      className=" p-2 rounded-md bg-green-600 text-white"
                      onClick={clearCart}
                    >
                      Clear cart
                    </button>
                  </th>
                </tr>
                <tr>
                  <th>Item</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="p-5">
                        <div className=" font-semibold">{item.name}</div>
                        <div className="flex flex-row	">
                          <span> &#8377;</span>
                          <div>{item.price.toString().slice(0, -2)}</div>
                        </div>
                      </td>
                      <td className="p-5">
                        <button className="border p-1 w-1/3">-</button>
                        <button className="border p-1 w-1/3 ">
                          {item.quantity}
                        </button>
                        <button className="border p-1 w-1/3">+</button>
                      </td>
                      <td className="p-5">
                        {item.quantity *
                          Number(item.price.toString().slice(0, -2))}
                      </td>
                      <td className="p-5">
                        <button
                          onClick={() => {
                            addFoodItem(item);
                          }}
                          className="p-1 bg-orange-400 border"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        ) : (
          <h1 className="font-bold text-3x">
            Please add some items to the Cart
          </h1>
        )}
      </div>
    </> */
  //};

  return (
    <>
      {cartItems?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Item
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-32 p-4">
                      {item.cloudinaryImageId ? (
                        <img
                          src={IMG_CDN_URL + item.cloudinaryImageId}
                          alt="Apple Watch"
                        />
                      ) : null}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      <div>{item.name}</div>
                      <div className="flex flex-row	">
                        <span> &#8377;</span>
                        <div>{item.price.toString().slice(0, -2)}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <button
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
                              fill-rule="evenodd"
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
                              fill-rule="evenodd"
                              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      ₹
                      {item.quantity *
                        Number(item.price.toString().slice(0, -2))}
                    </td>
                    <td className="px-6 py-4">
                      <button className="font-medium text-red-600 dark:text-red-500 hover:underline">
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr class="font-semibold text-gray-900 dark:text-white">
                <th scope="row" class="px-6 py-3 text-base"></th>
                <th scope="row" class="px-6 py-3 text-base">
                  Total
                </th>

                <td class="px-6 py-3">3</td>
                <td class="px-6 py-3">21,000</td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div className="flex flex-row justify-center align-middle text-gray-500">
          No items
        </div>
      )}
    </>
  );
};

export default Cart;
