import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import LoginBackground from '../../assets/images/login-signup/LoginBackground.png'
import High5Logo from '../../assets/images/login-signup/High5Logo.png'
import AlcorLogo from '../../assets/images/login-signup/AlcorLogo.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { api } from '../../api'
import { queryClient } from '@/queryClient'
import Spinner from '@/components/Spinner'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri';


const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  
  useEffect(() => {
    // Check if the access token is expired and refresh if needed
    const checkTokenExpiryAndRefresh = async () => {
      const token = Cookies.get('token');
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        console.log(decodedToken);
        const currentTimestamp = Date.now() / 1000; // Convert to seconds
        console.log(currentTimestamp);
        if (decodedToken.exp < currentTimestamp) {
          try {
            setIsLoading(true);
            const refreshToken = Cookies.get('refresh');
            const { access } = await api.auth.refreshToken({ refresh: refreshToken });
            Cookies.set('token', access);
            setIsLoading(false);
          } catch (error) {
            console.log('Error refreshing token:', error);
            setIsLoading(false);
          }
        }
      }
    };

    checkTokenExpiryAndRefresh();
  }, []);
  
  const handleLogin = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
      setIsLoading(true)
      const { access, refresh } = await api.auth.login({ email, password })
      Cookies.set('token', access)
      Cookies.set('refresh', refresh)
      const { id } = await api.auth.currentUser()
      Cookies.set('user_id', id)
      const user = await api.auth.me(id)
      await queryClient.setQueryData('me', user)
      window.location.replace('/')
    } catch (error) {
      console.log(error)
      toast.error('Invalid Email Id or Password!')
      event.target.email.value = ''
      event.target.password.value = ''
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden bg-gray-100 md:justify-start">
      <div className="relative hidden md:block">
        <img
          className="ml-[-10px] h-screen w-screen object-fit"
          src={LoginBackground}
          alt="login-background"
        />
        <img className="h-14 absolute left-6 top-6" src={AlcorLogo} alt="alcor-logo" />
      </div>

      <div
        className="opacity-1 bg-[url('assets/images/login-signup/LoginSvg.svg')] bg-repeat-y"
        style={{ height: '100%' }}
      >
        <div className="mx-24 mt-40">
          <div>
            <img className="my-6 ml-16 mr-6" src={High5Logo} alt="high5-log" />
          </div>
          <div className="h-auto w-80 rounded-lg bg-white p-6 drop-shadow-lg ">
            <form className="space-y-4" autoComplete="off" onSubmit={handleLogin}>
              <input
                type="email"
                autoComplete="off"
                name="email"
                placeholder="Email Id"
                required
                className="w-full border-b-2 border-gray-300 p-2  text-[16px] text-[#ACACAC] placeholder-opacity-50 focus:outline-none"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  required
                  className="w-full border-b-2 border-gray-300 p-2 pr-10  text-[16px] text-[#ACACAC] placeholder-opacity-50 focus:outline-none"
                />
                <span
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <RiEyeLine /> : <RiEyeOffLine />}
                </span>
              </div>

              <div className="flex justify-between">
                <span className=" text-[12px] text-[#ACACAC]">
                  <input type="checkbox" id="rememberMe" className="mr-1" />
                  <label htmlFor="rememberMe" id="rememberMe" className="text-sm">
                    Remember me
                  </label>
                </span>
                <span className=" text-[14px] text-[#5486E3] hover:text-blue-800">
                  <Link to="/forgot/password">Forgot Password?</Link>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative mt-8 w-full rounded-md bg-blue-500 px-8 py-2 font-medium text-white hover:bg-blue-600"
                >
                  <Spinner isLoading={isLoading} />
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
