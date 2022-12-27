import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeCart,
  incrementQuantity,
  decrementQuantity,
} from "../features/cart/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);

  //Calculate Sub Total
  let total = 0;
  const calculateSubTotal = (e) => {
    cartItems.map((item) => {
      total += item.price * item.quantity;
      return total;
    });
  };
  calculateSubTotal();

  //Remove product from Cart
  const handleRemoveCart = (item) => {
    dispatch(removeCart(item.id));
  };

  const handleIncrement = (product) => {
    dispatch(incrementQuantity(product));
  };
  const handleDecrement = (product) => {
    dispatch(decrementQuantity(product));
  };

  return (
    <>
      <div className="max-w-container mx-auto">
        <table className="w-full my-6">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="text-left p-1 w-[55%]">Product</th>
              <th className="text-center w-[15%]">Quantity</th>
              <th className="text-right w-[30%]">Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="text-left">
                  <div className="flex gap-2 my-2">
                    <img src={item.images[0].url} alt="" className="w-16" />
                    <div>
                      <h3 className="text-gray-800">{item.name}</h3>
                      <p className="text-gray-600 text-sm">
                        Price : {item.price}$
                      </p>
                      <button
                        className=" text-orange-600 pr-2 py-1 text-[12px]"
                        onClick={() => handleRemoveCart(item)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <div className="flex">
                    <button
                      className="bg-green-600 text-white px-3 py-1 mr-1"
                      onClick={() => handleIncrement(item)}
                      disabled={item.quantity > item.stock}
                    >
                      +
                    </button>
                    <div>
                      <input
                        type="number"
                        name=""
                        id=""
                        className="border border-solid border-green-800 focus:outline-none w-14 rounded p-1 text-center"
                        placeholder="0"
                        readOnly
                        value={item.quantity}
                      />
                    </div>
                    <button
                      className="bg-green-600 text-white px-3 py-1 ml-1"
                      onClick={() => handleDecrement(item)}
                      disabled={item.quantity === 0}
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="text-right text-gray-600 text-lg">
                  {(item.quantity * item.price).toFixed(2)}$
                </td>
              </tr>
            ))}
          </tbody>

          {/* Subtotal */}
          <tfoot>
            <tr>
              <td className="text-left"></td>
              <td className="text-center"></td>
              <td className="text-right text-gray-600 text-lg">
                <hr />
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>{total.toFixed(2)}$</p>
                </div>
                <Link
                  to="/checkout"
                  className="mt-4 text-sm bg-green-500 text-white rounded p-2"
                >
                  Checkout
                </Link>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
}
