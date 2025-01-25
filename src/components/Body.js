import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import useOnlineStatus from "../utils/useOnlineStatus";
import Shimmer from "./Shimmer";
import UserContext from "../utils/UserContext";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isTopRated, setIsTopRated] = useState(false);

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9371531&lng=77.6901166&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );

        const json = await data.json();
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) 
        return (
            <h1 className="text-2xl font-bold text-center mt-10 text-red-600">
                Looks like you're offline!! Please check your internet connection
            </h1>
        );

    const { loggedInUser, setUserName } = useContext(UserContext);

    if (listOfRestaurants.length === 0) {
        return <Shimmer />;
    }

    const handleSearch = () => {
        const filtered = listOfRestaurants.filter((res) => 
            res.info.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredRestaurant(filtered);
    };

    const handleTopRated = () => {
        setIsTopRated(!isTopRated);
        if (!isTopRated) {
            const topRated = listOfRestaurants.filter(
                (res) => parseFloat(res.info.avgRatingString) > 4.3
            );
            setFilteredRestaurant(topRated);
        } else {
            setFilteredRestaurant(listOfRestaurants);
        }
    };

    return (
        <div className='body max-w-7xl mx-auto px-4 py-8'>
            <div className='filter flex flex-col md:flex-row justify-start items-center  mb-8 space-y-4 md:space-y-0 md:space-x-8'>
                <div className="search flex items-center w-full md:w-auto">
                    <input 
                        type="text"
                        data-testid="searchInput" 
                        className="w-full md:w-64 px-4 py-2 rounded-l-lg border-2 border-gray-300 focus:outline-none focus:border-teal-500"
                        placeholder="Search restaurants..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button 
                        className="bg-teal-500 text-white px-4 py-2 rounded-r-lg hover:bg-teal-600 transition duration-300"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>

                <button 
                    className={`px-4 py-2 rounded-lg transition duration-300 ${
                        isTopRated 
                            ? "bg-amber-500 text-white hover:bg-amber-600" 
                            : "bg-teal-500 text-white hover:bg-gray-300"
                    }`}
                    style={{ marginLeft: '530px' }} 
                    onClick={handleTopRated}
                >
                    {isTopRated ? "Show All" : "Top Rated"} Restaurants
                </button>

                
            </div>

            <div className='res-container grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {filteredRestaurant.map((restaurant) => (
                    <Link key={restaurant.info.id} to={"/restaurants/" + restaurant.info.id}>
                        {parseFloat(restaurant.info.avgRatingString) >= 4.3 ? (
                            <RestaurantCardPromoted resData={restaurant} />
                        ) : (
                            <RestaurantCard resData={restaurant} />
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Body;

