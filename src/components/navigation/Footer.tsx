import React from "react"
import { NavLink } from "react-router-dom";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <p>&copy; {currentYear} - UNAMAD.</p>
        </div>
        <div className="flex space-x-4">
          <NavLink to={"/terms"} className="hover:text-white">Terminos y condiciones de uso</NavLink>
        </div>
      </div>
    </footer>
  );
};
