import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { FaCheckCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Verfication = () => {
  const { id } = useParams();
  const [emailVerified, setEmailVerified] = useState(false);

  const checkEmailVerfication = async () => {
    try {
      const res = await fetch(`/api/user/check-verified/${id}`)
      const data = await res.json();

      if (data.verified) {
        setEmailVerified(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    checkEmailVerfication();
  }, [])

  return (
    <div className='paper'>
      <div className='text-green-600 dark:text-green-500 flex flex-col items-center gap-5'>
        <FaCheckCircle fontSize={150} />
        <h1>An verfication link was sent to your email, please check your inbox!</h1>
      </div>

      {
        emailVerified ?
          <>
            <h1 className='uppercase text-green-600 dark:text-green-500 text-xl font-semibold mt-10'>verified</h1>
            <Link
              className='uppercase rounded-full w-full px-3 py-2 
            text-gray-200 bg-green-600 active:bg-green-700
            dark:bg-green-500 dark:active:bg-green-600
            mt-5 text-center'
              to="/sign-in"
            >
              Try Sign In Now
            </Link>
          </>
          :
          <>
            <h1 className='uppercase text-red-600 dark:text-red-500 text-xl font-semibold mt-10'>not verified</h1>
            <button
              className='uppercase rounded-full w-full px-3 py-2 
            text-gray-200 bg-green-600 active:bg-green-700
            dark:bg-green-500 dark:active:bg-green-600
            mt-5'
              onClick={checkEmailVerfication}
            >
              check verfication update
            </button>
          </>
      }
    </div>
  )
}

export default Verfication