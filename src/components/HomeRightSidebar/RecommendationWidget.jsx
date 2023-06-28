import * as React from 'react'
import { AiOutlineCaretDown } from 'react-icons/ai'
import AmazonLogo from '../../assets/images/right-section/Amazon-Logo.png'
import DunkinLogo from '../../assets/images/right-section/dunkin-logo.png'
import StarbucksLogo from '../../assets/images/right-section/starbucks-logo.png'
import { Link } from 'react-router-dom'

export default function RecommendationWidget() {
  const [recommendation, Recommendation] = React.useState([
    {
      imageUrl: AmazonLogo,
    },
    {
      imageUrl: DunkinLogo,
    },
    {
      imageUrl: StarbucksLogo,
    },
  ])

  return (
    <div>
      <div className="right-sidebar-container">
        <div className="border-b border-[#EDEDED] py-1 px-3">
          <p className="text-base font-Lato font-semibold text-[#464646] text-center ">
            Recommended for you
          </p>
        </div>
        <div>
          <div className="flex px-4 py-2 justify-between items-center">
            {recommendation.map(({ imageUrl }) => (
              <div key={imageUrl} className="border-r last:border-none border-[#EDEDED] py-4 px-2">
                <img src={imageUrl} alt="Amazon Logo" />
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Link
            to="/recommendation"
            className="text-base inline-flex justify-center items-center font-Lato text-primary font-bold"
          >
            View All
            <span>
              <AiOutlineCaretDown />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
