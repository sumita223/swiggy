import React,{lazy, Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import UserContext from './utils/userContext';
import { Provider } from 'react-redux';
import Shimmer from './components/Shimmer';
import appStore from './utils/appStore';
import Cart from './components/Cart';
//import Grocery from './components/Grocery';

//const Grocery = lazy(()=>import('./components/Grocery'));

const AppLayout=()=>{

    const [UserName, setUserName]= useState();

    useEffect(()=>{
        const data= {
            name:"Sumita"
        };
        setUserName(data.name);
    }, []);

    return(
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser:UserName, setUserName}}>
        <div className='app'>
            <Header/>
            <Outlet/>
        </div>
        </UserContext.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        //children routes
        children:[
            {
                path:"/",
                element:<Body/>
            },
            {
                path: "/about",
                element: <About/>
            },
            
          
            {
                path:"/restaurants/:resId",
                element:<RestaurantMenu/>
            },
            {
                path:"/cart",
                element:<Cart/>
            }

        ],
        errorElement:<Error/>,
    },
 ]
    
);
const root=ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter}/>);