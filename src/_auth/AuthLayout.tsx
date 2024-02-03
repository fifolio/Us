import React, { useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout: React.FC = () => {

  // Change page title when loaded
  useEffect(() => {
    document.title = "Don't hesitate, Join Us!";
  }, []);

  // Set a default value for the Authentication  
  const isAuthenticated = false;


  return (
    <>
      {isAuthenticated ? (
        <Navigate to='/' />
      ) : (
        <>
          <section className='flex flex-1 justify-center items-center flex-col py-10'>
            <Outlet />
          </section>

          <img src="/assets/images/side-img.svg" alt="logo" className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
        </>
      )}
    </>
  )
}

export default AuthLayout;