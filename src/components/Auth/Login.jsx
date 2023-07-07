import React, { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import LoginBackground from '../../assets/images/login-signup/LoginBackground.png'
import High5Logo from '../../assets/images/login-signup/High5Logo.png'
import AlcorLogo from '../../assets/images/login-signup/AlcorLogo.png'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { api } from '../../api'
import { useSelector, useDispatch } from 'react-redux'
import { RiLoader2Line } from 'react-icons/ri'
import { queryClient } from '@/queryClient'

const Login = () => {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
      setIsLoading(true)
      const { token, id } = await api.auth.login({ email, password })
      Cookies.set('token', token)
      Cookies.set('user_id', id)
      await queryClient.fetchQuery('me', () => api.auth.me(id))
      navigate('/', { replace: true })
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
      <div className="hidden md:block relative">
        <img className="object-cover h-screen w-screen ml-[-10px]" src={LoginBackground} alt="login-background" />
        <img className="absolute left-6 top-6" src={AlcorLogo} alt="alcor-logo" />
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
                className="w-full border-b-2 border-gray-300 p-2 font-Lato text-[16px] text-[#ACACAC] placeholder-opacity-50 focus:outline-none"
              />

              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Password"
                required
                className="w-full border-b-2 border-gray-300 p-2 font-Lato text-[16px] text-[#ACACAC] placeholder-opacity-50 focus:outline-none"
              />

              <div className="flex justify-between">
                <span className="font-Lato text-[12px] text-[#ACACAC]">
                  <input type="checkbox" id="rememberMe" className="mr-1" />
                  <label htmlFor="rememberMe" id='rememberMe' className="text-sm">
                    Remember me
                  </label>
                </span>
                <span className="font-Lato text-[12px] text-[#5486E3]">
                  <Link to="/forgot/password">Forgot Password?</Link>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative mt-8 w-full rounded-md bg-blue-500 px-8 py-2 font-medium text-white hover:bg-blue-600"
                >
                  {isLoading ? (
                    <span className="absolute inset-0 grid place-items-center rounded-[inherit] bg-inherit">
                      <RiLoader2Line className="animate-[spin_1.5s_infinite_linear]" />
                    </span>
                  ) : null}
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
