import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react/jsx-runtime';
import React from 'react';
import { logoutUser } from '../../utils/AuthService';
import { useNavigate } from 'react-router-dom';

interface Props {
  visible: boolean,
  action: ()=>void
}

export const Logout: React.FC<Props> = ({visible, action}) => {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    logoutUser();
    action();
    navigate("/");
  };


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
                    Cerrar sesión
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <h2 className='text-md pb-4'>¿Esta seguro que desea cerrar sesión?</h2>
                    <button
                      type='submit'
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                      Cerrar sesión
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
