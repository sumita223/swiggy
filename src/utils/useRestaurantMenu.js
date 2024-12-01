import { useEffect, useState } from "react";
import { RESTAURANT_MENU_URL } from "../utils/constants";
const useResturantMenu=(resId)=>{


    //to load the data we need to use state variables
    const [resInfo, setResInfo] = useState(null);
    //const params = useParams(); 
    //console.log(params);

    useEffect(()=>{
        fetchMenu([]);
    },[]);

    const fetchMenu = async()=>{
        const data= await fetch(RESTAURANT_MENU_URL+resId);
        console.log("Restaurant ID:", resId);

        const json= await data.json();
        console.log(json);
        //after getting the data fill resInfo with data
        setResInfo(json.data);
    };
   
    return resInfo;

}
export default useResturantMenu;