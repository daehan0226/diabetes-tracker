import { db } from "./";
import { ITrackingInfo } from "../@types";
import {
  setDoc,
  updateDoc,
  addDoc,
  doc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { getEmail } from "../Hepler";

const collectionName = "tracking";

async function createTracking(newDoc: ITrackingInfo) {
  try {
    const email: string = getEmail();
    if (email) {
      const result = await addDoc(collection(db, collectionName), {
        ...newDoc,
        email,
      });
    }

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getTracking(email: string): Promise<ITrackingInfo[]> {
  const snapshot = await getDocs(
    query(collection(db, collectionName), where("email", "==", email))
  );
  return snapshot.docs.map((doc) => {
    const { time, text, type, bloodSugar, imageUrl, date } = doc.data();
    return { id: doc.id, text, time, date, type, bloodSugar, imageUrl };
  });
}

export { createTracking, getTracking };
