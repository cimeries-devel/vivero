import { collection, doc, onSnapshot } from "firebase/firestore";

export const snapshotDocument = (db, id, setLoading, setDataDocument) => {
  const docRef = doc(db, 'pi', id); // Reemplaza con el nombre de tu colección y el ID del documento
  const unsubscribe = onSnapshot(docRef, (doc) => {
    if (doc.exists()) {
      setDataDocument(doc.data())
      setLoading(true)
    } else {
      console.log("No such document!");
    }
  }, (error) => {
    console.error("Error al escuchar cambios:", error);
  });

  // Guarda la función unsubscribe para poder dejar de escuchar los cambios cuando ya no sean necesarios
  return unsubscribe;
};

export const snapshotCollection = (db, id, setDataCollection) => {
  const collectionRef = collection(db, id); // Reemplaza con el nombre de tu colección
  const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
    const data = snapshot.docs.map((doc) => doc.data());
    setDataCollection(data);
  }, (error) => {
    console.error("Error al escuchar cambios:", error);
  });

  return unsubscribe;
};
