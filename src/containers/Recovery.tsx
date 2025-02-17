import React, { FormEvent, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { recoveryPassword } from '../utils/AuthService';

export const Recovery:React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(true);
  const [error, setError] = useState(false);

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const s = await recoveryPassword(email);
    if (s) {
      setStatus(true);
    } else {
      setStatus(false);
      setError(true);
    }
  };

  useEffect(()=>{
    setStatus(false);
    setError(false);
  }, [])

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white rounded-lg w-96">
        <div className="bg-blue-700 rounded-lg py-2 flex justify-center mb-6">
          {/* Aquí podrías añadir el logo de tu empresa */}
          <span className="text-2xl font-bold text-white">Proyecto Vivero</span>
        </div>
        <h2 className="text-2xl font-bold mb-4">Recuperar contraseña</h2>
        <form onSubmit={handleSubmit}>
        {
          status?(
            <div>
            <h3 className='text-md font-bold'>Se ha enviado correctamente.</h3>
            <p>Revise en su bandeja de mensaje para restablecer la contraseña.</p>
          </div>
          ):<>
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder='Correo electrónico'
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {error?(
            <p className='text-sm text-red-400'>Error en el correo electrónico ingresado, revise e intente nuevamente.</p>
            ):<></>}
          </div>
          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            Restablecer
          </button>
          </>
        }
        </form>
        <div className="mt-4 text-center">
            <NavLink className="text-blue-500 hover:text-blue-700" to={'/'}>&lt; Regresar</NavLink>
        </div>
      </div>
    </div>
  );
};
