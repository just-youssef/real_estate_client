import { DarkThemeToggle, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../lib/features/userReducer';

const Header = () => {
  const { token, details: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const signout = () => {
    dispatch(clearUserData());
  };

  const handleSearch = (e) => {
    e.preventDefault()

  }

  return (
    <div className='bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200'>
      <div className='flex items-center justify-between py-2 w-11/12 max-w-6xl mx-auto shadow-xl'>
        <Link to="/" className=''>
          <div className='flex items-center font-semibold'>
            <img src="/vite.svg" className="min-w-8 w-9" alt="Vite Logo" />
            <span className="text-xl text-gray-500 dark:text-gray-400 max-sm:hidden ml-3">Real</span>
            <span className="text-xl max-sm:hidden">Estate</span>
          </div>
        </Link>

        <form className='relative max-sm:mx-2 max-sm:flex-grow sm:w-64 lg:w-96' onSubmit={handleSearch}>
          <input type="text" className='input-bar w-full text-sm' placeholder='Search..' />
          <button className='absolute inset-y-0 end-2.5'>
            <FaSearch className='icon' />
          </button>
        </form>

        <div className='flex items-center'>
          <DarkThemeToggle className='rounded-full hover:bg-gray-50 focus:ring-0 p-2' />

          {
            // large screen
            token ?
              <div className='flex items-center max-md:hidden'>
                <Link to="/profile">
                  <button className='nav-btn px-4 py-2 text-sm'>
                    {user.first_name}
                  </button>
                </Link>
                <button className='nav-btn px-4 py-2 text-sm' onClick={signout}>
                  Sign Out
                </button>
              </div>
              :
              <div className='flex items-center max-md:hidden'>
                <Link to="/sign-in">
                  <button className='nav-btn px-4 py-2 text-sm'>
                    Sign In
                  </button>
                </Link>
                <span className='text-sm text-gray-400 dark:text-gray-600 mx-1'>OR</span>
                <Link to="/sign-up">
                  <button className='nav-btn px-4 py-2 text-sm'>
                    Sign Up
                  </button>
                </Link>
              </div>
          }

          <Dropdown renderTrigger={() => <span className='p-2 nav-btn md:hidden cursor-pointer focus:bg-gray-50'><IoIosArrowDown fontSize={18} className='icon' /></span>}>
            {
              token ?
                <>
                  <Dropdown.Item as={Link} to="/profile">{user.first_name}</Dropdown.Item>
                  <Dropdown.Item onClick={signout}>Sign Out</Dropdown.Item>
                </>
                :
                <>
                  <Dropdown.Item as={Link} to="/sign-in">Sign In</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sign-up">Sign Up</Dropdown.Item>
                </>
            }

          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header