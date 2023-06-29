import * as React from 'react'
import { TbChartCircles } from 'react-icons/tb'
import { MdOutlineCake, MdOutlineCelebration } from 'react-icons/md'
import { useQuery } from 'react-query'
import { api } from '@/api'
import { getTodayDate } from '@/utils'

const Icons = {
  cake: MdOutlineCake,
  celebration: MdOutlineCelebration,
  circles: TbChartCircles,
}

export default function CelebrationWidget() {
  const events = useQuery('events', () => api.todayEvents())

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

  const birthDays = events.data?.filter((user) => getTodayDate() == user.birth_date)
  const workAniversaries = events.data?.filter((user) => getTodayDate() == user.hire_date)

  if (birthDays?.length == 0 && workAniversaries?.length == 0) {
    return null
  }

  return (
    <div>
      <div className="right-sidebar-container">
        <div className="border-b border-[#EDEDED] py-1 px-3">
          <p className="text-[16px] font-Lato font-semibold text-[#464646] text-center ">
            Celebration
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
                <div className="flex pb-2 gap-3">
                  <p className="text-primary">
                    <MdOutlineCake />
                  </p>
                  <p className="text-primary text-sm font-Lato font-light">
                    <strong>{birthDays[0].first_name}</strong>
                    <span>
                      {birthDays.length > 1
                        ? ' & ' + pluralize(birthDays.length - 1, 'other', 's') + ' '
                        : ' '}
                    </span>
                    <span>has birth day today</span>
                  </p>
                </div>

                <div className="flex pb-2 gap-3">
                  <p className="text-primary">
                    <MdOutlineCelebration />
                  </p>
                  <p className="text-primary text-sm font-Lato font-light">
                    <strong>{workAniversaries[0].first_name}</strong>
                    <span>
                      {workAniversaries.length > 1
                        ? ` & ${pluralize(workAniversaries.length - 1, 'other', 's')} `
                        : ' '}
                    </span>
                    <span>has work anniversary today</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function pluralize(count, noun, suffix) {
  return count + ' ' + noun + (count > 1 ? suffix : '')
}
