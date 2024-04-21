import React, { useState, useEffect } from "react";
import "../../../AppStyles/gallery.css";
import { BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SlCloudUpload } from "react-icons/sl";
import Card from "./components/Card";
import { auth, db, storage } from "../../Config/Firebase/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUserData } from "../../../utils/firebaseapi/getCurrentUserData";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Gallery = () => {
  const [uploadedMessage, setUploadedMessage] = useState("");

  const user = auth.currentUser;
  console.log("user in gallery js: ", user);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState([]);
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);
  const [userData, setUserData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem("isLoading") === "true" ? true : false
  );

  useEffect(() => {
    const fetchUserData = async () => {
      // setIsLoading(false);
      if (user) {
        try {
          const userDataValue = await getCurrentUserData(user);
          console.log("userDataValue: ", userDataValue);
          setUserData(userDataValue);
          // setIsLoading(true);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUserData();
  }, [user, setUserData]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setUploadedMessage("Uploaded!");
  };

  const handleCloseModal = () => {
    const modalElement = document.getElementById("my_modal_5");
    modalElement.close();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      alert("Please fill in the required fields.");
      return;
    }
    setIsLoading(true);

    try {
      const path = `gallery/${user.uid}/${Date.now()}`;
      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(imageRef);
      const galleryCollection = collection(db, "gallery");
      const galleryDoc = doc(galleryCollection);
      await setDoc(galleryDoc, {
        id: uuidv4(),
        userid: user.uid,
        title,
        imageUrl,
        username: userData.name,
        userimage: userData.imageUrl,
        isDeleted: false,
        createdAt: Date.now(),
      });
      handleCloseModal();
      setIsLoading(false);
      localStorage.removeItem("isLoading");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchGalleryData = async () => {
      const galleryCollection = collection(db, "gallery");
      const galleryDocs = await getDocs(
        query(
          galleryCollection,
          orderBy("createdAt", "desc"),
          where("isDeleted", "==", false)
        )
      );
      const allImageData = galleryDocs.docs.map((doc) => doc.data());
      setImageData(allImageData);
    };

    fetchGalleryData();
  }, []);

  const filteredPhotos = imageData.filter((photo) =>
    (photo.title?.toLowerCase() || "").includes(searchInput.toLowerCase())
  );

  return (
    <>
      <div>
        <div className="px-6 pb-8 pt-24 space-y-2">
          {filteredPhotos.length === 0 ? (
            <>
              <Skeleton className="h-[40px]" style={{ width: "50%" }} />
              <Skeleton className="h-[20px]" style={{ width: "40%" }} />
            </>
          ) : (
            <>
              <h1 className="text-4xl md:text-6xl font-6 f-color-1">
                Reunion <span className="f-color-3">Gallery</span>
              </h1>
              <p className="text-md md:text-xl font-1 f-color-1">
                Upload your snaps after reuniting you get reunited
              </p>
            </>
          )}
        </div>

        <div className="md:flex justify-between px-10 space-y-8 md:space-y-0">
          <div
            className="flex items-center"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            {filteredPhotos.length === 0 ? (
              <div className="w-[100%] flex justify-start align-middle gap-6 md:gap-10">
                <Skeleton height={60} width={60} circle={true} />
              </div>
            ) : (
              <>
                <div className="p-3 bg-color-3 rounded-full">
                  <BsPlus className="text-4xl" />
                </div>
                <button className="font-1 f-color-1 px-4">Upload image</button>
              </>
            )}
            <dialog id="my_modal_5" className="modal backdrop-blur-sm">
              <form method="dialog" className="modal-box bg-color-2">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
                <h3 className="font-bold text-lg font-8">Upload your memory</h3>
                <SlCloudUpload className="absolute f-color-3 text-6xl ml-[120px] md:ml-[200px] mt-[100px]" />
                <input
                  className="mt-6 placeholder-color-text"
                  type="file"
                  id="file"
                  onChange={handleFileUpload}
                />
                <div className="font-2 text-sm text-green-500">
                  {uploadedMessage}
                </div>
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="image title"
                  className="py-4 my-3 bg-color-7 border-hidden placeholder-color-text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                {isMessageEmpty && (
                  <p className="text-red-500 text-center mb-5">
                    Message cannot be empty
                  </p>
                )}
                <button
                  for="uploadfile"
                  className="bg-color-4 w-full f-color-1 p-3 rounded-xl font-6 "
                  onClick={handleUpload}
                >
                  {isLoading ? (
                    <>
                      <span className="loading loading-dots loading-md"></span>
                    </>
                  ) : (
                    <>
                      <span>UPLOAD</span>
                    </>
                  )}
                </button>
              </form>
            </dialog>
          </div>
          {filteredPhotos.length === 0 ? (
            <Skeleton
              className="h-[4rem] mb-3 w-[100%] md:w-[20%] mt-5"
              style={{ borderRadius: "40px" }}
            />
          ) : (
            <div className="flex">
              <div className="absolute p-3 bg-color-3 rounded-full mt-2 md:mt-1 md:ml-[-10px]">
                <CiSearch className="text-4xl md:text-3xl" />
              </div>
              <input
                type="text"
                className="pr-18 pl-20 py-4 md:py-3.5 mt-2 md:mt-0 border-dashed border-2 rounded-full bg-color-4"
                placeholder="Search image by name"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          )}
        </div>
        {filteredPhotos.length === 0 ? ( // Render skeleton loader while data is being fetched
          <div className="grid md:grid-cols-2 lg:grid-cols-3 py-16 gap-14">
            <div className="md:col-span-1 lg:col-span-1 flex justify-center align-middle">
              <div className="">
                <div className="flex justify-start align-middle gap-4">
                  <Skeleton height={60} width={60} circle={true} />
                  <Skeleton height={30} width={100} className="mt-4" />
                </div>
                <Skeleton height={200} width={320} className="mt-4" />
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-1 flex justify-center align-middle">
              <div className="">
                <div className="flex justify-start align-middle gap-4">
                  <Skeleton height={60} width={60} circle={true} />
                  <Skeleton height={30} width={100} className="mt-4" />
                </div>
                <Skeleton height={200} width={320} className="mt-4" />
              </div>
            </div>
            <div className="md:col-span-1 lg:col-span-1 flex justify-center align-middle">
              <div className="">
                <div className="flex justify-start align-middle gap-4">
                  <Skeleton height={60} width={60} circle={true} />
                  <Skeleton height={30} width={100} className="mt-4" />
                </div>
                <Skeleton height={200} width={320} className="mt-4" />
              </div>
            </div>
          </div>
        ) : (
          <Card imageDataProps={filteredPhotos} />
        )}
      </div>
    </>
  );
};

export default Gallery;
