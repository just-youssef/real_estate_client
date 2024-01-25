import { Modal, Spinner } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { setUserData } from "../lib/features/userReducer";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const { token, details: user } = useSelector(state => state.user)
  const dispatch = useDispatch();

  // user data form
  const [formData, setFormData] = useState({});
  const [formDataError, setFormDataError] = useState({});

  // change password form
  const [openModal, setOpenModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({});
  const [showPassword, setShowPassword] = useState({ old: false, new: false, confirm: false });
  const [passwordFormError, setPasswordFormError] = useState({});

  // submit state
  const [loading, setLoading] = useState(false);

  // upload image
  const uploadImage = async(e)=>{
    // extarct image from event object
    const avatar = e.target.files[0];

    if (!avatar) {
      console.log('no image selected');
      return;
    }

    setLoading(true);
    const imageData = new FormData();
    imageData.append('file', avatar, avatar.name);

    try {
      const res = await fetch(`/api/cloudinary/uploadFile`, {
        method: 'POST',
        headers: {
          'x-auth-token': token,
        },
        body: imageData,
      })
      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setFormData({...formData, avatar: data.url})
      }
    } catch (error) {
      console.log(error);
    }
  }

  // user data change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  // submit user form data
  const handleUpdate = async(e) => {
    e.preventDefault();
    setLoading(true);
    setFormDataError({});

    try {
      const res = await fetch(`/api/user/update`, {
        method: "POST",
        headers: {
          'x-auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        // set errors
        setFormDataError(data.error)
      }

      if (res.status === 200) {
        dispatch(setUserData({ details: data }))
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  // password form change
  const handlePasswordFormChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.id]: e.target.value,
    })
  }

  // submit password form
  const changePassword = async (e) => {
    e.preventDefault();
    setLoading(true)
    setPasswordFormError({})

    try {
      const res = await fetch(`/api/user/changePassword`, {
        method: "POST",
        headers: {
          'x-auth-token': token,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordForm),
      });

      const data = await res.json();
      setLoading(false);

      if (data.error) {
        // set errors
        setPasswordFormError(data.error)
      }

      if (res.status === 200) {
        setOpenModal(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // close password form
  const closePasswordForm = () => {
    setOpenModal(false)
    setPasswordFormError({});
  }

  return (
    <div className="paper">
      {/* profile image */}
      <div className="relative mb-5 rounded-full border-gray-500 border-2">
        <label htmlFor="avatar" className={`cursor-pointer rounded-full bg-gray-800 absolute inset-0 ${loading? 'opacity-60' : 'opacity-0 hover:opacity-60'}`}>
          <span className="flex justify-center items-center h-full text-gray-200">
            {loading ? <Spinner /> : <span className="flex flex-col items-center"><FaCamera fontSize={18} />Change Profile</span>}
          </span>
        </label>
        <img src={formData.avatar || user.avatar || '/default.png'} alt="avatar" className="h-40 rounded-full w-40 object-cover" />
        <input type="file" onChange={uploadImage} className="hidden" id="avatar" disabled={loading} />
      </div>

      {/* user details form */}
      <form className='flex flex-col w-full gap-2' onSubmit={handleUpdate}>
        {/* first name */}
        <div className="flex justify-between items-center">
          <label htmlFor="first_name" className="w-1/4">First Name:</label>
          <div className="flex flex-col w-3/4">
            <input
              type='text' className={'input-bar'}
              placeholder='First Name *' required id="first_name"
              onChange={handleChange}
              defaultValue={user.first_name}
            />
            {
              formDataError.first_name &&
              <small className="text-red-700 ml-3">
                {formDataError.first_name}
              </small>
            }
          </div>
        </div>

        {/* last name */}
        <div className="flex justify-between items-center">
          <label htmlFor="last_name" className="w-1/4">Last Name:</label>
          <div className="flex flex-col w-3/4">
            <input
              type='text' className={'input-bar'}
              placeholder='First Name *' required id="last_name"
              onChange={handleChange}
              defaultValue={user.last_name}
            />
            {
              formDataError.last_name &&
              <small className="text-red-700 ml-3">
                {formDataError.last_name}
              </small>
            }
          </div>
        </div>

        {/* email */}
        <div className="flex justify-between items-center">
          <label htmlFor="email" className="w-1/4">Email:</label>
          <div className="flex flex-col w-3/4">
            <input
              type='email' className={'input-bar'}
              placeholder='Email *' required id="email"
              onChange={handleChange}
              defaultValue={user.email}
            />
            {
              formDataError.email &&
              <small className="text-red-700 ml-3">
                {formDataError.email}
              </small>
            }
          </div>
        </div>

        {/* submit button */}
        <button className='submit mt-2' disabled={loading}>
          {loading ? <Spinner /> : 'Update Profile'}
        </button>
      </form>

      {/* trigger change password form button */}
      <div className="flex justify-start w-full mt-4">
        <button type="button" disabled={loading} className='link' onClick={() => setOpenModal(true)}>Change Password?</button>
      </div>
      
      {/* change password form */}
      <Modal show={openModal} onClose={closePasswordForm} position="center">
        <Modal.Body className='modal-body'>
          <h1 className='text-xl mb-5 uppercase'>change password</h1>
          <form className='flex flex-col gap-2 w-full' onSubmit={changePassword}>
            {/* old password */}
            <div className='w-full'>
              <div className='relative'>
                <input type={showPassword.old ? 'text' : 'password'}
                  className={passwordFormError.old_password ? `input-bar-error w-full` : 'input-bar w-full'}
                  placeholder='Old Password *' required id="old_password"
                  onChange={handlePasswordFormChange}
                />
                <button type='button' className='p-1 absolute inset-y-0 end-2.5'
                  onClick={() => setShowPassword({ ...showPassword, old: !showPassword.old })}>
                  {
                    showPassword.old ?
                      <FaEye className={passwordFormError.old_password ? 'icon-error text-lg' : 'icon text-lg'} />
                      :
                      <FaEyeSlash className={passwordFormError.old_password ? 'icon-error text-lg' : 'icon text-lg'} />
                  }
                </button>
              </div>
              {passwordFormError.old_password && <small className='text-red-700 ml-3'>{passwordFormError.old_password}</small>}
            </div>

            {/* new password */}
            <div className='w-full'>
              <div className='relative'>
                <input type={showPassword.new ? 'text' : 'password'}
                  className={passwordFormError.new_password ? `input-bar-error w-full` : 'input-bar w-full'}
                  placeholder='New Password *' required id="new_password"
                  onChange={handlePasswordFormChange}
                />
                <button type='button' className='p-1 absolute inset-y-0 end-2.5'
                  onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}>
                  {
                    showPassword.new ?
                      <FaEye className={passwordFormError.new_password ? 'icon-error text-lg' : 'icon text-lg'} />
                      :
                      <FaEyeSlash className={passwordFormError.new_password ? 'icon-error text-lg' : 'icon text-lg'} />
                  }
                </button>
              </div>
              {
                passwordFormError.new_password &&
                <small className='text-red-700 ml-3 flex flex-col'>
                  {passwordFormError.new_password}
                  {
                    !passwordFormError.same &&
                    <ol className='list-decimal ml-4'>
                      <li>must be 8 chars length at least</li>
                      <li>must contain 1 letter at least</li>
                      <li>must contain 1 digit at least</li>
                    </ol>
                  }
                </small>
              }
            </div>

            {/* confirm new password */}
            <div className='w-full'>
              <div className='relative'>
                <input type={showPassword.confirm ? 'text' : 'password'}
                  className={passwordFormError.confirm_new_password ? `input-bar-error w-full` : 'input-bar w-full'}
                  placeholder='Confirm New Password *' required id="confirm_new_password"
                  onChange={handlePasswordFormChange}
                />
                <button type='button' className='p-1 absolute inset-y-0 end-2.5'
                  onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}>
                  {
                    showPassword.confirm ?
                      <FaEye className={passwordFormError.confirm_new_password ? 'icon-error text-lg' : 'icon text-lg'} />
                      :
                      <FaEyeSlash className={passwordFormError.confirm_new_password ? 'icon-error text-lg' : 'icon text-lg'} />
                  }
                </button>
              </div>
              {passwordFormError.confirm_new_password && <small className='text-red-700 ml-3'>{passwordFormError.confirm_new_password}</small>}
            </div>

            {/* submit change password */}
            <div className="flex mt-2 gap-2">
              <button type='submit' className='submit w-full' disabled={loading}>
                {loading ? <Spinner /> : 'Confirm'}
              </button>
              <button type="button" className='cancel w-full' onClick={closePasswordForm}>Cancel</button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Profile