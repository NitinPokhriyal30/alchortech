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
      {/* rewards (center slot) */}
      <div className="pl-3 pr-3 lg:pl-0">
        <div className="mt-3">
          <div className="rounded-t-lg bg-primary px-6 py-2 text-sm text-white">
            <p className=" ">Recommended For You</p>
          </div>
          <div className="rounded-b-lg bg-white px-6 py-4 drop-shadow-normal">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(227px,1fr))]">
              {recommendedCoupon.map((coupon, index) => (
                <RewardCard key={index} coupon={coupon} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="rounded-t-lg bg-primary px-6 py-2 text-sm text-white">
            <p className=" ">Apparel</p>
          </div>
          <div className="rounded-b-lg bg-white px-6 py-4 drop-shadow-normal">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(227px,1fr))]">
              {recommendedCoupon.map((coupon, index) => (
                <RewardCard key={index} coupon={coupon} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="rounded-t-lg bg-primary px-6 py-2 text-sm text-white">
            <p className=" ">Cash & Points Boots</p>
          </div>
          <div className="rounded-b-lg bg-white px-6 py-4 drop-shadow-normal">
            <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(227px,1fr))]">
              {recommendedCoupon.map((coupon, index) => (
                <RewardCard key={index} coupon={coupon} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right sidebar */}
      <div className="flex w-full flex-col gap-3 overflow-y-auto pb-5 pl-3 pt-3 md:pl-1 lg:max-w-[250px] xl:max-w-[319px]">
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
      <div className="flex flex-col items-center justify-between rounded-[4px] border-[1px] border-[#EFEFEF] px-4 py-3">
        <div className="my-3 flex items-center justify-center p-2">
          <img className="m-auto" src={img} alt="logo" />
        </div>

        <div className="text-center">
          <p className=" text-[13px] text-[#7B7B7B]">{title}</p>
          <p className=" text-[13px] font-bold text-[#7B7B7B]">{tagLine}</p>
          <div className="py-3">
            <Dialog.Trigger>
              <button className="rounded border border-[#EFEFEF] bg-[#f7f7f7] px-4  text-[14px] text-primary hover:border-translucent hover:bg-translucent">
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
