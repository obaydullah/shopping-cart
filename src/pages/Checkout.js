import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkout } from "../features/checkout/checkoutSlice";
import { clearCart } from "../features/cart/cartSlice";

export default function Checkout() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [postCode, setPostCode] = useState("");

  let cartItems = useSelector((state) => state.cart);
  let { phone: adminPhone } = useSelector((state) => state.login);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !country || !address || !postCode) {
      return alert("Please fill all the field");
    }
    dispatch(
      checkout({
        cartItems,
        name,
        email,
        phone,
        country,
        address,
        postCode,
        adminPhone,
      })
    );

    alert("Order placed successfully");

    setName("");
    setEmail("");
    setPhone("");
    setCountry("");
    setAddress("");
    setPostCode("");

    dispatch(clearCart());

    navigate("/");
  };

  return (
    <>
      <div className="max-w-container mx-auto py-4 text-center">
        <h2 className="text-3xl mb-4">Checkout Information</h2>
        <form
          className="bg-gray-100 max-w-[50%] mx-auto p-4"
          onSubmit={handlePlaceOrder}
        >
          <h3 className="text-left text-gray-600 border-b border-solid border-gray-200">
            Customer Information
          </h3>
          <InputBox
            type="text"
            placeholder="type your phone name"
            labelText="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputBox
            type="email"
            placeholder="Enter your email"
            labelText="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputBox
            type="number"
            placeholder="Enter your phone number"
            labelText="Phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <h3 className="text-left text-gray-600 border-b border-solid border-gray-200">
            Shipping Address
          </h3>
          <label
            htmlFor="country"
            className="block text-left text-gray-500 text-sm py-2"
          >
            Country
          </label>

          <select
            id="country"
            className="block w-full focus:outline-none p-2 text-sm mb-1"
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Select</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="India">India</option>
            <option value="Pakistan">Pakistan</option>
          </select>

          <InputBox
            type="text"
            placeholder="Street adress"
            labelText="Street Address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <InputBox type="text" placeholder="City" labelText="City" id="city" />
          <InputBox
            type="number"
            placeholder="Postal Code"
            labelText="Postal Code"
            id="postcode"
            value={postCode}
            onChange={(e) => setPostCode(e.target.value)}
          />

          <button
            type="submit"
            className="login-register-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
}
