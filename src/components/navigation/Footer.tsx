import React from "react"

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-300 py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <p>&copy; {currentYear} - UNAMAD.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-white">Terminos</a>
          <a href="#" className="hover:text-white">Cambios</a>
        </div>
      </div>
    </footer>
  );
};
