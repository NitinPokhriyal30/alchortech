import Cookies from 'js-cookie'
import * as React from 'react'
import { useQuery } from 'react-query'

export const RedeemPointsWidget = () => {
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))

  return (
    <div className="bg-[#E0EBFF] text-center px-5 pt-3 pb-1 rounded-[9px] drop-shadow-[0px_2px_3px_#00000029]">
      <p className="text-[20px] font-light text-center font-Lato leading-5 text-primary">
        You have <span className="font-black">{me.data.points_received} Points</span> to redeem
      </p>
      <span className="text-[12px] text-[#747474] font-Lato font-light">
        Don't worry, It never expires!
      </span>
    </div>
  )
}
