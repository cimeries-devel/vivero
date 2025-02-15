import { getFirestore } from "firebase/firestore";
import React, { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
import { firebase } from "../fb-credentials";
import { snapshotCollection, snapshotDocument } from "../utils/snapshot";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export interface DataDocument {
  date: string,
  time: string,
  soil_temperature: number,
  soil_conductivity: number,
  soil_moisture: number,
  battery: number,
  fixed_moisture_max: number,
  fixed_moisture_min: number,
  average: number,
  status: boolean,
}


interface Props {
  user: User | null,
  setUser: Dispatch<SetStateAction<User|null>>
  loading: boolean,
  setLoading: Dispatch<SetStateAction<boolean>>
  dataDocument: DataDocument,
  setDataDocument: Dispatch<SetStateAction<DataDocument>>,
  dataCollection: DataDocument[],
  setDataCollection: Dispatch<SetStateAction<DataDocument[]>>,
}

export const modelData = {
  date: '',
  time: '',
  soil_temperature: 0,
  soil_conductivity: 0,
  soil_moisture: 0,
  battery: 0,
  fixed_moisture_max: 0,
  fixed_moisture_min: 0,
  average: 0,
  status: false,
  }

export const DataContext = createContext<Props>({
  user: null,
  setUser: ()=>{},
  loading: false,
  setLoading: ()=>{},
  dataDocument: {...modelData},
  setDataDocument: ()=>{},
  dataCollection: [],
  setDataCollection: ()=>[],
});

export const DataProvider = ({children}: {children:React.ReactNode}) => {

  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataDocument, setDataDocument] = useState<DataDocument>({...modelData});
  const [dataCollection, setDataCollection] = useState<DataDocument[]>([]);


  useEffect(()=>{
    const db = getFirestore(firebase);
    const unsubscribe = snapshotDocument(db, 'lse01', setLoading, setDataDocument)
    return () => unsubscribe()
  }, [])

  useEffect(()=>{
    const date = new Date()
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateFormat = `${year}-${month}-${day}`;

    const db = getFirestore(firebase);
    const unsubscribe = snapshotCollection(db, dateFormat, setDataCollection);
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

  return <DataContext.Provider value={{
    user,
    setUser,
    loading,
    setLoading,
    dataDocument,
    setDataDocument,
    dataCollection,
    setDataCollection}}>
    {children}
  </DataContext.Provider>
}






