import React, {useState} from 'react'
import GoldBadge from '../assets/images/analytics/gold.svg'
import SilverBadge from '../assets/images/analytics/silver.svg'
import BronzeBadge from '../assets/images/analytics/bronze.svg'
import ColumnGroupingTable from './ColumnGroupingTable'

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

  return (
    <div>

      <div className='mt-3'>
        <button className='bg-[#5486E3] text-white text-md font-Lato py-2 px-8 rounded-l-md'>Overall</button>
        <button className='bg-white py-2 px-6 text-md font-Lato rounded-r-md'>Your Team</button>
      </div>

      <div className='my-2 bg-white flex flex-col gap-2 px-4 py-2 rounded-lg drop-shadow-md'>
        <p className='font-bold font-Lato text-[18px]'>Leaderboard</p>
          <div className='flex items-center'>
            <div className='h-9 w-10 rounded-full bg-black'></div>
            <div className='bg-[#FCEAAE] rounded-l-lg py-2 pl-4 basis-1/2 ml-8 mr-[2px]'>
              <span className='font-semibold font-Lato text-[17px]'>{leaderboard[0].name}</span> | {leaderboard[0].title} - {leaderboard[0].department}
            </div>
            <div className='bg-[#FCEAAE] basis-1/3 py-2 pl-3 mr-[2px]'>
              {leaderboard[0].hashtags.join(' ')}
            </div>
            <div className='flex justify-center bg-[#FCEAAE] basis-1/6 py-2 pr-8 rounded-r-lg pl-10'>
              {leaderboard[0].points} {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={GoldBadge}
                alt='Gold Badge'
              />}
            </div>
          </div>
          <div className='flex items-center'>
            <div className='h-9 w-10 rounded-full bg-black'></div>
            <div className='bg-[#D6D6D6] basis-1/2 rounded-l-lg py-2 pl-3 ml-8 mr-[2px]'>
            <span className='font-semibold font-Lato text-[17px]'>{leaderboard[1].name}</span> | {leaderboard[1].title} - {leaderboard[1].department}
            </div>
            <div className='bg-[#D6D6D6] basis-1/3 py-2 pl-3 mr-[2px]'>
              {leaderboard[1].hashtags.join(' ')}
            </div>
            <div className='flex justify-center bg-[#D6D6D6] basis-1/6 py-2 pr-8 rounded-r-lg pl-10'>
              {leaderboard[1].points} {
                <img
                  className='h-6 w-6 ml-4 object-contain'
                  src={SilverBadge}
                  alt='Gold Badge'
                />}
            </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='bg-[#FFC993] basis-1/2 rounded-l-lg py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[2].name}</span> | {leaderboard[2].title} - {leaderboard[2].department}
          </div>
          <div className='bg-[#FFC993] basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[2].hashtags.join(' ')}
          </div>
          <div className='flex justify-center bg-[#FFC993] basis-1/6 py-2 pr-8 rounded-r-lg pl-10'>
            {leaderboard[2].points} {
              <img
                className='h-6 w-6 ml-4 object-contain'
                src={BronzeBadge}
                alt='Gold Badge'
              />}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[3].name}</span> | {leaderboard[3].title} - {leaderboard[3].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[3].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[3].points}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[4].name}</span> | {leaderboard[4].title} - {leaderboard[4].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[4].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[4].points}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[5].name}</span> | {leaderboard[5].title} - {leaderboard[5].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[5].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[5].points}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[6].name}</span> | {leaderboard[6].title} - {leaderboard[6].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[6].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[6].points}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[7].name}</span> | {leaderboard[7].title} - {leaderboard[7].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[7].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[7].points}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[8].name}</span> | {leaderboard[8].title} - {leaderboard[8].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[8].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[8].points}
          </div>
          </div>
          <div className='flex items-center'>
          <div className='h-9 w-10 rounded-full bg-black'></div>
          <div className='rounded-l-lg basis-1/2 py-2 pl-3 ml-8 mr-[2px]'>
          <span className='font-semibold font-Lato text-[17px]'>{leaderboard[9].name}</span> | {leaderboard[9].title} - {leaderboard[9].department}
          </div>
          <div className='basis-1/3 py-2 pl-3 mr-[2px]'>
            {leaderboard[9].hashtags.join(' ')}
          </div>
          <div className='flex justify-center basis-1/6 py-2 pr-8 rounded-r-lg'>
            {leaderboard[9].points}
          </div>
          </div>   
      </div>

      <div><ColumnGroupingTable /></div>


    </div>
  );
}
