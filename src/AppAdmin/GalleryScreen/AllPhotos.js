import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import { BsPlus } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { SlCloudUpload } from "react-icons/sl";
import GalleryCluster from "./components/GalleryCluster";
import { auth, db, storage } from "../../App/Config/Firebase/firebase-config";
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
import { useUserContext } from "../../App/Config/Context/UserProvider";
import { getCurrentUserData } from "../../utils/firebaseapi/getCurrentUserData";

const AllPhotos = () => {
  const [uploadedMessage, setUploadedMessage] = useState("");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem("isLoading") === "true" ? true : false
  );
  const [isMessageEmpty, setIsMessageEmpty] = useState(false);
  const [userData, setUserData] = useState({});

  const { user } = useUserContext();
  

  useEffect(() => {
    const fetchUserData = async () => {
      // setIsLoading(false);
      if (user) {
        try {
          const userDataValue = await getCurrentUserData(user);
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
      console.log("gallery added successfully");
      handleCloseModal();
      setIsLoading(false);
      localStorage.removeItem("isLoading");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      const galleryCollection = collection(db, "gallery");
      const galleryDocs = await getDocs(
        query(galleryCollection, orderBy("createdAt", "desc"), where("isDeleted", "==", false))
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
      <NavigationBar />
      <div className="grid grid-cols-2 pt-20">
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            All <span className="f-color-3">Photos</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            Lets check the event photos
          </p>
        </div>
        <div className="col-span-2 mt-8 px-5 md:px-6 flex justify-between align-middle flex-wrap">
          <div
            className="flex items-center mb-5 md:mb-0"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            <div className="p-3 bg-color-3 rounded-full">
              <BsPlus className="text-4xl" />
            </div>
            <button className="font-1 f-color-1 px-4">Upload image</button>
            {/* UPload Modal  */}
            <dialog id="my_modal_5" className="modal backdrop-blur-sm ">
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
          <div className="flex">
            <div className="absolute p-3 bg-color-3 rounded-full mt-2 md:mt-1 md:ml-[-10px]">
              <CiSearch className="text-4xl md:text-3xl" />
            </div>
            <input
              type="text"
              className="px-16 py-4 md:py-3.5 mt-2 md:mt-0 border-dashed border-2 rounded-full bg-color-4"
              placeholder="Search photos"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <div className="col-span-2 mt-8 px-5 md:px-6">
          <GalleryCluster PhotoDataProps={filteredPhotos} />
        </div>
      </div>
    </>
  );
};

export default AllPhotos;
