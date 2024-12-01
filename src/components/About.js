import User from "./User";
import React from "react";
import UserClass from "./UserClass";

class About extends React.Component{

    constructor(props){
        super(props);
    
    //console.log("Parent constructor");
    }

    componentDidMount(){
        //console.log("Parent Component Did Mount");  
    }
    render(){
       // console.log("Parent render");
        return(
            <div>
            <h1>Hi</h1>
            <User name={"Sumita(function)" } location={"Guwahati(class)"}/>

            <UserClass name={"Sumita(class)"} location={"Delhi(class)"}/>
        </div>
        )
    }
}




export default About;