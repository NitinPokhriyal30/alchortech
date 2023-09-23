import * as React from 'react'
import { TbChartCircles } from 'react-icons/tb'
import { MdOutlineCake, MdOutlineCelebration } from 'react-icons/md'
import { useQuery } from 'react-query'
import { api } from '@/api'
import cake from '../../assets/svg/celibration-cake.svg';
import anniversary from '../../assets/svg/celibration-anniversary.svg';
import join from '../../assets/svg/celibration-join.svg';

const Icons = {
  cake: MdOutlineCake,
  celebration: MdOutlineCelebration,
  circles: TbChartCircles,
}

export default function CelebrationWidget() {
  const events = useQuery('events', () => api.todayEvents())

  console.log(events);

  const celebrations = [
    {
      id: Math.random().toString(),
      title: 'birthday',
      users: [
        { firstName: 'Classie' },
        { firstName: 'John' },
        { firstName: 'Alice' },
        { firstName: 'Bob' },
      ],
      icon: 'cake',
    },
    {
      id: Math.random().toString(),
      title: 'work anniversary',
      users: [{ firstName: 'Vikash' }, { firstName: 'Bob' }],
      icon: 'celebration',
    },
    {
      id: Math.random().toString(),
      title: 'join',
      users: [{ firstName: 'Jyoti' }, { firstName: 'Alice' }, { firstName: 'Bob' }],
      icon: 'circles',
    },
  ]

  const birthDays = events.data?.Birthday;
  const workAniversaries = events.data?.Anniversary;
  const joines = events.data?.Joined;

  if (birthDays?.length == 0 && workAniversaries?.length == 0 && joines?.length == 0) {
    return null
  }

  return (
    <div>
      <div className="right-sidebar-container !pt-0">
        <div className="border-b border-[#EDEDED] py-[8.5px] px-3">
          <p className="leading-[24px]  font-bold text-[#464646] text-center ">
            Celebrations
          </p>
        </div>
        <div>
          <div className=" px-4 pt-2 ">
            {events.isLoading ? (
              <div className="space-y-2">
                <p className="animate-pulse w-full bg-gray-300 rounded">&nbsp;</p>
                <p className="animate-pulse w-full bg-gray-300 rounded">&nbsp;</p>
                <p className="animate-pulse w-full bg-gray-300 rounded">&nbsp;</p>
              </div>
            ) : (
                <>
                  {birthDays && birthDays[0] ? <div className="flex items-center pb-2 gap-3">
                    <p className="text-primary">
                      {/* <MdOutlineCake fontSize={22} /> */}
                      <img src={cake} alt="cake" />
                    </p>
                    <p className="text-primary text-sm font-light pt-1">
                      <strong>{birthDays[0]}
                      <span>
                        {birthDays.length > 1
                          ? ' & ' + pluralize(birthDays.length - 1, 'other', 's') + ' '
                          : ' '}
                        </span>
                      </strong>
                      <span>birthday today</span>
                    </p>
                  </div> : ''}
                
                  {workAniversaries && workAniversaries[0] ? <div className="flex items-center pb-2 gap-3">
                    <p className="text-primary">
                      {/* <MdOutlineCelebration fontSize={22} /> */}
                      <img src={anniversary} alt="cake" />
                    </p>
                    <p className="text-primary text-sm  font-light">
                      <strong>{workAniversaries[0]}
                      <span>
                        {workAniversaries.length > 1
                          ? ` & ${pluralize(workAniversaries.length - 1, 'other', 's')} `
                          : ' '}
                        </span>
                      </strong>
                      <span>work anniversary is today</span>
                    </p>
                  </div> : ''}

                  {joines && joines[0] ? <div className="flex items-center pb-2 gap-3">
                    <p className="text-primary">
                      {/* <MdOutlineCelebration fontSize={22} /> */}
                      <img src={join} alt="cake" />
                    </p>
                    <p className="text-primary text-sm  font-light">
                      <strong>{joines[0]}
                        <span>
                          {joines.length > 1
                            ? ` & ${pluralize(joines.length - 1, 'other', 's')} `
                            : ' '}
                        </span>
                      </strong>
                      <span>joined the today</span>
                    </p>
                  </div> : ''}

                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function pluralize(count, noun, suffix) {
  return count + ' ' + noun + (count > 1 ? suffix : '')
}
