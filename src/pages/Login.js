import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputBox from "../components/InputBox";
import { useSelector, useDispatch } from "react-redux";
import { activeLogin } from "../features/login/loginSlice";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const registerArray = useSelector((state) => state.register);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerArray.length > 0) {
      registerArray.find((item) => {
        if (item.phone == phone && item.password == password) {
          dispatch(activeLogin({ phone, password, admin: item.admin }));
          alert("Login successfull");
          navigate("/");
          setError("");
          return;
        } else {
          setError("phone or password doesn't match");
        }
      });
    } else {
      alert("Couldn't find Login info. please register first");
    }
  };

  return (
    <div className="max-w-container mx-auto py-4 text-center">
      <h2 className="text-3xl mb-4">Login</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 max-w-[50%] mx-auto p-4"
      >
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
        <button
          type="submit"
          className="login-register-btn"
          onClick={handleSubmit}
        >
          Login
        </button>
        <p className="text-sm py-4 text-gray-500">
          Do not have an account ?{" "}
          <Link to="/register" className="text-green-600 text-base">
            Go to Register
          </Link>
        </p>

        {error && <h3 className="text-red-500">{error}</h3>}
      </form>
    </div>
  );
}
