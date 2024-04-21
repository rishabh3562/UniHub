import React, { useState, useEffect } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { db, storage } from "../../../App/Config/Firebase/firebase-config";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const ScheduleEventModal = ({ allData }) => {
  const [uploadedMessage, setUploadedMessage] = useState("");
  const [uploadedSpeakerMessage, setUploadedSpeakerMessage] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [webinarLink, setWebinarLink] = useState("");
  const [speakerName, setSpeakerName] = useState("");
  const [speakerImage, setSpeakerImage] = useState(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(
    localStorage.getItem("isLoading") === "true" ? true : false
  );
  const [error, setError] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setUploadedMessage("Uploaded!");
  };

  const handleSpeakerFileUpload = (event) => {
    const file2 = event.target.files[0];
    setSpeakerImage(file2);
    setUploadedSpeakerMessage("Uploaded!");
  };

  const handleCloseModal = () => {
    const modalElement = document.getElementById("my_modal_5");
    modalElement.close();
  };

  const resetError = () => {
    setError("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !date ||
      !time ||
      !webinarLink ||
      !speakerName ||
      !description
    ) {
      setError("Please fill in all the required fields.");
      return;
    } else {
      setError("");
    }

    setIsLoading(true);
    try {
      const path = `Webinar/Thumbnail/${Date.now()}`;
      const imageRef = ref(storage, path);
      await uploadBytes(imageRef, image);
      const thumbnailImageUrl = await getDownloadURL(imageRef);

      const path1 = `Webinar/ProfilePhoto/${Date.now()}`;
      const imageRef1 = ref(storage, path1);
      await uploadBytes(imageRef1, speakerImage);
      const profileImageUrl = await getDownloadURL(imageRef1);
      const webinarCollection = collection(db, "webinar");
      const webinarDoc = doc(webinarCollection);
      await setDoc(webinarDoc, {
        id: uuidv4(),
        // rfmwId: allData.rfmwid,
        title,
        date,
        time,
        webinarLink,
        speakerName,
        profileImageUrl,
        // speakerId: allData.mentorid,
        // requestSenderId: allData.userid,
        description,
        thumbnailImageUrl,
        createdAt: Date.now(),
      });

      console.log("webinar added successfully");
      handleCloseModal();
      setIsLoading(false);
      localStorage.removeItem("isLoading");
      window.location.reload();
      console.log(speakerName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const rfmwCollection = collection(db, "rfmw");
      const q = query(rfmwCollection, where("rfmwid", "==", allData.rfmwid));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Document not found");
        return;
      }

      // Show a SweetAlert confirmation dialog
      const { isConfirmed } = await Swal.fire({
        title: "Confirm Delete",
        text: "Are you sure you want to delete this photo?",
        icon: "warning",
        showCancelButton: true,
      });

      if (!isConfirmed) {
        return;
      }

      querySnapshot.forEach(async (rfmwDoc) => {
        const rfmwDocRef = doc(rfmwCollection, rfmwDoc.id);
        await updateDoc(rfmwDocRef, {
          isDeleted: true,
        });
      });

      // Show a success SweetAlert dialog
      Swal.fire("Photo deleted successfully", "", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <>
      <div className="relative bottom-0 mx-2 md:mx-6">
        <div className="flex justify-between align-middle gap-2">
          <button
            className="btn bg-color-3 border-none w-[85%] font-6 rounded-lg"
            onClick={() => {
              document.getElementById("my_modal_5").showModal();
              resetError(); 
            }}
          >
            Schedule event
          </button>
          <button
            className="btn bg-color-8 border-none w-[15%] font-6 rounded-lg"
            onClick={handleDelete}
          >
            <RiDeleteBin6Fill size={20} className="f-color-3" />
          </button>
        </div>
        <dialog
          id="my_modal_5"
          className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
        >
          <div className="modal-box bg-color-2">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
              <h3 className="font-bold text-lg font-8">
                Post Oppurtunities for Juniors
              </h3>
              <label
                htmlFor="fileInput"
                className="file-input-label font-1 text-xs f-color-3 mt-4"
              >
                Event Banner
              </label>
              <input
                type="file"
                className="col-span-1 file-input w-full placeholder-color-text bg-color-7"
                onChange={handleFileUpload}
              />
              <div className="font-2 text-sm text-green-500 w-[100%]">
                <p className="text-center my-2">{uploadedMessage}</p>
              </div>
              <input
                type="text"
                id="titleoffile"
                placeholder="enter event name"
                className="col-span-1 py-4 mt-3 bg-color-7 border-hidden placeholder-color-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="date"
                  id="titleoffile"
                  placeholder="enter date"
                  className="col-span-1 py-4 mt-3 bg-color-7 border-hidden placeholder-color-text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                <input
                  type="time"
                  id="titleoffile"
                  placeholder="enter time"
                  className="col-span-1 py-4 mt-3 bg-color-7 border-hidden placeholder-color-text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="enter webinar link"
                  className="col-span-1 py-4 mb-3 bg-color-7 border-hidden placeholder-color-text"
                  value={webinarLink}
                  onChange={(e) => setWebinarLink(e.target.value)}
                />
                <input
                  type="text"
                  id="titleoffile"
                  placeholder="enter speaker name"
                  className="col-span-1 py-4 mb-3 bg-color-7 border-hidden placeholder-color-text"
                  value={speakerName}
                  onChange={(e) => setSpeakerName(e.target.value)}
                />
              </div>
              <label
                htmlFor="fileInput"
                className="file-input-label font-1 text-xs f-color-3"
              >
                Speaker image
              </label>
              <input
                type="file"
                className="col-span-1 file-input w-full placeholder-color-text bg-color-7 mb-4"
                onChange={handleSpeakerFileUpload}
              />
              <div className="font-2 text-sm text-green-500 w-[100%]">
                <p className="text-center my-2">{uploadedSpeakerMessage}</p>
              </div>
              <textarea
                rows="4"
                type="text"
                id="titleoffile"
                placeholder="enter event description"
                className="py-4 mt-0 mb-6 bg-color-7 font-2 border-hidden placeholder-color-text w-[100%] rounded-xl"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {error && <div className="text-red-600 text-center my-2">{error}</div>}
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
          </div>
        </dialog>
      </div>
    </>
  );
};

export default ScheduleEventModal;
