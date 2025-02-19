import React, { ChangeEvent, useEffect, useState } from "react";
import { DataDocument } from "../context/context";
import { Layout } from "../hocs/Layout";
import { queryCollection, queryCollections } from "../utils/Services";
import moment from "moment-timezone";
import * as XLSX from "xlsx";

export const Reports: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("unique");
  const [rangeDate, setRangeDate] = useState({ start: "", end: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);
  const [data, setData] = useState<DataDocument[]>([]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Máximo de números de página a mostrar
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Ajustar el rango si estamos cerca del inicio o del final
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // Cambiar de página
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRangeDate({
      ...rangeDate,
      [name]: value,
    });
  };

  const handlerDownload = () => {
    const book = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(book, sheet, "Reporte");
    XLSX.writeFile(book, "Reporte.xlsx");
  };

  useEffect(() => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const dateFormat = `${year}-${month}-${day}`;
    setRangeDate({ start: dateFormat, end: dateFormat });
  }, [selectedOption]);

  const loadQuery = async () => {
    let query = Array<DataDocument>();
    if (selectedOption === "unique") {
      query = await queryCollection(rangeDate.end);
    } else {
      const zh = moment.tz.guess();
      moment.tz.setDefault(zh);
      const dates = [];

      const dateStart = moment(rangeDate.start);
      const dateEnd = moment(rangeDate.end);
      const dateNow = dateStart.clone();

      while (dateNow.isSameOrBefore(dateEnd)) {
        dates.push(dateNow.format("YYYY-MM-DD"));
        dateNow.add(1, "day");
      }
      query = await queryCollections(dates);
    }
    setData(query);
  };

  useEffect(() => {
    loadQuery();
  }, [rangeDate]);

  return (
    <Layout>
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        {/* Selector de opciones */}
        <div className="mb-3 flex gap-3">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Seleccione:
            </label>
            <select
              value={selectedOption}
              onChange={handleOptionChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="unique">Por día</option>
              <option value="rango">Rango</option>
            </select>
          </div>
          {selectedOption === "unique" && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Elija una fecha:
              </label>
              <input
                type="date"
                name="end"
                value={rangeDate.end}
                onChange={handleDateChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>

        {/* Controles de fecha (solo para rango) */}
        {selectedOption === "rango" && (
          <div className="grid grid-cols-2 gap-4 mb-3">
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
        )}
        <div>
          <button
            onClick={handlerDownload}
            className="my-2 bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Descargar reporte
          </button>
        </div>
        {/* Tabla de datos */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Temperatura del suelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conductividad del suelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Humedad del suelo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batería
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Humedad máxima fija
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Humedad mínima fija
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aspersores
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.time}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.soil_temperature}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.soil_conductivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.soil_moisture}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.battery}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.fixed_moisture_max}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.fixed_moisture_min}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.average}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.status ? (
                      <span className="px-2 py-1 text-xs font-semibold text-green-800 bg-green-100 rounded-full">
                        Activo
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs font-semibold text-red-800 bg-red-100 rounded-full">
                        Inactivo
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginador */}
        <div className="flex justify-center mt-6">
          <nav>
            <ul className="inline-flex items-center -space-x-px">
              {/* Botón para ir a la primera página */}
              <li>
                <button
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 ml-0 leading-tight bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50"
                >
                  Prim.
                </button>
              </li>

              {/* Botón para ir a la página anterior */}
              <li>
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Ant.
                </button>
              </li>

              {/* Números de página */}
              {getPageNumbers().map((number) => (
                <li key={number}>
                  <button
                    onClick={() => paginate(number)}
                    className={`px-3 py-2 leading-tight ${
                      currentPage === number
                        ? "bg-indigo-500 text-white"
                        : "bg-white text-gray-500 hover:bg-gray-100"
                    } border border-gray-300`}
                  >
                    {number}
                  </button>
                </li>
              ))}

              {/* Botón para ir a la página siguiente */}
              <li>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 leading-tight bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
                >
                  Sig.
                </button>
              </li>

              {/* Botón para ir a la última página */}
              <li>
                <button
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 leading-tight bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50"
                >
                  Últ.
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </Layout>
  );
};
