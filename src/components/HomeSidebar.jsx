import User from '../assets/images/user-profile/user.png'
import HighLogo from '../assets/images/navbar/high5mobile.png'

import { AiFillHome, AiFillGift } from 'react-icons/ai'
import {
  RiContactsBookFill,
  RiLogoutCircleFill,
  RiLogoutCircleRFill,
  RiSurveyFill,
  RiUserVoiceFill,
} from 'react-icons/ri'
import { SiGoogleanalytics } from 'react-icons/si'
import { HiSpeakerphone } from 'react-icons/hi'
import { BsQuestionCircle } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom'
import Notification from './Notification'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { BiX } from 'react-icons/bi'
import Cookies from 'js-cookie'
import { queryClient } from '@/queryClient'
import { useQuery } from 'react-query'
import { api } from '@/api'
import { SERVER_URL } from '@/constant'

export default function HomeSidebar({}) {
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))
  const showSidebar = useSelector((store) => store.sidebar)
  const dispatch = useDispatch()
  const setShowSidebar = (show) => dispatch({ type: 'sidebar', show })

  return (
    <>
      {/* backdrop */}
      {showSidebar && (
        <div
          style={{
            opacity: showSidebar ? '100%' : '',
          }}
          className=" absolute inset-0 z-[999] bg-black bg-opacity-20 lg:hidden md:hidden lg:opacity-100 opacity-0"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* sidebar */}
      <div
        style={{ left: showSidebar ? '0px' : '' }}
        className="transition-all xxl:py-3 xxl:pr-4 xxl:pl-6 xl:py-3  xl:pr-4 xl:pl-6 lg:py-3 lg:pr-4 lg:pl-6 md:py-0 md:pr-0 md:pl-0  sm:p-0 xs:p-0   lg:sticky lg:left-0 fixed -left-full lg:h-avoid-nav-lg lg:top-[87px] h-screen top-0 lg:z-0 z-[999] lg:w-auto md:w-[min(70vw,100%)] w-full"
      >
        <div className="h-full overflow-y-auto z-30 bg-primary md:rounded-[9px] flex flex-col">
          <div className="border-b-2 border-[#7096DB] lg:hidden px-5 pt-3">
            <div className="flex items-center justify-between ">
              <div className="mb-2 xxl:block xl:block lg:block md:block sm:block xs:block">
                <img className="h-12 mr-8" src={HighLogo} alt=" High Logo" />
              </div>

              <div className="flex items-center gap-4">
                <Notification />
                <button
                  className="active:ring-4 active:duration-75 ring-0 ring-white  rounded-full transition-[box-shadow] duration-300"
                  type="button"
                  onClick={() => setShowSidebar(false)}
                >
                  <BiX fontSize={32} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          {/*------------- Profile  ----------------------*/}
          <div className="px-5">
            <MenuLink
              to="/myProfile"
              className="flex items-center gap-3 border-b-[1px] border-[#7096DB] xxl:py-5 xl:py-5 lg:py-5 md:py-5 sm:py-3 xs:py-3"
            >
              <div>
                <img className='w-14 h-14 bg-gray-300 rounded-full overflow-hidden' src={SERVER_URL + me.data.avtar} alt="user avatar" />
              </div>
              <div>
                <p className="text-white font-Lato text-[16px] font-black">Hi,</p>
                <span className="text-white font-Lato text-[16px] font-normal">
                  {me.data.first_name} {me.data.last_name}
                </span>
              </div>
            </MenuLink>
          </div>
          {/*-------------- Nav Items  -------------------*/}

          <div className="flex flex-col px-5 pt-5 border-b-[1px] pb-5  border-[#7096DB]">
            <MenuLink to="/" className="nav-item-container">
              <AiFillHome />
              <span>Home</span>
            </MenuLink>
            <MenuLink to="/my-rewards" className="nav-item-container">
              <AiFillGift />
              <span>My Rewards</span>
            </MenuLink>
            <MenuLink to="/directory" className="nav-item-container">
              <RiContactsBookFill />
              <span>Directory</span>
            </MenuLink>
            <MenuLink to="/analytics" className="nav-item-container">
              <SiGoogleanalytics />
              <span>Analytics</span>
            </MenuLink>
            <MenuLink to="/campaign" className="nav-item-container">
              <HiSpeakerphone />
              <span>Campaigns</span>
            </MenuLink>
            <MenuLink to="/survey" className="nav-item-container">
              <RiSurveyFill />
              <span>Survey</span>
            </MenuLink>
            <MenuLink to="/voice-out" className="nav-item-container">
              <RiUserVoiceFill />
              <span>Voice Out</span>
            </MenuLink>
          </div>

          <div className="px-5 pt-3">
            <button
              type="button"
              to="/voice-out"
              className="w-full nav-item-container"
              onClick={() => {
                Cookies.remove('user_id')
                Cookies.remove('token')
                queryClient.setQueryData('me', undefined)
              }}
            >
              <RiLogoutCircleFill />
              <span>Logout</span>
            </button>
          </div>

          {/*--------------- FAQ Section  ----------------*/}

          <div className="mt-auto px-5 pt-16 pb-5">
            <div className="flex gap-3 items-center justify-between">
              <p className="text-white font-Lato font-light text-[16px] flex items-center gap-1 leading-[19px]">
                <BsQuestionCircle /> FAQs
              </p>
              <p className="text-white font-Lato font-light text-[16px] flex items-center gap-1 leading-[19px]">
                <BsQuestionCircle /> Feedback
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * @param {import("react-router-dom").LinkProps} props
 */
function MenuLink(props) {
  const dispatch = useDispatch()
  const setShowSidebar = (show) => dispatch({ type: 'sidebar', show })

  function handleClick() {
    setShowSidebar(false)
  }
  return <NavLink {...props} onClick={handleClick} />
}
