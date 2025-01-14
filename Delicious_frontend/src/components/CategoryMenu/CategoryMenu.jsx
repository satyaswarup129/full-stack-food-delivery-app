import React, { useEffect, useState } from "react";
import FoodData from "../../Data/FoodData";
import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../redux/slices/CategorySlice";
function CategoryMenu() {

  const [categories, setCategories] = useState([]);

  const listUniqueCategories = () => {
    const uniqueCategories = [
      ...new Set(FoodData.map((food) => food.category)),
    ];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    listUniqueCategories();
  }, []);

  const dispatch = useDispatch();

  const selectedCategory = useSelector((state) => state.category.category);
  
  return (
    <div className="mt-20 mx-4">
      <h3 className="text-2xl font-semibold tracking-wide m text-gray-800">
        Find Your Comfort
      </h3>
      <div className="my-3 flex gap-3 overflow-x-scroll scroll-smooth lg:overflow-hidden">
        <button
          className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-yellow-400 ${selectedCategory==="All"&&"bg-yellow-400"}`}
          onClick={()=>dispatch(setCategory("All"))}
        >
          All
        </button>
        {categories.map((category, index) => {
          return (
            <button
            onClick={() => dispatch(setCategory(category))}
              key={index}
              className={`px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-yellow-400 ${selectedCategory===category && "bg-yellow-400"}`}
            >
              {category}
            </button>
          );
        })}
        {/* <button className="px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-yellow-400">
          Biryani/Rice
        </button>
        <button className="px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-yellow-400">
          Desserts
        </button>
        <button className="px-3 py-2 bg-gray-200 font-bold rounded-lg hover:bg-yellow-400">
          Pizzas & Burgers
        </button> */}
      </div>
    </div>
  );
}

export default CategoryMenu;
