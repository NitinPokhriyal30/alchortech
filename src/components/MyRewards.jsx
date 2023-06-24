import React from 'react'
import AmazonLogo from '../assets/images/right-section/Amazon-Logo.png'
import Dunkin from '../assets/images/right-section/dunkin-logo.png'
import Starbucks from '../assets/images/right-section/starbucks-logo.png'
import RewardDialog from './RewardDialog'
import PopularCategories from './HomeRightSidebar/PopularCategories'
import { RedeemPointsWidget } from './HomeRightSidebar/RedeemPointsWidget'
import * as Dialog from '@radix-ui/react-dialog'

const MyRewards = () => {
  const recommendedCoupon = [
    {
      title: 'Amazon eGift Card',
      tagLine: 'INR 100 for 500 points',
      img: AmazonLogo,
      aboutLine:
        'Use your Amazon.in Gift Card to shop from a huge selection of Books, Electronics, Music, Movies, Software, Apparel, Toys, and more.',
    },
    {
      title: 'Dunkin Donuts eGift Card',
      tagLine: 'INR 75 for 500 points',
      img: Dunkin,
      aboutLine:
        'Use your Amazon.in Gift Card to shop from a huge selection of Books, Electronics, Music, Movies, Software, Apparel, Toys, and more.',
    },
    {
      title: 'Star Bucks eGift Card',
      tagLine: 'INR 75 for 500 points',
      img: Starbucks,
      aboutLine:
        'Use your Amazon.in Gift Card to shop from a huge selection of Books, Electronics, Music, Movies, Software, Apparel, Toys, and more.',
    },
  ]

  return (
    <>
      <div className="lg:pl-0 xxl:pt-3 xs:pt-0 pl-3 pr-3">
        <div className="mt-3">
          <div className="bg-primary text-white text-sm rounded-t-lg py-2 px-6">
            <p className="font-Lato ">Recommended For You</p>
          </div>
          <div className="py-4 px-6 bg-white rounded-b-lg drop-shadow-normal">
            <div className="grid grid-cols-3 xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 gap-4">
              {recommendedCoupon.map((coupon, index) => (
                <RewardCard key={index} coupon={coupon} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="bg-primary text-white text-sm rounded-t-lg py-2 px-6">
            <p className="font-Lato ">Apparel</p>
          </div>
          <div className="py-4 px-6 bg-white rounded-b-lg drop-shadow-normal">
            <div className="grid grid-cols-3 xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 gap-4">
              {recommendedCoupon.map((coupon, index) => (
                <RewardCard key={index} coupon={coupon} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="bg-primary text-white text-sm rounded-t-lg py-2 px-6">
            <p className="font-Lato ">Cash & Points Boots</p>
          </div>
          <div className="py-4 px-6 bg-white rounded-b-lg drop-shadow-normal">
            <div className="grid grid-cols-3 xxl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 gap-4">
              {recommendedCoupon.map((coupon, index) => (
                <RewardCard key={index} coupon={coupon} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right sidebar */}
      <div className="pt-3 pb-5 lg:pr-6 md:pr-3 md:pl-1 pr-3 pl-3 flex flex-col gap-3 overflow-y-auto xl:w-[325px] lg:w-[235px] md:w-[260px] w-full">
        <RedeemPointsWidget />
        <PopularCategories />
      </div>
    </>
  )
}

function RewardCard({ coupon }) {
  const { img, title, tagLine, onRedeem } = coupon
  return (
    <Dialog.Root>
      <div className="flex flex-col justify-between items-center border-[1px] border-[#EFEFEF] rounded-[4px] px-4 py-3">
        <div className="p-2 my-3 flex justify-center items-center">
          <img className="m-auto" src={img} alt="logo" />
        </div>

        <div className="text-center">
          <p className="text-[#7B7B7B] text-[13px] font-Lato">{title}</p>
          <p className="text-[#7B7B7B] text-[13px] font-Lato font-bold">{tagLine}</p>
          <div className="py-3">
            <Dialog.Trigger>
              <button className="rounded font-Lato text-[14px] border border-[#EFEFEF] px-4 text-primary bg-[#f7f7f7] hover:bg-translucent hover:border-translucent">
                Redeem
              </button>
            </Dialog.Trigger>
          </div>
        </div>
      </div>

      <RewardDialog coupon={{ img, title, tagLine, onRedeem }} />
    </Dialog.Root>
  )
}

export default MyRewards
