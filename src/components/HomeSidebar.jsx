import React from "react";
import HighLogo from "../assets/images/navbar/high5mobile.png";
import CampaignIcon from "@/assets/svg/home-sidebar/Group 672";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import Notification from "./Notification";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { BiX } from "react-icons/bi";
import Cookies from "js-cookie";
import { queryClient } from "@/queryClient";
import { useQuery } from "react-query";
import { api } from "@/api";
import HomeIcon from "@/assets/svg/home-sidebar/HomeIcon";
import PhoneIcon from "@/assets/svg/home-sidebar/phonebook.svg";
import Icon2 from "@/assets/svg/home-sidebar/Group 950.svg";
import Icon3 from "@/assets/svg/home-sidebar/Group 947";
import Icon4 from "@/assets/svg/home-sidebar/Path 266.svg";
import Icon6 from "@/assets/svg/home-sidebar/noun-quiz-4075470.svg";
import Icon5 from "@/assets/svg/home-sidebar/Group3";

import AnalyticsIcon from "@/assets/svg/home-sidebar/noun-analytics-5506185.svg";
import PowerOffIcon from "@/assets/svg/home-sidebar/power-off (1).svg";
import HelpIcon from "@/assets/svg/home-sidebar/HelpIcon";
import { getAvatarAttributes, processAvatarUrl } from "@/utils";
import Loader from "./Loader";

