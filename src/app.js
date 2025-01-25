import React,{lazy, Suspense, useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import Error from './components/Error';
import RestaurantMenu from './components/RestaurantMenu';
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom';
import UserContext from './utils/UserContext';
import { Provider } from 'react-redux';
import Shimmer from './components/Shimmer';
import appStore from './utils/appStore';
import Cart from './components/Cart';
import Login from './components/Login';
import SignUp from './components/SignUp';
import 'react-toastify/dist/ReactToastify.css';


//import Grocery from './components/Grocery';

//const Grocery = lazy(()=>import('./components/Grocery'));

const AppLayout=()=>{

    const [UserName, setUserName]= useState();
    const location = useLocation();
    useEffect(()=>{
        const data= {
            name:"Sumita"
        };
        setUserName(data.name);
    }, []);

    const hideHeaderRoutes = ["/signup", "/login"];

    return(
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser:UserName, setUserName}}>
        <div className='app'>
            {/* Conditionally render Header */}
            {!hideHeaderRoutes.includes(location.pathname) && <Header />}
            
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
                path:"/signup",
                element:<SignUp/>
            },
            {
                path:"/login",
                element:<Login/>
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