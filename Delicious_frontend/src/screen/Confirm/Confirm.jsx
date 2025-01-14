import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {PropagateLoader} from "react-spinners";
axios.defaults.withCredentials=true;
function Confirm() {
  const [loading,setLoading]=useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false);
    },3000);
  },[]);
  
  const user=useSelector((state)=> state.auth.user);
  const clearCart = async () => {
    const userId = user._id;
    try {
      const res = await axios.delete("https://delicious-backend-1.onrender.com/api/clearCart", { data: { userId } });
      const data = res.data;
      toast.success(data.message);
    } catch (error) {
      console.error("Error clearing cart:", error);
      // Handle error
    }
  };
  useEffect(()=>{
    clearCart();
  },[]);

  return (
    
    <div className='flex flex-col  h-screen justify-center items-center '>
      {
        loading? (<PropagateLoader color="#36d7b7" />):<h3 className=' font-semibold text-xl text-center'>Order Successfull !</h3>

      }

      
    </div>
  )
}

export default Confirm
