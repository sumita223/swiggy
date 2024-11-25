import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu=()=>{

    //to load the data we need to use state variables
    const [resInfo, setResInfo] = useState(null);
    ///const params = useParams(); 
    //console.log(params);

    useEffect(()=>{
        fetchMenu();
    },[]);

    const fetchMenu = async()=>{
        const data= await fetch(
            "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9371531&lng=77.6901166&restaurantId=908346&catalog_qa=undefined&submitAction=ENTER"
        );
        const json= await data.json();
        console.log(json);
        //after getting the data fill resInfo with data
        setResInfo(json.data);
    };
    if (resInfo===null) return  (<Shimmer/>)
    const{name, cuisines, costForTwoMessage}= resInfo?.cards?.[2]?.card?.card?.info  || {};

    const{itemCards} = resInfo?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card?.card  || {};
    
    console.log(itemCards);
    //shimmer
    

    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>{cuisines}- {costForTwoMessage}</p>
            <h2>Menu</h2>
            <ul>  
                {itemCards.map((item)=>(
                    <li key={item.card.info.id}>
                        {item.card.info.name }-{ "Rs"}
                        {item.card.info.price/100 || item.card.info.defaultPrice/100}</li>
                ))}
            </ul>
        </div>
    )
}
export default RestaurantMenu;