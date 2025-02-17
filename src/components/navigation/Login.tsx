import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/context';
import { loginUser } from '../../utils/AuthService';
import { NavLink } from 'react-router-dom';

interface Props {
  visible: boolean,
  action: ()=>void
}

export const Login: React.FC<Props> = ({visible, action}) => {

  const {setUser} = useContext(DataContext);
  const [error, setError] = useState(false);
  const [data, setData] = useState({username:"",password:""});

  useEffect(()=>{
    setError(false);
  },[])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const user = await loginUser(data.username, data.password);
      setUser(user);
      action();
      window.location.reload();
    } catch (error) {
      console.error("login ", error);
      setError(true);
    }
  };

  const onChangeData = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setData({...data, [name]: value})
  }

  return (
    <>
      <Transition appear show={visible} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={action}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-bold leading-6 text-gray-900 pb-5">
                    Inicio de sesión
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
                        Correo electrónico
                      </label>
                      <input
                        type="text"
                        placeholder="correo electrónico"
                        name="username"
                        id="username"
                        value={data.username}
                        className="border-2 border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={onChangeData}
                      />
                    </div>
                    <div className="mb-2">
                      <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                        Contraseña
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        value={data.password}
                        placeholder="contraseña"
                        className="border-2 border-stone-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        onChange={onChangeData}
                      />
                    </div>
                    {error?<p className='text-red-500 text-sm'>Error en usuario o contraseña</p>:<></>}
                    <NavLink className='block text-blue-600' to={"/recovery"}>¿Olvidó su contraseña?</NavLink>
                    <button
                      type='submit'
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-3">
                      Iniciar sesión
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
