import {Navbar} from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import logo from '../assets/react.svg'
import React, { JSX } from 'react';

interface Props {
  children: JSX.Element
}

export const Layout:React.FC<Props> = ({children}) => {
  const handleLogin = (username: string, password: string) => {
    console.log('Usuario:', username, 'Contraseña:', password);
  };
  return <div>
    <Navbar logo={logo} onLogin={handleLogin}/>
    {children}
    <Footer/>
  </div>
}
