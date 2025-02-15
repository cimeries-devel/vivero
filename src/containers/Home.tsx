import React, { useContext } from 'react';
import {Layout} from '../hocs/Layout';
import {Slider} from '../components/Slider';
import { DataCard } from '../components/DataCard';
import measure from '../assets/measure.png';
import {AreaChartGraph, FrecuencyGraph} from '../components/Graphs';
import { DataContext } from '../context/context';
import { MicroAspersionControl } from '../components/FormMoisture';

export const Home:React.FC = () => {
  const {user, loading, dataDocument, dataCollection} = useContext(DataContext);

  return <Layout>
    <Slider />
    {user?<MicroAspersionControl />:<></>}
    <h2 className='text-center font-bold text-4xl pt-3'>Monitoreo en tiempo real</h2>
    <h3 className='text-center font-bold text-lg'>Última lectura: {dataDocument.date} - {dataDocument.time}</h3>
    <h3 className='flex justify-center font-bold text-md'>
      <p className='pr-2'>Estado de los aspersores:</p>
      <p className={`${dataDocument.status?'text-green-400':'text-red-400'}`}>
        {dataDocument.status?"Activado":"No activado"}
      </p>
    </h3>
    <div>
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
      <p className='text-center'>
        <span>El valor promedio de la humedad es: </span>
        <span className='font-bold'>{dataDocument.average}%</span>
      </p>
    </div>
    <FrecuencyGraph data={dataCollection}/>
    <AreaChartGraph data={dataCollection}/>
  </Layout>
}
