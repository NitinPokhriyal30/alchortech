import * as React from 'react'
import { TbChartCircles } from 'react-icons/tb'
import { MdOutlineCake, MdOutlineCelebration } from 'react-icons/md'

const Icons = {
  cake: MdOutlineCake,
  celebration: MdOutlineCelebration,
  circles: TbChartCircles,
}

export default function CelebrationWidget() {
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

  return (
    <div>
      <div className="right-sidebar-container">
        <div className="border-b border-[#EDEDED] py-1 px-3">
          <p className="text-[16px] font-Lato font-medium text-[#747474] text-center ">
            Celebration
          </p>
        </div>
        <div>
          <div className=" px-4 pt-2 ">
            {celebrations.map((event) => {
              const EventIcon = Icons[event.icon]
              const [user, ...others] = event.users

              return (
                <div key={event.id} className="flex pb-2 gap-3">
                  <p className="text-primary">
                    <EventIcon />
                  </p>
                  <span className="text-primary text-sm font-Lato font-light">
                    <strong>
                      {user.firstName}{' '}
                      {others.length > 0
                        ? '& ' + others.length + ' other' + (others.length > 1 ? 's' : '')
                        : null}
                    </strong>{' '}
                    {event.title} today
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
