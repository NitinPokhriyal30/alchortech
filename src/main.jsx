import React, { useEffect, useLayoutEffect, useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import AdminNavbar from './components/AdminNavbar'
import HomePage from './pages/HomePage'
import SurveryCreatePage from './pages/SurveryCreatePage'
import SurveyListPage from './pages/SurveyListPage'
import { store } from './redux/store'
import SingleComponentTestPage from './pages/SingleComponentTestPage'
import HomeSidebar from './components/HomeSidebar'
import MainNavbar from './components/MainNavbar'
import MyRewards from './components/MyRewards'
import DirectoryPage from './pages/DirectoryPage'
import Login from './components/Auth/Login'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import ManageUsers from './components/AdminPanel/ManageUsers'
import Earnings from './components/AdminPanel/Earnings'
import MyProfile from './components/MyProfile'
import ProtectedRoute from '@/components/ProtectedRoute'
import { QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import { queryClient } from '@/queryClient'
import { ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'
import { api } from '@/api'

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/test" element={<SingleComponentTestPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <main className="bg-[#ededed]">
            <MainNavbar />
            <div className="mx-auto grid w-full max-w-[1536px] grid-cols-[1fr] pl-0 pt-nav md:grid-cols-smallDevice md:pl-9 md:pr-[39px] lg:grid-cols-mediumDevice">
              <HomeSidebar />
              <Outlet />
            </div>
          </main>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="my-rewards" element={<MyRewards />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="company/users" element={<ManageUsers />} />
        <Route path="company/account" element={<Earnings />} />
      </Route>
      <Route path="/reset/password/passwordreset/:uidb64/:token" element={<ResetPassword />} />
      <Route
        path="/survey"
        element={
          <React.Fragment>
            <AdminNavbar to="/survey" title="Survey Dashboard" />
            <Outlet />
          </React.Fragment>
        }
      >
        <Route index element={<SurveyListPage />}></Route>
        <Route path="/survey/create" element={<SurveryCreatePage />} />
      </Route>
    </React.Fragment>
  )
)

const unauthRoutes = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/login" element={<Login />} />
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/reset/password/passwordreset/:uidb64/:token" element={<ResetPassword />} />
      <Route path="*" element={<Navigate to="/login" />} />
      
    </React.Fragment>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <GetUserFromCookies>
        <RouterProvider router={router} />
      </GetUserFromCookies>
    </QueryClientProvider>
  </Provider>
)

// react easy crop
function GetUserFromCookies({ children }) {
  const user_id = Cookies.get('user_id')
  const me = useQuery(
    'me',
    () => {
      if (!user_id) return undefined
      return api.auth.me(user_id)
    },
    {
      onError: () => {
        Cookies.remove('token')
        Cookies.remove('user_id')
      },
    }
  )

  if (user_id && me.isLoading) {
    return 'Loading'
  }

  return <RouterProvider router={me.data ? router : unauthRoutes} />
}
