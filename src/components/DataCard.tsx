import React from "react";

interface Props {
  label: string,
  value: number,
  image: string,
  color: string,
  nomenclature: string,
}

export const DataCard:React.FC<Props> = ({label, value, image, color, nomenclature}) => {
  return (
    <div className="bg-white flex items-center justify-center">
      <div className="mr-2">
        <img src={image} alt={label} className="w-full h-25" />
      </div>
      <div className="shadow-lg border-2 border-stone-200 rounded-xl p-2 w-60 md:w-40 lg:w-60 h-32">
        <p className="text-gray-500 text-xl text-center">{label} del suelo</p>
        <div className="flex items-end justify-center">
          <p className={`text-5xl md:text-3xl lg:text-5xl font-bold ${color}`}>{value}</p>
          <p className={`text-3xl md:text-lg lg:text-3xl font-bold ${color}`}>{nomenclature}</p>
        </div>
      </div>
    </div>
  );
};
