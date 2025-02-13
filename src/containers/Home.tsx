import React, { useContext, useEffect, useState } from 'react';
import {Layout} from '../hocs/Layout';
import {Slider} from '../components/Slider';
import { DataCard } from '../components/DataCard';
import measure from '../assets/measure.png';
import {FrecuencyGraph} from '../components/FrecuencyGraph';
import { DataContext } from '../context/context';
import { MicroAspersionControl } from '../components/FormMoisture';

export const Home:React.FC = () => {
  const {user, loading, dataDocument, dataCollection} = useContext(DataContext);

  useEffect(()=>{
    // const db = getFirestore(firebase);
    // const unsubscribe = snapshot(db, 'lse01', setLoading, setData)
    // return () => unsubscribe()

    // const docRef = doc(db, "pi", "lse01");
    // getDoc(docRef)
    //   .then((doc) => {
    //     if (doc.exists()) {
    //       setData(doc.data());
    //       setLoading(true)
    //     } else {
    //       console.log("no hay data");
    //     }
    //   }).catch((error) => {
    //     console.log("error al traer datos", error)
    //   });
  },[])

  return <Layout>
    <Slider />
    {user?<MicroAspersionControl />:<></>}
    <h2 className='text-center font-bold text-4xl p-3'>Monitoreo en tiempo real</h2>
    <h3 className='text-center font-bold text-md'>Última lectura: {dataDocument.date} - {dataDocument.time}</h3>
    <div className='flex flex-col md:flex-row justify-center gap-5 lg:gap-10 xl:gap-25 p-5'>
    {loading?(<>
      <DataCard
        label='Humedad'
        value={dataDocument.soil_moisture}
        image={measure}
        nomenclature='%'
        color='text-blue-500'/>
      <DataCard
        label='Temperatura'
        value={dataDocument.soil_temperature}
        image={measure}
        color='text-red-500'
        nomenclature='ºC'/>
      <DataCard
        label='Conductividad'
        value={dataDocument.soil_conductivity}
        image={measure}
        color='text-yellow-500'
        nomenclature='uS/cm'/>
    </>):(
      <span>Obteniendo datos</span>
    )}
    </div>
    <div className='py-10'>
      <h3 className='text-center text-xl font-bold'>Gráfica de frecuencia</h3>
      <h4 className='text-center text-lg'>Humedad - Tiempo</h4>
      <FrecuencyGraph data={dataCollection}/>
    </div>
  </Layout>
}
