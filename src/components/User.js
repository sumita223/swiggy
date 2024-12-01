import { useEffect, useState } from "react";

const User=(props)=>{

    const [count]= useState(0);

    useEffect(()=>{

    },[]);

    //unmounting
    //return()=>{

   // }

    /*async function getUserInfo() {
        const data=await
    }*/
    return(
        <div className="user-card">
            <h1>Count = {count}</h1>
  
            <h2> Name: {props.name}</h2>
            <h3>Location: {props.location}</h3>
        </div>
    )
};
export default User;