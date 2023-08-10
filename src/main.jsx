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
import { Analytics } from './components/Analytics/Analytics'
import CampaignsTable from './components/Campaigns/CampaignsTable'
import Transactions from '@/pages/Transactions'
import SurveyTable from '@/components/Survey/SurveryTable'
import SurveyCreate from '@/components/Survey/SurveyCreate'
import CampaignCreate from './components/Campaigns/CampaignCreate'

const router = createBrowserRouter(
  createRoutesFromElements(
    <React.Fragment>
      <Route path="/forgot/password" element={<ForgotPassword />} />
      <Route path="/test" element={<SingleComponentTestPage />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <main className="bg-[#ededed]">
              <MainNavbar />
              <div className="mx-auto grid w-full max-w-[1536px] grid-cols-[1fr] pl-0 pt-nav md:grid-cols-smallDevice md:px-[40px] lg:grid-cols-mediumDevice">
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
        <Route path="profile/:id" element={'Not Implemented specific user profile page'} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="company/users" element={<ManageUsers />} />
        <Route path="company/account" element={<Earnings />} />
        <Route path="transactions/:id" element={<Transactions />} />
        <Route path="campaigns" element={<CampaignsTable />} />
        <Route path="campaign/create" element={<CampaignCreate />} />
      </Route>
      <Route path="/reset/password/passwordreset/:uidb64/:token" element={<ResetPassword />} />

      <Route
        path="/survey"
        element={
          // <ProtectedRoute>
            <main className="bg-[#ededed]">
              <MainNavbar />
              <div className="mx-auto grid w-full max-w-[1536px] grid-cols-[1fr] pl-0 pt-nav md:grid-cols-smallDevice md:px-[40px] lg:grid-cols-mediumDevice">
                <Outlet />
              </div>
            </main>
          // </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <>
              <div />
              {/* <HomeSidebar /> */}
              <SurveyTable />
            </>
          }
        />
        <Route
          path="create"
          element={
            <>
              {/* <HomeSidebar /> */}
              <SurveyCreate />
            </>
          }
        />
      </Route>
    </React.Fragment>
  )
)

const _unauthRoutes = createBrowserRouter(
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>
)

// react easy crop
function _GetUserFromCookies({ children }) {
  return <RouterProvider router={router} />
}
