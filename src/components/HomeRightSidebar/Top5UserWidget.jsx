import * as React from 'react'

import FadeStar from '../../assets/svg/fade.svg'
import GreenStar from '../../assets/svg/green.svg'
import RedStar from '../../assets/svg/red.svg'
import User1 from '../../assets/images/user-profile/pp.png'

export default function Top5UserWidget({ ...props }) {
  const [topUsers, setTopUsers] = React.useState(() => [
    {
      id: Math.random().toString(),
      image: User1,
      fullName: 'Sunita Gulia',
      stars: 21,
    },
    {
      id: Math.random().toString(),
      image: User1,
      fullName: 'John Doe',
      stars: 19,
    },
    {
      id: Math.random().toString(),
      image: User1,
      fullName: 'Alexa',
      stars: 18,
    },
    {
      id: Math.random().toString(),
      image: User1,
      fullName: 'Alice',
      stars: 15,
    },
    {
      id: Math.random().toString(),
      image: User1,
      fullName: 'Bob',
      stars: 14,
    },
  ])

  return (
    <div>
      <div className="right-sidebar-container !pt-0 !pb-4">
        <div className="border-b border-[#EDEDED] py-[8.5px] px-3 mb-4">
          <p className="leading-[24px] font-Lato font-bold text-[#464646] text-center">
            Top High5 Stars
          </p>
        </div>

        {topUsers.map((user, index) => (
          <div key={user.id}>
            <div className=" px-4">
              <div className="flex pb-2 gap-3 ml-1 justify-between items-center">
                <div className="flex relative items-center gap-3">
                  <img src={user.image} className="rounded-full w-12 h-12" alt="user1" />
                  {index <= 2 && (
                    <img
                      src={
                        index === 0
                          ? GreenStar
                          : index === 1
                            ? FadeStar
                            : index === 2
                              ? RedStar
                              : null
                      }
                      alt="Green Star"
                      className="absolute top-0 left-[-8px]"
                    />
                  )}
                  <div>
                    <p className="text-[14px] font-Lato font-normal text-[#050505]">
                      {user.fullName}
                    </p>
                  </div>
                </div>

                <div>
                  <span className="text-[#464646] text-[12px]">{user.stars}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
