import React, {useState} from 'react'
import MyPic from '../assets/images/user-profile/my.jpg'
import Flag from '../assets/images/user-profile/flag.png'
import AnniversaryBg from '../assets/images/user-profile/anniversarybg.png'
import Uparrow from '../assets/svg/Uparrow.svg'
import Downarrow from '../assets/svg/Downarrow.svg'
import MyHashtags from './HomeRightSidebar/MyHashtags'
import { AiFillCaretDown } from "react-icons/ai";
import useMediaQuery from '@mui/material/useMediaQuery'
import { breakpoints, myTheme } from '../myTheme'
import AvatarEditor from 'react-avatar-edit'
import ShowModal from './AdminPanel/ShowModal'
import SortBy from './SortBy'
export default function MyProfile() {

  const [showOverview, setShowOverview] = useState(true);
  const [showRecentActivities, setShowRecentActivities] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [appreciationReceived, setAppreciationReceived] = useState(true);
  const [appreciationGiven, setAppreciationGiven] = useState(true);

  const handleClickOverview = () => {
      setShowOverview(true);
      setShowRecentActivities(false);
      setShowAchievements(false);
      setAppreciationGiven(true);
      setAppreciationReceived(true);
    };

  const handleClickRecentActivities = () => {
      setShowRecentActivities(true);
      setShowAchievements(false);
      setShowOverview(false);
      setAppreciationGiven(false);
  };

  const handleClickAchievements = () => {
    setShowAchievements(true);
    setShowRecentActivities(false);
    setShowOverview(false);
  };

  const handleClickAppreciationReceived = () => {
    setAppreciationReceived(true);
    setAppreciationGiven(false);
    showRecentActivities(true);
    setShowAchievements(false);
    setShowOverview(false);
  }

  const handleClickAppreciationGiven = () => {
    setAppreciationGiven(true);
    setAppreciationReceived(false);
    showRecentActivities(true);
    setShowAchievements(false);
    setShowOverview(false);
  }

  return (

<div className='drop-shadow-lg'>
  <div className='flex flex-col md:flex-row h-auto mt-3 mx-3'>

  <div className='flex flex-col items-center md:flex-row md:w-[70%] bg-white rounded-lg mb-3 pb-4 border-t-8 border-l-0 md:border-t-0 md:border-l-8 border-[#27C4A0]'>
    <div className="my-10 mx-4 md:mr-10 h-[150px] w-[150px] rounded-full overflow-hidden relative">
  <img src={MyPic} alt="user avatar" className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
    <p className="text-white font-normal font-lato text-sm text-center">
      Change<br />Picture
    </p>
  </div>
</div>
      <div className='flex-col text-center md:text-left pt-6'>
        <div>
            <div className='mx-28 md:mx-auto'><img  src={ Flag }/></div>
            <p className="pl-2 font-bold font-Lato text-[#292929] text-[25px]">Padmapriya Ravishekar</p>             
        </div>
        <div className='md:flex mb-8'>
            <div>
              <p className="pl-2 pr-6 mx-auto font-bold font-lato text-[#000000] text-[18px]">ServiceNow Developer</p>
              <p className="pl-2 font-normal font-lato text-[#000000] text-[18px]">Product Development</p>    
            </div>
            <div className='hidden md:block h-10 mt-2 w-[0.8px] mr-6 bg-[#27C4A0]'></div>
            <div>
              <p className="pl-2 font-normal font-lato text-[#000000] text-[18px]">robinmalik1208@gmail.com</p>
              <p className="pl-2 font-normal font-lato text-[#000000] text-[18px]">+91 7017276431</p>
            </div>
        </div>
    </div>
    </div>

    <div className='flex flex-col items-center md:w-[28%] bg-[#5486E3] bg-bottom rounded-lg md:ml-2 mb-3' style={{ backgroundImage:`url(${AnniversaryBg})`, backgroundRepeat: 'no-repeat', paddingBottom: '4rem'}}>
        <div className="font-normal pt-4 pb-4 font-Lato text-[#fdfbfb] text-[20px]">Anniversaries</div>
        <div className='font-normal font-lato text-[#fbfbfb] text-[14px]'>Birthday</div>
        <div className='font-normal font-lato text-[#8DFFFF] text-[30px]'>December 14</div>
        <div className='md:absolute md:top-[140px] md:pt-2 '>
        <div className='font-normal font-lato text-[#fbfbfb] text-[14px]'>Work Anniversary</div>
        <div className='font-normal font-lato text-[#bdfcfc] text-[28px] pl-3'>May 21</div>
        </div>
    </div>

  </div>

  <div className="text-[#8D8D8D] font-semibold text-[14px] font-lato text-left ml-4 mr-8 mt-4 mb-4">
        <div className='flex flex-col md:flex-row sm:justify-center md:justify-between'>
         <div className='flex justify-center'>
            <button className={showOverview ? 'text-[#000000] border-b-2 border-[#000000]' : ''} onClick={handleClickOverview}>Overview</button>
            <button className={showRecentActivities ? 'text-[#000000] border-b-2 border-[#000000] ml-6' : 'ml-6'} onClick={handleClickRecentActivities}>Recent Activities</button>
            <button className={showAchievements ? 'text-[#000000] border-b-2 border-[#000000] ml-6' : 'ml-6'} onClick={handleClickAchievements}>Achievements</button>
         </div>
         <div>
            <div className='flex justify-end'>
              <p className=" font-Lato text-[#7B7B7B] text-sm relative flex items-center ml-20">
              Sort By:
              <button className="peer font-Lato flex items-center gap-1 text-sm font-semibold pl-1">
                 Last 30 days <span><AiFillCaretDown /></span>
              </button>
              <div className="hidden drop-shadow-[0px_2px_6px_#44444F1A] px-4 py-2 rounded-lg bg-white absolute z-10 top-[21px] right-[1px] peer-hover:flex hover:flex  flex-col text-end">
                  <p className="text-sm font-Lato">Last quarter</p>
                  <p className="text-sm font-Lato">Last 1 year</p>
              </div>
              </p>
            </div>    
         </div>
        </div>
        <div className='bg-[#CECECE] h-[1px] w-full' ></div>     
  </div>

  <div className='md:flex mx-3'>
        <div className='flex-col md:w-[70%]'>

          <div className={showAchievements ? 'hidden' : 'grid grid-cols-2 gap-0 bg-white p-2 md:p-3 rounded-lg text-white drop-shadow-md'}>
            <div onClick = {handleClickAppreciationReceived} className={appreciationReceived ? 'flex flex-col items-center justify-center bg-[#27C4A0] py-2 rounded-l-lg' : 'flex flex-col items-center justify-center bg-[#D1D1D1] py-2 rounded-l-lg'}>
              <div><img src={Downarrow} /></div>
              <div>Appreciation Received</div>
              <div className='text-[26px]'>17</div>
            </div>
            <div onClick = {handleClickAppreciationGiven} className={appreciationGiven ? 'flex flex-col items-center justify-center bg-[#5486E3] py-2 rounded-r-lg': 'flex flex-col items-center justify-center bg-[#D1D1D1] py-2 rounded-r-lg'}>
              <div><img src={Uparrow} /></div>
              <div>Appreciation Given</div>
              <p className='text-[26px]'>14</p>
            </div> 
          </div>

          <div className='mt-4'>
            <div className='bg-white mb-4 rounded-lg h-auto w-auto drop-shadow-lg'>
              {
                showOverview && 
                <div className='flex flex-col md:flex-row items-center md:items-start md:justify-center  '>
                  <div className='hidden md:block w-2/5 text-center py-4 border-r-2'>
                    <p className='text-[16px] text-[#000000] font-Lato font-bold'>Robin's Interaction</p>
                  </div>
                  
                  <div className='w-3/5 py-4 flex justify-center'>
                    <table className='border-collapse'>
                     <thead>
                        <tr>
                          <th className='pb-4 text-start pl-4 text-[16px] text-[#000000] font-Lato font-bold'>Name</th>
                          <th className='pb-4 px-4 text-[#27C4A0]'>Received</th>
                          <th className='pb-4 px-4 text-[#2BBFE2]'>Given</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr className='hover:bg-[#c7c7c7]'>
                          <td className='p-4 text-[#5486E3] font-bold text-[16px]'>Pulkit Aggarwal</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal'>05</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6'>06</td>
                        </tr>
                        <tr className='hover:bg-[#c7c7c7]'>
                          <td className='p-4 text-[#5486E3] font-bold text-[16px]'>Swarup Vuddagiri</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal'>07</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6'>04</td>
                        </tr>
                        <tr className='hover:bg-[#c7c7c7]'>
                          <td className='p-4 text-[#5486E3] font-bold text-[16px]'>Neha Bhati</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal'>10</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6'>06</td>
                        </tr>
                        <tr className='hover:bg-[#c7c7c7]'>
                          <td className='p-4 text-[#5486E3] font-bold text-[16px]'>Rafael Merces</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal'>09</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6'>03</td>
                        </tr>
                        <tr className='hover:bg-[#c7c7c7]'>
                          <td className='p-4 text-[#5486E3] font-bold text-[16px]'>Deepak Kanavikar</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal'>01</td>
                          <td className='p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6'>03</td>
                        </tr>
                     </tbody>
                    </table>
                  </div>
                </div> 
              }
            </div>  
          </div> 
          
        </div>
        <div>
            <div className="h-screen md:ml-2 md:w-[300px] ">
              <MyHashtags />
            </div>
        </div>
      </div>

</div>   
)
}