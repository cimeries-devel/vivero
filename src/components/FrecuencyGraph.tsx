import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  data: []
}

export const FrecuencyGraph:React.FC<Props> = ({data}) => {

  return (
    <ResponsiveContainer className="pr-2 md:px-20 lg:px-40 xl:px-80" width={"100%"} height={400}>
      <LineChart data={data} margin={{ top: 20 }} accessibilityLayer>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" padding={{ left: 10, right: 10 }}/>
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="soil_moisture"
          stroke="#2B7FFF"
          name="Humedad %"
          activeDot={{ r: 8 }}></Line>
        <Line type="monotone" dataKey="soil_temperature" stroke="#FB2C36" name="Temperatura ºC"></Line>
        <Line type="monotone" dataKey="soil_conductivity" stroke="#F0B100" name="Conductividad uS/cm"></Line>
      </LineChart>
    </ResponsiveContainer>
  );
}

