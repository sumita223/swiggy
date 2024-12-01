import { LOGO_URL } from "../utils/constants";
import { useState } from "react";

import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header=()=>{
    let btnName= "login";

    const [btnNameReact, setBtnNameReact]= useState("Login");

    const onlineStatus = useOnlineStatus();
    return(
        <div className='flex justify-between sm:bg-yellow-50 lg:bg-green-50 shadow-lg '>
            <div className='logo-conatiner'>
                <img className='w-40' src={LOGO_URL}/>
            </div>
                <div className='flex items-center'>
                    <ul className="flex p-4 m-4">
                        <li className="px-4">
                            Online Status: {onlineStatus ? "true":"false"};
                        </li>
                        <li className="px-4"><Link to="/">Home </Link></li>
                        <li className="px-4"><Link to="/about">About Us </Link></li>
                        <li className="px-4">
                            <Link to="/contact"> Contact Us </Link>
                        </li>
                        <li className="px-4">
                            <Link to="/grocery"> Grocery</Link>
                        </li>
                        <li>Cart</li>
                        <button className='login'
                        onClick={()=>{
                            btnNameReact==="Login" ? setBtnNameReact("Logout"): setBtnNameReact("Login");
                            //if login change to logout, if logout change to login
                        }}
                        > {btnNameReact} </button>
                    </ul>

                </div>
        </div>
    )
}

export default Header;
