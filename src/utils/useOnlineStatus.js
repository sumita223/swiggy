import { useEffect, useState } from "react";

const useOnlineStatus=()=>{
    const[onlineStatus, setOnlineStatus]= useState(true);

    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setOnlineStatus(false);
            console.log("Offline event detected");
        });
        window.addEventListener("online",()=>{
            setOnlineStatus(true);
            console.log("Online event detected");
        });

    },[]);

    return onlineStatus;
}
export default useOnlineStatus;