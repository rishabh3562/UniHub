import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3 } from "react-icons/hi";
import logo1 from "../App/assets/logo.png";
import "../AppStyles/global.css";
import { auth } from "../App/Config/Firebase/firebase-config";
import { TbLogout } from "react-icons/tb";

const NavigationBar = () => {

  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await auth.signOut();
      navigate("/admin-login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="navbar pt-4 fixed z-50 bg-color-4">
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost normal-case text-xl">
            <img src={logo1} className="h-[3rem] w-[3rem]" />
            <p className="font-2 f-color-2 text-sm">UniHub Admin</p>
          </Link>
        </div>
        <div className="flex-none">
          <button type="submit" className="btn bg-color-3 border-none" onClick={handleLogout} >
            <TbLogout className="f-color-4" size={15} />
          </button>
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
