import React, { useState } from "react";
import Logo from "../../App/assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../../App/Config/Context/UserProvider";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";

const AdminLogin = () => {

 
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {setUser} = useUserContext();
  const auth = getAuth();

  const [authUser, setAuthUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      setUser(user.user);
      console.log(user.user.email)

      //--------------------------------
      //      admin Signup
      //--------------------------------

      // const authResult = await createUserWithEmailAndPassword(auth, email, password);
      // const user = authResult.user;
      // setAuthUser(user);

      // const userRef = doc(db, "users", authUser.uid);
      // await setDoc(userRef, {
      //   name: 'UniHub Admin',
      //   email: authUser.email,
      //   userType: 'admin',
      //   id: authUser.uid
      // })

      navigate("/dashboard")
      console.log(user.user)
    } catch (error) {
      console.log(error);
    }
  }

  
  return (
    <>
      <div className="grid grid-cols-1 px-6 pt-5">
        <div className="col-span-1">
          <Link to="/admin-login" className="btn btn-ghost normal-case text-xl">
            <figure className="">
              <img
                src={Logo}
                className="h-[3rem] w-[3rem]"
                alt="UniHub-logo"
              />
            </figure>
          </Link>
        </div>
        <div className="col-span-1 flex flex-col justify-center align-middle pt-28">
          <div className="form-upper w-[100%]">
            <p className="font-1 f-color-2 text-center w-[100%]">
              welcome back
            </p>
            <p className="font-7 f-color-2 text-5xl text-center w-[100%]">
              {/* {userType && <>{userType}</>} */}ADMIN
            </p>
          </div>
          <div className="form-middle gap-5 mt-6">
            <input
              type="text"
              placeholder="@ enter email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input w-full max-w-xs md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="password"
              placeholder="# enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input w-full max-w-xs md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            {error && <div className="text-red-500 text-center">{error}</div>}
            <button
              className="btn mt-10 w-[90%] md:w-[30%] h-[3.5rem] rounded-full create-acc-btn font-8 text-md text-center"
                onClick={handleLogin}
            >
              LOGIN
            </button>
            <div className="text-red-500 text-center mt-4 hidden">error</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
