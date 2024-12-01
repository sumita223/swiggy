import RestaurantCard ,{withPromotedLabel} from "./RestaurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
const Body=()=>{
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant]= useState([]);
    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
    //whenever state variable updates, react triggers a reconciliation cycle(re-renders the component)
    console.log("Body Rerendered", listOfRestaurants);
    
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


    const onlineStatus= useOnlineStatus();

    if(onlineStatus === false) 
        return (
        <h1>Look's like you're offline!! Please check your internet connection

        </h1>
    );

    // conditional rendering
    if (listOfRestaurants.length === 0) {
        return <Shimmer/>;
    }

    return listOfRestaurants.length === 0? (<Shimmer/>) :(
        <div className='body'>
            <div className='filter flex '>
                <div className="search m-4 p-4">
                     
                    <input type="text" className=" border border-solid border-black"
                    //as soon as my input changes my on change fun should change my search text
                        value={searchText}
                        onChange={(e)=>{
                            setSearchText(e.target.value);
                        }}
                    />
                    <button className="px-4 py-2 m-4 bg-green-100 rounded-lg" onClick={()=>{
                        console.log(searchText);
                        
                        //filter out
                        const filteredRestaurant = listOfRestaurants.filter((res) => {
                            return res.info.name.toLowerCase().includes(searchText.toLowerCase());
                        });

                        setFilteredRestaurant(filteredRestaurant);
                    }}>
                    Search</button>

                </div>
                <div className="search m-4 p-4 flex items-center">
                <button className="px-4 py-2  bg-gray-100  rounded-lg"
                    onClick={()=>{
                        const filteredList = listOfRestaurants.filter(
                            (res)=>res.info.avgRatingString>4
                        );
                        setListOfRestaurants(filteredList);
                    }}>
                    Top Rated Restaurants
                </button>
                </div>
                
            </div>
                <div className='res-conatiner flex flex-wrap'>
                   {/*
                   <RestaurantCard resName="Meghna Foods" cuisine="Biryani, North Indian"/>
                    <RestaurantCard resName="KFC" cuisine="Burger"/>. resdata is prop resobj is arg
                     BELOW is UI
                    */}
                    
                    {filteredRestaurant.map((restaurant)=>(
                        <Link key={restaurant.info.id} to={"/restaurants/"+ restaurant.info.id}>
                        
                        {//if rest is promoted
                            restaurant.info.avgRatingString>=4.2 ?(
                                <RestaurantCardPromoted resData={restaurant}/>
                            ):(
                                <RestaurantCard resData={restaurant}/>
                            )

                        }
                            
                        </Link>
                    ))}
                    
                </div>
        </div>
    );
};

export default Body;