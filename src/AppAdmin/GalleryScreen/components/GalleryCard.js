import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { MdDeleteOutline } from "react-icons/md";
import { collection, doc, deleteDoc, updateDoc, where, query, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../../App/Config/Firebase/firebase-config";
import Swal from 'sweetalert2';


const GalleryCard = (props) => {

  const navigate = useNavigate();

  // console.log(props);
  
  const handleDeletePhoto = async () => {
    try {
      const galleryCollection = collection(db, "gallery");
      const q = query(galleryCollection, where("id", "==", props.id));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("Document not found");
        return;
      }

      // Show a SweetAlert confirmation dialog
      const { isConfirmed } = await Swal.fire({
        title: 'Confirm Delete',
        text: 'Are you sure you want to delete this event?',
        icon: 'warning',
        showCancelButton: true,
      });

      if (!isConfirmed) {
        return;
      }

      querySnapshot.forEach(async (galleryDoc) => {
        const galleryDocRef = doc(galleryCollection, galleryDoc.id);
        await updateDoc(galleryDocRef, {
          isDeleted: true,
        });
      });
      
      // Show a success SweetAlert dialog
      Swal.fire('Event deleted successfully', '', 'success').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error deleting image and data:", error);
    }
  };


  function redirect() {
    navigate(`/alumni-details/`, { state: { individualId: props.userid } });
  }

  

  return (
    <>
      <div className="">
        <div className="flex justify-center">
          <div className="rounded-3xl bg-color-4">
            <div
              className="flex justify-start align-middle gap-4 mb-6 cursor-pointer"
            >
              <button className="btn btn-ghost w-15 rounded-full bg-color-8 outline-none border-none " onClick={handleDeletePhoto}>
                <MdDeleteOutline className="f-color-3" size={22} />
              </button>
              <div className="avatar" onClick={redirect}>
                <div className="w-12 rounded-full">
                  <img
                    src={props.userimage}
                    alt="Tailwind-CSS-Avatar-component"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="f-color-2 font-6 text-lg">{props.username}</p>
                <p className="f-color-5 text-xs">Posted by {moment(props.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            </div>
            <div className="my-3">
              <p className="f-color-5 text-sm">{props.title}</p>
            </div>
            <a href={props.imageUrl} download={`UniHub_memory_${props.title}`}>
              <figure className="galler-img">
                <img className="" src={props.imageUrl} alt="" />
              </figure>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryCard;
