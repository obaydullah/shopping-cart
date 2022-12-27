import React, { useEffect, useState } from "react";
import { BsCartDashFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { removeLogin } from "../features/login/loginSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [cartQuantity, setCartQuantity] = useState(0);

  const { loggedIn, admin } = useSelector((state) => state.login);

  const cartItems = useSelector((state) => state.cart);

  //Calculate Sub Total
  let cartQuantity = 0;
  const calculateSubTotal = (e) => {
    cartItems.map((item) => {
      cartQuantity += item.quantity;
      return cartQuantity;
    });
  };
  calculateSubTotal();

  //Logout
  const handleLogout = () => {
    dispatch(removeLogin());
  };

  return (
    <>
      <div className="bg-green-600/80 p-3">
        <div className="max-w-container mx-auto flex justify-between items-center">
          <Link to="/" className="text-white text-2xl cursor-pointer">
            Logo
          </Link>
          <ul className="flex items-center gap-3 text-white">
            <Link to="/" className="menu-link hover:menu-link-hover">
              Products
            </Link>
            <a href="#" className="menu-link hover:menu-link-hover">
              About
            </a>
            <a href="#" className="menu-link hover:menu-link-hover">
              Contact
            </a>
            <Link
              to="/dashboard"
              href="#"
              className={`menu-link hover:menu-link-hover ${
                !loggedIn && !admin && "hidden"
              }`}
            >
              Account
            </Link>
            <Link
              to="/login"
              className={`menu-link hover:menu-link-hover ${
                loggedIn && "hidden"
              }`}
            >
              Login
            </Link>
          </ul>
          <div className="flex items-center gap-10">
            <Link
              to="/cart"
              className="text-white text-2xl cursor-pointer py-2 relative"
            >
              <BsCartDashFill />
              {cartQuantity > 0 && (
                <span className="absolute top-0 -right-4 text-[12px] leading-3 rounded  p-1 bg-red-600 text-white opacity-70">
                  {cartQuantity}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className="text-white text-2xl cursor-pointer py-2"
              onClick={handleLogout}
            >
              <FiLogOut />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
