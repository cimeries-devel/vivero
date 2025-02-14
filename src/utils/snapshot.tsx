import { collection, doc, Firestore, onSnapshot } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { DataDocument } from "../context/context";

export const snapshotDocument = (db: Firestore, id: string, setLoading: Dispatch<SetStateAction<boolean>>, setDataDocument:Dispatch<SetStateAction<DataDocument>>) => {
  const docRef = doc(db, 'pi', id);
  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      setDataDocument(doc.data() as DataDocument)
      setLoading(true)
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.error("Error al escuchar cambios:", error);
  });

  return unsubscribe;
};

export const snapshotCollection = (db: Firestore, id: string, setDataCollection:Dispatch<SetStateAction<DataDocument[]>>) => {
  const collectionRef = collection(db, id);
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data() as DataDocument);
    setDataCollection(data);
  }, (error) => {
    console.error("Error al escuchar cambios:", error);
  });

  return unsubscribe;
};
