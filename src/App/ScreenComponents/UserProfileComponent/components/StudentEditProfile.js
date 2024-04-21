import React, { useState } from "react";
import { auth, db, storage } from "../../../Config/Firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";

const StudentEditProfile = () => {
  const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [department, setDepartment] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  const user = auth.currentUser;
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleAddStudentData = async (e) => {
    e.preventDefault();

    try {
      const path = `users/student/${user.uid}/${Date.now()}`;
      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      const usersCollection = collection(db, "users");
      const userDoc = doc(usersCollection, user.uid);
      await setDoc(userDoc, {
        id: user.uid,
        name,
        email: user.email,
        phone,
        department,
        currentYear,
        imageUrl,
        userType: "student",
      });
      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 px-2 pt-5">
        <div className="col-span-4 flex flex-col justify-center align-middle pt-5">
          <p className="font-1 f-color-2 text-center w-[100%]">Add data to</p>
          <p className="font-7 f-color-2 text-5xl text-center w-[100%] uppercase">
            PROFILE
          </p>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
        <div className="col-span-4 lg:col-span-2 flex flex-col justify-center align-middle pt-5">
          <div className="form-middle gap-5 mt-6 px-4 w-[100%]">
            <input
              type="file"
              className="file-input  text-white rounded-full file-input-ghost w-full md:max-w-md file-input-lg"
              onChange={handleImageChange}
            />
            <input
              type="text"
              placeholder="& Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full text-white font-bold md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="@ Enter your email"
              value={user.email}
              className="input w-full font-bold md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
              disabled
            />
            <input
              type="text"
              placeholder="~ Enter your contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input text-white font-bold w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="text"
              placeholder="? What's your department?"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input text-white font-bold w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="text"
              placeholder="? What's your current year? (eg: 1st/2nd/3rd/4th)"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="input text-white font-bold w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <button
              type="submit"
              className="btn mt-5 mb-10 w-[100%] md:w-[60%] h-[4rem] rounded-full create-acc-btn font-8 text-md text-center"
              onClick={handleAddStudentData}
            >
              ADD DATA
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentEditProfile;
