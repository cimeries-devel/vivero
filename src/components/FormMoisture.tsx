import React, { useContext, useEffect, useState } from "react";
import { writerNewData } from "../utils/AuthService";
import { DataContext } from "../context/context";

export const MicroAspersionControl = () => {
  const {dataDocument} = useContext(DataContext);
  const [data, setData] = useState({
    battery: 0,
    date: "",
    fixed_moisture_max: 0,
    fixed_moisture_min: 0,
    soil_conductivity: 0,
    soil_moisture: 0,
    soil_temperature: 0,
    time: ""});

  const onChangedData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setData({...data, [name]: Number(value)});
  };

  const handleButtonClick = async () => {
    try {
      await writerNewData(data);
      alert("Valores actualizados correctamente.");
    } catch (error) {
      console.error("error writer data ", error);
    }
  };

  useEffect(()=>{
    setData(dataDocument);
  }, [dataDocument])

  return (
    <div className="p-6 rounded-xl text-center w-full md:w-[700px] mx-auto shadow-xl my-5">
      <h2 className="text-lg font-bold mb-4">
        GESTIÓN DE CAPACIDAD DE CAMPO DE SUELO
      </h2>
      <div className="flex flex-col gap-4 items-center">
        {/* Input Máximo */}
        <div className="flex items-center gap-4">
          <label className="text-md font-semibold">Humedad Máxima:</label>
          <input
            type="number"
            name="fixed_moisture_max"
            value={data.fixed_moisture_max}
            onChange={onChangedData}
            className="border border-stone-400 rounded-md p-2 w-24 text-center"
            min={0} // Evita que el máximo sea menor al mínimo
            max={100}
          />
        </div>
        {/* Input Mínimo */}
        <div className="flex items-center gap-4">
          <label className="text-md font-semibold">Humedad Mínima:</label>
          <input
            type="number"
            name="fixed_moisture_min"
            value={data.fixed_moisture_min}
            onChange={onChangedData}
            className="border border-stone-400 rounded-md p-2 w-24 text-center"
            min={0}
            max={100} // Evita que el mínimo supere el máximo
          />
        </div>
        {/* Botón de Aplicar */}
        <button
          onClick={handleButtonClick}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};
