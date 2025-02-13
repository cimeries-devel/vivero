import { getFirestore } from "firebase/firestore";
import React, { createContext, useEffect, useState } from "react";
import { firebase } from "../fb-credentials";
import { snapshotCollection, snapshotDocument } from "../utils/snapshot";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

interface Props {
  user: User | null,
  loading: boolean,
}


export const DataContext = createContext<Props>({user: null, loading: false});

export const DataProvider = ({children}: {children:React.ReactNode}) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataDocument, setDataDocument] = useState({
    date: '',
    time: '',
    soil_temperature: 0,
    soil_conductivity: 0,
    soil_moisture: 0,
    battery: 0,
    fixed_moisture_max: 0,
    fixed_moisture_min: 0
  });
  const [dataCollection, setDataCollection] = useState([]);


  useEffect(()=>{
    const db = getFirestore(firebase);
    const unsubscribe = snapshotDocument(db, 'lse01', setLoading, setDataDocument)
    return () => unsubscribe()
  }, [])

  useEffect(()=>{
    const data = new Date()
    const iso = data.toISOString();

    const db = getFirestore(firebase);
    const unsubscribe = snapshotCollection(db, iso.split("T")[0], setDataCollection);
    return () => unsubscribe();
  }, [])

  useEffect(()=> {
    const auth = getAuth(firebase)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false)
    });
    return () => unsubscribe();
  }, [])

  return <DataContext.Provider value={{user, setUser, loading, dataDocument, dataCollection}}>
    {children}
  </DataContext.Provider>
}
