import React, { useContext, useEffect, useState } from "react";
import { Layout } from "../hocs/Layout";
import { Slider } from "../components/Slider";
import { DataCard } from "../components/DataCard";
import { AreaChartGraph, FrecuencyGraph } from "../components/Graphs";
import { DataContext, DataDocument } from "../context/context";
import { MicroAspersionControl } from "../components/FormMoisture";
import measure from "../assets/measure.png";
import conductivity from "../assets/conductivity.png";
import temperature from "../assets/temperature.png";

export const Home: React.FC = () => {
  const attributes: (keyof DataDocument)[] = [
    "soil_moisture",
    "soil_temperature",
    "soil_conductivity",
  ];
  const { user, loading, dataDocument, dataCollection } =
    useContext(DataContext);
  const [moistureMinMax, setMoistureMinMax] = useState({
    min: 0,
    max: 0,
  });
  const [temperatureMinMax, setTemperatureMinMax] = useState({
    min: 0,
    max: 0,
  });
  const [conductivityMinMax, setConductivityMinMax] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    const getMinMaxValues = (
      data: DataDocument[],
      attributes: (keyof DataDocument)[],
    ): Record<string, { min: number; max: number }> => {
      const minMaxValores: Record<string, { min: number; max: number }> =
        attributes.reduce(
          (acc, attr) => {
            acc[attr] = { min: Infinity, max: -Infinity };
            return acc;
          },
          {} as Record<string, { min: number; max: number }>,
        );

      data.forEach((obj) => {
        attributes.forEach((attr) => {
          if (typeof obj[attr] === "number") {
            // Aseguramos que sea un número antes de comparar
            minMaxValores[attr].min = Math.min(
              minMaxValores[attr].min,
              obj[attr] as number,
            );
            minMaxValores[attr].max = Math.max(
              minMaxValores[attr].max,
              obj[attr] as number,
            );
          }
        });
      });

      return minMaxValores;
    };
    const data = getMinMaxValues(dataCollection, attributes);
    setMoistureMinMax(data.soil_moisture);
    setTemperatureMinMax(data.soil_temperature);
    setConductivityMinMax(data.soil_conductivity);
  }, [dataCollection]);

  return (
    <Layout>
      <Slider />
      {user ? <MicroAspersionControl /> : <></>}
      <h2 className="text-center font-bold text-4xl pt-3">
        Monitoreo en tiempo real
      </h2>
      <h3 className="text-center font-bold text-lg">
        Última lectura: {dataDocument.date} - {dataDocument.time}
      </h3>
      <p className="text-center">
        <span>El valor promedio de la humedad es: </span>
        <span className="font-bold">{dataDocument.average}%</span>
      </p>
      <h3 className="text-center font-bold text-lg mt-2">
        Valores máximos de la lectura: {dataDocument.date} - {dataDocument.time}
      </h3>
      <div className="text-center">
        <ul>
          <li>Humedad: {moistureMinMax.max}%</li>
          <li>Temperatura: {temperatureMinMax.max}ºC</li>
          <li>Conductividad: {conductivityMinMax.max}mS/cm</li>
        </ul>
      </div>
      <h3 className="text-center font-bold text-lg mt-2">
        Valores mínimos de la lectura: {dataDocument.date} - {dataDocument.time}
      </h3>
      <div className="text-center">
        <ul>
          <li>Humedad: {moistureMinMax.min}%</li>
          <li>Temperatura: {temperatureMinMax.min}ºC</li>
          <li>Conductividad: {conductivityMinMax.min}mS/cm</li>
        </ul>
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-center gap-5 lg:gap-10 xl:gap-25 p-5">
          {loading ? (
            <>
              <DataCard
                label="Humedad"
                value={dataDocument.soil_moisture}
                image={measure}
                nomenclature="%"
                color="text-blue-500"
              />
              <DataCard
                label="Temperatura"
                value={dataDocument.soil_temperature}
                image={temperature}
                color="text-red-500"
                nomenclature="ºC"
              />
              <DataCard
                label="Conductividad"
                value={dataDocument.soil_conductivity}
                image={conductivity}
                color="text-yellow-500"
                nomenclature="uS/cm"
              />
            </>
          ) : (
            <span>Obteniendo datos</span>
          )}
        </div>
        <h3 className="flex justify-center font-bold text-md">
          <p className="pr-2">Estado de los aspersores:</p>
          <p
            className={`${dataDocument.status ? "text-green-400" : "text-red-400"}`}
          >
            {dataDocument.status ? "Activado" : "Desactivado"}
          </p>
        </h3>
      </div>
      <FrecuencyGraph data={dataCollection} />
      <AreaChartGraph data={dataCollection} />
    </Layout>
  );
};
