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
  const { isLoading, loggedIn } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    try {
      // const response = await axios.post('http://backend.letshigh5.com/login/', {
      //   email,
      //   password
      // });

      dispatch({ type: 'user/login' })
      const { token, id } = await api.auth.login({ email, password })
      Cookies.set('token', token)
      Cookies.set('user_id', id)
      await queryClient.fetchQuery('me', () => api.auth.me(id))
      dispatch({ type: 'user/login_done', token })
      navigate('/', { replace: true })
    } catch (error) {
      dispatch({ type: 'user/login_fail', error })
      console.log(error)
      toast.error('Invalid Email Id or Password!')
      event.target.email.value = ''
      event.target.password.value = ''
    }
  }

  return (
    <div className="flex overflow-hidden justify-center md:justify-start items-center h-screen w-full bg-gray-100">
      <div className="hidden pt-18 mt-10 w-full md:block relative">
        <img className="object-fill  ml-[-8px]" src={LoginBackground} alt="login-background" />
        <img className="absolute top-6 left-6" src={AlcorLogo} alt="alcor-logo" />
      </div>

      <div
        className="opacity-1 bg-repeat-y bg-[url('assets/images/login-signup/LoginSvg.svg')]"
        style={{ height: '100%' }}
      >
        <div className="mx-24 mt-40">
          <div>
            <img className="ml-16 mr-6 my-6" src={High5Logo} alt="high5-log" />
          </div>
          <div className="bg-white rounded-lg drop-shadow-lg p-6 w-80 h-auto ">
            <form className="space-y-4" autoComplete="off" onSubmit={handleLogin}>
              <input
                type="email"
                autoComplete="off"
                name="email"
                placeholder="Email Id"
                required
                className="text-[16px] font-Lato text-[#ACACAC] border-b-2 border-gray-300 p-2 w-full focus:outline-none placeholder-opacity-50"
              />

              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Password"
                required
                className="text-[16px] font-Lato text-[#ACACAC] border-b-2 border-gray-300 p-2 w-full focus:outline-none placeholder-opacity-50"
              />

              <div className="flex justify-between">
                <span className="text-[12px] font-Lato text-[#ACACAC]">
                  <input type="checkbox" id="rememberMe" className="mr-1" />
                  <label htmlFor="rememberMe" className="text-sm">
                    Remember me
                  </label>
                </span>
                <span className="text-[12px] font-Lato text-[#5486E3]">
                  <Link to="/forgot/password">Forgot Password?</Link>
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="relative w-full mt-8 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-8 rounded-md"
                >
                  {isLoading ? (
                    <span className="bg-inherit absolute inset-0 grid place-items-center rounded-[inherit]">
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