export default function HomeSidebar({}) {
  const userId = Cookies.get("user_id");
  const me = useQuery("me", () => api.auth.me(userId));
  const showSidebar = useSelector((store) => store.sidebar);
  const dispatch = useDispatch();
  const setShowSidebar = (show) => dispatch({ type: "sidebar", show });
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminView = location.pathname.startsWith("/admin");
  const [dropdownTab, setdropdownTab] = React.useState('');

  if (me.isLoading) {
    return (
      <div className="flex justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* backdrop */}
      {showSidebar && (
        <div
          style={{
            opacity: showSidebar ? "100%" : "",
          }}
          className=" absolute inset-0 z-[999] bg-black bg-opacity-20 opacity-0 md:hidden lg:hidden lg:opacity-100"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* sidebar */}
      <div
        style={{ left: showSidebar ? "0px" : "" }}
        className="fixed -left-full top-0 z-[999] flex h-screen w-full flex-col bg-[#ededed] transition-all xs:p-0 sm:p-0 md:max-h-[680px] md:w-[min(70vw,100%)] md:py-0 md:pr-0 lg:sticky lg:left-0 lg:top-[87px] lg:z-0 lg:h-avoid-nav-lg lg:w-auto lg:py-3 lg:pr-[12px]"
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
              to={`/myProfile?userId=${userId}`}
              className="mb-[11px] mt-[11px] flex items-center gap-3 rounded-[5px] px-3 hover:bg-white/[8%] xs:py-[11px] md:mb-[18px] [&.active]:bg-white/[8%]"
            >
              <div>
                <img
                  className="h-14 w-14 overflow-hidden rounded-full bg-gray-300"
                  src={
                    getAvatarAttributes(
                      `${me.data.full_name}`,
                      processAvatarUrl(me.data.avtar)
                    ).src
                  }
                  alt={
                    getAvatarAttributes(
                      `${me.data.full_name}`,
                      processAvatarUrl(me.data.avtar)
                    ).alt
                  }
                  onError={(e) => {
                    // If the image fails to load, use the name initials instead
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      me.data.full_name.split(" ")[0].charAt(0) +
                        me.data.full_name.split(" ")[1].charAt(0)
                    )}&color=${"#464646"}&background=${"FFFFFF"}`;
                  }}
                />
              </div>
              <div className="flex flex-col">
                <p className=" text-[16px] font-black text-white">Hi,</p>
                <span className=" text-[16px] font-normal text-white">
                  {me.data.full_name}
                </span>
                {me.data.role === "admin" && !isAdminView && (
                  <Link
                    to="/admin/company/appearance"
                    className="z-99 mt-3 cursor-pointer rounded-sm bg-[#fff] px-4 py-[1px]"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/admin/company/appearance");
                    }}
                  >
                    <p className="text-center text-[12px] text-[#5486E3]">
                      Admin View
                    </p>
                  </Link>
                )}

                {isAdminView && (
                  <Link
                    to="/"
                    className="z-99 mt-3 cursor-pointer rounded-sm bg-[#fff] px-4 py-[1px]"
                  >
                    <p className="text-center text-[12px] text-[#5486E3]">
                      Back to home
                    </p>
                  </Link>
                )}
              </div>
            </MenuLink>
          </div>
          {/*-------------- Nav Items  -------------------*/}

          {!isAdminView && (
            <div className="xpt-5 flex flex-col border-[#7096DB] px-[10px]  pb-[12px]">
              <MenuLink
                to="/"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <HomeIcon />
                </div>
                <span>Home</span>
              </MenuLink>
              <MenuLink
                to="/my-rewards"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <Icon3 fontSize={22} />
                </div>
                <span>My Rewards</span>
              </MenuLink>
              <MenuLink
                to="/directory"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <img src={PhoneIcon} />{" "}
                </div>
                <span>Directory</span>
              </MenuLink>
              <MenuLink
                to="/analytics"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <img src={AnalyticsIcon} />{" "}
                </div>
                <span>Analytics</span>
              </MenuLink>
              <MenuLink
                to="/campaigns"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <CampaignIcon />
                </div>
                <span>Campaigns</span>
              </MenuLink>

              <MenuLink
                to="/survey"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <img src={Icon4} />
                </div>
                <span>Polls/Surveys</span>
              </MenuLink>
              <MenuLink
                to="/quiz"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <img className="fill-current text-teal-500" src={Icon6} />
                </div>
                <span>Quiz</span>
              </MenuLink>
              <MenuLink
                to="/voice-out"
                className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] [&.active]:bg-white/[8%]"
              >
                <div className="w-[23px]">
                  <Icon5 src={Icon4} />
                </div>
                <span>Voice Out</span>
              </MenuLink>
            </div>
          )}

          {isAdminView && (
            <div className="xpt-5 flex flex-col border-[#7096DB] px-[10px]  pb-[12px]">
              <button
                className={`flex flex-col justify-center gap-2 rounded pb-[15px]  pt-[9px] text-16px text-white text-opacity-[85%] ${
                  dropdownTab === 'Company' ? "bg-white/[8%]" : ""
                }`}
              >
                <div onClick={() => setdropdownTab('Company')} className="flex items-center gap-[13px] rounded pt-[9px] pl-[23px] text-16px leading-[22px] text-white text-opacity-[85%]">
                  <div className="w-[23px]">
                    <HomeIcon />
                  </div>
                  <span>Company</span>
                </div>
                {dropdownTab === 'Company' && (
                  <div className="w-full px-2">
                    <MenuLink
                      to="/admin/company/appearance"
                      className="flex items-center gap-[13px] rounded py-1 pl-12 text-[14px] leading-[22px] text-white text-opacity-[85%] [&.active]:bg-[#2F64C6]"
                    >
                      <span>Appearance</span>
                    </MenuLink>

                    <MenuLink
                      to="/admin/company/recognition/settings"
                      className="flex items-center gap-[13px] rounded py-1 pl-12 text-[14px] leading-[22px] text-white text-opacity-[85%] [&.active]:bg-[#2F64C6]"
                    >
                      <span>Recognition Settings</span>
                    </MenuLink>
                  </div>
                )}
              </button>

              <MenuLink to="/admin/users" className="[&.active]:bg-white/[8%]">
                <div
                  onClick={() => setdropdownTab('')}
                  className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] "
                >
                  <div className="w-[23px]">
                    <img src={PhoneIcon} />{" "}
                  </div>
                  <span>Users</span>
                </div>
              </MenuLink>

              <button
              className={`flex flex-col justify-center gap-2 rounded pb-[15px]  text-16px text-white text-opacity-[85%] ${
                dropdownTab === 'Rewards' ? "bg-white/[8%]" : ""
              }`}
            >
              <div onClick={() => setdropdownTab('Rewards')} className="flex items-center gap-[13px] rounded pt-[9px] pl-[23px] text-16px leading-[22px] text-white text-opacity-[85%]">
                <div className="w-[23px]">
                  <Icon3 fontSize={22} />
                </div>
                <span>Rewards</span>
              </div>
              {dropdownTab === 'Rewards' && (
                <div className="w-full px-2">
                  <MenuLink
                    to="/admin/rewards/available-vouchers"
                    className="flex items-center gap-[13px] rounded py-1 pl-12 text-[14px] leading-[22px] text-white text-opacity-[85%] [&.active]:bg-[#2F64C6]"
                  >
                    <span>Available Vouchers</span>
                  </MenuLink>

                  <MenuLink
                    to="/admin/rewards/redemption-history"
                    className="flex items-center gap-[13px] rounded py-1 pl-12 text-[14px] leading-[22px] text-white text-opacity-[85%] [&.active]:bg-[#2F64C6]"
                  >
                    <span>Redemption History</span>
                  </MenuLink>

                  <MenuLink
                    to="/admin/rewards/approvals"
                    className="flex items-center gap-[13px] rounded py-1 pl-12 text-[14px] leading-[22px] text-white text-opacity-[85%] [&.active]:bg-[#2F64C6]"
                  >
                    <span>Aprrovals</span>
                  </MenuLink>
                </div>
              )}
            </button>

              <MenuLink
                to="/admin/billings"
                className="[&.active]:bg-white/[8%]"
              >
                <div
                   onClick={() => setdropdownTab('')}
                  className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%]"
                >
                  <div className="w-[23px]">
                    <Icon3 fontSize={22} />
                  </div>
                  <span>Billings</span>
                </div>
              </MenuLink>

              <MenuLink to="/admin/logs" className="[&.active]:bg-white/[8%]">
                <div
                   onClick={() => setdropdownTab('')}
                  className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%]"
                >
                  <div className="w-[23px]">
                    <CampaignIcon />
                  </div>
                  <span>Logs</span>
                </div>
              </MenuLink>

              <MenuLink
                to="/admin/analytics"
                className="[&.active]:bg-white/[8%]"
              >
                <div
                   onClick={() => setdropdownTab('')}
                  className="flex items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%]"
                >
                  <div className="w-[23px]">
                    <img src={AnalyticsIcon} />{" "}
                  </div>
                  <span>Analytics</span>
                </div>
              </MenuLink>
            </div>
          )}

          <div className="w-full px-[33px] ">
            <div className="h-[1px] bg-[#E5EDFB] bg-opacity-[36%]" />
          </div>

          <div className="px-[10px] pt-3">
            <button
              type="button"
              to="/voice-out"
              className="flex w-full items-center gap-[13px] rounded pb-[15px] pl-[23px] pt-[9px]  text-16px leading-[22px] text-white text-opacity-[85%] hover:bg-white/[8%] [&.active]:bg-white/[8%]"
              onClick={() => {
                Cookies.remove("user_id");
                Cookies.remove("token");
                queryClient.setQueryData("me", undefined);
              }}
            >
              <img src={PowerOffIcon} fontSize={22} />
              <span>Logout</span>
            </button>
          </div>

          {/*--------------- FAQ Section  ----------------*/}

          <div className="flex justify-between mt-auto pb-[22px] pl-[33px] pr-[30px]">
            <MenuLink
              to="/faqs"
              className="flex items-center justify-between gap-3"
            >
              <p className="flex items-center gap-1  text-[16px] font-light leading-[19px] text-white">
                <span className="text-primary">
                  <HelpIcon fill="white" />
                </span>{" "}
                FAQs
              </p>
            </MenuLink>
            <MenuLink
            to="/feedback"
          >
          <p className="flex items-center gap-1  text-[16px] font-light leading-[19px] text-white">
            <img src={Icon2} alt="" /> Feedback
          </p>
          </MenuLink>
          </div>
        </div>

       
      </div>
    </>
  );
}

/**
 * @param {import("react-router-dom").LinkProps} props
 */
function MenuLink(props) {
  const dispatch = useDispatch();
  const setShowSidebar = (show) => dispatch({ type: "sidebar", show });

  function handleClick() {
    setShowSidebar(false);
  }
  return <NavLink {...props} onClick={handleClick} />;
}

const COLORS = {
  footer: {
    terms: "text-[#0143BC]",
  },
};
