import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '@/constant';
import { processAvatarUrl } from '@/utils';

const InteractionChart = ({ interactionData, myAvatar }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="interaction-chart-container">
      <div className="flex justify-between mx-8 py-8">
        {interactionData[0] && (
          <div className="z-10">
            <img
              className="rounded-full h-12 w-12"
              src={processAvatarUrl(interactionData[0]?.avtar)}
            />
          </div>
        )}
        {interactionData[1] && (
          <div className="z-10">
            <img
              className="rounded-full h-12 w-12"
              src={processAvatarUrl(interactionData[1]?.avtar)}
            />
          </div>
        )}
      </div>
      <div
        className="flex justify-center relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img
          className={`rounded-full h-14 w-14 border-2  ${
            isHovered ? 'border-black' : 'hover:border-black'
          } z-10`}
          src={processAvatarUrl(myAvatar)}
        />
      </div>
      <div className="flex justify-between mx-6 pt-8 z-10">
        {interactionData[2] && (
          <div>
            <img
              className="rounded-full h-12 w-12"
              src={processAvatarUrl(interactionData[2]?.avtar)}
            />
          </div>
        )}
        {interactionData[3] && (
          <div className="z-10">
            <img
              className="rounded-full h-12 w-12"
              src={processAvatarUrl(interactionData[3]?.avtar)}
            />
          </div>
        )}
      </div>
      {interactionData[4] && (
        <div className="flex justify-center py-2 z-10">
          <img
            className="rounded-full h-12 w-12"
            src={processAvatarUrl(interactionData[4]?.avtar)}
          />
        </div>
      )}

      <svg className="absolute top-0 left-0 h-full w-full">
         {/* 1 Pic Line */}
         {interactionData[0] && (
          <line
            x1="9%"
            y1="30%"
            x2="18%"
            y2="46%"
            stroke="gray"
            strokeWidth={isHovered ? 3 : 1}
          />
        )}

        {/* 2 Pic Line */}
        {interactionData[1] && (
          <line
            x1="31%"
            y1="30%"
            x2="22%"
            y2="46%"
            stroke="gray"
            strokeWidth={isHovered ? 3 : 1}
          />
        )}

        {/* 3 Pic Line */}
        {interactionData[2] && (
          <line
            x1="9%"
            y1="70%"
            x2="18%"
            y2="54%"
            stroke="gray"
            strokeWidth={isHovered ? 3 : 1}
          />
        )}

        {/* 4 Pic Line */}
        {interactionData[3] && (
          <line
            x1="31%"
            y1="70%"
            x2="22%"
            y2="54%"
            stroke="gray"
            strokeWidth={isHovered ? 3 : 1}
          />
        )}

        {/* 5 Pic Line */}
        {interactionData[4] && (
          <line
            x1="20%"
            y1="80%"
            x2="20%"
            y2="50%"
            stroke="gray"
            strokeWidth={isHovered ? 3 : 1}
          />
        )}
      </svg>
    </div>
  );
};

export default InteractionChart;
