import React, { useState, useEffect } from 'react'
import { AiOutlinePlus, AiFillClockCircle, AiFillCloseCircle, AiFillRightCircle, AiFillCaretDown } from 'react-icons/ai'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'
import { BsPencilFill } from 'react-icons/bs'
import { RxCross1, RxPencil1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query';
import { api } from '../../api'
import Loader from '@/components/Loader'

const SORT_OPTIONS = [
  { label: 'All', value: '1' },
  { label: 'This month', value: '2' },
  { label: 'Last month', value: '3' },
  { label: 'This quarter', value: '4' },
  { label: 'Last quarter', value: '5' },
  { label: 'Last 6 months', value: '6' },
  { label: 'This Year', value: '7' },
]

const CampaignTable = () => {
  const [sortBy, setSortBy] = useState('all')
  const navigate = useNavigate()
  const [tab, setTab] = React.useState('draft')
  const [page, setPage] = React.useState(1)
  const [dateRange, setDateRange] = useState('');

  const { data: campaigns, isLoading, isError } = useQuery(
    ['campaigns', page, tab, dateRange], 
    () => api.campaigns.all(page, tab, dateRange)
  );

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isError) {
    return <div>Error loading campaigns</div>;
  }

  const tabHandler = (tab) => {
    setTab(tab);
    setPage(1)
}

  const handleDeleteCampaign = async (campaignId) => {
    try {
        await api.campaigns.deleteCampaign(campaignId);
        toast.success('Campaign Deleted')

    } catch (error) {
        console.error(error);
    }
  } 

  const handleSortByChange = (option) => {
    console.log('Option:', option); // Check the structure of the option parameter
    setSortBy(option);
    setPage(1);
  
    const dateRangeMap = {
      '1': '',
      '2': 'this_month',
      '3': 'last_month',
      '4': 'this_quarter',
      '5': 'last_quarter',
      '6': 'last_six_months',
      '7': 'year_to_date',
    };
  
    const newDateRange = dateRangeMap[option.value];
    console.log('New Date Range:', newDateRange); // Check the new date range
  
    setDateRange(newDateRange);
  };

  return (
    <div className="h-screen w-screen md:w-full">
    {console.log("campaigns Loading", campaigns)}
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
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'draft' && '!border-primary  text-primary')} onClick={() => tabHandler('draft')}>
            <span>{<BsPencilFill />}</span>Draft
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'scheduled' && '!border-primary  text-primary')} onClick={() => tabHandler('scheduled')}>
            <span>{<AiFillClockCircle />}</span> Scheduled
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'running' && '!border-primary  text-primary')} onClick={() => tabHandler('running')}>
            <span>{<AiFillRightCircle />}</span>Running
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'closed' && '!border-primary  text-primary')} onClick={() => tabHandler('closed')}>
            <span>{<AiFillCloseCircle />}</span>Closed
          </button>
        </div>
        <div className="flex justify-center">
          <div className="relative flex items-center text-sm text-[#7B7B7B]">
            Sort By:
            <button 
            className="peer flex items-center gap-1 pl-1 font-Lato text-sm font-semibold">
              {sortBy.label}
              <span>
                <AiFillCaretDown />
              </span>
            </button>
            <div className="absolute right-[1px] top-full z-10 hidden w-36 flex-col rounded-lg bg-white py-2 text-end drop-shadow-[0px_2px_6px_#44444F1A]  hover:flex peer-hover:flex child:cursor-pointer">
              {SORT_OPTIONS?.map((option) => (
                <p key={option.value} className=" px-4 py-1 font-Lato text-sm hover:bg-translucent-black"  onClick={() => handleSortByChange(option)}>
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
            {campaigns.data.map((campaign) => (
              <tr
                key={campaign.id}
                className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec]"
              >
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] "></td>
                <td onClick={() => navigate((`/campaign/preview?campaignId=${campaign.id}`))} className="py-3 cursor-pointer text-left text-[16px] font-semibold text-[#5486E3] ">{campaign.name}</td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                   {new Date(campaign.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                   {new Date(campaign.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]">
                  {campaign.type}
                </td>
                <td className="py-3 text-left md:opacity-0 transition-opacity duration-200 group-hover:opacity-100 md:px-[45px]">
                  {campaign.is_owner && 
                    <Link to={`/campaign/create?campaignId=${campaign.id}`}>
                      <RxPencil1 
                      className="cursor-pointer text-[#292929]" 
                      />
                    </Link>
                  }
                </td>
                <td className="py-3 text-left md:opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {campaign.is_owner && 
                    <RxCross1 
                    className="cursor-pointer text-[#292929]" 
                    onClick={() => handleDeleteCampaign(campaign.id)}
                    />
                  }
                </td>
                <td className="py-3 text-left font-Lato text-[16px] font-normal text-[#292929]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-5 flex max-w-[14rem] items-center justify-between ">
        <div className="flex">
          <button disabled={page <= 1}  onClick={() => setPage(page - 1)} className="grid h-9 w-9 text-[#8d8d8d] place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300">
            <SlArrowLeft className="text-xl" />
          </button>
          <button disabled={campaigns.next == null} onClick={() => setPage(page + 1)} className="ml-3 grid h-9 w-9 text-[#8d8d8d] place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300" >
            <SlArrowRight className="text-xl" />
          </button>
        </div>
        <span className='text-[#8d8d8d]'>
          Page {page} of {campaigns.total_pages}
        </span>
      </div>

    </div>
  )
}

export default CampaignTable