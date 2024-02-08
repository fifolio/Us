import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import './globals.css';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import { SigninForm, SignupForm } from './_auth/forms';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from '@/components/ui/toaster';

function App() {
  useEffect(() => {
    document.title = "Don't hesitate, Join Us!";
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
          <Route path='/explore' element={<Explore />} />
          <Route path='/saved' element={<Saved />} />
          <Route path='/all-users' element={<AllUsers />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post' element={<EditPost />} />
          <Route path='/post/:id' element={<PostDetails />} />
          <Route path='/profile/:id/*' element={<Profile />} />
          <Route path='/update-profile/:id' element={<UpdateProfile />} />

        </Route>

      </Routes>

      <Toaster />
    </main>
  )
}

export default App 