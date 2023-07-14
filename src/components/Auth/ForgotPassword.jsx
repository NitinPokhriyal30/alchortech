import React, {useState} from 'react';
import { api } from '../../api'
import ForgotBackground from '../../assets/images/login-signup/ForgotBackground.png'
import High5Logo from '../../assets/images/login-signup/High5Logo.png'
import AlcorLogo from '../../assets/images/login-signup/AlcorLogo.png'
import SuccessLogo from '../../assets/images/login-signup/SuccessLogo.png'
import { ToastContainer, toast } from 'react-toastify';


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4NzU3ODYzLCJpYXQiOjE2ODg3NTYwNjMsImp0aSI6IjRiZjVlMjYyYWI1MzQ5Y2ViYzM4YzI3MzBlODFjMjVlIiwidXNlcl9pZCI6IjhjNjViNjIzLTU1NmEtNDZiNi05NjZlLTVhMGRkM2JhZWU0MCJ9.RJY8SXmMz8WdulZkNolYc9x3EsE2j72uoyxfUBNBOjI"
const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [showSuccess, setShowSuccess] = useState(false)

    const handleForgotPassword = async (email) => {
      try {
        await api.auth.forgotPassword({email}); 
        setShowSuccess(true);
        toast.success('Email Sent Successfully!');
      } catch (error) {
        console.error(error);
        toast.error('User not found!');
      }
    };


        return (
          <div className="flex justify-center md:justify-start items-center h-screen w-screen bg-gray-100">
            <div className="hidden md:block relative">
                <img className="object-cover h-screen w-screen" src={ForgotBackground} alt="login-background"/>
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

              {!showSuccess ? 
                <div>
                  <div className='text-center px-16 pb-14'>
                    <p className="text-[24px] mb-4 font-Lato font-black text-[#000000] leading-25">Forgot Password?</p>
                    <span className="text-[18px] font-Lato font-md text-[#5D5D5D]">Please enter the email address you'd like your password reset imformation sent to</span>
                  </div>

                  <div className="bg-white rounded-xl drop-shadow-lg p-8 mx-auto w-80 h-auto " >
                    <form className="space-y-4" autoComplete="off" onSubmit={(e) => {
                     e.preventDefault();
                     const email = e.target.email.value;
                     setEmail(email)
                     handleForgotPassword(email);
                    }}>
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Id" 
                    required 
                    className="text-[16px] font-Lato text-[#ACACAC] border-b-2 border-gray-300 py-2 w-full focus:outline-none placeholder-opacity-50"
                  />
                  <div>
                    <button 
                      type="submit" 
                      className="w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md">
                      Send Reset Link
                    </button>
                  </div>
                    </form>
                  </div>
                </div>
                 : 
                <div className="w-[500px]">
                  <div><img className='mx-auto mb-4' src={SuccessLogo} alt='success-logo' /></div>
                  <div className='text-center pb-14'>
                    <p className="text-[24px] mb-4 font-Lato font-black text-[#000000] leading-25">Reset Link Sent</p>
                    <span className="text-[18px] font-Lato font-md text-[#5D5D5D]">We have sent password reset link to your email</span>
                    <p className='mt-4 text-[14px] font-Lato font-md text-[#5486E3]'>{email}</p>
                  </div>
                </div> 
              }
              <ToastContainer />
            </div>
          </div>
        );
}

export default ForgotPassword





