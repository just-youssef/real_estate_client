import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { setToken } from '../lib/features/tokenReducer';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Spinner } from 'flowbite-react';

const SignUp = () => {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState({value: false, confirm: false});
  const [loading, setLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState({ value: false, msg: "" });
  const [lastNameError, setLastNameError] = useState({ value: false, msg: "" });
  const [emailError, setEmailError] = useState({ value: false, msg: "" });
  const [passwordError, setPasswordError] = useState({ value: false, msg: "" });
  const [confirmPasswordError, setConfirmPasswordError] = useState({ value: false, msg: "" });

  useEffect(()=>{
    if (token) navigate('/')
  }, [token])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }
  
  const handleSignUp = async(e) => {
    e.preventDefault();
    setLoading(true);

    // reset errors
    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);

    try {
      const res = await fetch(`api/user/signup`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setLoading(false);

      if (data.error) {
        // set errors
        if (data.error.first_name) setFirstNameError({ value: true, msg: data.error.first_name })
        if (data.error.last_name) setLastNameError({ value: true, msg: data.error.last_name })
        if (data.error.email) setEmailError({ value: true, msg: data.error.email })
        if (data.error.password) setPasswordError({ value: true, msg: data.error.password })
        if (data.error.confirm_password) setConfirmPasswordError({ value: true, msg: data.error.confirm_password })
      }
      if (res.status === 201) {
        navigate(`/verfication/${data.userID}`)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='paper'>
      <img src='./vite.svg' className='h-24 mb-5' />
      <h1 className='text-2xl font-semibold mb-5'>Sign Up to
        <span className="text-gray-500 dark:text-gray-400"> Real</span>
        Estate
      </h1>

      <form className='w-full flex flex-col gap-2' onSubmit={handleSignUp}>
        <div className='flex gap-2'>
          <div className='w-full'>
            <input type='text' className={firstNameError.value?`input-bar-error w-full`:'input-bar w-full'} placeholder='First Name *' required id="first_name" onChange={handleChange} />
            {firstNameError.value && <small className='text-red-700 ml-3'>{firstNameError.msg}</small>}
          </div>

          <div className='w-full'>
            <input type='text' className={lastNameError.value?`input-bar-error w-full`:'input-bar w-full'} placeholder='Last Name *' required id="last_name" onChange={handleChange} />
            {lastNameError.value && <small className='text-red-700 ml-3'>{lastNameError.msg}</small>}
          </div>
        </div>
    
        <div className='w-full'>
          <input type='email' className={emailError.value?`input-bar-error w-full`:'input-bar w-full'} placeholder='Email *' required id="email" onChange={handleChange} />
          {emailError.value && <small className='text-red-700 ml-3'>{emailError.msg}</small>}
        </div>

        <div className='w-full'>
          <div className='relative'>
            <input type={showPassword.value ? 'text' : 'password'} className={passwordError.value?`input-bar-error w-full`:'input-bar w-full'} placeholder='Password *' required id="password" onChange={handleChange} />
            <button type='button' className='p-1 absolute inset-y-0 end-2.5' onClick={() => setShowPassword({ ...showPassword, value: !showPassword.value })}>{showPassword.value ? <FaEye className={passwordError.value? 'icon-error text-lg' : 'icon text-lg'} /> : <FaEyeSlash className={passwordError.value? 'icon-error text-lg' : 'icon text-lg'} />}</button>
          </div>
          {passwordError.value &&
            <small className='text-red-700 ml-3 flex flex-col'>
              {passwordError.msg}
              <ol className='list-decimal ml-4'>
                <li>must be 8 chars length at least</li>
                <li>must contain 1 letter at least</li>
                <li>must contain 1 digit at least</li>
              </ol>
            </small>
          }
        </div>

        <div className='w-full'>
          <div className='relative'>
            <input type={showPassword.confirm ? 'text' : 'password'} className={confirmPasswordError.value?`input-bar-error w-full`:'input-bar w-full'} placeholder='Confirm Password *' required id="confirm_password" onChange={handleChange} />
            <button type='button' className='p-1 absolute inset-y-0 end-2.5' onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}>{showPassword.confirm ? <FaEye className={confirmPasswordError.value? 'icon-error text-lg' : 'icon text-lg'} /> : <FaEyeSlash className={confirmPasswordError.value? 'icon-error text-lg' : 'icon text-lg'} />}</button>
          </div>
          {confirmPasswordError.value && <small className='text-red-700 ml-3'>{confirmPasswordError.msg}</small>}
        </div>

        <button type='submit' className='mt-2 submit' disabled={loading}>
          {
            loading? <Spinner /> : 'Sign Up'
          }
        </button>

        <p className='mt-4'>Already have an account?
          <Link to="/sign-in">
            <span className='link ml-1'>Sign In</span>
          </Link>
        </p>
      </form>
    </div>
  )
}

export default SignUp