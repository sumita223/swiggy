import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body=()=>{
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant]= useState([]);
    const [searchText, setSearchText] = useState("");

    //whenever state variable updates, react triggers a reconciliation cycle(re-renders the component)
    console.log("Body Rerendered");
    
    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData= async ()=>{
        const data= await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9371531&lng=77.6901166&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json= await data.json();
        console.log(json.data.cards[4].card.card.gridElements.infoWithStyle.restaurants);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };
    // conditional rendering
    if (listOfRestaurants.length === 0) {
        return <Shimmer/>;
    }

    return listOfRestaurants.length === 0? (<Shimmer/>) :(
        <div className='body'>
            <div className='filter'>
                <div className="search">
                     
                    <input type="text" className="search-box"
                    //as soon as my input changes my on change fun should change my search text
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}
                    />
                    <button onClick={()=>{
                        console.log(searchText);
                        
                        //filter out
                        const filteredRestaurant = listOfRestaurants.filter((res) => {
                            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        });

                        setFilteredRestaurant(filteredRestaurant);
                    }}>
                    Search</button>

                </div>
                <button className="filter-btn"
                    onClick={()=>{
                        const filteredList = listOfRestaurants.filter(
                            (res)=>res.info.avgRatingString>4
                        );
                        setListOfRestaurants(filteredList);
                    }}>
                    Top Rated Restaurants
                </button>
            </div>
                <div className='res-conatiner'>
                   {/*
                   <RestaurantCard resName="Meghna Foods" cuisine="Biryani, North Indian"/>
                    <RestaurantCard resName="KFC" cuisine="Burger"/>. resdata is prop resobj is arg
                     BELOW is UI
                    */}
                    
                    {filteredRestaurant.map((restaurant)=>(
                        <RestaurantCard key={restaurant.info.id} resData={restaurant}/>
                    ))}
                    
                </div>
        </div>
    );
};

export default Body;