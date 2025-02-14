import {Navbar} from '../components/navigation/Navbar';
import { Footer } from '../components/navigation/Footer';
import logo from '../assets/unamad.png'
import React, { JSX } from 'react';

interface Props {
  children: JSX.Element|JSX.Element[]
}

export const Layout:React.FC<Props> = ({children}) => {
  return <div className='bg-white'>
    <Navbar logo={logo}/>
    {children}
    <Footer/>
  </div>
}
