import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../Config/Firebase/firebase-config";
import { getCurrentUserData } from "../../../utils/firebaseapi/getCurrentUserData";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const AddPost = () => {
  const user = auth.currentUser;
  const [value, setValue] = useState("");
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(false);

      if (user) {
        try {
          const userDataValue = await getCurrentUserData(user);
          setUserData(userDataValue);
          setIsLoading(false);
        } catch (error) {
          console.log("user not found", error);
        }
      }
    };
    fetchUserData();
  }, [user, setUserData]);

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],

    ["clean"],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async () => {
    const delta = value;

    const discussionCollection = collection(db, "discussions");
    const discussionDoc = doc(discussionCollection);
    await setDoc(discussionDoc, {
      id: uuidv4(),
      delta,
      userName: userData.name,
      userImage: userData.imageUrl,
      createdAt: Date.now(),
    });

    console.log(delta);
    navigate("/discussion");
  };

  return (
    <>
      <div className="grid grid-cols-4 px-6 pb-8 pt-24">
        <div className="col-span-4">
          <h1 className="text-4xl md:text-6xl font-6 f-color-1">
            Start a <span className="f-color-3">Topic</span>
          </h1>
          <p className="text-sm md:text-lg font-1 f-color-1">
            Add your thoughts and spread through community
          </p>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
        <div className="col-span-4 lg:col-span-2 w-[100%] h-[30rem] my-8">
          <div className="h-[100%] w-[100%]">
            <ReactQuill
              value={value}
              onChange={setValue}
              modules={module}
              className="h-[80%] w-[100%]"
            />
          </div>
          <button
            className="btn bg-color-3 border-none w-[100%] font-6 rounded-lg mt-12 lg:mt-2 mb-10"
            onClick={handleSubmit}
          >
            Create Post
          </button>
        </div>
        <div className="col-span-4 lg:col-span-1"></div>
        <style>
          {`
          .ql-editor {
            color: #FFF8E8;
          }
          .ql-toolbar button {
            color: #FFF8E8;
          }
        `}
        </style>
      </div>
    </>
  );
};

export default AddPost;
