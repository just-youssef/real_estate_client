import { DarkThemeToggle, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const Header = () => {
  return (
    <div className='bg-gray-200 dark:bg-gray-900'>
      <div className='flex items-center justify-between px-4 sm:px-6 py-2 max-w-6xl mx-auto shadow-xl'>
        <Link to="/" className=''>
          <div className='flex items-center font-semibold'>
            <img src="/vite.svg" className="min-w-8 w-9" alt="Vite Logo" />
            <span className="text-xl text-gray-500 dark:text-gray-400 max-sm:hidden ml-3">Real</span>
            <span className="text-xl text-gray-900 dark:text-gray-200 max-sm:hidden">Estate</span>
          </div>
        </Link>

        <form className='flex justify-between items-center input-bar max-sm:mx-2 max-sm:flex-grow'>
          <input type="text" className='bg-transparent focus:ring-0 border-0 p-0 text-sm w-48 lg:w-72' placeholder='Search..' />
          <FaSearch />
        </form>


        <div className='flex items-center'>
          <DarkThemeToggle className='rounded-full hover:bg-gray-50 focus:ring-0 p-2' />

          {/* large screen */}
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

          {/* small screen */}
          <Dropdown renderTrigger={() => <span className='p-2 nav-btn md:hidden cursor-pointer focus:bg-gray-50'><IoIosArrowDown fontSize={18}/></span>}>
            <Dropdown.Item as={Link} to="/sign-in">Sign In</Dropdown.Item>
            <Dropdown.Item as={Link} to="/sign-up">Sign Up</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default Header