import React, {useEffect, useState } from 'react';
import {Login} from './Login';

interface Props {
  logo: string;
  onLogin: (username:string, password:string)=>void;
}

export const Navbar: React.FC<Props> = ({ logo, onLogin }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handlerModal = () => setOpenModal(!openModal)
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => setIsMobileMenuOpen(false);

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);


  return (
    <nav className="bg-gray-800 p-4 flex flex-wrap items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-8 w-auto" />
        <p className='text-[1.6rem] text-white font-bold'>UNAMAD</p>
        <p className='text-white w-15 text-[13px] border-l-2 border-l-white-400 pl-2'>Proyecto vivero</p>
      </div>

      {/* Menú de navegación */}
      <div className={`w-full md:block md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <ul className="flex flex-col items-center md:flex-row md:items-center md:justify-end text-base text-gray-300">
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <a href="#" className="hover:text-white block text-center">Inicio</a>
          </li>
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <a href="#" className="hover:text-white block text-center">Acerca de</a>
          </li>
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <a href="#" className="hover:text-white block text-center">Nosotros</a>
          </li>
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <button
              onClick={()=>setOpenModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-35">
              Iniciar sesión
            </button>
          </li>
        </ul>
      </div>

      {/* Botón de menú móvil */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className={`text-gray-300 hover:text-white focus:outline-none ${isMobileMenuOpen?'hidden':'block'}`}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <Login handler={handlerModal} visible={openModal}/>
    </nav>
  );
};
