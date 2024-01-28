import { DarkThemeToggle, Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { FaSearch, FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { clearUserData } from '../lib/features/userReducer';
import { IoPerson } from "react-icons/io5";
import { PiSignOutBold } from "react-icons/pi";

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
    <div className='bg-gray-200 dark:bg-gray-900 text-gray-900 dark:text-gray-200 shadow-xl'>
      <div className='flex items-center justify-between py-2 w-11/12 max-w-6xl mx-auto'>
        <Link to="/" className=''>
          <div className='flex items-end font-semibold'>
            <img src="/logo.png" className="min-w-8 w-9" alt="Logo" />
            <span className="text-xl text-gray-500 dark:text-gray-400 max-sm:hidden ml-2">Real</span>
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
            token ?
              <>
                <Link to="/listing/create" className='nav-btn text-sm max-md:hidden flex items-center gap-1.5'>
                  <FaPlus />Create New Listing
                </Link>
                <Dropdown
                  renderTrigger={() => <img src={user.avatar || '/default_profile.png'} className='cursor-pointer h-9 w-9 rounded-full object-cover ml-1' />}
                >
                  <Dropdown.Item as={Link} to="/listing/create" className='flex items-center w-full gap-1.5 md:hidden'>
                    <FaPlus /> Create New Listing
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile" className='flex items-center justify-center gap-1 w-full'>
                    <IoPerson fontSize={16} /> {user.first_name}{" "}{user.last_name}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signout} className='flex items-center justify-center gap-1 w-full'>
                    <PiSignOutBold fontSize={18} /> Sign Out
                  </Dropdown.Item>
                </Dropdown>
              </>
              :
              <>
                {/* large screen */}
                <div className='flex items-center max-md:hidden'>
                  <Link to="/sign-in">
                    <button className='nav-btn text-sm'>
                      Sign In
                    </button>
                  </Link>
                  <span className='text-sm text-gray-400 dark:text-gray-600 mx-1'>OR</span>
                  <Link to="/sign-up">
                    <button className='nav-btn text-sm'>
                      Sign Up
                    </button>
                  </Link>
                </div>

                {/* small screen */}
                <Dropdown renderTrigger={() => <span className='p-2 nav-btn md:hidden cursor-pointer focus:bg-gray-50'><IoIosArrowDown fontSize={18} className='icon' /></span>}>
                  <Dropdown.Item as={Link} to="/sign-in">Sign In</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/sign-up">Sign Up</Dropdown.Item>
                </Dropdown>
              </>
          }
        </div>
      </div>
    </div>
  )
}

export default Header