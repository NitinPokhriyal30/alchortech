import React, { useEffect, useLayoutEffect, useReducer } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Navigate, Outlet, Route, Router, RouterProvider, Routes } from 'react-router-dom'
import AdminNavbar from './components/AdminNavbar'
import HomePage from './pages/HomePage'
import SurveryCreatePage from './pages/SurveryCreatePage'
import SurveyListPage from './pages/SurveyListPage'
import { store } from './redux/store'
import SingleComponentTestPage from './pages/SingleComponentTestPage'
import HomeSidebar from './components/HomeSidebar'
import MainNavbar from './components/MainNavbar'
import MyRewards from './components/MyRewards'
import RewardsHistory from './components/RewardsHistory'
import DirectoryPage from './pages/DirectoryPage'
import Login from './components/Auth/Login'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import MyProfile from './components/MyProfile'
import ProtectedRoute from '@/components/ProtectedRoute'
import { QueryClientProvider, useQuery, useQueryClient } from 'react-query'
import { queryClient } from '@/queryClient'
import { ToastContainer } from 'react-toastify'
import Cookies from 'js-cookie'
import { api } from '@/api'
import { Analytics } from './components/Analytics/Analytics'
import Transactions from '@/pages/Transactions'
import CampaignsTable from '@/components/Campaigns/CampaignsTable'
import CampaignCreate from '@/components/Campaigns/CampaignCreate'
import SurveyTable from '@/components/Survey/SurveryTable'
import SurveyCreate from '@/components/Survey/SurveyCreate'
import SurveyPreview from '@/components/Survey/SurveyPreview'
import QuizTable from '@/components/QuizPoll/QuizTable'
import Loader from '@/components/Loader'
import VoiceOutPage from '@/pages/VoiceOutPage'
import CampaignPreview from './components/Campaigns/CampaignPreview'
import Faqs from './components/Faqs'
import CampaignPublished from './components/Campaigns/CampaignPublished'

import CompanyAppearance from './components/AdminPanel/CompanyAppearance'
import CompanyRecognitionSettings from './components/AdminPanel/CompanyRecognitionSettings'
import ManageUsers from './components/AdminPanel/ManageUsers'
import EditUserDetails from './components/AdminPanel/EditUserDetails'
import AvailableVouchers from './components/AdminPanel/AvailableVoucher'
import RedemptionHistory from './components/AdminPanel/RedemptionHistory'
import RewardsApprovals from './components/AdminPanel/RewardsApprovals'
import Billings from './components/AdminPanel/Billings'
import AdminLogs from './components/AdminPanel/AdminLogs'
import AdminAnalytics from './components/AdminPanel/AdminAnalytics'


const QuizCreate = React.lazy(() => import('@/components/QuizPoll/QuizCreate'))

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
        <Route path="/admin/company/appearance" element={<CompanyAppearance />} />
        <Route path="/admin/company/recognition/settings" element={<CompanyRecognitionSettings />} />
        <Route path="/admin/users/" element={<ManageUsers />} />
        <Route path="/admin/users/details/settings" element={<EditUserDetails />} />
        <Route path="/admin/rewards/available-vouchers" element={<AvailableVouchers />} />
        <Route path="/admin/rewards/redemption-history" element={<RedemptionHistory />} />
        <Route path="/admin/rewards/approvals" element={<RewardsApprovals />} />
        <Route path="/admin/billings" element={<Billings />} />
        <Route path="/admin/logs" element={<AdminLogs />} />
        <Route path="/admin/analytics" element={<AdminAnalytics />} />


        <Route index element={<HomePage />} />
        <Route path="/:parameter" element={<HomePage />} />
        <Route path="my-rewards" element={<MyRewards />} />
        <Route path="my-rewards/rewards-history" element={<RewardsHistory />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="myProfile" element={<MyProfile />} />
        <Route path="profile/:id" element={'Not Implemented specific user profile page'} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="transactions/:id" element={<Transactions />} />
        <Route path="campaigns" element={<CampaignsTable />} />
        <Route path="campaign/create" element={<CampaignCreate />} />
        <Route path="voice-out" element={<VoiceOutPage />} />
        <Route path="campaign/:id" element={<CampaignPreview />} />
        <Route path="campaign/published" element={<CampaignPublished />} />
        <Route path="faqs" element={<Faqs />} />
      </Route>
      <Route path="/reset/password/passwordreset/:uidb64/:token" element={<ResetPassword />} />

      <Route
        path="/quiz"
        element={
          <ProtectedRoute>
            <main className="bg-[#ededed]">
              <MainNavbar />
              <div className="mx-auto grid w-full max-w-[1536px] grid-cols-[1fr] pl-0 pt-nav md:grid-cols-smallDevice md:px-[40px] lg:grid-cols-mediumDevice">
                <Outlet />
              </div>
            </main>
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <>
              <HomeSidebar />
              <QuizTable />
            </>
          }
        />
        <Route
          path="create"
          element={
            <>
              <HomeSidebar />
              <React.Suspense
                fallback={
                  <div className='pl-11 mt-[10vh] mx-auto'>
                    <Loader />
                  </div>
                }
              >
                <QuizCreate />
              </React.Suspense>
            </>
          }
        />
      </Route>

      

      <Route
        path="/survey/preview"
        element={
          <main className="bg-[#ededed]">
            <MainNavbar />
            <div className="mx-auto grid w-full max-w-[1536px] grid-cols-[1fr] pl-0 pt-nav md:grid-cols-smallDevice md:px-[40px] lg:grid-cols-mediumDevice">
              <HomeSidebar />
              <SurveyPreview />
            </div>
          </main>
        }
      />
      <Route
        path="/survey"
        element={
          <ProtectedRoute>
            <main className="bg-[#ededed]">
              <MainNavbar />
              <div className="mx-auto grid w-full max-w-[1536px] grid-cols-[1fr] pl-0 pt-nav md:grid-cols-smallDevice md:px-[40px] lg:grid-cols-mediumDevice">
                <Outlet />
              </div>
            </main>
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <>
              <HomeSidebar />
              <SurveyTable />
            </>
          }
        />
        <Route
          path="create"
          element={
            <>
              <HomeSidebar />
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
