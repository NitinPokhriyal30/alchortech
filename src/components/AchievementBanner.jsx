import React from 'react'
import BatchImg from "../assets/images/post-img/green.svg"
import AchievementSvg from "../assets/images/post-img/achievement.png"
import achievementUser from "../assets/images/post-img/sunita.png"

export const AchievementBanner = () => {
    return (
        <div className="bg-[#FFD398] drop-shadow-normal relative rounded-lg px-8 py-8 my-3">
            <div className="flex w-full items-start justify-between">
                <div className="w-1/4 relative">
                    <img className="absolute sm:w-[35%] xs:w-[35%]" src={BatchImg} alt="batch" />
                    <img className=" xxl:w-2/3 xl:w-2/3 lg:w-2/3 md:w-2/3 sm:w-[80%] xs:w-[80%] " src={achievementUser} alt="Achievement-User" />
                </div>
                <div className="w-full">
                    <p className="text-[29px] font-black text-[#456493] font-Lato ">Sunita Gulia</p>
                    <p className="text-[#456493] font-Lato font-bold text-[20px] leading-7 mb-2 xxl:block xl:block lg:block md:block sm:hidden xs:hidden">is now the Hotshot of <span>#quality</span> <br /> for all of Alcor Solutions, Inc!</p>
                    <p className="text-[#456493] font-Lato font-bold text-[20px] leading-7 mb-2 xxl:hidden xl:hidden lg:hidden md:hidden sm:block xs:block">is now the Hotshot of <span>#quality</span>  for all of Alcor Solutions, Inc!</p>
                    <p className="text-[#464646] font-Lato text-sm">Previously held by <span className="font-black">Shraddha Rawat</span> </p>
                </div>
                <div className="w-2/3 mr-auto xxl:block xl:block lg:hidden md:hidden sm:hidden xs:hidden">

                    <img className="w-full" src={AchievementSvg} alt="Achievement-svg" />
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}
