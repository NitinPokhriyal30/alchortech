import React, { useState } from 'react'
import { AiOutlinePlus, AiFillClockCircle, AiFillCloseCircle, AiFillRightCircle, AiFillCaretDown } from 'react-icons/ai'
import { BsPencilFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const SORT_OPTIONS = [
  { label: 'Last 60 days', value: '1' },
  { label: 'Last 6 months', value: '2' },
  { label: 'Last quarter', value: '3' },
  { label: 'This quarter', value: '4' },
  { label: 'Last month', value: '5' },
  { label: 'This month', value: '6' },
]

const QuizTable = () => {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0])
  const navigate = useNavigate()

  return (
    <div className="h-screen">
      <div className="mt-4 flex justify-between px-[25px]">
        <div className="font-Lato text-[20px] font-bold text-[#464646]">Quiz</div>
        <div className="rounded-md bg-[#5486E3] p-2 font-Lato text-white">
          <Link to="/quiz/create" className="flex items-center gap-1">
            <span>{<AiOutlinePlus />}</span>
            Create Quiz
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-y-4 px-[25px] md:justify-start">
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
                <p key={option.value} className=" px-4 py-1 font-Lato text-sm hover:bg-translucent-black" onClick={() => setSortBy(option)}>
                  {option.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="my-1 px-[25px]">
        <div className="h-[1px] w-full bg-[#cecece]"></div>
      </div>

      <div className="mx-4 mt-2 rounded-[9px] bg-white drop-shadow-md w-[calc(100vw_-_32px)] md:w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-16px ">
              <th className="w-auto py-[15.5px] pl-8 text-start font-Lato text-16px font-medium text-[#292929] md:pl-[45px]">Name</th>
              <th className="w-1/4 py-4 font-Lato text-[16px] font-medium text-[#292929]">Start date</th>
              <th className="w-1/4 py-4 font-Lato text-[16px] font-medium text-[#292929]">End date</th>
              <th className="w-1/4 py-4 font-Lato text-[16px] font-medium text-[#292929]">Type</th>
              <th className="w-fit py-4 text-right font-Lato text-[16px] font-medium text-[#292929]"></th>
            </tr>
          </thead>
          <tbody className="">
            {Array.from({ length: 5 }).map(() => (
              <tr className="group rounded-xl hover:bg-[#ececec] child:border-b child:border-[#d1d1d1] child:py-[15px] child:text-16px" onClick={() => navigate('/survey/preview')}>
                <td className="!border-0 !py-0 pl-8 pr-0 font-semibold text-[#5486E3] md:pl-[45px]">
                  <span className="-mb-px inline-block w-full border-b border-inherit py-[15px]">Quiz 1</span>
                </td>
                <td className="text-center font-Lato font-normal text-[#292929]">Feb 13, 2023</td>
                <td className="text-center font-Lato font-normal text-[#292929]">Feb 18, 2023</td>
                <td className="text-center font-Lato font-normal text-[#292929]">Automatic</td>
                <td className=" block !border-0 !py-0 pl-0 pr-8 font-semibold text-[#5486E3] md:pr-[45px]">
                  <span className="-mb-px block w-full border-b border-inherit py-[15px] pr-4 ">
                    <RxCross1 className="ml-auto h-[19px] cursor-pointer text-[#292929] opacity-0 group-hover:opacity-100" />
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default QuizTable
