import React, {useState} from 'react'
import GoldBadge from '../assets/images/analytics/gold.svg'
import SilverBadge from '../assets/images/analytics/silver.svg'
import BronzeBadge from '../assets/images/analytics/bronze.svg'
import ColumnGroupingTable from './ColumnGroupingTable'
import WordCloudComponent from './WordCloudComponent'
import BarChart from './BarChart'
import AmazonLogo from '../assets/images/analytics/Amazon.png'
import DunkinLogo from '../assets/images/analytics/Dunkin.png'
import StarbucksLogo from '../assets/images/analytics/Starbucks.png'

export const Analytics = () => {

  const [leaderboard, setleaderboard] = useState([
    {
        name: "Sunita Gulia",
        title: "Director",
        department: "Product development",
        hashtags: ["#One Team", "#Vision", "#Leadership"],
        points: 17
    },
    {
        name: "Lisa Clinton",
        title: "Director",
        department: "HR",
        hashtags: ["#Culture", "Collaboration", "#Vision"],
        points: 15
    },
    {
        name: "Cassie Conley",
        title: "HR Coordinator",
        department: "HR",
        hashtags: ["#Innovation", "#Vision", "#Leadership"],
        points: 14
    },
    {
        name: "Swarup Vuddagiri",
        title: "Sr Consultant",
        department: "Product development",
        hashtags: ["#Customer-service", "#Vision", "#Inclusive"],
        points: 12
    },
    {
        name: "Semad Javed",
        title: "Sr Manager",
        department: "User Experience",
        hashtags: ["#One Team", "#Vision", "#Quality"],
        points: 10
    },
    {
        name: "Pulkit Agrawal",
        title: "Manager",
        department: "Marketing",
        hashtags: ["#Innovation", "Customer-service", "#Leadership"],
        points: 9
    },
    {
        name: "Swarup Vuddagai",
        title: "Director",
        department: "Product development",
        hashtags: ["#Culture", "#Vision", "#Leadership"],
        points: 8
    },
    {
        name: "Lisa Clinton",
        title: "HR Coordinator",
        department: "HR",
        hashtags: ["#innovation", "Customer-service"],
        points: 5
    },
    {
        name: "Swarup Vuddagiri",
        title: "Consultant",
        department: "Product development",
        hashtags: ["#Innovation", "#Leadership"],
        points: 3
    },
    {
        name: "Rafael Merces",
        title: "Consultant",
        department: "Product development",
        hashtags: ["#Customer-service"],
        points: 1
    }
  ])

  const data = [
    { category: 'A', value: 30 },
    { category: 'B', value: 50 },
    { category: 'C', value: 20 },
    { category: 'D', value: 70 },
    { category: 'E', value: 40 },
    { category: 'F', value: 30 },
    { category: 'G', value: 50 },
    { category: 'H', value: 20 },
    { category: 'I', value: 70 },
    { category: 'J', value: 40 },
  ];

  return (
    <div>

      <div className='mt-3'>
        <button className='bg-[#5486E3] text-white text-md font-Lato py-2 px-8 rounded-l-md'>Overall</button>
        <button className='bg-white py-2 px-6 text-md font-Lato rounded-r-md'>Your Team</button>
      </div>

      <div className='my-2 bg-white flex flex-col gap-2 px-4 py-3 rounded-lg drop-shadow-md'>
        <p className='font-bold font-Lato text-[18px]'>Leaderboard</p>
          <div className='flex items-center'>
            <div className='h-9 w-10 rounded-full bg-black'></div>
            <div className='bg-[#FCEAAE] rounded-l-lg py-[7px] pl-4 basis-1/2 ml-8 mr-[2px]'>
              <span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[0].name}</span> | {leaderboard[0].title} - {leaderboard[0].department}
            </div>
            <div className='bg-[#FCEAAE] basis-1/3 py-[7.8px] pl-3 mr-[2px]'>
              {leaderboard[0].hashtags.join(' ')}
            </div>
            <div className='flex justify-center items-center bg-[#FCEAAE] basis-1/6 py-[4.8px] pr-8 rounded-r-lg pl-10'>
              <span className='text-[#B99107] font-bold font-Lato text-[20px]'>{leaderboard[0].points}</span> {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={GoldBadge}
                alt='Gold Badge'
              />}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='h-9 w-10 rounded-full bg-black'></div>
            <div className='bg-[#D6D6D6] basis-1/2 rounded-l-lg py-[7px] pl-3 ml-8 mr-[2px]'>
            <span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[1].name}</span> | {leaderboard[1].title} - {leaderboard[1].department}
            </div>
            <div className='bg-[#D6D6D6] basis-1/3 py-[7.8px] pl-3 mr-[2px]'>
              {leaderboard[1].hashtags.join(' ')}
            </div>
            <div className='flex justify-center items-center bg-[#D6D6D6] basis-1/6 py-[4.8px] pr-8 rounded-r-lg pl-10'>
              <span className='text-[#292929] font-bold font-Lato text-[20px]'>{leaderboard[1].points}</span> {
                <img
                  className='h-6 w-6 ml-4 object-contain'
                  src={SilverBadge}
                  alt='Gold Badge'
                />}
            </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='bg-[#FFC993] basis-1/2 rounded-l-lg py-[7px] pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px] text-[#5486E3]'>{leaderboard[2].name}</span> | {leaderboard[2].title} - {leaderboard[2].department}
          </div>
          <div className='bg-[#FFC993] basis-1/3 py-[7.8px] pl-3 mr-[2px]'>
            {leaderboard[2].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center bg-[#FFC993] basis-1/6 py-[4.8px] pr-8 rounded-r-lg pl-10'>
            <span className='text-[#954A00] font-bold font-Lato text-[20px]'>{leaderboard[2].points}</span> {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={BronzeBadge}
                alt='Gold Badge'
              />}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className=' basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-b-[1px] border-r-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[3].name}</span> | {leaderboard[3].title} - {leaderboard[3].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-r-[1px] border-b-[1px]'>
            {leaderboard[3].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[3].points}</span>
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[4].name}</span> | {leaderboard[4].title} - {leaderboard[4].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {leaderboard[4].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[4].points}</span>
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[5].name}</span> | {leaderboard[5].title} - {leaderboard[5].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {leaderboard[5].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8  border-b-[1px]'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[5].points}</span>
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[6].name}</span> | {leaderboard[6].title} - {leaderboard[6].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {leaderboard[6].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[6].points}</span>
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[7].name}</span> | {leaderboard[7].title} - {leaderboard[7].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {leaderboard[7].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[7].points}</span>
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px] border-b-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[8].name}</span> | {leaderboard[8].title} - {leaderboard[8].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px] border-b-[1px] border-r-[1px]'>
            {leaderboard[8].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8 border-b-[1px]'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[8].points}</span>
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='basis-1/2 py-2 pl-3 ml-8 mr-[2px] border-r-[1px]'>
          <span className='font-semibold font-Lato text-[15px] text-[#5486E3]'>{leaderboard[9].name}</span> | {leaderboard[9].title} - {leaderboard[9].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]  border-r-[1px]'>
            {leaderboard[9].hashtags.join(' ')}
          </div>
          <div className='flex justify-center items-center basis-1/6 py-[5px] pr-8'>
          <span className='text-[#292929] font-medium font-Lato text-[20px]'>{leaderboard[9].points}</span>
          </div>
          </div>   
      </div>

      <div className='flex flex-col md:flex-row gap-2'>
        <div className="bg-white rounded-lg drop-shadow-md pt-1 my-1 w-1/2">
        <div className='flex bg-[#FCEAAE] rounded-lg m-4'>
          <div className='px-6 py-2'>
            <span className='text-[46px] font-Lato font-bold pr-4'>520</span>
            <span className='text-[20px] font-Lato font-bold'>Recognition</span>
          </div>
          <div className='px-6 py-2'>
            <span className='text-[46px] font-Lato font-bold pr-4'>4800</span>
            <span className='text-[20px] font-Lato font-bold'>Points</span>
          </div>
        </div>
        <BarChart data={data} />
        </div>
        <div className="bg-white rounded-lg drop-shadow-md pt-1 my-1 w-1/2">
          <div className='flex bg-[#B3E2A8] rounded-lg m-4'>
          <div className='px-6 py-2'>
            <span className='text-[46px] font-Lato font-bold pr-4'>69</span>
            <span className='text-[20px] font-Lato font-bold'>Redemptions</span>
          </div>
          <div className='px-10 py-2'>
            <span className='text-[46px] font-Lato font-bold pr-4'>4100</span>
            <span className='text-[20px] font-Lato font-bold'>Points</span>
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

      <div className='bg-white rounded-lg my-3'>
        <div className='py-3 px-6 font-Lato font-bold text-[20px]'>Recognition Statistics</div>
        <ColumnGroupingTable />
      </div>

      <div className=' bg-white rounded-lg drop-shadow-md mt-2 mb-4'>
       <WordCloudComponent />
      </div>
    </div>
  );
}
