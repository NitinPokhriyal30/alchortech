import React, { useState, useEffect } from 'react'
import GoldBadge from '../../assets/images/analytics/gold.svg'
import SilverBadge from '../../assets/images/analytics/silver.svg'
import BronzeBadge from '../../assets/images/analytics/bronze.svg'
import filterSymbol from '../../assets/images/analytics/filterSymbol.svg'
import ColumnGroupingTable from './ColumnGroupingTable'
import WordCloudComponent from './WordCloudComponent'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import AmazonLogo from '../../assets/images/analytics/Amazon.png'
import DunkinLogo from '../../assets/images/analytics/Dunkin.png'
import StarbucksLogo from '../../assets/images/analytics/Starbucks.png'
import { AiFillCaretDown } from 'react-icons/ai';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';
import { useQuery } from 'react-query';
import { api } from '../../api'


export const Analytics = () => {

  const [filters, setFilters] = useState({});
  const [sortRegion, setSortRegion] = useState('');
  const [sortDepartment, setSortDepartment] = useState('');
  const [sortDate, setSortDate] = useState('60 Days');
  const [leaderboard, setleaderboard] = useState([]);
  const [weeklyIntervals, setWeeklyIntervals] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [data, setData] = useState([])

  const getAll = async () => {
    const response = await api.analytics.all()
    setData(response)
    setleaderboard(response.leaderboard)
    setWeeklyIntervals(response.team_engagement_data)
    setDepartmentData(response.department_data)
  }

  const getFilters = async () => {
    const response = await api.analytics.filters()
    setFilters(response)
  }

  useEffect(() => {
    getAll()
    getFilters()
  }, [])

  const barData = data.hashtags
  ? data.hashtags.map(hashtag => ({
      category: hashtag.hashtags__name ? `#${hashtag.hashtags__name}` : "#Unknown",
      value: hashtag.hashtag_count
    }))
  : [];

  return (
    <div>

      <div className='mt-3 flex'>
        <div className='flex'>
          <button className='bg-[#5486E3] text-white text-md font-Lato px-10 py-1 rounded-l-md border border-r-0 border-[#5486E3] min-w-[100px]'>
            Overall
          </button>
          <button className='bg-white text-md font-Lato rounded-r-md border border-l-0 border-[#5486E3] min-w-[130px]'>
            My Team
          </button>
        </div>
        <div className='flex w-full'>
          <div className='flex w-full justify-end ml-4 border-b-[1px] border-[#c7c5c5]'>
            <div className='mt-[11px]'>
              <img
              src={filterSymbol}
              alt='filter-symbol'
              />
            </div>
            <div className="font-Lato font-bold text-[#747474] text-sm relative flex items-center mx-4">
              Region
              <button className="peer font-Lato flex items-center gap-1 text-sm font-semibold pl-1">
                {sortRegion}
                <span><AiFillCaretDown /></span>
              </button>
              <div className="hidden drop-shadow-[0px_2px_6px_#44444F1A] w-36 px-4 py-2 rounded-lg bg-white absolute z-10 top-[21px] right-[1px] peer-hover:flex hover:flex  flex-col child:cursor-pointer text-end">
                {filters.region?.map((regionOption, index) => (
                  <p
                    key={index}
                    className="text-sm font-Lato"
                    onClick={() => setSortRegion(regionOption)}
                  >
                    {regionOption}
                  </p>
                ))}
              </div>
            </div>
            <div className="font-Lato font-bold text-[#747474] text-sm relative flex items-center mr-4">
              Departments
              <button className="peer font-Lato flex items-center gap-1 text-sm font-semibold pl-1">
                {sortDepartment}
                <span><AiFillCaretDown /></span>
              </button>
              <div className="hidden drop-shadow-[0px_2px_6px_#44444F1A] w-36 px-4 py-2 rounded-lg bg-white absolute z-10 top-[21px] right-[1px] peer-hover:flex hover:flex  flex-col child:cursor-pointer text-end">
                {filters.departments?.map((departmentOption, index) => (
                  <p
                    key={index}
                    className="text-sm font-Lato"
                    onClick={() => setSortDepartment(departmentOption)}
                  >
                    {departmentOption}
                  </p>
                ))}
              </div>
            </div>
            <div className="font-Lato font-bold text-[#747474] text-sm relative flex items-center">
              Last
              <button className="peer font-Lato flex items-center gap-1 text-sm font-semibold pl-1">
                {sortDate}
                <span><AiFillCaretDown /></span>
              </button>
              <div className="hidden drop-shadow-[0px_2px_6px_#44444F1A] w-36 px-4 py-2 rounded-lg bg-white absolute z-10 top-[21px] right-[1px] peer-hover:flex hover:flex  flex-col child:cursor-pointer text-end">
                {filters['Date Ranges']?.map((dateOption, index) => (
                  <p
                    key={index}
                    className="text-sm font-Lato"
                    onClick={() => setSortDate(dateOption)}
                  >
                    {dateOption}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='my-2 bg-white flex flex-col gap-2 px-4 py-3 rounded-lg drop-shadow-md overflow-x-auto sm:w-[880px] md:w-full'>
        <p className='font-bold font-Lato text-[18px]'>Leaderboard</p>
        <div className='flex items-center'>
          <div>
            <img
                className={`rounded-full h-9 w-10 `}
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
          </div>
          <div className='bg-[#FCEAAE] rounded-l-lg py-[7px] pl-4 basis-1/2 ml-8 mr-[2px]'>
            <span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[0]?.full_name}</span> | {leaderboard[0]?.title} - {leaderboard[0]?.department}
          </div>
          <div className='bg-[#FCEAAE] basis-1/3 py-[7.8px] pl-3 mr-[2px]'>
            {`#${leaderboard[0]?.top_hashtags.join(' #')}`}
          </div>
          <div className='flex justify-center items-center bg-[#FCEAAE] basis-1/6 py-[4.8px] pr-8 rounded-r-lg pl-10'>
            <span className='text-[#B99107] font-bold font-Lato text-[20px]'>{leaderboard[0]?.total_transaction_count}</span> {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={GoldBadge}
                alt='Gold Badge'
              />}
          </div>
        </div>
        <div className='flex items-center'>
        <div>
          <img
              className={`rounded-full h-9 w-10 `}
              src={getAvatarAttributes(`${leaderboard[1]?.full_name.split(' ')[1]} ${leaderboard[1]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[1]?.avtar)).src}
              alt={getAvatarAttributes(`${leaderboard[1]?.full_name.split(' ')[1]} ${leaderboard[1]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[1]?.avtar)).alt}
              onError={(e) => {
                // If the image fails to load, use the name initials instead
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  leaderboard[1]?.full_name.split(' ')[0].charAt(0) + leaderboard[1]?.full_name.split(' ')[1].charAt(0)
                )}&color=${"#464646"}&background=${"FFFFFF"}`;
              }}
            />
        </div>
          <div className='bg-[#D6D6D6] basis-1/2 rounded-l-lg py-[7px] pl-3 ml-8 mr-[2px]'>
            <span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[1]?.full_name}</span> | {leaderboard[1]?.title} - {leaderboard[1]?.department}
          </div>
          <div className='bg-[#D6D6D6] basis-1/3 py-[7.8px] pl-3 mr-[2px]'>
            {`#${leaderboard[1]?.top_hashtags.join(' #')}`}
          </div>
          <div className='flex justify-center items-center bg-[#D6D6D6] basis-1/6 py-[4.8px] pr-8 rounded-r-lg pl-10'>
            <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[1]?.total_transaction_count}</span> {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={SilverBadge}
                alt='Gold Badge'
              />}
          </div>
        </div>
        <div className='flex items-center'>
        <div>
          <img
              className={`rounded-full h-9 w-10 `}
              src={getAvatarAttributes(`${leaderboard[2]?.full_name.split(' ')[2]} ${leaderboard[2]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[2]?.avtar)).src}
              alt={getAvatarAttributes(`${leaderboard[2]?.full_name.split(' ')[2]} ${leaderboard[2]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[2]?.avtar)).alt}
              onError={(e) => {
                // If the image fails to load, use the name initials instead
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  leaderboard[2]?.full_name.split(' ')[0].charAt(0) + leaderboard[2]?.full_name.split(' ')[1].charAt(0)
                )}&color=${"#464646"}&background=${"FFFFFF"}`;
              }}
            />
        </div>
          <div className='bg-[#FFC993] basis-1/2 rounded-l-lg py-[7px] pl-3 ml-8 mr-[2px]'>
            <span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[2]?.full_name}</span> | {leaderboard[2]?.title} - {leaderboard[2]?.department}
          </div>
          <div className='bg-[#FFC993] basis-1/3 py-[7.8px] pl-3 mr-[2px]'>
            {`#${leaderboard[2]?.top_hashtags.join(' #')}`}
          </div>
          <div className='flex justify-center items-center bg-[#FFC993] basis-1/6 py-[4.8px] pr-8 rounded-r-lg pl-10'>
            <span className='text-[#954A00] font-bold font-Lato text-[20px]'>{leaderboard[2]?.total_transaction_count}</span> {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={BronzeBadge}
                alt='Gold Badge'
              />}
          </div>
        </div>
        <div className='flex items-center'>
        <div>
          <img
              className={`rounded-full h-9 w-10 `}
              src={getAvatarAttributes(`${leaderboard[3]?.full_name.split(' ')[3]} ${leaderboard[3]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[3]?.avtar)).src}
              alt={getAvatarAttributes(`${leaderboard[3]?.full_name.split(' ')[3]} ${leaderboard[3]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[3]?.avtar)).alt}
              onError={(e) => {
                // If the image fails to load, use the name initials instead
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  leaderboard[3]?.full_name.split(' ')[0].charAt(0) + leaderboard[3]?.full_name.split(' ')[1].charAt(0)
                )}&color=${"#464646"}&background=${"FFFFFF"}`;
              }}
            />
        </div>
          <div className=' basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-b-[1px] border-r-[1px]'>
            <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[3]?.full_name}</span> | {leaderboard[3]?.title} - {leaderboard[3]?.department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-r-[1px] border-b-[1px]'>
            {`#${leaderboard[3]?.top_hashtags.join(' #')}`}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
            <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[3]?.total_transaction_count}</span>
          </div>
        </div>
        <div className='flex items-center'>
        <div>
          <img
              className={`rounded-full h-9 w-10 `}
              src={getAvatarAttributes(`${leaderboard[4]?.full_name.split(' ')[4]} ${leaderboard[4]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[4]?.avtar)).src}
              alt={getAvatarAttributes(`${leaderboard[4]?.full_name.split(' ')[4]} ${leaderboard[4]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[4]?.avtar)).alt}
              onError={(e) => {
                // If the image fails to load, use the name initials instead
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  leaderboard[4]?.full_name.split(' ')[0].charAt(0) + leaderboard[4]?.full_name.split(' ')[1].charAt(0)
                )}&color=${"#464646"}&background=${"FFFFFF"}`;
              }}
            />
        </div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
            <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[4]?.full_name}</span> | {leaderboard[4]?.title} - {leaderboard[4]?.department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {`#${leaderboard[4]?.top_hashtags.join(' #')}`}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
            <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[4]?.total_transaction_count}</span>
          </div>
        </div>
        <div className='flex items-center'>
        <div>
          <img
              className={`rounded-full h-9 w-10 `}
              src={getAvatarAttributes(`${leaderboard[5]?.full_name.split(' ')[5]} ${leaderboard[5]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[5]?.avtar)).src}
              alt={getAvatarAttributes(`${leaderboard[5]?.full_name.split(' ')[5]} ${leaderboard[5]?.full_name.split(' ')[1]}`, processAvatarUrl(leaderboard[5]?.avtar)).alt}
              onError={(e) => {
                // If the image fails to load, use the name initials instead
                e.target.onerror = null;
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  leaderboard[5]?.full_name.split(' ')[0].charAt(0) + leaderboard[5]?.full_name.split(' ')[1].charAt(0)
                )}&color=${"#464646"}&background=${"FFFFFF"}`;
              }}
            />
        </div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
            <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[5]?.full_name}</span> | {leaderboard[5]?.title} - {leaderboard[5]?.department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {`#${leaderboard[5]?.top_hashtags.join(' #')}`}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8  border-b-[1px]'>
            <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[5]?.total_transaction_count}</span>
          </div>
        </div>

      </div>

      <div className='flex flex-col md:flex-row gap-2'>
        <div className="bg-white rounded-lg drop-shadow-md pt-1 my-1 sm:w-full md:w-1/2">
          <div className='flex bg-[#FCEAAE] rounded-lg m-4 py-1 items-center'>
            <div className='px-6'>
              <span className='text-[46px] font-Lato font-bold pr-2'>{data?.total_recognitions}</span>
              <span className='text-[20px] font-Lato font-bold'>Recognitions</span>
            </div>
            <div className='px-2'>
              <span className='text-[46px] font-Lato font-bold pr-2'>{data?.total_points}</span>
              <span className='text-[20px] font-Lato font-bold'>Points</span>
            </div>
            <div className='px-2 py-[1px] ml-4 mt-5 text-[9px] rounded-md bg-white text-[#285C55]'>
              {`${data.percentage}% from last month`}
            </div>
          </div>
          <BarChart data={barData} />
        </div>
        <div className="bg-white rounded-lg drop-shadow-md pt-1 my-1 sm:w-full md:w-1/2">
          <div className='flex bg-[#B3E2A8] rounded-lg m-4 py-1 items-center'>
            <div className='px-6'>
              <span className='text-[46px] font-Lato font-bold pr-2'>69</span>
              <span className='text-[20px] font-Lato font-bold'>Redemptions</span>
            </div>
            <div className='px-2'>
              <span className='text-[46px] font-Lato font-bold pr-2'>4100</span>
              <span className='text-[20px] font-Lato font-bold'>Points</span>
            </div>
            <div className='px-2 py-[1px] ml-2 mt-5 text-[9px] rounded-md bg-white text-[#285C55]'>
              {`${data.percentage}% from last month`}
            </div>
          </div>
          <div className='flex-col p-6'>
            <div className='flex justify-between pb-1 border-b-[1px] mb-4'>
              <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Apparel</span>
                <span className='font-Lato font-semibold'>23</span>
              </div>
              <div className='text-[18px] font-Lato font-bold'>1250 Pts.</div>
            </div>
            <div className='flex justify-between pb-1 mb-4 border-b-[1px]'>
              <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Entertainment</span>
                <span className='font-Lato font-semibold'>12</span>
              </div>
              <div className='text-[18px] font-Lato font-bold'>950 Pts.</div>
            </div>
            <div className='flex justify-between pb-1 mb-4 border-b-[1px]'>
              <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Food</span>
                <span className='font-Lato font-semibold'>09</span>
              </div>
              <div className='text-[18px] font-Lato font-bold'>700 Pts.</div>
            </div>
            <div className='flex justify-between pb-1 mb-4 border-b-[1px]'>
              <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Donations</span>
                <span className='font-Lato font-semibold'>08</span>
              </div>
              <div className='text-[18px] font-Lato font-bold'>550 Pts.</div>
            </div>
            <div className='flex justify-between pb-1 border-b-[1px]'>
              <div>
                <span className='text-[#5486E3] font-Lato font-bold text-[16px] pr-2'>Electronics</span>
                <span className='font-Lato font-semibold'>07</span>
              </div>
              <span className='text-[18px] font-Lato font-bold'>300 Pts.</span>
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

      <div className='bg-white rounded-lg my-3 overflow-x-auto sm:w-[880px] md:w-full'>
        <div className='py-3 px-6 font-Lato font-bold text-[20px]'>Recognition Statistics</div>
        <div className='flex gap-44 bg-[#5486E3] rounded-lg py-4 font-Lato text-white'>
          <p className='pl-4'>Department</p>
          <p className='pl-3'>Within Department</p>
          <p className='pl-4'>Outside Department</p>
        </div>
        <ColumnGroupingTable departmentData={departmentData} />
      </div>

      <div className='flex flex-col md:flex-row gap-2'>

        <div className="bg-white w-1/2 rounded-lg drop-shadow-md mb-4">
          <div className='text-left border-b-2 mb-4 py-2 px-4 text-[18px] font-Lato font-semibold'>Team Engagement</div>
          <div className='flex justify-center items-center pt-4'><AreaChart data={weeklyIntervals} /></div>
        </div>

        <div className='w-1/2 flex-col justify-center items-center bg-white rounded-lg drop-shadow-md mb-4'>
          <div className='text-left border-b-2 mb-4 py-2 px-4 text-[18px] font-Lato font-semibold'>Word Cloud</div>
          <div className='flex justify-center items-center'><WordCloudComponent /></div>
        </div>
      </div>
    </div>
  );
}








