import React, { useState } from "react";
import InputBox from "../components/InputBox";
import { Link, useNavigate } from "react-router-dom";
import { activeRegister } from "../features/register/registerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Register() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [admin, setAdmin] = useState(false);

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerArr = useSelector((state) => state.register);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!phone || !password || !admin) {
      return alert("Please fill all the field");
    }
    if (!phone.match(/(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/)) {
      return alert("Please type a valid Bangladeshi Phone Number");
    }
    if (password.trim().length < 5) {
      return alert("Your password must be at least five");
    }

    dispatch(activeRegister({ name, phone, password, admin }));

    registerArr.map((item) => {
      if (item.phone === phone) {
        setError("Phone number already exist");
      } else {
        setName("");
        setPhone("");
        setPassword("");

        navigate("/login");
      }
    });
  };

  const test = (e) => {
    console.log(e.target.value);
  };

  return (
    <>
      <div className="max-w-container mx-auto py-4 text-center">
        <h2 className="text-3xl mb-4">Registration</h2>
        <form
          className="bg-gray-100 max-w-[50%] mx-auto p-4"
          onSubmit={handleRegister}
        >
          <InputBox
            type="text"
            placeholder="type your name"
            labelText="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputBox
            type="number"
            placeholder="type your phone number"
            labelText="Phone Number"
            id="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <InputBox
            type="password"
            placeholder="Enter your password"
            labelText="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="flex items-center">
            <h3 className="block text-left text-gray-500 text-sm py-2 mr-4">
              Admin
            </h3>
            <div>
              <label
                className="radio mr-2"
                onChange={(e) => setAdmin(e.target.value)}
              >
                <input
                  name="radio"
                  type="radio"
                  className="mr-1"
                  value={true}
                />
                <span>true</span>
              </label>
              <label
                className="radio"
                onChange={(e) => setAdmin(e.target.value)}
              >
                <input
                  name="radio"
                  type="radio"
                  className="mr-1"
                  value={false}
                />
                <span>false</span>
              </label>
            </div>
          </div>

          <button type="submit" className="login-register-btn">
            Signup
          </button>
          <p className="text-sm py-4 text-gray-500">
            Already have an account ?{" "}
            <Link to="/login" className="text-green-600 text-base">
              Go to Login
            </Link>
          </p>
          {error && <h3 className="text-red-500">{error}</h3>}
        </form>
      </div>
    </>
  );
}
