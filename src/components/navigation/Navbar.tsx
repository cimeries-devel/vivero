import React, {useContext, useEffect, useRef, useState } from 'react';
import {Login} from './Login';
import { NavLink } from 'react-router-dom';
import { DataContext } from '../../context/context';
import { Logout } from './Logout';

interface Props {
  logo: string,
  logo_vivero: string,
}

export const Navbar: React.FC<Props> = ({logo, logo_vivero}) => {

  const {user} = useContext(DataContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handlerModal = () => {
    setIsMobileMenuOpen(false);
    setOpenModal(!openModal);
  }
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);


  return (
    <nav className="bg-white p-4 flex flex-wrap items-center justify-between">
      {/* Logo */}
      <div className="text-grey flex items-center gap-2">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <p className='text-pink-600 text-[1.6rem] font-bold'>UNAMAD</p>
        {/* <p className='w-15 text-[13px] font-bold border-l-2 border-l-white-400 pl-2'>Proyecto vivero</p> */}
        <img src={logo_vivero} alt="Logo vivero" className="h-10 w-auto" />
      </div>

      {/* Menú de navegación */}
      <div ref={menuRef} className={`w-full md:block md:w-auto ${isMobileMenuOpen ? 'fixed top-0 left-0 bg-gray-200 p-4 z-9' : 'hidden'}`}>
        <ul className="navbar-bd flex flex-col items-center md:flex-row md:items-center md:justify-end text-base text-grey-800">
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <NavLink to={"/"} className="hover:text-grey-800 block text-center">Inicio</NavLink>
          </li>
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <NavLink to={"/about"} className="hover:text-grey-950 block text-center">Acerca de</NavLink>
          </li>
          {user?<li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <NavLink to={"/reports"} className="hover:text-grey-800 block text-center">Reportes</NavLink>
          </li>:<></>}
          <li className="md:ml-6 mt-3 md:mt-0 w-full md:w-auto">
            <button
              onClick={()=>setOpenModal(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full md:w-35">
              {user?"Cerrar sesión":"Iniciar sesión"}
            </button>
          </li>
        </ul>
      </div>

      {/* Botón de menú móvil */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {user?<Logout visible={openModal} action={handlerModal}/>:<Login visible={openModal} action={handlerModal}/>}
    </nav>
  );
};
