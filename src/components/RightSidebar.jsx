import * as React from 'react'

const RightSidebar = () => {
  const [user, setUser] = React.useState({
    points: 390,
  })

  return (
    <div className="pt-4 pr-4">
      <div className="flex flex-col gap-3 pb-5 px-1 overflow-y-auto w-[250px] md:w-[350px] xl:w-[320px] ">
        <div>
          <div className="bg-[#E0EBFF] text-center px-5 pt-3 pb-1 rounded-[9px] drop-shadow-[0px_2px_3px_#00000029]">
            <p className="text-[20px] font-light text-center  leading-5 text-primary">
              You have <span className="font-black">{user.points} Points</span> to redeem
            </p>
            <span className="text-xs text-[#747474]  font-light">
              Don't worry, It never expires!
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidebar
