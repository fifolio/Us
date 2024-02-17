import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations';
import { useUserContext } from '@/context/authContext';


const Topbar: React.FC = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);

  }, [isSuccess])


  return (
    <section className='bg-[#FEFEFE] topbar'>

      <div className="bg-[#FEFEFE] text-dark-1 flex-between py-4 px-5">
        <Link to='/' className='flex gap-3 items-center'>
          <img src="/assets/images/logo.png" alt="logo" width='50' />
        </Link>
        <div className="flex bg-[#FEFEFE] gap-4">
          <Button variant="ghost" className='shad-button_ghost' onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
          <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} className='h-8 w-8 rounded-full' alt='profile' />
          </Link>
        </div>
      </div>

    </section>
  )
}

export default Topbar