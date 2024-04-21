// ------------------------------------------------------
// Prerequisites
// ------------------------------------------------------
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import { useUserContext } from "../../Config/Context/AuthProvider";
// ------------------------------------------------------
// Styles
// ------------------------------------------------------
import "../../../AppStyles/global.css";
import "../../../AppStyles/colors.css";
import "../../../AppStyles/Login-Signup.css";
// ------------------------------------------------------
// Components
// ------------------------------------------------------
import WebHeader from "../HeroComponents/WebHeader";
import { useUserContext } from "../../Config/Context/UserProvider";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state ? location.state.userType : null;

  // const { setUser } = useUserContext();

  const createAccount = () => {
    navigate("/signup", { state: { userType } });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const {setUser} = useUserContext();
// console.log("setUser",setUser);
  const auth = getAuth();
// console.log("auth",auth);
// console.log("email",email);
// console.log("password",password);
// console.log(useUserContext)

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return; 
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("user in  signInWithEmailAndPassword",user);
      setUser(user.user);
      navigate("/profile")
    } catch (error) {
      setError("Please check your email and password.");
      console.log(error);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 px-6 pt-5">
        <div className="col-span-1">
          <WebHeader />
        </div>
        <div className="col-span-1 flex flex-col justify-center align-middle pt-5">
          <div className="form-upper w-[100%]">
            <p className="font-1 f-color-2 text-center w-[100%]">join as</p>
            <p className="font-7 f-color-2 text-5xl text-center w-[100%] uppercase">
            {userType && <>{userType}</>}
            </p>
          </div>
          <div className="form-middle gap-5 mt-6">
            <input
              type="text"
              placeholder="@ enter email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full 
              max-w-xs md:max-w-md text-white font-bold rounded-full p-8 bg-color-8 
              placeholder-color-text no-focus-outline"
            />
            <input
              type="password"
              placeholder="# enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full max-w-xs md:max-w-md text-white font-bold rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              className="btn mt-10 w-[90%] md:w-[30%] h-[3.5rem] rounded-full create-acc-btn font-8 text-md text-center"
              onClick={handleLogin}
            >
              LOGIN
            </button>
          </div>
          <div className="form-lower pb-10">
            <p className="font-7 f-color-2 text-2xl text-center w-[100%] mt-8">
              OR
            </p>
            <div className="line mt-6 w-[90%] md:w-[30%]"></div>
            <button
              className="btn mt-4 w-[90%] md:w-[30%] h-[3.5rem] rounded-full create-acc-btn font-8 text-md text-center"
              onClick={createAccount}
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
