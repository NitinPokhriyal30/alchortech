import React, { useEffect } from 'react'
import Cookies from 'js-cookie'
import { api } from '@/api'; // Import your API methods
import { useQuery } from 'react-query'
import Loader from '../Loader';
import Spinner from '../Spinner';
import { RiLoader2Line } from 'react-icons/ri';

export const RedeemPointsWidget = () => {

  const { data: userPoints, isError, isLoading } = useQuery('currentUserPoints', async () => {
    try {
      const { points_available, points_received, points_redeemed } = await api.auth.currentUser();
      return {
        points_available,
        points_received,
        points_redeemed
      };
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  });

  if (isLoading) {
    return (
      <div className="bg-[#E0EBFF] text-center px-5 pt-3 pb-1 rounded-[9px] drop-shadow-[0px_2px_3px_#00000029]">
        <div className='flex justify-center' >
          <Loader />
        </div>
      </div>
    )
  }

  if (isError) {
    return <div>Error fetching data.</div>;
  }

  return (
    <div className="bg-[#E0EBFF] text-center px-5 pt-3 pb-1 rounded-[9px] drop-shadow-[0px_2px_3px_#00000029]">
      <p className="text-[20px] font-light text-center  leading-5 text-primary">
        You have <span className="font-black">{userPoints.points_received} Points</span> to redeem
      </p>
      <span className="text-[12px] text-[#747474]  font-light">
        Don't worry, It never expires!
      </span>
    </div>
  )
}