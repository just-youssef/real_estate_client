import { Button, DarkThemeToggle, Navbar } from 'flowbite-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaThList } from "react-icons/fa";
import { toggleSiderState } from '../lib/features/siderReducer';

const Header = () => {
  const dispatch = useDispatch();

  return (
    <Navbar fluid className='bg-gray-200 shadow-lg dark:bg-gray-900'>
      <button
      className='rounded-full mr-2 hover:bg-gray-300 dark:hover:bg-gray-700 p-3 md:hidden'
      onClick={()=>dispatch(toggleSiderState())}
      >
        <FaThList className='text-gray-500 text-xl' />
      </button>
      <Navbar.Brand as={Link} href="/" className='flex-grow'>
        <div className='flex items-center gap-3'>
          <img src="/vite.svg" className="h-9" alt="Vite Logo" />
          <span className="text-xl font-semibold dark:text-white max-sm:hidden">RealEstate</span>
        </div>
      </Navbar.Brand>

      <DarkThemeToggle className='rounded-full hover:bg-gray-300 focus:ring-0 md:mr-4 ' />
      <Navbar.Toggle className='rounded-full hover:bg-gray-300 focus:ring-0' />
      <Navbar.Collapse>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header