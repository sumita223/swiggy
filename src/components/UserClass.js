//class based comp

import React from "react";
import { useState } from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);

        this.state={
          
            userInfo:{
                name:"Dummy",
                location:"Default",
                avatar_url:"Dummy",
            },
        };

        //console.log("Child constructor");
    }

    async componentDidMount(){
        //console.log("Child Component Did Mount");  

        //API call
        try {
            const data = await fetch("https://api.github.com/users/akshaymarch7");
            const json = await data.json();
            console.log("Fetched data:", json); // Log the API response
    
            this.setState({
                userInfo: json,
            });
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    }

    render(){

        //console.log("Child render");
        const { name, location,avatar_url } = this.state.userInfo;
        return (
            <div className="user-card">
               
                <h2>Name: {name }</h2>
                <img src={avatar_url}/>
                <h3>Location: {location }</h3>
            </div>
        );
    }
}
export default UserClass;