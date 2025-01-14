import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { getCart } from "../../Helper";
import { setCart } from "../../redux/slices/CartSlice";

function FoodCard({ img, id, price, rating, desc, name, handleToast }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const addToCart = async ({ id, name, price, img, quantity, rating }) => {
    const res = await axios.post(
      `https://delicious-backend-1.onrender.com/api/addToCart/${user._id}`,
      { id, name, price, image: img, quantity, rating }
    );

    const data = await res.data;
    if (res.status === 200) {
      toast.success(data.message);
    }
    getCart(user).then((data) => {
        dispatch(setCart(data.cartItems))
    });
  };
  return (
    <div className="font-bold w-[240px] h-[320px] bg-white p-5 flex flex-col rounded-lg gap-2">
      <img
        src={img}
        alt=""
        className="w-auto h-[100px]  hover:scale-110 cursor-grab transition-all duration-500 ease-in-out"
      />
      <div className="text-sm flex justify-evenly">
        <h2>{name}</h2>
        <span className="text-yellow-300">₹{price}</span>
      </div>
      <p className="text-sm font-normal">{desc.slice(0, 50)}..</p>
      <div className="flex justify-between">
        <span className="flex justify-center items-center">
          <FontAwesomeIcon
            icon={faStar}
            className="fa-solid fa-star mr-1 text-yellow-400"
          />{" "}
          {rating}
        </span>
        <button
          className="p-1 text-black bg-yellow-300 hover:bg-yellow-600 rounded-lg text-sm"
          onClick={() => {
            !user
              ? toast.error("please login first")
              : addToCart({ id, name, price, img, quantity: 1, rating });
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
