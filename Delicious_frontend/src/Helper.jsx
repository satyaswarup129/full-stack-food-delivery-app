import axios from "axios";

export const getCart = async (user) => {
  try {
    const res = await axios.get(`https://delicious-backend-1.onrender.com/api/getCart/${user._id}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching cart data:", error);
    return null; // or you can throw the error if you want the caller to handle it
  }
};
