import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../App/Config/Firebase/firebase-config";


export const getCurrentUserData = async (user) => {
    const userRef = collection(db, "users");
    console.log("userRef: ", userRef);
    const q = query(userRef, where("id", "==", user.uid));
    console.log("q: ",q);
    const querySnapshot = await getDocs(q);
    console.log("querySnapshot",querySnapshot);
    let userData = null;
    querySnapshot.forEach((doc) => {
        userData = doc.data();
    });
    return userData;
}