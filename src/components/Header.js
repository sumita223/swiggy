import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LOGO_URL } from "../utils/constants";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";
import { ShoppingCart, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
   
  ];

  return (
    <header className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg p-5">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            className="w-20 h-20 rounded-full border-2 border-white"
            src={LOGO_URL}
            alt="Foodie's Paradise Logo"
          />
          <h1 className="text-2xl md:text-3xl font-bold">Foodie's Paradise</h1>
        </Link>

        {/* Navigation Section - Desktop */}
        <nav className="hidden md:flex items-center space-x-4">
          <AnimatePresence>
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={item.path}
                  className="px-5 py-2.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition duration-200 shadow-md hover:shadow-lg text-lg font-medium"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
          <Link to="/cart" className="relative group px-5 py-2.5 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-200 shadow-md hover:shadow-lg text-lg font-medium">
            <ShoppingCart className="w-5 h-5 inline-block mr-2" />
            <span>Cart</span>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </Link>
          <div className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white bg-opacity-20 text-base">
            <span className={`w-3 h-3 rounded-full ${onlineStatus ? "bg-green-400" : "bg-red-500"}`}></span>
            <span>{onlineStatus ? "Online" : "Offline"}</span>
          </div>
          <span className="font-medium px-5 py-2.5 rounded-full bg-white bg-opacity-20 text-lg">{loggedInUser}</span>
          <button
            className="bg-amber-400 hover:bg-amber-300 text-teal-900 px-7 py-2.5 rounded-full transition duration-200 shadow-md hover:shadow-lg font-semibold text-lg"
            onClick={() => setBtnNameReact(btnNameReact === "Login" ? "Log Out" : "Login")}
          >
            {btnNameReact}
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-200" onClick={toggleMenu}>
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-teal-600"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white hover:bg-white hover:bg-opacity-20 px-5 py-2.5 rounded-full transition duration-200 text-lg font-medium"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/cart" 
                className="flex items-center justify-between text-white hover:bg-white hover:bg-opacity-20 px-5 py-2.5 rounded-full transition duration-200 text-lg font-medium" 
                onClick={toggleMenu}
              >
                <span>Cart</span>
                <div className="flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-1" />
                  <span>({cartItems.length})</span>
                </div>
              </Link>
              <div className="flex items-center justify-between text-white px-5 py-2.5 rounded-full bg-white bg-opacity-10 text-base">
                <span>Status:</span>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full ${onlineStatus ? "bg-green-400" : "bg-red-500"} mr-2`}></span>
                  <span>{onlineStatus ? "Online" : "Offline"}</span>
                </div>
              </div>
              <span className="text-white font-medium px-5 py-2.5 rounded-full bg-white bg-opacity-10 text-lg">{loggedInUser}</span>
              <button
                className="bg-amber-400 hover:bg-amber-300 text-teal-900 px-5 py-2.5 rounded-full transition duration-200 font-semibold text-lg"
                onClick={() => {
                  setBtnNameReact(btnNameReact === "Login" ? "Log Out" : "Login");
                  toggleMenu();
                }}
              >
                {btnNameReact}
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

