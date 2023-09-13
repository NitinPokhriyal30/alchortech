import React, { useState, useEffect } from 'react'
import { AiOutlinePlus, AiFillClockCircle, AiFillCloseCircle, AiFillRightCircle, AiFillCaretDown } from 'react-icons/ai'
import { BsPencilFill, BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import { api } from '../../api'

const SORT_OPTIONS = [
  { label: 'Last 60 days', value: '1' },
  { label: 'Last 6 months', value: '2' },
  { label: 'Last quarter', value: '3' },
  { label: 'This quarter', value: '4' },
  { label: 'Last month', value: '5' },
  { label: 'This month', value: '6' },
]

const CampaignTable = () => {
  const [sortBy, setSortBy] = useState(SORT_OPTIONS[0])
  const navigate = useNavigate()
  const [tab, setTab] = React.useState('draft')
  const [page, setPage] = React.useState(1)
  
  const { data: campaigns, isLoading, isError } = useQuery(['campaigns', page], () => api.campaigns.all(page));

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isError) {
    return <div>Error loading campaigns</div>;
  }



  const { data: campaigns, isLoading, isError } = useQuery('campaigns', api.campaigns.all);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading campaigns</div>;
  }

  useEffect(() => {
   console.log(data);
  }, [])
  

  return (
    <div className="h-screen w-screen md:w-full">
      <div className="mt-4 flex justify-between px-[25px]">
        <div className="font-Lato text-[20px] font-bold text-[#464646]">Campaigns</div>
        <div className="rounded-md bg-[#5486E3]  font-Lato text-white">
          <Link to="/campaign/create" className="flex items-center px-5 py-2 gap-1">
            <span>{<AiOutlinePlus />}</span>
            Create Campaign
          </Link>
        </div>
      </div>

      <div className="mt-4 flex flex-col md:flex-row flex-wrap gap-y-4 px-[25px] md:justify-start">
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
        <div className="flex justify-center">
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

      <div className="mb-1 px-[25px]">
        <div className="h-[1px] w-full bg-[#cecece]"></div>
      </div>

      <div className="mx-[25px] mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
        <table className="w-full  min-w-[550px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-16px ">
              <th className="py-[15.5px] text-left pl-8  font-Lato text-16px font-medium text-[#292929] md:pl-[45px]"></th>
              <th className="md:w-1/3 text-left py-[15.5px] font-Lato text-16px font-medium text-[#292929]">Name</th>
              <th className="md:w-1/5 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">Start date</th>
              <th className="md:w-1/5 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">End date</th>
              <th className="md:w-1/6 text-left py-4 font-Lato text-[16px] font-medium text-[#292929]">Type</th>
              <th className="md:w-1/1 py-4 text-right font-Lato text-[16px] font-medium text-[#292929]"></th>
              <th className="py-4 text-right font-Lato text-[16px] font-medium text-[#292929] pl-[20px] md:pl-[45px]"></th>
            </tr>
          </thead>
          <tbody style={{ padding: '20px' }}>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec]"
<<<<<<< HEAD
                onClick={() => navigate('/campaign/preview')}
              >
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] "></td>
                <td className="py-3 text-left text-[16px] font-semibold text-[#5486E3] ">{campaign.name}</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.start_date}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.end_date}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.type}
                </td>
                {/* ... remaining columns ... */}
=======
              >
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] "></td>
                <td  onClick={() => navigate((`/campaign/preview?campaignId=${campaign.id}`))} className="py-3 cursor-pointer text-left text-[16px] font-semibold text-[#5486E3] ">{campaign.name}</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.start_date}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.end_date}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.type}
                </td>
>>>>>>> e7c1aa59c2713ce0a357943045186d9b565bee05
              </tr>
            ))}
          </tbody>;
        </table>
        <div className='flex justify-end gap-2 py-2 px-8'>
        <button onClick={() => setPage(page-1)}> <BsFillArrowLeftCircleFill/> </button>
        <button onClick={() => setPage(page+1)}> <BsFillArrowRightCircleFill/> </button>
        </div>
      </div>
    </div>
  )
}

export default CampaignTable
