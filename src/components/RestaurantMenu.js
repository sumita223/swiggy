
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import RestaurantCategory from "./RestaurantCategory";

import useResturantMenu from "../utils/useRestaurantMenu";
import { useState } from "react";

const RestaurantMenu=()=>{

    const {resId} = useParams(); 

    const resInfo = useResturantMenu(resId);

    const [showIndex, setShowIndex] = useState(1);

    if (resInfo===null) return  (<Shimmer/>)
    const{name, cuisines, costForTwoMessage}= resInfo?.cards?.[2]?.card?.card?.info  || {};

    const{itemCards} = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card  || {};
    
    console.log(resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    const categories= resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c)=>c.card?.card?.["@type"]==="type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    console.log(categories);
    //shimmer
    

    return (
        <div className="menu text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">{cuisines}- {costForTwoMessage}</p>
            <h2>Menu</h2>
            {
                //categories accordion
                categories.map((category,index)=> (
                <RestaurantCategory key={category?.card?.card?.name} data={category?.card?.card}
                showItems={index===showIndex ? true:false}
                setShowIndex={()=>setShowIndex(index)}
                />))
                
            }
        </div>
    )
}
export default RestaurantMenu;