import { ChangeEvent, useEffect, useState } from "react";
import { Layout } from "../hocs/Layout";
import {
  FrecuencyGraphMoisture,
  FrecuencyGraphTemperature,
  FrecuencyGraphConductivity,
} from "../components/Graphs";
import { DataDocument } from "../context/context";
import moment from "moment-timezone";
import { queryCollections } from "../utils/Services";

export const Analitic = () => {
  const date = moment(new Date());
  const [rangeDate, setRangeDate] = useState({
    start: date.add(-7, "day").format("YYYY-MM-DD"),
    end: date.add(7, "day").format("YYYY-MM-DD"),
  });
  const [dataCollection, setDataCollection] = useState<DataDocument[]>([]);
  const [daysDiff, setDaysDiff] = useState(7);

  const loadCollections = async () => {
    const dates = [];

    const dateStart = moment(rangeDate.start);
    const dateEnd = moment(rangeDate.end);
    const dateNow = dateStart.clone();

    while (dateNow.isSameOrBefore(dateEnd)) {
      dates.push(dateNow.format("YYYY-MM-DD"));
      dateNow.add(1, "day");
    }

    const query = await queryCollections(dates);
    setDataCollection(query);
  };

  useEffect(() => {
    loadCollections();
    const firstDate = moment(rangeDate.start);
    const lastDate = moment(rangeDate.end);
    setDaysDiff(lastDate.diff(firstDate, "day"));
  }, [rangeDate]);

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const date_value = moment(value).format("YYYY-MM-DD");
    setRangeDate({
      ...rangeDate,
      [name]: date_value,
    });
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="container mx-auto grid grid-cols-2 gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de inicio:
            </label>
            <input
              type="date"
              name="start"
              value={rangeDate.start}
              onChange={handleDateChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fecha de fin:
            </label>
            <input
              type="date"
              name="end"
              value={rangeDate.end}
              onChange={handleDateChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <FrecuencyGraphMoisture
          data={dataCollection}
          h2={`Evolución de la humedad en los últimos ${daysDiff} días`}
        />
        <FrecuencyGraphTemperature
          data={dataCollection}
          h2={`Evolución de la temperatura en los últimos ${daysDiff} días`}
        />
        <FrecuencyGraphConductivity
          data={dataCollection}
          h2={`Evolución de la conductividad en los últimos ${daysDiff} días`}
        />
      </div>
    </Layout>
  );
};
