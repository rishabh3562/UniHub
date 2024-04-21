import React, { useState, useEffect } from "react";
import { auth, db, storage } from "../../../Config/Firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, doc, updateDoc, getDoc } from "firebase/firestore";

const StudentUpdateProfile = () => {
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [department, setDepartment] = useState("");
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    // Fetch the user's current data from Firestore and set it in the state
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setName(userData.name || "");
        setPhone(userData.phone || "");
        setDepartment(userData.department || "");
        setCurrentYear(userData.currentYear || "");
        setImage(userData.imageUrl || ""); // Set the image URL
      }
    };
    fetchUserData();
  }, [user]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const imageRef = ref(storage, `users/student/${user.uid}/${Date.now()}`);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);

      const userDocRef = doc(db, "users", user.uid);

      // Update the user's data in the Firestore collection
      await updateDoc(userDocRef, {
        name,
        phone,
        department,
        currentYear,
        imageUrl, // Update the image URL
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
          <p className="font-1 f-color-2 text-center w-[100%]">Update</p>
          <p className="font-7 f-color-2 text-5xl text-center w-[100%] uppercase">
            PROFILE
          </p>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
        <div className="col-span-4 lg:col-span-2 flex flex-col justify-center align-middle pt-5">
          <div className="form-middle gap-5 mt-6 px-4 w-[100%]">
            {image && (
              <figure className="h-[150px] w-[150px] bg-cover object-cover">
                <img
                  src={image}
                  alt="Profile"
                  className="rounded-full h-[100%] w-[100%] bg-cover object-cover"
                />
              </figure>
            )}
            <input
              type="file"
              className="file-input rounded-full file-input-ghost w-full md:max-w-md file-input-lg"
              onChange={handleImageChange}
            />
            <input
              type="text"
              placeholder="& Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="text"
              placeholder="@ Enter your email"
              value={user.email}
              className="input w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
              disabled
            />
            <input
              type="text"
              placeholder="~ Enter your contact number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="text"
              placeholder="? What's your department?"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="input w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <input
              type="text"
              placeholder="? What's your current year?"
              value={currentYear}
              onChange={(e) => setCurrentYear(e.target.value)}
              className="input w-full md:max-w-md rounded-full p-8 bg-color-8 placeholder-color-text no-focus-outline"
            />
            <button
              type="submit"
              className="btn mt-5 mb-10 w-[100%] md:w-[60%] h-[4rem] rounded-full create-acc-btn font-8 text-md text-center"
              onClick={handleUpdateProfile}
            >
              UPDATE
            </button>
          </div>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
      </div>
    </>
  );
};

export default StudentUpdateProfile;
