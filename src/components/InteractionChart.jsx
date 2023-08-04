import React, {useEffect, useState} from 'react'
import { SERVER_URL } from '@/constant';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';

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
      <div className='flex justify-between mx-14 py-8'>
        {interactionData[0] && 
          <div>
            <img
              className="rounded-full h-12 w-12"
              src={getAvatarAttributes(`${interactionData[0]?.name.split(' ')[0]} ${interactionData[0]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[0]?.avtar)).src}
              alt={getAvatarAttributes(`${interactionData[0]?.name.split(' ')[0]} ${interactionData[0]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[0]?.avtar)).alt}
            onError={(e) => {
              // If the image fails to load, use the name initials instead
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                interactionData[0]?.name.split(' ')[0].charAt(0) + interactionData[0]?.name.split(' ')[1].charAt(0)
              )}&color=${"#464646"}&background=${"FFFFFF"}`;
            }}
            />
          </div>}
        {interactionData[1] && <div>
          <img
            className="rounded-full h-12 w-12"
            src={getAvatarAttributes(`${interactionData[1]?.name.split(' ')[0]} ${interactionData[1]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[1]?.avtar)).src}
            alt={getAvatarAttributes(`${interactionData[1]?.name.split(' ')[0]} ${interactionData[1]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[1]?.avtar)).alt}
            onError={(e) => {
              // If the image fails to load, use the name initials instead
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                interactionData[1]?.name.split(' ')[0].charAt(0) + interactionData[1]?.name.split(' ')[1].charAt(0)
              )}&color=${"#464646"}&background=${"FFFFFF"}`;
            }}
          />
        </div>}
      </div>
      <div 
        className='flex justify-center relative'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className="rounded-full h-12 w-12"
          src={getAvatarAttributes(`${interactionData[4]?.name.split(' ')[0]} ${interactionData[4]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[4]?.avtar)).src}
          alt={getAvatarAttributes(`${interactionData[4]?.name.split(' ')[0]} ${interactionData[4]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[4]?.avtar)).alt}
          onError={(e) => {
            // If the image fails to load, use the name initials instead
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              interactionData[4]?.name.split(' ')[0].charAt(0) + interactionData[4]?.name.split(' ')[1].charAt(0)
            )}&color=${"#464646"}&background=${"FFFFFF"}`;
          }}
        />
      </div>
      <div className='flex justify-between mx-5 pt-8'>
        {interactionData[2] && <div>
          <img
            className="rounded-full h-12 w-12"
            src={getAvatarAttributes(`${interactionData[2]?.name.split(' ')[0]} ${interactionData[2]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[2]?.avtar)).src}
            alt={getAvatarAttributes(`${interactionData[2]?.name.split(' ')[0]} ${interactionData[2]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[2]?.avtar)).alt}
            onError={(e) => {
              // If the image fails to load, use the name initials instead
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                interactionData[2]?.name.split(' ')[0].charAt(0) + interactionData[2]?.name.split(' ')[1].charAt(0)
              )}&color=${"#464646"}&background=${"FFFFFF"}`;
            }}
          />
        </div>}
        {interactionData[3] && <div>
          <img
            className="rounded-full h-12 w-12"
            src={getAvatarAttributes(`${interactionData[3]?.name.split(' ')[0]} ${interactionData[3]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[3]?.avtar)).src}
            alt={getAvatarAttributes(`${interactionData[3]?.name.split(' ')[0]} ${interactionData[3]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[3]?.avtar)).alt}
            onError={(e) => {
              // If the image fails to load, use the name initials instead
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                interactionData[3]?.name.split(' ')[0].charAt(0) + interactionData[3]?.name.split(' ')[1].charAt(0)
              )}&color=${"#464646"}&background=${"FFFFFF"}`;
            }}
          />
        </div>}
      </div>
      {interactionData[4] && <div className='flex justify-center py-2'>
        <img
          className="rounded-full h-12 w-12"
          src={getAvatarAttributes(`${interactionData[4]?.name.split(' ')[0]} ${interactionData[4]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[4]?.avtar)).src}
          alt={getAvatarAttributes(`${interactionData[4]?.name.split(' ')[0]} ${interactionData[4]?.name.split(' ')[1]}`, processAvatarUrl(interactionData[4]?.avtar)).alt}
          onError={(e) => {
            // If the image fails to load, use the name initials instead
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              interactionData[4]?.name.split(' ')[0].charAt(0) + interactionData[4]?.name.split(' ')[1].charAt(0)
            )}&color=${"#464646"}&background=${"FFFFFF"}`;
          }}
        />
      </div>}
      
      <svg className='absolute top-0 left-0 h-full w-full'>
        {/*1 Pic Line*/}
        {interactionData[0] && <line x1='100' y1='110' x2='141' y2='158' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*2 Pic Line*/}
        {interactionData[1] && <line x1='205' y1='110' x2='152' y2='172' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*3 Pic Line*/}
        {interactionData[2] && <line x1='62' y1='250' x2='139' y2='190' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*4 Pic Line*/}
        {interactionData[3] && <line x1='240' y1='250' x2='170' y2='190' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
        {/*5 Pic Line*/}
        {interactionData[4] && <line x1='152' y1='297' x2='152' y2='203' stroke='gray' strokeWidth={isHovered ? 3 : 1} />}
        
      </svg>
    </div>
  )
}

export default InteractionChart