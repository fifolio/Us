import { Link, useLocation } from 'react-router-dom';

import React from 'react'
import { bottombarLinks } from '@/constants';

const Bottombar: React.FC = () => {

  const { pathname } = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) => {

        const isActive = pathname === link.route;

        return (

          <Link to={link.route} key={link.label} className={`flex-center flex-col gap-1 p-2 transition rounded-[10px] ${isActive && 'bg-primary-500 font-bold text-light-2 transition'}`}>
            <img 
            src={link.imgURL} 
            alt={link.label} 
            className={`${isActive && 'invert-white'}`} 
            width={16}
            height={16}
            />
            <p className="font-medium">
              {link.label}
            </p>
          </Link>

        )
      })}
    </section>
  )
}

export default Bottombar