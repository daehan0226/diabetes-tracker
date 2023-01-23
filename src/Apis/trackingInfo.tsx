import { db } from "./";
import { ITrackingInfo, MealType } from "../@types";
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
import { getUserId } from "../Hepler";

const collectionName = process.env.REACT_APP_FIREBASE_DILAY_TRACKING_COLLECTION;

const removeUndefines = (doc: ITrackingInfo) => {
  if (!doc.bloodSugar) {
    delete doc.bloodSugar;
  }
  if (!doc.imageUrl) {
    delete doc.imageUrl;
  }
};

async function createTracking(newDoc: ITrackingInfo) {
  removeUndefines(newDoc);
  try {
    const userId: string = getUserId();
    if (userId) {
      const oldDoc = await getTrackingBy(userId, newDoc.date, newDoc.type);
      if (oldDoc && oldDoc.id) {
        const upsertDoc = {
          ...oldDoc,
          ...newDoc,
        };
        console.log(upsertDoc);
        await setDoc(doc(db, collectionName, oldDoc.id), {
          ...upsertDoc,
        });
      } else {
        await addDoc(collection(db, collectionName), {
          ...newDoc,
          userId,
        });
      }
    }

    return true;
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

interface ITrackingInfoDoc extends ITrackingInfo {
  id: string;
  userId: string;
}

async function getTrackingBy(
  userId: string,
  date: string,
  type: MealType
): Promise<ITrackingInfoDoc | null> {
  let q = query(collection(db, collectionName), where("userId", "==", userId));
  q = query(q, where("date", "==", date));
  q = query(q, where("type", "==", type));

  const snapshot = await getDocs(q);
  if (snapshot.docs.length > 0) {
    const tracking = snapshot.docs[0];
    const { text, bloodSugar, imageUrl } = tracking.data();

    return {
      id: tracking.id,
      date,
      type,
      text,
      bloodSugar,
      imageUrl,
      userId,
    };
  }
  return null;
}

export { createTracking, getTracking };
