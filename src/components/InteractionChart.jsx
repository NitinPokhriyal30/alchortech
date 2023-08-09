import React, { useEffect, useState } from 'react';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';

const InteractionChart = ({ interactionData, myAvatar, hoveredRowIndex, onRowHover, setHoveredImageIndex }) => {
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
      <div className="flex justify-between mx-8 py-8">
        {interactionData[0] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(0)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 0 || hoveredRowIndex === 0) ? 'border-2 border-black' : 'hover:border-black'}`}
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
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 1 || hoveredRowIndex === 1) ? 'border-2 border-black' : 'hover:border-black'}`}
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

      <div className="flex justify-center relative" onMouseEnter={() => setIsCenterImageHovered(true)} onMouseLeave={handleMouseLeave}>
        <img
          className={`rounded-full h-14 w-14 border-2 ${isCenterImageHovered ? 'border-black' : 'hover:border-black'} z-10`}
          src={getAvatarAttributes(`${myAvatar?.name.split(' ')[0]} ${myAvatar?.name.split(' ')[1]}`, processAvatarUrl(myAvatar?.avtar)).src}
          alt={getAvatarAttributes(`${myAvatar?.name.split(' ')[0]} ${myAvatar?.name.split(' ')[1]}`, processAvatarUrl(myAvatar?.avtar)).alt}
          onError={(e) => {
            // If the image fails to load, use the name initials instead
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              myAvatar?.name.split(' ')[0].charAt(0) + myAvatar?.name.split(' ')[1].charAt(0)
            )}&color=${"#464646"}&background=${"FFFFFF"}`;
          }}
        />
      </div>

      <div className="flex justify-between mx-6 pt-8 z-10">
        {interactionData[2] && (
          <div
            className={`z-10`}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 2 || hoveredRowIndex === 2) ? 'border-2 border-black' : 'hover:border-black'}`}
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
              className={`rounded-full h-12 w-12 ${(hoveredIndex === 3 || hoveredRowIndex === 3) ? 'border-2 border-black' : 'hover:border-black'}`}
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
      <div className= "flex justify-center py-2">
      {interactionData[4] && (
        <div
          className={`z-10`}
          onMouseEnter={() => handleMouseEnter(4)} // Pass the index to the handler
          onMouseLeave={handleMouseLeave}
        >
          <img
            className={`rounded-full h-12 w-12 ${(hoveredIndex === 4 || hoveredRowIndex === 4) ? 'border-2 border-black' : 'hover:border-black'}`}
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

      <svg className="absolute top-0 left-0 h-full w-full z-[-10]">
        {/* 1st Pic Line */}
        {interactionData[0] && (
          <line
            x1="9%"
            y1="30%"
            x2="18%"
            y2="46%"
            stroke={(hoveredIndex === 0 || hoveredRowIndex === 0 || isCenterImageHovered) ? 'black' : 'gray'}
            strokeWidth={(hoveredIndex === 0 || hoveredRowIndex === 0 || isCenterImageHovered) ? 3 : 1}
          />
        )}

        {/* 2nd Pic Line */}
        {interactionData[1] && (
          <line
            x1="31%"
            y1="30%"
            x2="22%"
            y2="46%"
            stroke={(hoveredIndex === 1 || hoveredRowIndex === 1 || isCenterImageHovered) ? 'black' : 'gray'}
            strokeWidth={(hoveredIndex === 1 || hoveredRowIndex === 1 ||  isCenterImageHovered) ? 3 : 1}
          />
        )}

        {/* 3rd Pic Line */}
        {interactionData[2] && (
          <line
            x1="8%"
            y1="70%"
            x2="18%"
            y2="54%"
            stroke={(hoveredIndex === 2 || hoveredRowIndex === 2 || isCenterImageHovered) ? 'black' : 'gray'}
            strokeWidth={(hoveredIndex === 2 || hoveredRowIndex === 2 || isCenterImageHovered) ? 3 : 1}
          />
        )}

        {/* 4th Pic Line */}
        {interactionData[3] && (
          <line
            x1="32%"
            y1="70%"
            x2="22%"
            y2="54%"
            stroke={(hoveredIndex === 3 || hoveredRowIndex === 3 || isCenterImageHovered) ? 'black' : 'gray'}
            strokeWidth={(hoveredIndex === 3 || hoveredRowIndex === 3 || isCenterImageHovered) ? 3 : 1}
          />
        )}

        {/* 5th Pic Line */}
        {interactionData[4] && (
          <line
            x1="20%"
            y1="81%"
            x2="20%"
            y2="56%"
            stroke={(hoveredIndex === 4 || hoveredRowIndex === 4 || isCenterImageHovered) ? 'black' : 'gray'}
            strokeWidth={(hoveredIndex === 4 || hoveredRowIndex === 4 || isCenterImageHovered) ? 3 : 1}
          />
        )}
      </svg>
    </div>
  );
};

export default InteractionChart;
