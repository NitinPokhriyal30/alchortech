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
import { Hidden } from '@mui/material'
import SearchBox from '@/components/Navbar/SearchBox'
import { processAvatarUrl } from '@/utils'

export default function MainNavbar() {
  const showSidebar = useSelector((store) => store.sidebar)
  const dispatch = useDispatch()
  const setShowSidebar = (show) => dispatch({ type: 'sidebar', show })
  const properties = useQuery('properties', () => api.properties())

  return (
    <div>
      <nav className="block fixed top-0 z-50 w-full px-[12px] xxl:py-[12px] xl:py-[12px] lg:py-[12px] md:py-[12px] md:px-[40px] sm:py-[11px] xs:py-[11px] bg-white shadow">
        <div className="mx-auto pl-0 pr-0 md:pr-39px max-w-[1536px] justify-between  md:items-center md:flex sm:flex justify-between xs:flex items-center h-full">
          <div className="flex items-center w-[70%] md:w-[685px]  xl:gap-4 lg:gap-4 md:gap-4 sm:gap-4 xs:gap-0 lg:pl-0 md:pl-3 pl-0">
            <div className="md:hidden">
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
                    className="h-12 w-[126px] object-cover xxl:ml-10"
                    src={processAvatarUrl(properties.data?.company.logo)}
                    alt={properties.data?.company.name}
                  />
                </h2>
              </Link>
            </div>

            <div className="w-full xxl:ml-28 xl:ml-28 lg:ml-28 md:ml-8 sm:ml-8 xs:ml-2  flex items-center justify-center border-[0.5px] border-[#808080] bg-[#F7F7F7] focus-within:bg-white rounded-[20px] group">
            <SearchBox />
            </div>
          </div>

          <div className=" xxl:ml-auto xl:ml-auto lg:ml-auto md:ml-auto sm:ml-3 xs:ml-3 flex justify-between items-center gap-14">
            <div className="xxl:block xl:block lg:block md:block sm:hidden xs:hidden">
              <Notification />
            </div>

            <div className="xxl:block xl:block lg:block md:block sm:block xs:block">
              <img
                className="h-12 xxl:h-12 xl:h-12 lg:h-12 xs:h-8 xxl:mr-10 sm:mr-0 xs:mr-0 "
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
