import { DataDocument } from "../context/context";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { firebase } from "../fb-credentials";

export const queryCollections = async (dates: string[]) => {
  let dataAll = Array<DataDocument>();
  try {
    const db = getFirestore(firebase);
    const promises = dates.map(async (name_collection) => {
      const querySnapshot = await getDocs(collection(db, name_collection));
      const documents = Array<DataDocument>();
      querySnapshot.forEach((doc) => {
        documents.push(doc.data() as DataDocument);
      });
      return documents;
    });
    const results = await Promise.all(promises);
    const data = results.map((result) => result);
    dataAll = data.flat();
  } catch (error) {
    console.error("error read colections", error);
  }
  return dataAll;
};

export const queryCollection = async (date: string) => {
  const db = getFirestore(firebase);
  try {
    const collectionRef = collection(db, date);
    const query = await getDocs(collectionRef);
    const data = Array<DataDocument>()
    query.forEach((doc) => {data.push(doc.data() as DataDocument)});
    return data;
  } catch (error) {
    return Array<DataDocument>()
  }
};
