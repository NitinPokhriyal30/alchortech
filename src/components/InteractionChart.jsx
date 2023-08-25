import React, { useEffect, useState } from 'react';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';

const InteractionChart = ({ interactionData, me, hoveredRowIndex, onRowHover, setHoveredImageIndex }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isCenterImageHovered, setIsCenterImageHovered] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setHoveredImageIndex(index);
    onRowHover(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setHoveredImageIndex(null);
    onRowHover(null);
    setIsCenterImageHovered(false);
  };
  return (
    <div className="interaction-chart-container">
      <div className="flex justify-between mx-16 py-8">
        {interactionData[0] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 0 || hoveredRowIndex === 0 || isCenterImageHovered) ? 'border-2 border-[#5486E3]' : 'hover:border-[#5486E3]'}`}
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
          </div>
        )}
        {interactionData[1] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 1 || hoveredRowIndex === 1 || isCenterImageHovered) ? 'border-2 border-[#5486E3]' : 'hover:border-[#5486E3]'}`}
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
          </div>
        )}
      </div>

      <div className="mx-32 fixed">
        {console.log(me)}

        <img
          className={`rounded-full h-16 w-16 border-2 ${isCenterImageHovered ? 'border-[#5486E3]' : 'hover:border-[#5486E3]'} z-10`}
          onMouseEnter={() => setIsCenterImageHovered(true)} onMouseLeave={handleMouseLeave}
          src={getAvatarAttributes(`${me?.full_name.split(' ')[0]} ${me?.full_name.split(' ')[1]}`, processAvatarUrl(me?.avtar)).src}
          alt={getAvatarAttributes(`${me?.full_name.split(' ')[0]} ${me?.full_name.split(' ')[1]}`, processAvatarUrl(me?.avtar)).alt}
          onError={(e) => {
            // If the image fails to load, use the full_name initials instead
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              me?.full_name.split(' ')[0].charAt(0) + me?.full_name.split(' ')[1].charAt(0)
            )}&color=${"#464646"}&background=${"FFFFFF"}`;
          }}
        />
      </div>

      <div className="flex justify-between mx-6 z-10 mt-10">
        {interactionData[2] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 2 || hoveredRowIndex === 2 || isCenterImageHovered) ? 'border-2 border-[#5486E3]' : 'hover:border-[#5486E3]'}`}
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
          </div>
        )}
        {interactionData[3] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 3 || hoveredRowIndex === 3) ? 'border-2 border-[#5486E3]' : 'hover:border-[#5486E3]'}`}
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
          </div>
        )}
      </div>

      {/* 5th image */}
      <div className="flex justify-center pt-8">
        {interactionData[4] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(4)} // Pass the index to the handler
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 4 || hoveredRowIndex === 4) ? 'border-2 border-[#5486E3]' : 'hover:border-[#5486E3]'}`}
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
        )}
      </div>

      <svg className="absolute sm:px-[118px] md:px-0 top-0 h-full w-full z-[-10]">
        {/* 1st Pic Line */}
        {interactionData[0] && (
          <path
            d="M 100 117 a 50 50 0 0 1 40 46"
            stroke={'#ACACAC'}
            strokeWidth={(hoveredIndex === 0 || hoveredRowIndex === 0 || isCenterImageHovered) ? 3 : 1}
            fill="none"
          />
          
        )}

        {/* 2nd Pic Line */}
        {interactionData[1] && (
          <path
            d="M 220 112 a 50 50 0 0 0 -40 56"
            stroke={'#ACACAC'}
            strokeWidth={(hoveredIndex === 1 || hoveredRowIndex === 1 || isCenterImageHovered) ? 3 : 1}
            fill="none"
          />

        )}



        {/* 3rd Pic Line */}
        {interactionData[2] && (
          <path
            d="M 70 210 a 50 50 0 0 1 66 -18"
            stroke={'#ACACAC'}
            strokeWidth={(hoveredIndex === 2 || hoveredRowIndex === 2 || isCenterImageHovered) ? 3 : 1}
            fill="none"
          />
        )}

        {/* 4th Pic Line */}
        {interactionData[3] && (
          <path
            d="M 260 212 a 50 50 0 0 0 -80 -14"
            stroke={'#ACACAC'}
            strokeWidth={(hoveredIndex === 3 || hoveredRowIndex === 3 || isCenterImageHovered) ? 3 : 1}
            fill="none"
          />
        )}

        {/* 5th Pic Line */}
        {interactionData[4] && (
          <path
            d="M 160 218 a 50 50 0 0 0 0 58"
            stroke={'#ACACAC'}
            strokeWidth={(hoveredIndex === 4 || hoveredRowIndex === 4 || isCenterImageHovered) ? 3 : 1}
            fill="none"
          />
        )}
       
         {interactionData[0] && (
          <circle cx="106.7" cy="119.2" r="4" fill="#27C4A0" />
         )}
         {interactionData[1] && (
          <circle cx="213" cy="114" r="4" fill="#FFD398" />
         )}
         {interactionData[2] && (
          <circle cx="73" cy="207" r="4" fill="#F89D96" />
         )}
         {interactionData[3] && (
          <circle cx="254" cy="203" r="4" fill="#5486E3" />
         )}
         {interactionData[4] && (
          <circle cx="158" cy="272" r="4" fill="#F89D96" />
         )}
      </svg>
    </div>
  );
};

export default InteractionChart;