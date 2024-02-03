import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './globals.css';
import { Home } from './_root/pages';
import { SigninForm, SignupForm } from './_auth/forms';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

function App() {
  useEffect(() => {
    document.title = "Be with: Us!"
  }, [])

  return (
    <main className='flex h-screen'>
      <Routes>

        <Route element={<AuthLayout />}>
          {/* Public routes */}
          <Route path='/signin' element={<SigninForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          {/* Private routes */}
          <Route index element={<Home />} />
        </Route>

      </Routes>
    </main>
  )
}

export default App 