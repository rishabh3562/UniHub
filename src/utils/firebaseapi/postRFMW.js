import { collection, setDoc } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";
import { v4 as uuidv4 } from 'uuid';

// const rfmwid = uuidv4(); 

export const postRFMW = async (data) => {
    const rfmwCollection = collection(db, "rfmw");
    await setDoc (rfmwCollection, {
        userid: data.userid,
        username: data.username,
        useremail: data.useremail,
        userimgurl: data.userimgurl,
        message: data.message,   
        mentorid: data.mentorid,     
        mentorname: data.mentorname,
        mentoremail: data.mentoremail,
        mentorcontactno: data.mentorcontactno,
    });
    console.log("RFMW data added successfully");
} 