import User from '../assets/images/user-profile/user.png'
import HighLogo from '../assets/images/navbar/high5mobile.png'
import CampaignIcon from '@/assets/svg/home-sidebar/Group 672'

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
import HomeIcon from '@/assets/svg/home-sidebar/HomeIcon'
import PhoneIcon from '@/assets/svg/home-sidebar/phonebook.svg'
import Icon1 from "@/assets/svg/home-sidebar/Group 672"
import Icon2 from '@/assets/svg/home-sidebar/Group 950.svg'
import Icon3 from "@/assets/svg/home-sidebar/Group 947"
import Icon4 from '@/assets/svg/home-sidebar/Path 266.svg'
import Icon5 from "@/assets/svg/home-sidebar/Group3"

import AnalyticsIcon from '@/assets/svg/home-sidebar/noun-analytics-5506185.svg'
import PowerOffIcon from '@/assets/svg/home-sidebar/power-off (1).svg'

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
          className=" absolute inset-0 z-[999] bg-black bg-opacity-20 opacity-0 md:hidden lg:hidden lg:opacity-100"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* sidebar */}
      <div
        style={{ left: showSidebar ? '0px' : '' }}
        className="fixed -left-full top-0 z-[999] bg-[#ededed] flex h-screen w-full flex-col transition-all xs:p-0 sm:p-0 md:w-[min(70vw,100%)] md:py-0 md:pr-0 lg:sticky lg:left-0 lg:top-[87px] lg:z-0 lg:h-avoid-nav-lg lg:w-auto lg:py-3 lg:pr-[13px]"
      >
        <div className="z-30 flex flex-grow flex-col overflow-hidden overflow-y-auto bg-primary md:rounded-[9px]">
          <div className="border-b-2 border-[#7096DB] px-5 pt-3 lg:hidden">
            <div className="flex items-center justify-between ">
              <div className="mb-2 xs:block sm:block md:block lg:block xl:block xxl:block">
                <img className="mr-8 h-12" src={HighLogo} alt=" High Logo" />
              </div>

              <div className="flex items-center gap-4">
                <Notification />
                <button
                  className="rounded-full ring-0 ring-white transition-[box-shadow]  duration-300 active:ring-4 active:duration-75"
                  type="button"
                  onClick={() => setShowSidebar(false)}
                >
                  <BiX fontSize={32} className="text-white" />
                </button>
              </div>
            </div>
          </div>
          {/*------------- Profile  ----------------------*/}
          <div className="px-[10px]">
            <MenuLink
              to="/myProfile"
              className="mb-[28px] mt-[11px] flex items-center gap-3 rounded-[5px] px-3 hover:bg-white/[8%] xs:py-[11px] [&.active]:bg-white/[8%]"
            >
              <div>
                <img
                  className="h-14 w-14 overflow-hidden rounded-full bg-gray-300"
                  src={SERVER_URL + me.data.avtar}
                  alt="user avatar"
                />
              </div>
              <div>
                <p className="font-Lato text-[16px] font-black text-white">Hi,</p>
                <span className="font-Lato text-[16px] font-normal text-white">
                  {me.data.first_name} {me.data.last_name}
                </span>
              </div>
            </MenuLink>
          </div>
          {/*-------------- Nav Items  -------------------*/}

          <div className="xpt-5 flex flex-col border-[#7096DB] px-[10px]  pb-5">
            <MenuLink
              to="/"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><HomeIcon /></div>
              <span>Home</span>
            </MenuLink>
            <MenuLink
              to="/my-rewards"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><Icon3 fontSize={22} /></div>
              <span>My Rewards</span>
            </MenuLink>
            <MenuLink
              to="/directory"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><img src={PhoneIcon} /> </div>
              <span>Directory</span>
            </MenuLink>
            <MenuLink
              to="/analytics"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><img src={AnalyticsIcon} /> </div>
              <span>Analytics</span>
            </MenuLink>
            <MenuLink
              to="/campaign"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><CampaignIcon /></div>
              <span>Campaigns</span>
            </MenuLink>
            <MenuLink
              to="/survey"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><img src={Icon4} /></div>
              <span>Survey</span>
            </MenuLink>
            <MenuLink
              to="/voice-out"
              className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
            >
                <div className="w-[23px]"><Icon5 src={Icon4} /></div>
              <span>Voice Out</span>
            </MenuLink>
          </div>

            <div className="px-[33px] w-full ">
              <div className="h-[1px] bg-[#E5EDFB] bg-opacity-[36%]" />
            </div>

          <div className="px-[10px] pt-3">
            <button
              type="button"
              to="/voice-out"
              className="flex w-full items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px] font-Lato text-16px leading-[22px] text-white text-opacity-[85%] hover:bg-white/[8%] [&.active]:bg-white/[8%]"
              onClick={() => {
                Cookies.remove('user_id')
                Cookies.remove('token')
                queryClient.setQueryData('me', undefined)
              }}
            >
              <img src={PowerOffIcon} fontSize={22} />
              <span>Logout</span>
            </button>
          </div>

          {/*--------------- FAQ Section  ----------------*/}

          <div className="mt-auto px-5 pb-5 pt-16">
            <div className="flex items-center justify-between gap-3">
              <p className="flex items-center gap-1 font-Lato text-[16px] font-light leading-[19px] text-white">
                <BsQuestionCircle /> FAQs
              </p>
              <p className="flex items-center gap-1 font-Lato text-[16px] font-light leading-[19px] text-white">
                <BsQuestionCircle /> Feedback
              </p>
            </div>
          </div>
        </div>

        <p className="mb-[38px] mt-[25px] text-center text-10px">
          A product of Alcor | All rights reserved 2023
          <br />
          <Link to="#" className={COLORS.footer.terms}>
            Terms & Conditions | Privacy Policy
          </Link>
        </p>
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

const COLORS = {
  footer: {
    terms: 'text-[#0143BC]',
  },
}
