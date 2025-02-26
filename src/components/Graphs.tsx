import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { DataDocument } from "../context/context";

interface Props {
  data: DataDocument[];
  h2: string;
}

export const FrecuencyGraph: React.FC<Props> = ({ data }) => {
  return (
    <div className="py-10">
      <h3 className="text-center text-xl font-bold">Gráfica Lineal</h3>
      <h4 className="text-center text-md">
        Humedad - Temperatura - Conductividad VS Tiempo
      </h4>
      <ResponsiveContainer
        className="pr-2 md:px-20 lg:px-40 xl:px-80"
        width={"100%"}
        height={400}
      >
        <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="soil_moisture"
            stroke="#2B7FFF"
            name="Humedad %"
            activeDot={{ r: 8 }}
          ></Line>
          <Line
            type="monotone"
            dataKey="soil_temperature"
            stroke="#FB2C36"
            name="Temperatura ºC"
          ></Line>
          <Line
            type="monotone"
            dataKey="soil_conductivity"
            stroke="#F0B100"
            name="Conductividad uS/cm"
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FrecuencyGraphMoisture: React.FC<Props> = ({ data, h2 }) => {
  return (
    <div className="py-10">
      <h3 className="text-center text-xl font-bold">Gráfica Lineal</h3>
      <h4 className="text-center text-md">{h2}</h4>
      <ResponsiveContainer
        className="pr-2 md:px-20 lg:px-40 xl:px-80"
        width={"100%"}
        height={400}
      >
        <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="soil_moisture"
            stroke="#2B7FFF"
            name="Humedad %"
            activeDot={{ r: 8 }}
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FrecuencyGraphTemperature: React.FC<Props> = ({ data, h2 }) => {
  return (
    <div className="py-10">
      <h3 className="text-center text-xl font-bold">Gráfica Lineal</h3>
      <h4 className="text-center text-md">{h2}</h4>
      <ResponsiveContainer
        className="pr-2 md:px-20 lg:px-40 xl:px-80"
        width={"100%"}
        height={400}
      >
        <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="soil_temperature"
            stroke="#FB2C36"
            name="Temperatura ºC"
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const FrecuencyGraphConductivity: React.FC<Props> = ({ data, h2 }) => {
  return (
    <div className="py-10">
      <h3 className="text-center text-xl font-bold">Gráfica Lineal</h3>
      <h4 className="text-center text-md">{h2}</h4>
      <ResponsiveContainer
        className="pr-2 md:px-20 lg:px-40 xl:px-80"
        width={"100%"}
        height={400}
      >
        <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="soil_conductivity"
            stroke="#F0B100"
            name="Conductividad uS/cm"
          ></Line>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const AreaChartGraph: React.FC<Props> = ({ data }) => {
  return (
    <div className="py-10">
      <h3 className="text-center text-xl font-bold">Gráfica de Área</h3>
      <h4 className="text-center text-md">Humedad - Tiempo</h4>
      <ResponsiveContainer
        className="pr-2 md:px-20 lg:px-40 xl:px-80"
        width={"100%"}
        height={400}
      >
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="soil_moisture"
            stroke="#8884d8"
            fill="#2B7FFF"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
