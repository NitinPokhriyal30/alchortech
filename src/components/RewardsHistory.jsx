import React from 'react';
import { HiDotsHorizontal } from "react-icons/hi";
import { BsSearch } from 'react-icons/bs'
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';


const RewardsHistory = () => {

  
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);

  const users = [
    {
      id: 'E1198',
      name: 'Flipkart',
      order_id: '7686153',
      product_id: '7686153',
      country: 'India',
      number_of_points: 100,
      redemption_date: '21-01-2023 12:08:01 Am'
    },
    {
        id: 'E1198',
        name: 'Amazon',
        order_id: '7686153',
        product_id: '7686153',
        country: 'India',
        number_of_points: 100,
        redemption_date: '21-01-2023 12:08:01 Am'
    }
  ]


  const handleEditClick = (index) => {
    setSelectedRowIndex(selectedRowIndex === index ? null : index);
  };

  return (
  <div>
    <div className="h-screen w-screen md:w-full">

   

      <div className="my-4 flex justify-between px-[25px]">
        <div className="font-Lato  text-[20px] font-bold text-[#464646]">Rewards History</div>
        <Link to={`/my-rewards`} className='text-primary flex items-center gap-1 text-[14px] font-semibold'>
            <span><IoIosArrowBack /></span>
            <span>Back</span>
       </Link>
      </div>


      <div className="mx-[25px]  mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
        <div className="py-4 px-6">
            <div className="w-[30%] flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <BsSearch />
                <input className="w-full ml-1.5 flex-1 border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit text-[12px] text-[#A5A5A5]"  placeholder="Search by Name or Category"  />
            </div>
        </div>
        <table className="w-full z-0  min-w-[550px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-12px bg-primary">
              <th></th>
              <th className="md:w-4/12 text-left py-[15.5px] font-Lato text-[12px] font-medium text-[#fff]">Product Name</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Order Id</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Product Id</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Country</th>
              <th className="md:w-2/12 py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">Numbers Of Points</th>
              <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">Redemption Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id} className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec]">
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px] border-b-0"></td>
                <td className="py-3 cursor-pointer text-left">
                    <span className='text-[16px] font-bold'>{user.name}</span>              
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user. order_id}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user. product_id}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                {user.country}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                  {user.number_of_points}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                  <span> {user.redemption_date}</span>
                </td>
                <td className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] pl-[20px] md:pl-[25px]"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
</div>

  )
}

export default RewardsHistory