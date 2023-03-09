import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMG_CDN_URL } from "../constants";
import NoImageAvailable from "../NoImageAvailable.jpg";
import { Modal, Button, HiOutlineExclamationCircle } from "flowbite-react";

import {
  calculateTotals,
  clearcart,
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const totalCartAmount = useSelector((store) => store.cart.totalAmount);
  const totalCartQty = useSelector((store) => store.cart.totalQuantity);

  const [showDeleteBox, setShowDeleteBox] = useState(false);
  console.log(cartItems);
  const dispatch = useDispatch();

  const clearCart = () => {
    dispatch(clearcart());
    setShowDeleteBox(false);
  };

  const clearCartClick = (item) => {
    setShowDeleteBox(true);
  };

  const remove = (item) => {
    dispatch(removeItem(item));
  };

  const increase = (item) => {
    dispatch(incrementQuantity(item));
  };

  const decrease = (item) => {
    dispatch(decrementQuantity(item));
  };
  const handleClose = () => {
    setShowDeleteBox(false);
  };

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

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
        <>
          <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg pb-12  m-3">
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
                  <th scope="col" className="px-6 py-3">
                    <button
                      className="p-2 m-auto rounded-md bg-green-600 text-white"
                      onClick={clearCartClick}
                    >
                      Clear cart
                    </button>
                  </th>
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
                            alt="Food"
                          />
                        ) : (
                          <img
                            alt="card"
                            className="h-16"
                            src={NoImageAvailable}
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        <div>{item.name}</div>
                        <div className="flex flex-row	">
                          <span> &#8377;</span>
                          <div>
                            {item.price > 0
                              ? item.price.toString().slice(0, -2)
                              : item.defaultPrice.toString().slice(0, -2)}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
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
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        ₹
                        {item.price > 0
                          ? item.quantity *
                            Number(item.price.toString().slice(0, -2))
                          : item.quantity *
                            Number(item.defaultPrice.toString().slice(0, -2))}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => remove(item)}
                          className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr className="font-semibold text-gray-900 dark:text-white">
                  <th scope="row" className="px-6 py-3 text-base"></th>
                  <th scope="row" className="px-6 py-3 text-base">
                    Total
                  </th>

                  <td className="px-6 py-3">{totalCartQty}</td>
                  <td className="px-6 py-3">{totalCartAmount}</td>
                  <td>
                    <button
                      className="p-2 m-auto rounded-md bg-green-600 text-white"
                      onClick={clearCart}
                    >
                      Place the Order
                    </button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/*<div className="border border-black">
             <div className="font-semibold text-gray-900 dark:text-white">
               <th scope="row" className="px-6 py-3 text-base"></th>
              <th scope="row" className="px-6 py-3 text-base"> 
                Total
              {/* </th> 

              <div className="px-6 py-3">3</td>
              <td className="px-6 py-3">21,000</td>
            </tr> 
              </div>{" "}*/}

          {showDeleteBox && (
            <div
              id="popup-modal"
              tabIndex="-1"
              className="fixed bg-gray-500 opacity-95 top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full sm:h-full w-full"
            >
              <div className="relative w-full  flex justify-center items-center h-screen md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    //data-modal-hide="popup-modal"
                    onClick={handleClose}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="p-6 text-center">
                    <svg
                      aria-hidden="true"
                      className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to clear the cart?
                    </h3>
                    <button
                      //data-modal-hide="popup-modal"
                      onClick={clearCart}
                      type="button"
                      className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      Yes, I'm sure
                    </button>
                    <button
                      //data-modal-hide="popup-modal"
                      onClick={handleClose}
                      type="button"
                      className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                      No, cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* <Modal
            show={showDeleteBox}
            size="md"
            popup={true}
            onClose={handleClose}
          >
            <Modal.Header />
            <Modal.Body>
              <div className="text-center">
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to delete this product?
                </h3>
                <div className="flex justify-center gap-4">
                  <Button color="failure" onClick={clearCart}>
                    Yes, I'm sure
                  </Button>
                  <Button color="gray" onClick={handleClose}>
                    No, cancel
                  </Button>
                </div>
              </div>
            </Modal.Body>
          </Modal> */}
        </>
      ) : (
        <div className="flex flex-row justify-center align-middle text-gray-500">
          No items
        </div>
      )}
    </>
  );
};

export default Cart;
