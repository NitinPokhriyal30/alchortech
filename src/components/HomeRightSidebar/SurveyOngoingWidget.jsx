import * as React from 'react'
import { dateDiff } from '../../utils'
import { Link } from 'react-router-dom'

export default function SurveyOngoingWidget({ ...props }) {
  const [survey, setsurvey] = React.useState([
    {
      id: Math.random().toString(),
      title: 'Survey Title goes here',
      endDate: '05/15/2023',
      reward: 20,
    },
    {
      id: Math.random().toString(),
      title: 'Web fronted framework Survey',
      endDate: '05/17/2023',
      reward: 15,
    },
    {
      id: Math.random().toString(),
      title: 'Cafeteria & Food Survey',
      endDate: '05/19/2023',
      reward: 25,
    },
  ])

  return (
    <div className="right-sidebar-container !pt-0">
      <div className="border-b border-[#EDEDED] py-[8.5px]  px-3">
        <p className="leading-[24px] font-Lato font-bold text-[#464646] text-center ">
          Ongoing Survey
        </p>
        <span className="mt-[2.25px] text-[12px] leading-[15px] font-Lato font-normal text-[#A7A7A7] flex justify-center">
          Take surveys and get High5 points
        </span>
      </div>

      <div className=" px-4 pt-2 ">
        {survey.map((survey) => (
          <div key={survey.id} className="flex items-top pb-2 justify-between">
            <div>
              <p className="text-[14px] text-[#5486E3] font-Lato font-normal">{survey.title}</p>
              <span className="text-[14px] text-[#9F9F9F] font-Lato font-light">
                {dateDiff(new Date(survey.endDate), new Date())} days left |{' '}
                <strong>{survey.reward} Points</strong>
              </span>
            </div>

            <div>
              <Link
                to={`/take-survey/${survey.id}`}
                className="text-[14px] text-[#5486E3] font-Lato font-normal border-b border-[#5486E3]"
              >
                Take Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