// <div className='flex items-center'>
// <div className='h-9 w-10 rounded-full bg-black'></div>
// <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
// <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[6].name}</span> | {leaderboard[6].title} - {leaderboard[6].department}
// </div>
// <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
// {leaderboard[6].hashtags.join(' ')}
// </div>
// <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
// <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[6].points}</span>
// </div>
// </div>
// <div className='flex items-center'>
// <div className='h-9 w-10 rounded-full bg-black'></div>
// <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
// <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[7].name}</span> | {leaderboard[7].title} - {leaderboard[7].department}
// </div>
// <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
// {leaderboard[7].hashtags.join(' ')}
// </div>
// <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
// <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[7].points}</span>
// </div>
// </div>
// <div className='flex items-center'>
// <div className='h-9 w-10 rounded-full bg-black'></div>
// <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
// <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[8].name}</span> | {leaderboard[8].title} - {leaderboard[8].department}
// </div>
// <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
// {leaderboard[8].hashtags.join(' ')}
// </div>
// <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
// <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[8].points}</span>
// </div>
// </div>
// <div className='flex items-center'>
// <div className='h-9 w-10 rounded-full bg-black'></div>
// <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px]'>
// <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[9].name}</span> | {leaderboard[9].title} - {leaderboard[9].department}
// </div>
// <div className='basis-1/3 py-2 pl-3 mr-[2px]  border-r-[1px]'>
// {leaderboard[9].hashtags.join(' ')}
// </div>
// <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8'>
// <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[9].points}</span>
// </div>
// </div>   