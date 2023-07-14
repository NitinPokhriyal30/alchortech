import React, {useState} from 'react';
import axios from 'axios';
import { api } from '../../api'
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePwBackground from '../../assets/images/login-signup/ChangePwBackground.png'
import High5Logo from '../../assets/images/login-signup/High5Logo.png'
import AlcorLogo from '../../assets/images/login-signup/AlcorLogo.png'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'

const ResetPassword = () => {

    const [showPassword, setShowPassword] = useState(false);

    const {uidb64, token} = useParams();

    const handleSubmit = async (password, token, uidb64) => {
      try {
        await api.auth.resetPassword(password, token, uidb64); 
  
        toast.success('Password changed successfully!');
        setTimeout(() => {
          window.location.replace('/');
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className="flex overflow-hidden justify-center items-center h-screen w-screen bg-gray-100">
            <div className="hidden md:w-max md:block">
                <img src={ChangePwBackground} alt="login-background"/>
                <img
                  className="absolute top-0 left-0 h-14 w-30 m-8"
                  src={AlcorLogo}
                  alt="alcor-logo"
                /> 
            </div>
            <div className='mx-auto'>
              <div className='absolute top-0 right-0'>
                <img className='pt-8 pr-4' src={High5Logo} alt='high5-logo'/>
              </div>

              <div className='text-center px-16 pb-4'>
                <p className="text-[22px] mb-4 font-Lato font-black text-[#000000] leading-25">Change Password</p>
              </div>

              <div className="bg-white rounded-xl drop-shadow-lg p-8 mx-auto w-80 h-auto">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault();
                  const newPassword = e.target.password.value;
                  const confirmPassword = e.target.confirmPassword.value;
                  if(newPassword === confirmPassword) {
                    const password = newPassword;
                    handleSubmit(password, token, uidb64);
                  } else {
                    toast.error('Password does not match')
                  }
                }}>
                  
                  <div className='relative'>
                      <input 
                      type={showPassword ? 'text' : 'password'} 
                      name="password" 
                      placeholder="New Password" 
                      required 
                      className="text-[16px] font-Lato text-[#ACACAC] border-b-2 border-gray-300 py-2 w-full focus:outline-none placeholder-opacity-50"
                      />
                      <span
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                      {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                      </span>
                  </div>

                  <div className='relative'>
                      <input 
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword" 
                      placeholder="Confirm Password" 
                      required
                      className="text-[16px] font-Lato text-[#ACACAC] border-b-2 border-gray-300 py-2 w-full focus:outline-none placeholder-opacity-50" 
                      />
                      <span
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                      {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                      </span>
                  </div>

                  <div>
                    <button type="submit" className="mt-10 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md">
                      Reset Password
                    </button>
                  </div>
                </form>  
              </div>
              <div className='mt-12'>
                <p className="text-[16px] mb-2 font-Lato font-bold text-[#AFAFAF]">Password should contain at least</p>
                <div className="text-[16px] my-2 font-Lato font-normal text-[#AFAFAF]">
                  <ul>{`6 characters`}</ul>
                  <ul>{`1 Upper case letter (A-Z)`}</ul>
                  <ul>{`1 Lower case letter (a-z)`}</ul>
                  <ul>{`1 Number (0-9)`}</ul>
                </div>
              </div>
            </div>
            <ToastContainer />
    </div>

    
   
 
   
  )
}

export default ResetPassword