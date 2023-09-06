import { Padding } from '@mui/icons-material'
import React, { useState } from 'react'
import { AiOutlinePlus, AiFillClockCircle, AiFillCloseCircle, AiFillRightCircle, AiFillCaretDown } from 'react-icons/ai'
import { BsPencilFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

const SORT_OPTIONS = [
  { label: 'Last 60 days', value: '1' },
  { label: 'Last 6 months', value: '2' },
  { label: 'Last quarter', value: '3' },
  { label: 'This quarter', value: '4' },
  { label: 'Last month', value: '5' },
  { label: 'This month', value: '6' },
]

const SurveyTable = () => {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0])
  const navigate = useNavigate()
  const [tab, setTab] = React.useState('draft')
  const rows = tab === 'draft' ? 5 : tab === 'running' ? 1 : tab === 'closed' ? 8 : 7

  return (
    <div className="h-screen w-screen md:w-full"> 
      <div className="mt-2 flex justify-between px-3 md:px-0 ">
        <div className="font-Lato text-[20px] font-bold text-[#464646]">Survey</div>
        <div className="rounded-md bg-[#5486E3]  font-Lato text-white">
          <Link to="/survey/create" className="flex items-center px-5 py-2 gap-1">
            <span>{<AiOutlinePlus />}</span>
            Create Survey
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-y-4 px-3 md:pl-2 md:justify-start">
        <div className="flex flex-1 justify-around md:justify-start md:gap-6">
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'draft' && '!border-primary  text-primary')} onClick={() => setTab('draft')}>
            <span>{<BsPencilFill />}</span>Draft
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'scheduled' && '!border-primary  text-primary')} onClick={() => setTab('scheduled')}>
            <span>{<AiFillClockCircle />}</span> Scheduled
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'running' && '!border-primary  text-primary')} onClick={() => setTab('running')}>
            <span>{<AiFillRightCircle />}</span>Running
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'closed' && '!border-primary  text-primary')} onClick={() => setTab('closed')}>
            <span>{<AiFillCloseCircle />}</span>Closed
          </button>
        </div>
        <div className="md:ml-auto">
          <div className="relative flex items-center text-sm text-[#7B7B7B]">
            Sort By:
            <button className="peer flex items-center gap-1 pl-1 font-Lato text-sm font-semibold">
              {sortBy.label}
              <span>
                <AiFillCaretDown />
              </span>
            </button>
            <div className="absolute right-[1px] top-full z-10 hidden w-36 flex-col rounded-lg bg-white py-2 text-end drop-shadow-[0px_2px_6px_#44444F1A]  hover:flex peer-hover:flex child:cursor-pointer">
              {SORT_OPTIONS?.map((option) => (
                <p key={option.value} className=" px-4 py-1 font-Lato text-sm hover:bg-translucent-black" onClick={() => setSortBy(option)}>
                  {option.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-1 px-3 md:pl-2">
        <div className="h-[1px] w-full bg-[#cecece]"></div>
      </div>

      <div className="mx-3 md:mx-0 mt-2 flex overflow-auto rounded-lg bg-white drop-shadow-md">
        <table className="w-full  min-w-[550px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-16px ">
              <th className="text-left py-[15.5px] pl-8 text-start font-Lato text-16px font-medium text-[#292929] md:pl-[45px]"></th>
              <th className="md:w-1/3 text-left py-[15.5px] text-start font-Lato text-16px font-medium text-[#292929]">Name</th>
              <th className="md:w-1/5 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">Start date</th>
              <th className="md:w-1/5 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">End date</th>
              <th className="md:w-1/6 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">Type</th>
              <th className="md:w-1/1 py-4 text-right font-Lato text-[16px] font-medium text-[#292929]"></th>
              <th className="py-4 text-right font-Lato text-[16px] font-medium text-[#292929] pl-[20px] md:pl-[45px]"></th>
            </tr>
          </thead>
          <tbody className="table-body" style={{ padding: '20px' }}>
            {Array.from({ length: rows }).map(() => (
              <tr className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec] " onClick={() => navigate('/survey/preview')}>
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] "></td>
                <td className="py-3 text-left text-[16px] font-semibold text-[#5486E3] ">Survey 1</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">Feb 13, 2023</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">Feb 18, 2023</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">Automatic</td>
                <td className="py-3 text-right md:opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:pl-[45px]">
                  <RxCross1 className="cursor-pointer text-[#292929]" />
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]"></td>
              </tr>
            ))}
          </tbody>
        </table>
       
      </div>
      <div className="mx-auto mt-5 flex max-w-[14rem] items-center justify-between ">
        <div className="flex">
          <button disabled='' className="grid h-9 w-9 text-[#8d8d8d] place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300">
            <SlArrowLeft className="text-xl" />
          </button>

          <button disabled='' className="ml-3 grid h-9 w-9 text-[#8d8d8d] place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300" >
            <SlArrowRight className="text-xl" />
          </button>
        </div>

        <span className='text-[#8d8d8d]'>
          Page 1 of - 2
          {/* {users.data?.count} */}
        </span>
      </div>
    </div>
  )
}

export default SurveyTable
