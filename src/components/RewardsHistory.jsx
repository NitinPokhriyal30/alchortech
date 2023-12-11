import React from 'react';
import { BsSearch } from 'react-icons/bs'
import { IoIosArrowBack, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import { api } from '../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'


const RewardsHistory = () => {

  const [searchQuery, setSearchQuery] = React.useState('');
  const [expandedRow, setExpandedRow] = React.useState(null);
  
  const { data: rewardsHistory, isLoading, isError } = useQuery(
    ['rewardsHistory'], 
    () => api.rewards.rewardsHistory()
  );

    if (isLoading) {
      return <div><Loader /></div>;
    }
  
    if (isError) {
      return <div>Error loading Rewards</div>;
    }

    const filteredRewards = rewardsHistory.filter((reward) =>
    reward.voucher_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function formatRedeemDate(redeemDate) {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };
  
    const date = new Date(redeemDate);
  
    const formattedDate = `${date.toLocaleDateString('en-US', options).replace(',', '')}`;
  
    return formattedDate;
  }
  

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };


  return (
  <div>
    <div className="md:w-full mb-6">

      <div className="my-4 flex justify-between px-[25px]">
        <div className="font-Lato  text-[20px] font-bold text-[#464646]">Rewards History</div>
        <Link to={`/my-rewards`} className='text-primary flex items-center gap-1 text-[14px] font-semibold'>
            <span><IoIosArrowBack /></span>
            <span>Back</span>
       </Link>
      </div>

      {
        rewardsHistory.length > 0 ? 
        <div className="mx-[25px]  mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
        <div className="py-4 px-6">
            <div className="w-[30%] flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <BsSearch />
                <input 
                className="w-full ml-1.5 flex-1 border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit text-[12px] text-[#A5A5A5]"  
                placeholder="Search by Product Name" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                 />
            </div>
        </div>
        <table className="w-full z-0  min-w-[550px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-12px bg-primary">
              <th className='w-[2%]'></th>
              <th className="md:w-4/12 text-left py-[15.5px] font-Lato text-[12px] font-medium text-[#fff]">Product Name</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Email</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Contact</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Requested Date</th>
              <th className="md:w-2/12 py-4 text-center font-Lato text-[12px] font-medium text-[#fff]">Quantity</th>
              <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">Status</th>
              <th></th>
              <th className='w-[2%]'></th>
            </tr>
          </thead>
          <tbody>
            {filteredRewards.map((reward, index) => (
              <React.Fragment>
              <tr onClick={() => toggleRow(index)} key={reward.id} className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec]">
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px] border-b-0"></td>
                <td className="py-3 cursor-pointer text-left">
                    <span className='text-[16px] font-bold'>{reward.voucher_name}</span>              
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {reward. email}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {reward. contact}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {formatRedeemDate(reward.created)}
                </td>
                <td className="py-3 text-center font-Lato text-[12px] font-normal text-[#292929]">
                  {reward.quantity}
                </td>
                <td className={reward.status === 'pending' ? "py-3 text-left font-Lato text-[12px] font-normal text-[#E89019]" : "py-3 text-left font-Lato text-[12px] font-normal text-[#00BC9F]"}>
                  <span>{reward.status}</span>
                </td>
                <td className="border-b py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]">
                {expandedRow === index ? (
                  <IoIosArrowUp />
                ) : (
                  <IoIosArrowDown />
                )}
              </td>
                <td className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] pl-[20px] md:pl-[25px]"></td> 
              </tr>
              {(expandedRow === index && reward.status != 'pending') && (
                <tr className="expanded-row">
                  <td colSpan="10">
                    <div className="border-b border-[#cecece] drop-shadow-lg px-4 pb-4">
                      <div className="rounded-md bg-[#EDEDED] p-4">
                        <span className="text-[14px] text-[#747474]">
                          <p >Product Details</p>
                        </span>
                        <div className="flex flex-wrap gap-2 w-full pb-4 items-center">
                          <div className="w-[20%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Product Name
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                              {reward.redeemed_reward.product_name}
                            </span>
                          </div>
                          <div className="w-[20%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Product ID
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                              {reward.redeemed_reward.product_id}
                            </span>
                          </div>
                          <div className="w-[20%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Order Id
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                            {reward.redeemed_reward.order_id}
                            </span>
                          </div>
                          <div className="w-[30%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Points Used
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                            {reward.redeemed_reward.points_used}
                            </span>
                          </div>
                        </div>


                        <span className="text-[14px] text-[#747474]">
                          <p>Voucher Details</p>
                        </span>

                        <div className="flex gap-2 flex-wrap pb-4 items-center">
                          <div className="w-[30%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Currency
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                              {reward.redeemed_reward.currency}
                            </span>
                          </div>
                          <div className="w-[20%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Amount
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                              {reward.redeemed_reward.amount}
                            </span>
                          </div>

                          <div className="w-[20%]">
                            <p className="text-[13px] text-[#ACACAC]">
                              Pin
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                             {reward.redeemed_reward.pin}
                            </span>
                          </div>

                          <div className='w-[20%]'>
                            <p className="text-[13px] text-[#ACACAC]">
                             Validity
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                            {reward.redeemed_reward.amount}
                            </span>
                          </div>

                          <div>
                            <p className="text-[13px] text-[#ACACAC]">
                              Voucher Code
                            </p>
                            <span className="font-sans text-[16px] text-[#464646]">
                            {reward.redeemed_reward.voucher_code}
                            </span>
                          </div>

                          
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
              
            ))}
          </tbody>
        </table>
      </div> :
      <div className='w-full flex bg-white py-4 rounded-md drop-shadow-md justify-center'>
        <span className='font-bold text-center text-red-500'>You haven't claimed any voucher!</span>
      </div>
      }

    </div>
</div>

  )
}

export default RewardsHistory