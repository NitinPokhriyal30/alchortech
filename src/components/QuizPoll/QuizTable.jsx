import { Padding } from '@mui/icons-material'
import React, { useState } from 'react'
import { AiOutlinePlus, AiFillClockCircle, AiFillCloseCircle, AiFillRightCircle, AiFillCaretDown } from 'react-icons/ai'
import { BsPencilFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { RxPencil1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { useQuery } from 'react-query'
import { api } from '@/api'
import { formatDate } from '@/utils'
import Loader from '../Loader'

const SORT_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'This Month', value: 'this_month' },
  { label: 'Last Month', value: 'last_month' },
  { label: 'This quarter', value: 'this_quater' },
  { label: 'Last quarter', value: 'last_quater' },
  { label: 'Last Six Month', value: 'last_six_months' },
  { label: 'Year To Date', value: 'year_to_date' },
]

const QuizTable = () => {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0]);
  const navigate = useNavigate();
  const [tab, setTab] = React.useState('draft');
  const [page, setPage] = React.useState(1);
  const [sortByStartDate, setSortByStartDate] = React.useState('');
  const [sortByEndDate, setSortByEndDate] = React.useState('');
  const [sortByTitle, setSortByTitle] = React.useState('');
  const [sortTitleAsc, setSortTitleAsc] = React.useState(true);
  const [sortStartDateAsc, setSortStartDateAsc] = React.useState(true);
  const [sortEndDateAsc, setSortEndDateAsc] = React.useState(true);

  const handleSortByTitle = () => {
    setSortByStartDate('');
    setSortByEndDate('');
    setSortByTitle((prevSort) => {
      setSortTitleAsc(!sortTitleAsc);
      return sortTitleAsc ? true : false;
    });
  };

  const handleSortByStartDate = () => {
    setSortByTitle('');
    setSortByEndDate('');
    setSortByStartDate((prevSort) => {
      setSortStartDateAsc(!sortStartDateAsc);
      return sortStartDateAsc ? true : false;
    });
  };

  const handleSortByEndDate = () => {
    setSortByTitle('');
    setSortByStartDate('');
    setSortByEndDate((prevSort) => {
      setSortEndDateAsc(!sortEndDateAsc);
      return sortEndDateAsc ? true : false;
    });
  };

  const quizzes = useQuery(
    ['quizzes', sortByEndDate, sortByStartDate, sortByTitle, page, sortBy.value],
    () =>
      api.quizs.all(
        new URLSearchParams({
          sortByStartDate: sortByStartDate,
          sortByEndDate: sortByEndDate,
          sortByTitle: sortByTitle,
          page: page,
          pagination: 1,
          page_size: 10,
          date_range: sortBy.value,
        })
      )
  );

  if (quizzes.isLoading) {
    return (<div className='flex justify-center' >
      <Loader />
    </div>)
  }

  return (
    <div className="h-screen w-screen md:w-full">
      <div className="mt-2 flex justify-between px-3 md:px-0 ">
        <div className="font-Lato text-[20px] font-bold text-[#464646]">Quiz</div>
        <div className="rounded-md bg-[#5486E3] font-Lato text-white">
          <Link to="/quiz/create" className="flex items-center px-5 py-2 gap-1">
            <span>{<AiOutlinePlus />}</span>
            Create Quiz
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
        <table className="w-full min-w-[550px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-16px ">
              <th className="text-left py-[15.5px] pl-8 text-start font-Lato text-16px font-medium text-[#292929] md:pl-[45px]"></th>
              <th
                className="md:w-1/3 text-left py-[15.5px] text-start font-Lato text-16px font-medium text-[#292929] cursor-pointer"
                onClick={handleSortByTitle}
              >
                Name
              </th>
              <th
                className="md:w-1/5 text-left py-4 font-Lato text-[16px] font-medium text-[#292929] cursor-pointer"
                onClick={handleSortByStartDate}
              >
                Start date
              </th>
              <th
                className="md:w-1/5 text-left py-4 font-Lato text-[16px] font-medium text-[#292929] cursor-pointer"
                onClick={handleSortByEndDate}
              >
                End date
              </th>
              <th className="md:w-1/6 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">Type</th>
              <th className="md:w-1/1 py-4 text-right font-Lato text-[16px] font-medium text-[#292929]"></th>
              <th className="py-4 text-right font-Lato text-[16px] font-medium text-[#292929] pl-[20px] md:pl-[45px]"></th>
            </tr>
          </thead>
          <tbody className="table-body" style={{ padding: '20px' }}>
            {quizzes.isLoading ? <div className='flex justify-center py-20' >
              <Loader />
            </div> : quizzes.data.data.length === 0 ? <tr className="group rounded-xl border-b border-[#cecece]"><td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] ">No Data Available</td></tr> : quizzes.data.data.filter(item => item.status === tab)?.map((quiz, index) => (
              <tr className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec] " key={index} onClick={() => { navigate(`/quiz/participate/${quiz.id}`) }}>
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] "></td>
                <td className="py-3 text-left text-[16px] font-semibold text-[#5486E3] cursor-pointer">{quiz.title}</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">{formatDate(quiz.start_date)}</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">{formatDate(quiz.end_date)}</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">{quiz.type}</td>
                <td className="py-3 text-left md:opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:px-[45px]">
                  {/* {quiz.type.is_owner && <RxPencil1 className="cursor-pointer text-[#292929]" />}  */}
                  {quiz.is_owner && <RxPencil1 className="cursor-pointer text-[#292929]" />}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {/* {quiz.type.is_owner && <RxCross1 className="cursor-pointer text-[#292929]" />} */}
                  {quiz.is_owner && <RxCross1 className="cursor-pointer text-[#292929]" />}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mx-auto mt-5 flex max-w-[14rem] items-center justify-between ">
        <div className="flex">
          <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, --p))} className="grid h-9 w-9 text-[#8d8d8d] place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300">
            <SlArrowLeft className="text-xl" />
          </button>

          <button disabled={quizzes.data.next == null} onClick={() => setPage((p) => ++p)} className="ml-3 grid h-9 w-9 text-[#8d8d8d] place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300" >
            <SlArrowRight className="text-xl" />
          </button>
        </div>

        <span className='text-[#8d8d8d]'>
          Page {page} of - {quizzes.data.total_pages}
          {/* {users.data?.count} */}
        </span>
      </div>
    </div>
  )
}

export default QuizTable
