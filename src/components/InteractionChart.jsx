import React, {useEffect, useState} from 'react'
import { SERVER_URL } from '@/constant';

const InteractionChart = ({ interactionData, myAvatar }) => {

  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    };


  return (
    <div>
      <div className='flex gap-32 mx-14 py-8'>
        {interactionData[0] && 
          <div>
          <img
           className='rounded-full h-11 w-12' src={SERVER_URL + interactionData[0]?.avtar}/>
          </div>}
        {interactionData[1] && <div><img className='rounded-full h-11 w-12' src={SERVER_URL + interactionData[1]?.avtar} /></div>}
      </div>
      <div 
        className='flex justify-center relative'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
      <img 
      className={`rounded-full h-14 w-14 border-2 ${
        isHovered ? 'border-black' : 'hover:border-black'
      } z-10`}
      src={SERVER_URL + myAvatar}/>
      </div>
      <div className='flex gap-40 mx-8'>
        {interactionData[2] && <div><img className='rounded-full h-12 w-12' src={SERVER_URL + interactionData[2]?.avtar} /></div>}
        {interactionData[3] && <div><img className='rounded-full h-12 w-12' src={SERVER_URL + interactionData[3]?.avtar} /></div>}
      </div>
     {interactionData[4] &&  <div className='flex justify-center py-4'><img className='rounded-full h-12 w-12' src={SERVER_URL + interactionData[4]?.avtar} /></div>}
      
      <svg className='absolute top-0 left-0 h-full w-full'>
        {/*1 Pic Line*/}
        {interactionData[0] && <line x1='94' y1='106' x2='141' y2='158' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*2 Pic Line*/}
        {interactionData[1] && <line x1='234' y1='108' x2='184' y2='159' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*3 Pic Line*/}
        {interactionData[2] && <line x1='79' y1='224' x2='139' y2='190' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*4 Pic Line*/}
        {interactionData[3] && <line x1='242' y1='220' x2='186' y2='190' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*5 Pic Line*/}
        {interactionData[4] && <line x1='162' y1='270' x2='162' y2='203' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
      </svg>
    </div>
  )
}

export default InteractionChart