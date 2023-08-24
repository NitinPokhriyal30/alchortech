import React from 'react';
import MyPic from '../assets/images/user-profile/my.jpg'

const OrganizationChart = () => {
  // Sample data
  const images = [
    MyPic,
    'path/to/image2.jpg',
    'path/to/image3.jpg',
    'path/to/image4.jpg',
    'path/to/image5.jpg',
    'path/to/image6.jpg',
  ];

  return (
    <svg width="400" height="400" viewBox="0 0 400 400">
      {/* Center Image */}
      <image x="150" y="150" width="100" height="100" xlinkHref={images[0]} />

      {/* Other Images */}
      {images.slice(1)?.map((image, index) => {
        const angle = (index * 2 * Math.PI) / 5;
        const cx = 200 + 100 * Math.cos(angle) - 25;
        const cy = 200 + 100 * Math.sin(angle) - 25;

        return (
          <g key={index + 1}>
            <line x1="200" y1="200" x2={cx + 25} y2={cy + 25} stroke="black" />
            <image x={cx} y={cy} width="50" height="50" xlinkHref={image} />
          </g>
        );
      })}
    </svg>
  );
};

export default OrganizationChart;
