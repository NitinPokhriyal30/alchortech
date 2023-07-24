import React, {useState, useEffect} from 'react';
import { api } from '../../api'
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangePwBackground from '../../assets/images/login-signup/ChangePwBg.png'
import High5Logo from '../../assets/images/login-signup/High5Logo.png'
import AlcorLogo from '../../assets/images/login-signup/AlcorLogo.png'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { RiCheckLine, RiCloseLine } from 'react-icons/ri'

const ResetPassword = () => {

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNewPasswordValid, setIsNewPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);

  const { uidb64, token } = useParams();

  const validateMinLength = (password) => {
    return password.length >= 6;
  };

  const validateUpperCase = (password) => {
    return /[A-Z]/.test(password);
  };

  const validateLowerCase = (password) => {
    return /[a-z]/.test(password);
  };

  const validateNumber = (password) => {
    return /[0-9]/.test(password);
  };

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

  useEffect(() => {
    setIsNewPasswordValid(
      validateMinLength(newPassword) &&
      validateUpperCase(newPassword) &&
      validateLowerCase(newPassword) &&
      validateNumber(newPassword)
    );
  }, [newPassword]);

  useEffect(() => {
    setIsConfirmPasswordValid(
      validateMinLength(newPassword) &&
      validateUpperCase(newPassword) &&
      validateLowerCase(newPassword) &&
      validateNumber(newPassword) &&
      newPassword === confirmPassword && confirmPassword !== "");
  }, [newPassword, confirmPassword]);

  return (
    <div className="flex overflow-hidden justify-center items-center h-screen w-screen bg-gray-100">
            <div className="hidden md:w-max md:block">
                <img className="object-fit w-screen h-screen" src={ChangePwBackground} alt="login-background"/>
                <img
                  className="absolute top-4 left-4 h-14"
                  src={AlcorLogo}
                  alt="alcor-logo"
                /> 
            </div>
            <div className='mx-auto'>
              <div className='absolute top-0 right-0'>
                <img className='mt-5 pr-4' src={High5Logo} alt='high5-logo'/>
              </div>

              <div className='text-center px-16 pb-4'>
                <p className="text-[22px] mb-4 font-Lato font-black text-[#000000] leading-25">Change Password</p>
              </div>

              <div className="bg-white rounded-xl drop-shadow-lg p-8 mx-24 w-80  h-auto">
                <form className="space-y-4" onSubmit={(e) => {
                  e.preventDefault(); 
                  if(newPassword === confirmPassword) {
                    const password = newPassword;
                    handleSubmit(password, token, uidb64);
                  } else {
                    toast.error('Password does not match')
                  }
                }}>
                  
                <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="New Password"
                  required
                  className="text-[16px] font-Lato text-[#000000] border-b-2 border-gray-300 py-2 w-full focus:outline-none placeholder-opacity-50"
                  onChange={(e) => {
                    const password = e.target.value;
                    setNewPassword(password);
                  }}
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
                {isNewPasswordValid ? (
                  <RiCheckLine className="absolute top-1/2 right-10 -translate-y-1/2 text-green-500" />
                ) : (
                  <RiCloseLine className="absolute top-1/2 right-10 -translate-y-1/2 text-red-500" />
                )}
              </div>
              
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  required
                  className="text-[16px] font-Lato text-[#000000] border-b-2 border-gray-300 py-2 w-full focus:outline-none placeholder-opacity-50"
                  onChange={(e) => {
                    const password = e.target.value;
                    setConfirmPassword(password);
                  }}
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
                {isConfirmPasswordValid ? (
                  <RiCheckLine className="absolute top-1/2 right-10 -translate-y-1/2 text-green-500" />
                ) : (
                  <RiCloseLine className="absolute top-1/2 right-10 -translate-y-1/2 text-red-500" />
                )}
              </div>
              <div>
              <button
                type="submit"
                className={
                 isNewPasswordValid && isConfirmPasswordValid && newPassword === confirmPassword && newPassword !== "" && confirmPassword !== ""
                    ? "mt-10 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md"
                    : "mt-10 w-full bg-gray-500 text-white font-medium py-2 px-8 rounded-md"
                }
                disabled={
                  newPassword !== confirmPassword || newPassword === "" || confirmPassword === "" ||
                  (newPassword === confirmPassword && !isNewPasswordValid) || !isConfirmPasswordValid
                }
              >
                Reset Password
            </button>
              </div>
            </form>  
              </div>
              <div className='mt-12 mx-24'>
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