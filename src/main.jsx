import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
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
import { QueryClientProvider } from 'react-query'
import { queryClient } from '@/queryClient'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/test" element={<SingleComponentTestPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <main className="bg-paper">
              <MainNavbar />
              <div className="pt-nav grid xxl:max-w-7xl lg:max-w-8xl m-auto w-full lg:grid-cols-mediumDevice md:grid-cols-smallDevice grid-cols-[1fr]">
                <HomeSidebar />
                <Outlet />
              </div>
            </main>
          </ProtectedRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="my-rewards" element={<MyRewards />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="company/users" element={<ManageUsers />} />
        <Route path="company/account" element={<Earnings />} />
      </Route>
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/reset/password/passwordreset/:uidb64/:token" element={<ResetPassword />} />
      <Route
        path="/survey"
        element={
          <>
            <AdminNavbar to="/survey" title="Survey Dashboard" />
            <Outlet />
          </>
        }
      >
        <Route index element={<SurveyListPage />}></Route>
        <Route path="/survey/create" element={<SurveryCreatePage />} />
      </Route>
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
)
