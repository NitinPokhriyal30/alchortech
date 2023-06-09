import * as React from 'react'
import { CiSearch } from 'react-icons/ci'
import { FcMenu } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import alcoreLogo from '../assets/images/navbar/alcor-logo.png'
import HighLogo from '../assets/images/navbar/high5.png'
import Notification from './Notification'
import { api } from '@/api'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export default function MainNavbar() {
  const showSidebar = useSelector((store) => store.sidebar)
  const dispatch = useDispatch()
  const setShowSidebar = (show) => dispatch({ type: 'sidebar', show })
  const properties = useQuery('properties', () => api.properties())

  return (
    <div>
      <nav className="block fixed top-0 z-50 w-full xxl:py-[12px] xl:py-[12px] lg:py-[12px] md:py-[12px] sm:py-[11px] xs:py-[11px] bg-white shadow">
        <div className="mx-auto pl-0 md:pl-9 pr-0 md:pr-39px max-w-[1536px] justify-evenly  md:items-center md:flex sm:flex xs:flex items-center h-full">
          <div className="flex items-center xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 xs:gap-0 lg:pl-0 md:pl-3 pl-0">
            <div>
              <button
                type="button"
                className="block lg:hidden rounded-full p-2 hover:bg-translucent"
                onClick={() => setShowSidebar((p) => !p)}
              >
                <FcMenu fontSize={20} />
              </button>
            </div>
            <div className="flex w-full items-center justify-between xxl:block xl:block lg:block md:block sm:hidden xs:hidden">
              <Link to="/">
                <h2 className="text-2xl font-bold">
                  <img
                    className="h-12 w-[126px] object-cover"
                    src={properties.data?.company.logo}
                    alt={properties.data?.company.name}
                  />
                </h2>
              </Link>
            </div>

            <div className="w-full xxl:ml-28 xl:ml-28 lg:ml-28 md:ml-8 sm:ml-8 xs:ml-2  flex items-center justify-center border-[0.5px] border-[#808080] bg-[#F7F7F7] focus-within:bg-white rounded-[20px] group">
              <form>
                <div className="flex items-center pt-2 pb-[9px] text-[#acacac] rounded-[20px]">
                  <CiSearch className="ml-[14px]" />
                  <input
                    type="search"
                    name=""
                    className="xxl:w-96 xl:w-96 lg:w-96 md:w-[22rem] sm:w-96 xs:w-70 py-100 text-16px font-Lato bg-transparent rounded-[20px] pl-[10px] placeholder:font-Lato placeholder:text-[#ACACAC] placeholder:text-[16px] focus:outline-none"
                    placeholder="Search Users, Mentioned, Hashtags…"
                  />
                </div>
              </form>
            </div>
          </div>

          <div className=" xxl:ml-auto xl:ml-auto lg:ml-auto md:ml-auto sm:ml-3 xs:ml-3 flex justify-between items-center gap-14">
            <div className="xxl:block xl:block lg:block md:block sm:hidden xs:hidden">
              <Notification />
            </div>

            <div className="xxl:block xl:block lg:block md:block sm:block xs:block">
              <img
                className="h-12 xxl:h-12 xl:h-12 lg:h-12 xs:h-8 xxl:mr-6 xl:mr-6 lg:mr-6 md:mr-8 sm:mr-0 xs:mr-0 "
                src={HighLogo}
                alt=" High Logo"
              />
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
