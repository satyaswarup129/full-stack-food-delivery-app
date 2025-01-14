import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart,incrementQty,decrementQty, setCart } from "../../redux/slices/CartSlice";
import toast from "react-hot-toast";
import axios from "axios";
import { getCart } from "../../Helper";
function CartItem({ image, name, price, quantity, id ,_id}) {
  const dispatch = useDispatch();
  const user=useSelector((state)=> state.auth.user);
  const removeFromCart =async (id)=>{
    const userId=user._id;
  const res=await axios.delete(`https://delicious-backend-1.onrender.com/api/removeFromCart/${id}`,{data:{userId}});
    const data=await res.data;
    await getCart(user).then((data)=> dispatch(setCart(data.cartItems)));
  }

  const incrementQuantity=async (id)=>{
    const res=await axios.put(`https://delicious-backend-1.onrender.com/api/incrementQuantity/${id}`);
    const data=await  res.data;
    getCart(user).then((data)=> dispatch(setCart(data.cartItems)));
  }
  const decrementQuantity=async (id)=>{
    const res=await axios.put(`https://delicious-backend-1.onrender.com/api/decrementQuantity/${id}`);
    const data=await  res.data;
    getCart(user).then((data)=> dispatch(setCart(data.cartItems)));
  }
  return (
    <>
    <div className="flex gap-2 rounded-lg p-3 mb-3 shadow-xl">
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => {
          removeFromCart(_id);
              toast(`${name} Removed from Cart`,{
            icon: '😕',
          });
        }}
        className="absolute right-7 text-gray-600 cursor-pointer"
      />
      <img src={image} className="w-[50px] h-[50px]" />
      <div className="leading-5">
        <h2 className="font-bold text-gray-800">{name}</h2>
        <div className="flex justify-between">
          <span className="text-green-500 font-bold">₹{price}</span>
          <div className="flex justify-center items-center gap-2 absolute mt-1.5 right-7">
            <FontAwesomeIcon
              icon={faMinus}
              onClick={()=>{
                quantity>1?decrementQuantity(_id):(quantity=1);
              }}
              className="border-2 border-gray-600 text-gray-600 hover:text-black
               hover:bg-yellow-600 hover:border-none rounded-md p-1 text-sm  transition-all ease-linear cursor-pointer"
            />
            <span>{quantity}</span>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={()=>{
                quantity>=1?incrementQuantity(_id):(quantity=0);
              }}
              className="border-2 border-gray-600 text-gray-600 hover:text-black
               hover:bg-yellow-600 hover:border-none rounded-md p-1 text-sm transition-all ease-linear cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div></>
  );
}

export default CartItem;
