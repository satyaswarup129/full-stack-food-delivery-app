import React from "react";
import FoodCard from "../FoodCard/FoodCard";
import FoodData from "../../Data/FoodData";
import toast,{Toaster} from "react-hot-toast";
import { useSelector } from "react-redux";
function FoodItems() {
  const category=useSelector((state)=> state.category.category);
  const search=useSelector((state)=>state.search.search);
  const handleToast=(name)=> toast.success(`Added ${name} to Cart`);
  return (
    <>
    <Toaster position="top-center" reverseOrder={false}/>
      <div className="flex flex-wrap justify-center lg:justify-start mx-6 my-10 gap-10">
        {
          FoodData.filter((food)=>{
            if(category==="All"){
              return food.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            }else{
              return category===food.category&&food.name.toLocaleLowerCase().includes(search.toLocaleLowerCase());
            }
          }).map((food)=>{
            return(
              <FoodCard
              key={food.id}
              id={food.id}
              price={food.price}
              name={food.name}
              desc={food.desc}
              rating={food.rating}
              img={food.img}
              handleToast={handleToast}
            />
            )
          })
        }
      </div>
    </>
  );
}

export default FoodItems;
