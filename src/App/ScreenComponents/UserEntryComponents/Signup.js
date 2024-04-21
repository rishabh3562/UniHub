import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WebHeader from "../HeroComponents/WebHeader";
// import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Config/Firebase/firebase-config";
import { useUserContext } from "../../Config/Context/UserProvider";

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state ? location.state.userType : null;

  const { setUser } = useUserContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginAccount = () => {
    console.log(userType);
    navigate("/login", { state: { userType } });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
     console.log("data in createUserWithEmailAndPassword",data);
     
      setUser(data.user);
      navigate('/profile-edit', { state: { userType } })
    } catch (error) {

    }
  }

  return (
    <>
      <div className="grid grid-cols-1 px-6 pt-5">
        <div className="col-span-1">
          {/* You may include your WebHeader component here */}
          <WebHeader />
        </div>
        <div className="col-span-1 flex flex-col justify-center align-middle pt-5">
          <div className="form-upper w-[100%]">
            <p className="font-1 f-color-2 text-center w-[100%]">
              create account as
            </p>
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
              className="input 
              w-full max-w-xs
               md:max-w-md
               rounded-full p-8 
               bg-color-8 
               placeholder-color-text 
               text-white
               font-bold
               no-focus-outline"
            />
            <input
              type="password"
              placeholder="# enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full max-w-xs    text-white
              font-bold md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              className="btn mt-8 w-[90%] md:w-[30%] h-[3.5rem] rounded-full create-acc-btn font-8 text-md text-center"
              onClick={handleSignUp}
            >
              SIGN UP
            </button>
          </div>
          <div className="form-lower pb-10">
            <p className="font-7 f-color-2 text-2xl text-center w-[100%] mt-8">
              OR
            </p>
            <div className="line mt-6 w-[90%] md:w-[30%]"></div>
            <div className="grid grid-cols-4 gap-8">
              <div className="col-span-2 form-lower">
                <p className="font-3 f-color-2 mt-8">
                  Already have an account?
                </p>
              </div>
              <div className="col-span-2">
                <button
                  className="btn mt-10 w-[100%] h-[3.5rem] rounded-full create-acc-btn font-8 text-md text-center"
                  onClick={loginAccount}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Signup;
