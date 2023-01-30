import { db } from "./";
import { ITrackingInfo, MealType, ITrackingInfoDoc } from "../@types";
import {
  setDoc,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
const collectionName = process.env.REACT_APP_FIREBASE_DILAY_TRACKING_COLLECTION;

async function createTracking(userId: string, newDoc: ITrackingInfo) {
  try {
    if (userId) {
      const oldDoc = await getTrackingBy(userId, newDoc.date, newDoc.type);
      if (oldDoc?.length > 0 && oldDoc[0].id) {
        await setDoc(doc(db, collectionName, oldDoc[0].id), {
          ...newDoc,
          userId,
        });
      } else {
        await addDoc(collection(db, collectionName), {
          ...newDoc,
          userId,
        });
      }
      return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function getTracking(userId: string): Promise<ITrackingInfo[]> {
  const snapshot = await getDocs(
    query(collection(db, collectionName), where("userId", "==", userId))
  );
  return snapshot.docs.map((doc) => {
    const { text, type, bloodSugar, imageUrl, date } = doc.data();
    return { id: doc.id, text, date, type, bloodSugar, imageUrl };
  });
}

async function getTrackingBy(
  userId: string,
  date: string,
  type?: MealType
): Promise<ITrackingInfoDoc[]> {
  let q = query(collection(db, collectionName), where("userId", "==", userId));
  q = query(q, where("date", "==", date));

  if (type) {
    q = query(q, where("type", "==", type));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((data) => {
    const { text, bloodSugar, imageUrl, type } = data.data();
    return {
      id: data.id,
      date,
      type,
      text,
      bloodSugar,
      imageUrl,
      userId,
    };
  });
}

export { createTracking, getTracking, getTrackingBy };
