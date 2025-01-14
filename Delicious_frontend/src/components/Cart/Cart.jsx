import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import CartItem from "../CartItem/CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [activeCart, setActiveCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const totalQty = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => (total = total + item.quantity * item.price),
    0
  );
  const navigate = useNavigate();
  return (
    <>
      <div
        className={`fixed right-0 top-0 w-full lg:w-[18vw] h-full p-3 pt-4 bg-white ${
          activeCart ? "translate-x-0" : "translate-x-full"
        } transition-all duration-500 z-50`}
      >
        <div className="flex justify-between items-center my-0.25">
          <span className="text-xl font-bold text-gray-800">My Orders</span>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setActiveCart(!activeCart)}
            className="border-2 ml-auto border-gray-600 hover:cursor-pointer text-gray-600 font-bold p-1 text-xl rounded-md hover:text-red-300 hover:border-red-300"
          />
        </div>
        {cartItems.length > 0 ? (
          cartItems.map((food) => (
            <CartItem
              key={food.id}
              {...food}
            />
          ))
        ) : (
          <h2 className="text-center font-bold text-xl text-gray-800">
            Cart Empty!
          </h2>
        )}
        <div className="absolute bottom-0">
          <h3 className="font-semibold text-gray-800">Items: {totalQty}</h3>
          <h3 className="font-semibold text-gray-800">
            Total Price: ₹{totalPrice}/-
          </h3>
          <hr className="w-[90vw] lg:w-[18w] my-2" />
          <button
            className="bg-yellow-300 font-bold px-3 text-black py-2 rounded-lg w-[90vw] lg:w-[16.5vw] mr-2 mb-3"
            onClick={() => navigate("/confirm")}
          >
            Order
          </button>
        </div>
      </div>
      <FontAwesomeIcon
        icon={faCartShopping}
        onClick={() => setActiveCart(!activeCart)}
        className="rounded-full bg-yellow-400 hover:cursor-pointer  text-sm p-3 fixed top-3.5 right-1.5"
      />
    </>
  );
}

export default Cart;
