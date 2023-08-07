import * as React from 'react'

import FadeStar from '../../assets/svg/fade.svg'
import GreenStar from '../../assets/svg/green.svg'
import RedStar from '../../assets/svg/red.svg'
import User1 from '../../assets/images/user-profile/pp.png'
import { useQuery } from 'react-query'
import { api } from '@/api'
import { getAvatarAttributes, processAvatarUrl } from '@/utils'
import Loader from '../Loader'


export default function Top5UserWidget() {

  const top5 = useQuery("top5", () => api.topStars.all(), {
    initialData: [],
  });

  if (top5.isLoading) {
    return (
      <div className='flex justify-center' ref={infiniteLoaderDivRef} >
        <Loader />
      </div>
    )
  }

  return (
    <div>
      <div className="right-sidebar-container !pt-0 !pb-4">
        <div className="border-b border-[#EDEDED] py-[8.5px] px-3 mb-4">
          <p className="leading-[24px]  font-bold text-[#464646] text-center">
            Top High5 Stars
          </p>
        </div>

        {top5.data?.map((user, index) => (
          <>
            <div key={user.id}>
              <div className=" px-4">
                <div className="flex pb-2 gap-3 ml-1 justify-between items-center">
                  <div className="flex relative items-center gap-3">
                    <img
                      src={getAvatarAttributes(user.recipient, processAvatarUrl(user.avtar)).src}
                      alt={getAvatarAttributes(user.recipient, processAvatarUrl(user.avtar)).alt}
                      className="rounded-full w-12 h-12"
                      onError={(e) => {
                        // If the image fails to load, use the name initials instead
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.recipient.split(' ')[0].charAt(0) + user.recipient.split(' ')[1].charAt(0)
                        )}&color=${"#464646"}&background=${"FFFFFF"}`;
                      }}
                    />
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
                      <p className="text-[14px]  font-normal text-[#050505]">
                        {user.recipient}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[#464646] text-[12px]">{user.count}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  )
}
