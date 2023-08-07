import React, { useState } from 'react'
import {
  AiOutlinePlus,
  AiFillClockCircle,
  AiFillCloseCircle,
  AiFillRightCircle,
  AiFillCaretDown,
} from 'react-icons/ai'
import { BsPencilFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'

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

  return (
    <div className='h-screen'>
      <div className="mt-4 flex justify-between px-4">
        <div className="font-Lato text-[20px] font-bold text-[#464646]">Survey</div>
        <div className="rounded-md bg-[#5486E3] p-2 font-Lato text-white">
          <Link to="/survey/create" className="flex items-center gap-1">
            <span>{<AiOutlinePlus />}</span>
            Create Survey
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap md:justify-start px-4 gap-y-4">
        <div className="flex flex-1 justify-around md:justify-start md:gap-6">
          <button className="flex items-center gap-2 text-[14px] text-[#8D8D8D]">
            <span>{<BsPencilFill />}</span>Draft
          </button>
          <button className="flex items-center gap-2 text-[14px] text-[#8D8D8D]">
            <span>{<AiFillClockCircle />}</span> Scheduled
          </button>
          <button className="flex items-center gap-2 text-[14px] text-[#8D8D8D]">
            <span>{<AiFillRightCircle />}</span>Running
          </button>
          <button className="flex items-center gap-2 text-[14px] text-[#8D8D8D]">
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
              {SORT_OPTIONS.map((option) => (
                <p
                  key={option.value}
                  className=" px-4 py-1 font-Lato text-sm hover:bg-translucent-black"
                  onClick={() => setSortBy(option)}
                >
                  {option.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-1 px-4">
        <div className="h-[1px] w-full bg-[#7B7B7B]"></div>
      </div>

      <div className="mx-4 mt-2 rounded-lg bg-white drop-shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#7B7B7B] ">
              <th className="w-auto py-4 pl-8 md:pl-14 text-start font-Lato text-[16px] font-semibold text-[#292929]">
                Name
              </th>
              <th className="w-1/4 py-4 font-Lato text-[16px] font-semibold text-[#292929]">
                Start date
              </th>
              <th className="w-1/4 py-4 font-Lato text-[16px] font-semibold text-[#292929]">
                End date
              </th>
              <th className="w-1/4 py-4 font-Lato text-[16px] font-semibold text-[#292929]">
                Type
              </th>
            </tr>
          </thead>
          <tbody className="">
            {Array.from({ length: 5 }).map(() => (
              <tr className="group rounded-xl border-b border-[#7B7B7B] hover:bg-[#ececec]">
                <td className="py-3 pl-8 md:pl-14 text-[16px] font-semibold text-[#5486E3]">Survey 1</td>
                <td className="py-3 text-center font-Lato text-[16px] font-normal text-[#000000]">
                  Feb 13, 2023
                </td>
                <td className="py-3 text-center font-Lato text-[16px] font-normal text-[#000000]">
                  Feb 18, 2023
                </td>
                <td className="py-3 text-center font-Lato text-[16px] font-normal text-[#000000]">
                  Automatic
                </td>
                <td className="py-3 text-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <RxCross1 className="cursor-pointer text-[#292929]" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SurveyTable
