import React from 'react'
import BatchImg from '../assets/images/post-img/green.svg'
import AchievementSvg from '../assets/images/post-img/achievement.png'
import achievementUser from '../assets/images/post-img/sunita.png'
import * as HoverCard from '@radix-ui/react-hover-card'
import HelpIcon from '@/assets/svg/home-sidebar/HelpIcon'

export const AchievementBanner = () => {
  return (
    <div className="relative my-3 rounded-lg bg-[#FFD398] px-8 py-8 drop-shadow-normal">
      <div className="flex w-full items-start justify-between">
        <HoverCard.Root>
          <HoverCard.Trigger className="absolute right-4 top-4 z-10 ml-2 inline-flex h-4 w-4 cursor-pointer items-center justify-center">
            <HelpIcon />
          </HoverCard.Trigger>

          <HoverCard.Portal>
            <HoverCard.Content className="z-20 w-screen max-w-[200px] rounded bg-white p-2 text-[12px] leading-[14px] text-[#747474] shadow">
              <HoverCard.Arrow className="fill-white" />
              Sunita Gulia is the top appreciation receiver for #quality for all of Alcor solutions,
              Inc in the 30 days prior to 2023.02.02
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>

        <div className="relative w-1/4">
          <img className="absolute xs:w-[35%] sm:w-[35%]" src={BatchImg} alt="batch" />
          <img
            className=" xs:w-[80%] sm:w-[80%] md:w-2/3 lg:w-2/3 xl:w-2/3 xxl:w-2/3 "
            src={achievementUser}
            alt="Achievement-User"
          />
        </div>
        <div className="w-full">
          <p className="font-Lato text-[29px] font-black text-[#456493] ">Sunita Gulia</p>
          <p className="mb-2 font-Lato text-[20px] font-bold leading-7 text-[#456493] xs:hidden sm:hidden md:block lg:block xl:block xxl:block">
            is now the Hotshot of <span>#quality</span> <br /> for all of Alcor Solutions, Inc!
          </p>
          <p className="mb-2 font-Lato text-[20px] font-bold leading-7 text-[#456493] xs:block sm:block md:hidden lg:hidden xl:hidden xxl:hidden">
            is now the Hotshot of <span>#quality</span> for all of Alcor Solutions, Inc!
          </p>
          <p className="font-Lato text-sm text-[#464646]">
            Previously held by <span className="font-black">Shraddha Rawat</span>{' '}
          </p>
        </div>
        <div className="mr-auto w-2/3 xs:hidden sm:hidden md:hidden lg:hidden xl:block xxl:block">
          <img className="w-full" src={AchievementSvg} alt="Achievement-svg" />
        </div>
      </div>
      <div></div>
    </div>
  )
}
