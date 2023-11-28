import React, { useState } from 'react'
import GoldBadge from '../../assets/images/analytics/gold.svg'
import SilverBadge from '../../assets/images/analytics/silver.svg'
import BronzeBadge from '../../assets/images/analytics/bronze.svg'
import filterSymbol from '../../assets/images/analytics/filterSymbol.svg'
import growUp from '../../assets/images/analytics/growUp.svg'
import shrinkDown from '../../assets/images/analytics/shrinkDown.svg'
import ColumnGroupingTable from '../Analytics/ColumnGroupingTable'
import BarChart from '../Analytics/BarChart'
import AmazonLogo from '../../assets/images/analytics/Amazon.png'
import DunkinLogo from '../../assets/images/analytics/Dunkin.png'
import StarbucksLogo from '../../assets/images/analytics/Starbucks.png'
import { AiFillCaretDown } from 'react-icons/ai';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';
import { useQuery } from 'react-query';
import { api } from '../../api'
import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const AdminAnalytics = () => {


const [sortRegion, setSortRegion] = useState('');
const [sortDepartment, setSortDepartment] = useState('');
const [sortDate, setSortDate] = useState('');
const [isOverall, setIsOverall] = useState(true);
const [expandedRow, setExpandedRow] = React.useState(null);

const toggleRow = (index) => {
  setExpandedRow((prev) => (prev === index ? null : index));
};


const meQuery = useQuery('me', () => api.auth.me());
const me = meQuery.data

const { data: response, isLoading, isError } = useQuery(
    ['analyticsData', sortRegion, sortDate],
    () => api.analytics.all(sortRegion, sortDate)
);

const { data: filterData, isLoading: isLoadingFilters, isError: isErrorFilters } = useQuery('filterData', api.analytics.filters);
  
const filters = filterData

if (isLoading || isLoadingFilters) {
  return <div>Loading...</div>;
}

if (isError || isErrorFilters) {
  return <div>Error fetching data</div>;
}


const {
  leaderboard,
  team_engagement_data: weeklyIntervals,
  department_data: departmentData,
  hashtags,
  total_recognitions,
  total_points,
  percentage,
  word_cloud_data: wordData
} = response;


const barData = hashtags
  ? hashtags.map(hashtag => ({
      category: hashtag.hashtags__name ? `#${hashtag.hashtags__name}` : "#Unknown",
      value: hashtag.hashtag_count
    }))
  : [];

const dateOptionLabels = {
    this_month: 'This month',
    last_month: 'Last month',
    this_quater: 'This quarter',
    last_quater: 'Last quarter',
    last_six_months: 'Last six months',
    year_to_date: 'Year to date',
};

const handleOverallClick  = () => {
  setSortDepartment("")
  setIsOverall(true)
}

const handleMyTeamClick  = () => {
  setSortDepartment(me.department)
  setIsOverall(false)
}

const users = [
  {
    id: "E1198",
    name: "Martina Maur",
    role: "Associate Director | UX",
    department: "Design-Practice",
    location: "IN-India",
    total_points: 2200,
    total_given_recognitions: 120,
    total_received_recognitions: 90,
  },
  {
    id: "E1198",
    name: "Martina Maur",
    role: "Associate Director | UX",
    department: "Design-Practice",
    location: "IN-India",
    total_points: 2200,
    total_given_recognitions: 120,
    total_received_recognitions: 90,
  },
];


return (
    <div>
    <div className="h-full w-screen max-w-[1536px] md:w-full">

    <div className='mx-3'>

      <div className='my-3 flex flex-col md:flex-row'>
        <div className='flex justify-center'>
         <span className="font-Lato  text-[20px] font-bold text-[#464646]">Analytics</span>
        </div>
        <div className='flex w-full mt-2'>
          <div className='flex gap-2 w-full justify-center items-center md:justify-end ml-0 md:ml-4'>
            <div className='hidden md:block'>
              <img
              src={filterSymbol}
              alt='filter-symbol'
              />
            </div>
            <div className=" font-Lato font-bold text-[#747474] text-sm relative flex items-center">
              Region
              <button className="peer flex items-center gap-1 px-1 font-Lato text-sm font-semibold">
                <span className='font-black text-black'>{sortRegion}</span>
                <span><AiFillCaretDown /></span>
              </button>
              <div className="absolute right-[1px] top-full z-10 hidden w-40 flex-col rounded-lg bg-white py-2 text-end drop-shadow-[0px_2px_6px_#44444F1A] hover:flex peer-hover:flex child:cursor-pointer mt-[-2px]">
              {[
                ...filters.region?.map((regionOption) => ({ value: regionOption, label: regionOption })),
                { value: '', label: 'Clear'}
              ].map((option, index) => (
                <p
                  key={index}
                  className={option.label === 'Clear' ? "text-[#d48989] text-center px-2 border-t-[1px]": `py-1 px-2 font-Lato text-sm hover:bg-translucent-black`}
                  onClick={() => setSortRegion(option.value === '' ? '' : option.value)}
                >
                  {option.label}
                </p>
              ))}
              </div>
            </div>
            <div className="font-Lato font-bold text-[#747474] text-sm relative flex items-center">
              Last
              <button className="peer flex items-center gap-1 px-1 font-Lato text-sm font-semibold">
                <span className='font-black text-black'>{dateOptionLabels[sortDate]}</span>
                <span><AiFillCaretDown /></span>
              </button>
              <div className="absolute right-[1px] top-full z-10 hidden w-40 flex-col rounded-lg bg-white py-2 text-end drop-shadow-[0px_2px_6px_#44444F1A] hover:flex peer-hover:flex child:cursor-pointer mt-[-2px]">
              {[
                ...filters['Date Ranges']?.map((dateOption) => ({ value: dateOption, label: dateOptionLabels[dateOption] })),
                { value: '', label: 'Clear'}
              ].map((option, index) => (
                <p
                  key={index}
                  className={option.label === 'Clear' ? "text-[#d48989] px-2 text-center border-t-[1px]": `py-1 px-2 font-Lato text-sm hover:bg-translucent-black`}
                  onClick={() => setSortDate(option.value === '' ? '' : option.value)}
                >
                  {option.label}
                </p>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 mb-3 px-4 flex gap-4 w-full bg-[#fff] rounded-md items-center justify-between">

      <div className='flex flex-col gap-3'>
         <div className='py-2 px-8 flex gap-8 items-center bg-[#FCEAAE] rounded-md justify-between'>
           <span className="text-[37px] font-bold">586</span>
           <span className='font-bold w-20'>Total Employees</span>
         </div>
         <div className='py-2 px-8 flex gap-8 items-center justify-between bg-[#B3E2A8] rounded-md'>
           <span className="text-[37px] font-bold">126</span>
           <span className='font-bold w-20'>Total Vendors</span>
         </div>
      </div>

      <div className='py-5 flex-1 px-6 bg-[#5486E333] rounded-md border border-primary'>
        <div>
         <p className='font-bold'>Application Usage</p>
         <div className='flex items-baseline gap-2'>
            <span className='font-bold text-[30px]'>376 </span>
            <p className='font-bold'> out of </p>
            <span className='font-bold text-[30px]'>586</span>
         </div>
         <p className='w-[200px] text-[14px] text-[#747474]'>Users are frequently using application once in a week</p>
        </div>
      </div>

      <div className= 'py-4 px-6 bg-[#00BC9F33] rounded-md border border-[#00BC9F]'>
        <div>
         <p className='font-bold'>Total Recognitions</p>
         <p className='text-[14px] text-[#747474]'>Total recognition given during period</p>
         <span className='flex items-baseline gap-3'>
           <p className='font-bold text-[37px]'>53464</p>
           <p className='font-bold'>940/month</p>
         </span>
         <span className='flex w-[50%] gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-white text-[#285C55]'>
            <img src={growUp} alt='grow-up'/>
            36.38% from last month
         </span>
        </div>
      </div>

      </div>

      
      <div className="w-full  mt-2 flex overflow-auto rounded-lg bg-white drop-shadow-md"> 
        <div className="w-full px-4 py-2 min-w-[950px] ">
          <p className='pb-4 font-bold font-Lato text-[18px]'>Leaderboard</p>
          <div className="w-full table-fixed">
          {leaderboard.length > 0 ? 
          <table className='w-full'>
          <tbody> 
           {leaderboard[0] ? 
            <tr>
              <td className='w-16'>
                <img
                className={`rounded-full h-10 w-10`}
                src={getAvatarAttributes(`${leaderboard[0]?.full_name.split(' ')[0]} ${leaderboard[0]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[0]?.avtar)).src}
                alt={getAvatarAttributes(`${leaderboard[0]?.full_name.split(' ')[0]} ${leaderboard[0]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[0]?.avtar)).alt}
                onError={(e) => {
                  // If the image fails to load, use the name initials instead
                  e.target.onerror = null;
                  e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    leaderboard[0]?.full_name.split(' ')[0].charAt(0) + leaderboard[0]?.full_name.split(' ')[1].charAt(0)
                  )}&color=${"#464646"}&background=${"FFFFFF"}`;
                }}
              />
              </td>
              <td className='bg-[#FCEAAE] px-4 rounded-l-lg border-r-2 border-white'>
                <Link to={`/myProfile/?userId=${leaderboard[0]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[0]?.full_name}</span></Link> | {leaderboard[0]?.title} - {leaderboard[0]?.department}
              </td>
              <td className=" bg-[#FCEAAE] border-r-2 border-white px-2">
                {`#${leaderboard[0]?.top_hashtags.join(' #')}`}
              </td>
              <td className='bg-[#FCEAAE] rounded-r-lg flex items-center gap-2 py-6 md:py-2 px-4 justify-center '>
                <span className='text-[#B99107] font-bold font-Lato text-[20px]'>{leaderboard[0]?.total_transaction_count}</span> {
                <img
                  className='h-6 w-6 object-contain'
                  src={GoldBadge}
                  alt='Gold Badge'
                  />}
              </td>
            </tr> : ''}
            <tr className='h-4'></tr>
            {leaderboard[1] ? 
              <tr className="leaderboard-row">
                <td className='w-16'>
                  <img
                  className={`rounded-full h-10 w-10`}
                  src={getAvatarAttributes(`${leaderboard[1]?.full_name.split(' ')[1]} ${leaderboard[1]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[1]?.avtar)).src}
                  alt={getAvatarAttributes(`${leaderboard[1]?.full_name.split(' ')[1]} ${leaderboard[1]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[1]?.avtar)).alt}
                  onError={(e) => {
                    // If the image fails to load, use the name initials instead
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      leaderboard[1]?.full_name.split(' ')[0].charAt(0) + leaderboard[0]?.full_name.split(' ')[1].charAt(0)
                    )}&color=${"#464646"}&background=${"FFFFFF"}`;
                  }}
                />
                </td>
                <td className='bg-[#D6D6D6] px-4 rounded-l-lg  border-r-2 border-white'>
                <Link to={`/myProfile/?userId=${leaderboard[1]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[1]?.full_name}</span></Link> | {leaderboard[1]?.title} - {leaderboard[1]?.department}
                </td>
                <td className=" bg-[#D6D6D6]  border-r-2 px-2 border-white">
                  {`#${leaderboard[1]?.top_hashtags.join(' #')}`}
                </td>
                <td className='bg-[#D6D6D6] rounded-r-lg flex gap-2 items-center  py-6 md:py-2 px-4 justify-center'>
                  <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[1]?.total_transaction_count}</span> {
                  <img
                    className='h-6 w-6 object-contain'
                    src={SilverBadge}
                    alt='Silver Badge'
                    />}
                </td>
              </tr> : ''}
              <tr className='h-4'></tr>
              {leaderboard[2] ? 
              <tr className="leaderboard-row">
                  <td className='w-16'>
                    <img
                    className={`rounded-full h-10 w-10`}
                    src={getAvatarAttributes(`${leaderboard[2]?.full_name.split(' ')[1]} ${leaderboard[2]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[2]?.avtar)).src}
                    alt={getAvatarAttributes(`${leaderboard[2]?.full_name.split(' ')[1]} ${leaderboard[2]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[2]?.avtar)).alt}
                    onError={(e) => {
                      // If the image fails to load, use the name initials instead
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        leaderboard[2]?.full_name.split(' ')[0].charAt(0) + leaderboard[2]?.full_name.split(' ')[1].charAt(0)
                      )}&color=${"#464646"}&background=${"FFFFFF"}`;
                    }}
                  />
                  </td>
                  <td className='bg-[#FFC993] px-4 rounded-l-lg  border-r-2 border-white'>
                    <Link to={`/myProfile/?userId=${leaderboard[2]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[2]?.full_name}</span></Link> | {leaderboard[2]?.title} - {leaderboard[2]?.department}
                  </td>
                  <td className=" bg-[#FFC993]  border-r-2 border-white px-2">
                    {`#${leaderboard[2]?.top_hashtags.join(' #')}`}
                  </td>
                  <td className='bg-[#FFC993] rounded-r-lg flex gap-2 items-center py-6 md:py-2 px-4 justify-center'>
                    <span className='text-[#954A00] font-bold font-Lato text-[20px]'>{leaderboard[2]?.total_transaction_count}</span> {
                    <img
                      className='h-6 w-6 object-contain'
                      src={BronzeBadge}
                      alt='Bronze Badge'
                      />}
                  </td>
              </tr> : ''}
              <tr className='h-2'></tr>
              {leaderboard[3] ? 
                <tr className="leaderboard-row">
                    <td className='w-16'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[3]?.full_name.split(' ')[1]} ${leaderboard[3]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[3]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[3]?.full_name.split(' ')[1]} ${leaderboard[3]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[3]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[3]?.full_name.split(' ')[0].charAt(0) + leaderboard[3]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                     <Link to={`/myProfile/?userId=${leaderboard[3]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[3]?.full_name}</span></Link> | {leaderboard[3]?.title} - {leaderboard[3]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[3]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[3]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
              <tr className='h-2'></tr>
              {leaderboard[4] ? 
                <tr className="leaderboard-row">
                    <td className='w-16'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[4]?.full_name.split(' ')[1]} ${leaderboard[4]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[4]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[4]?.full_name.split(' ')[1]} ${leaderboard[4]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[4]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[4]?.full_name.split(' ')[0].charAt(0) + leaderboard[4]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                    <Link to={`/myProfile/?userId=${leaderboard[4]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[4]?.full_name}</span></Link> | {leaderboard[4]?.title} - {leaderboard[4]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[4]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[4]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
              <tr className='h-2'></tr>
              {leaderboard[5] ? 
                <tr className="leaderboard-row">
                    <td className='w-16'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[5]?.full_name.split(' ')[1]} ${leaderboard[5]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[5]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[5]?.full_name.split(' ')[1]} ${leaderboard[5]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[5]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[5]?.full_name.split(' ')[0].charAt(0) + leaderboard[5]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                      <Link to={`/myProfile/?userId=${leaderboard[5]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[5]?.full_name}</span></Link> | {leaderboard[5]?.title} - {leaderboard[5]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[5]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[5]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
              {leaderboard[6] ? 
                <tr className="leaderboard-row">
                    <td className='w-16'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[6]?.full_name.split(' ')[1]} ${leaderboard[6]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[6]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[6]?.full_name.split(' ')[1]} ${leaderboard[6]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[6]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[6]?.full_name.split(' ')[0].charAt(0) + leaderboard[6]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                     <Link to={`/myProfile/?userId=${leaderboard[6]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[6]?.full_name}</span></Link> | {leaderboard[6]?.title} - {leaderboard[6]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[6]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[6]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
              {leaderboard[7] ? 
                <tr className="leaderboard-row">
                    <td className='w-17'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[7]?.full_name.split(' ')[1]} ${leaderboard[7]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[7]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[7]?.full_name.split(' ')[1]} ${leaderboard[7]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[7]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[7]?.full_name.split(' ')[0].charAt(0) + leaderboard[7]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                    <Link to={`/myProfile/?userId=${leaderboard[7]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[7]?.full_name}</span></Link> | {leaderboard[7]?.title} - {leaderboard[7]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[7]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[7]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
              {leaderboard[8] ? 
                <tr className="leaderboard-row">
                    <td className='w-17'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[7]?.full_name.split(' ')[1]} ${leaderboard[8]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[8]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[8]?.full_name.split(' ')[1]} ${leaderboard[8]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[8]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[8]?.full_name.split(' ')[0].charAt(0) + leaderboard[8]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                    <Link to={`/myProfile/?userId=${leaderboard[8]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[8]?.full_name}</span></Link> | {leaderboard[8]?.title} - {leaderboard[8]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[8]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[8]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
              {leaderboard[9] ? 
                <tr className="leaderboard-row">
                    <td className='w-17'>
                      <img
                      className={`rounded-full h-10 w-10`}
                      src={getAvatarAttributes(`${leaderboard[9]?.full_name.split(' ')[1]} ${leaderboard[9]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[9]?.avtar)).src}
                      alt={getAvatarAttributes(`${leaderboard[9]?.full_name.split(' ')[1]} ${leaderboard[9]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[9]?.avtar)).alt}
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          leaderboard[9]?.full_name.split(' ')[0].charAt(0) + leaderboard[9]?.full_name.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
                    </td>
                    <td className='px-4 rounded-l-lg  border-r-[1px] border-b-[1px] border-[#f1f0f0]'>
                    <Link to={`/myProfile/?userId=${leaderboard[9]?.user_id}`}><span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[9]?.full_name}</span></Link> | {leaderboard[9]?.title} - {leaderboard[9]?.department}
                    </td>
                    <td className="border-r-[1px] border-[#f1f0f0] border-b-[1px] px-2">
                      {`#${leaderboard[9]?.top_hashtags.join(' #')}`}
                    </td>
                    <td className='rounded-r-lg flex items-center py-6 md:py-2 px-4 justify-center gap-2 border-b-[1px] border-[#f1f0f0]'>
                      <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[9]?.total_transaction_count}</span>
                    </td>
              </tr> : ''}
          </tbody>
          </table>
          : <div className='text-center text-[#c3406e] font-bold'>No data found for this filter !</div>
         }
          </div>
        </div>
      </div>
     
      <div className="w-full max-w-[1536px] my-3 gap-3 flex flex-col md:flex-col lg:flex-row">

        <div className="flex-col w-full md:w-[50%] rounded-lg  mx-auto bg-white">
         {total_recognitions && total_points ? 
          <div className='flex flex-col md:flex-row justify-evenly gap-0 md:gap-6 mx-3 my-4 px-2 py-2 md:py-0 bg-[#FCEAAE] rounded-xl items-center'>
            <div>
            <span className='text-[36px] mx-1 md:text-[48px] font-Lato font-bold'>{total_recognitions}</span>
            <span className='font-Lato font-bold'>Recognitions</span>
            </div>
            <div>
              <span className='text-[36px] mx-1 md:text-[48px] font-Lato font-bold'>{total_points}</span>
              <span className='font-Lato font-bold'>Points</span>
            </div>
            <div >
            {percentage > 0 ? 
              <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-white text-[#285C55]'>
              <img src={growUp} alt='grow-up'/>
              {percentage.toFixed(2)}% from last month
              </span>
              :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
              <img src={shrinkDown} alt='shrink-up'/>
              {percentage.toFixed(2)}% from last month
              </span>
            }
            </div>
          </div> 
          : <div className='text-center text-[#c3406e] font-bold'>No data found for this filter !</div>
        }
          <div className="w-full  mx-auto">
            <BarChart data={barData} />
          </div>
        </div> 
        
        <div className=" flex-col w-full min-w-[250px] md:w-full lg:w-[50%] rounded-lg   mx-auto bg-white">
          <div className='flex flex-col md:flex-row justify-evenly gap-0 md:gap-6 mx-3 my-4 px-2 py-2 md:py-0 bg-[#B3E2A8] rounded-xl items-center'>
            <div>
              <span className='text-[36px] mx-1 md:text-[48px] font-Lato font-bold'>69</span>
              <span className='font-Lato font-bold'>Redemptions</span>
            </div>
            <div>
              <span className='text-[36px] mx-1 md:text-[48px] font-Lato font-bold'>4100</span>
              <span className='font-Lato font-bold'>Points</span>
            </div>
            <div>
            {percentage > 0 ? 
              <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-white text-[#285C55]'>
              <img src={growUp} alt='grow-up'/>
              {percentage.toFixed(2)}% from last month
              </span>
              :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
              <img src={shrinkDown} alt='grow-up'/>
              {percentage.toFixed(2)}% from last month
              </span>
            }
            </div>
          </div>

          <div className='flex-col p-6'>
          <div className='flex justify-between pb-1 border-b-[1px] mb-4'>
            <div>
              <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Apparel</span>
              <span className='font-Lato font-semibold'>23</span>
            </div>
            <div className='flex items-center'>
              <div >
              {percentage > 0 ? 
                <span className='flex gap-1 mr-4 px-2 py-[1px] text-[9px] rounded-md bg-[#FBE5E6] text-[#C74056]'>
                <img src={growUp} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
                :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
                <img src={shrinkDown} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
              }
              </div>  
              <div className='text-[18px] font-Lato font-bold'>1250 Pts.</div>
            </div>
            
          </div>
          <div className='flex justify-between pb-1 mb-4 border-b-[1px]'>
            <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Entertainment</span>
                <span className='font-Lato font-semibold'>12</span>
            </div>
            <div className='flex items-center'>  
                <div>
                {percentage > 0 ? 
                  <span className='flex mr-4 px-2 py-[1px] text-[9px] rounded-md bg-[#FBE5E6] text-[#C74056]'>
                  <img src={growUp} alt='grow-up'/>
                  {percentage.toFixed(2)}% from last month
                  </span>
                  :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
                  <img src={shrinkDown} alt='grow-up'/>
                  {percentage.toFixed(2)}% from last month
                  </span>
                }
                </div>   
                <div className='text-[18px] font-Lato font-bold'>950 Pts.</div>     
            </div>
          </div>
          <div className='flex justify-between pb-1 mb-4 border-b-[1px]'>
              <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Food</span>
                <span className='font-Lato font-semibold'>09</span>
              </div>
              <div className='flex items-center'>
              <div>
              {percentage > 0 ? 
                <span className='flex mr-4 px-2 py-[1px] text-[9px] rounded-md bg-[#FBE5E6] text-[#C74056]'>
                <img src={growUp} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
                :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
                <img src={shrinkDown} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
              }
              </div>  
              <div className='text-[18px] font-Lato font-bold'>700 Pts.</div>
            </div>
          </div>
          <div className='flex justify-between pb-1 mb-4 border-b-[1px]'>
            <div>
              <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Donations</span>
              <span className='font-Lato font-semibold'>08</span>
            </div>
            <div className='flex items-center'>
              <div>
              {percentage > 0 ? 
                <span className='flex mr-4 px-2 py-[1px] text-[9px] rounded-md bg-[#FBE5E6] text-[#C74056]'>
                <img src={growUp} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
                :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
                <img src={shrinkDown} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
              }
              </div>  
              <div className='text-[18px] font-Lato font-bold'>550 Pts.</div>
            </div>
          </div>
          <div className='flex justify-between pb-1 border-b-[1px]'>
            <div>
              <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Electronics</span>
              <span className='font-Lato font-semibold'>07</span>
            </div>
            <div className='flex items-center'>
              <div>
              {percentage > 0 ? 
                <span className='flex mr-4 px-2 py-[1px] text-[9px] rounded-md bg-[#FBE5E6] text-[#C74056]'>
                <img src={growUp} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
                :  <span className='flex gap-1 rounded-md justify-evenly text-[12px] md:text-[8px] py-1 px-1 bg-[#FBE5E6] text-[#C74056]'>
                <img src={shrinkDown} alt='grow-up'/>
                {percentage.toFixed(2)}% from last month
                </span>
              }
              </div>  
              <span className='text-[18px] font-Lato font-bold'>300 Pts.</span>
            </div>
          </div>
        </div>
        <p className='pl-6 pb-4 font-Lato text-[16px] text-[#292929] font-medium'>Most Redeemed</p>
        <div className='flex px-6 gap-3 mb-4'>
          <div className='border-2 rounded-lg w-1/3 pl-6 pt-8'><img className='h-10' src={AmazonLogo} /></div>
          <div className='border-2 rounded-lg w-1/3 px-8 py-6'><img className='h-10' src={DunkinLogo} /></div>
          <div className='border-2 rounded-lg w-1/3 py-4 px-12'><img className='h-14' src={StarbucksLogo} /></div>
        </div>
    
      
        </div>

      </div>

      
      <div className="flex-col mb-3 overflow-auto rounded-lg bg-white drop-shadow-md">
        <p className="text-[20px] font-bold text-[#464646] pl-10 py-4">Recognition Statistics by Departments</p>
        <div className="w-full min-w-[550px]">
        <ColumnGroupingTable departmentData={departmentData} />
        </div>
      </div>

      <div className="bg-white mb-8 rounded-lg drop-shadow-md">
      <div className="py-4 text-[20px] font-bold px-6">Employee Recognition Statistics</div>
      <table className="z-0 w-full  min-w-[550px] whitespace-nowrap">
      <thead>
        <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
          <th></th>
          <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-4/12">
            Employee Name
          </th>
          <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
            Role
          </th>
          <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
            Department
          </th>
          <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
            Location
          </th>
          <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
            Total Points
          </th>
          <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">
            Total Given Recognitions
          </th>
          <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">
            Total Received Recognitions
          </th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <React.Fragment key={user.id}>
            <tr
              onClick={() => toggleRow(index)}
              className="group rounded-xl   border-[#cecece] hover:bg-[#ececec]"
            >
              <td className="border-b-0 py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px]"></td>
              <td className="border-b cursor-pointer py-3 text-left">
                <span className="text-[16px] font-bold">{user.name}</span>
              </td>
              <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user.role}
              </td>
              <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user.department}
              </td>
              <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user.location}
              </td>
              <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user.total_points}
              </td>
              <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                <span> {user.total_given_recognitions}</span>
              </td>
              <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                <span> {user.total_received_recognitions}</span>
              </td>
              <td className="border-b py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]">
                {expandedRow === index ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </td>
              <td className="border-b-0 py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]"></td>
            </tr>
            {expandedRow === index && (
              <tr className="expanded-row">
                <td colSpan="10">
                  <div className="border-b border-[#cecece] drop-shadow-lg px-4 pb-4">
                    <div className="rounded-md bg-[#EDEDED] p-4">
                      <span className="text-[14px] text-[#747474]">
                        Product Details
                      </span>
                      <div className="flex gap-[115px] pb-4 items-center">
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Product Name
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Flipkart
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Order Id
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            1235633
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Product Id
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            1007
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Quantity
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            15
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Categories
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Flipkart
                          </span>
                        </div>
                      </div>

                      <div className="pb-4">
                        <p className="text-[13px] text-[#ACACAC]">
                          Product Description
                        </p>
                        <p className="font-sans whitespace-normal text-[16px] text-[#464646]">
                          Croma has always been dedicated towards giving
                          its customers an easy and hassle-free access to
                          best consumer electronics products. Croma Gift
                          Card is a perfect gifting option for your loved
                          ones to choose from categories such as Phones,
                          Camera, Computers, Entertainment, Home
                          Appliances, Kitchen Appliances, Gaming and
                          Accessories
                        </p>
                      </div>

                      <span className="text-[14px] text-[#747474]">
                        Product Details
                      </span>

                      <div className="flex gap-[134px] pb-4 items-center">
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Country
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            IN - India
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Pin
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            1235633
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-[113px] pb-4 items-center">
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Currency Code
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            INR
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Currency Name
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Rupees
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Currency Value
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            1007
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Amount
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            100
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Categories
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Flipkart
                          </span>
                        </div>
                      </div>

                      <span className="text-[14px] text-[#747474]">
                        Product Validity & Order Details
                      </span>

                      <div className="flex gap-[106px] pb-4 items-center">
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Expiry & Validity
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            INR
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Last Updated Date
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Rupees
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Order Quantity
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            10
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Order Quantity Limit
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            100
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Product Status
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Flipkart
                          </span>
                        </div>
                      </div>

                      <div className="flex gap-[120px] pb-4 items-center">
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Voucher Code
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            INR
                          </span>
                        </div>
                        <div>
                          <p className="text-[13px] text-[#ACACAC]">
                            Image Url
                          </p>
                          <span className="font-sans text-[16px] text-[#464646]">
                            Flipkart
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
      </div>

    </div>

      
    
    </div> 
  </div>
  );
}

export default AdminAnalytics;
