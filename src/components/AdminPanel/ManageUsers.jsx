import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiDotsHorizontal } from "react-icons/hi";
import userPic from '../../assets/images/user-profile/male_avatar.jpg'
import { BsSearch } from 'react-icons/bs'
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from 'react-router-dom';
import UserDetailsPopUp from './UserDetailsPopUp.jsx'
import BulkUploadPopUp from './BulkUploadPopUp.jsx';
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import goBack from '../../assets/images/admin/chevron-left.svg';
import goNext from '../../assets/images/admin/chevron-right.svg';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';


const ManageUsers = () => {

  const [isAddUser, setIsAddUser] = React.useState(false);
  const [showAddManuallyPopup, setShowAddManuallyPopup] = React.useState(false);
  const [showBulkUploadPopup, setShowBulkUploadPopup] = React.useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [tab, setTab] = React.useState('active');
  const [isEditPopup, setIsEditPopup] = React.useState(false);
  const [id, setId] = React.useState(null);

  const handleEditClick = (index, userId) => {
    setSelectedRowIndex(selectedRowIndex === index ? null : index);
    setId(userId);
    console.log(id);
  };

  const handleAddManuallyClick = () => {
    setIsEditPopup(false);
    setShowAddManuallyPopup(true);
  };

  const { data: users, isLoading, isError } = useQuery(
    ['all'], 
    () => api.adminUsers.all()
  );

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isError) {
    return <div>Error loading campaigns</div>;
  }

  const depart = 'Product Development';
  const loc = 'San Diego';

  return (
  <div>
    <div className="md:w-full">

   

      <div className="mt-4 flex justify-between px-[25px]">
        <div className="font-Lato  text-[20px] font-bold text-[#464646]">Manage Users</div>
        <div className="relative">
          <button onClick={() => setIsAddUser(!isAddUser)} className="flex items-center px-5 py-1 gap-1 rounded-md bg-[#5486E3]  font-Lato text-white">
            <span>{<AiOutlinePlus />}</span>
            Add Users
          </button>
          {isAddUser && 
            <div className='absolute z-10 drop-shadow-md cursor-pointer w-[132px] flex flex-col bg-[#fff] rounded-md top-full'>
              <span onClick={handleAddManuallyClick} className='w-full text-center border-b-[1px] py-2 text-[14px] text-[#747474]'>Add Manually</span>
              <span onClick={() => setShowBulkUploadPopup(true)} className='w-full text-center py-2 text-[14px] text-[#747474]'>Bulk Upload</span>
            </div>
          }
        </div>
      </div>

      <div className="mt-4 z-0 flex flex-col md:flex-row flex-wrap gap-y-4 px-[25px] md:justify-start">
        <div className="flex flex-1 justify-around md:justify-start md:gap-6">
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'active' && '!border-primary  text-primary')} onClick={() => setTab('active')}>
            Active
          </button>
          <button className={'flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] ' + (tab === 'inactive' && '!border-primary  text-primary')} onClick={() => setTab('inactive')}>
            Inactive
          </button>
        </div>
      </div>

      <div className="mb-1 px-[25px]">
        <div className="h-[1px] w-full bg-[#cecece]"></div>
      </div>

      <div className="mx-[25px]  mt-2 mb-20 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
        <div className="py-6 px-4">
        <div className=" bg-[#F7F7F7] p-2 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-6">
          <div className="w-full col-span-2 flex  bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <BsSearch />
            <input className="ml-1.5 w-full  border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit text-[12px] text-[#A5A5A5]"  placeholder="Search Users by Name or Email"  />
          </div>

          <div className="bg-[#fff] col-span-1 items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select className="w-full flex justify-between text-[12px] border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" >
                <option value="">Department</option>
                  <option value={depart} key={depart}>
                    {depart}
                  </option>
            </select>
          </div>

          <div className="z-0 bg-[#fff] col-span-1 items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select className="w-full flex justify-between text-[12px] border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit">
                <option value="">Location</option>
                
                  <option value={loc} key={loc}>
                    {loc}
                  </option>
            </select>
          </div>

          <div className="bg-[#fff] col-span-1 items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
          <select className="w-full flex justify-between text-[12px] border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" >
              <option value="">Designation</option>
                <option value={depart} key={depart}>
                  {depart}
                </option>
          </select>

          
          </div>
          <div className="flex justify-end items-center rounded  px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline"> 
            <span className="ml-1.5 cursor-pointer border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit text-[15px] text-primary" >Clear</span>
          </div>
        </div>
        </div>
        <table className="w-full z-0  min-w-[550px] whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#cecece] child:!py-[15.5px] child:!text-12px bg-primary">
              <th className=" py-[15.5px] text-left pl-8  font-Lato text-12px font-medium text-[#fff] md:pl-[45px]"></th>
              <th className="md:w-1/12 py-[15.5px] text-left  font-Lato text-12px font-medium text-[#fff] sm:pl-[45px] md:pl-0"></th>
              <th className="md:w-3/12 text-left py-[15.5px] font-Lato text-12px font-medium text-[#fff]">Name</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Department</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Employment Type</th>
              <th className="md:w-2/12 text-left py-4 font-Lato text-[12px] font-medium text-[#fff]">Location</th>
              <th className="md:w-2/12 py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">Designation</th>
              <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] pl-[20px] md:pl-[45px]"></th>
              <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] pl-[20px] md:pl-[45px]"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="group rounded-xl border-b border-[#cecece] hover:bg-[#ececec]"
              >
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[45px] border-b-0"></td>
                <td className="py-3 text-[16px] font-semibold text-[#5486E3] sm:pl-[45px] md:pl-0">
                  <Link to={`/admin/users/details/settings?userId=${user.id}`}>
                  <img className="w-[50px] rounded-full h-[50px] object-cover"
                  src={getAvatarAttributes(`${user?.full_name.split(' ')[0]} ${user?.full_name.split(' ')[1]}`, processAvatarUrl(user?.avtar)).src}
                  alt={getAvatarAttributes(`${user?.full_name.split(' ')[0]} ${user?.full_name.split(' ')[1]}`, processAvatarUrl(user?.avtar)).alt}
                  onError={(e) => {
                    // If the image fails to load, use the full_name initials instead
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user?.full_name.split(' ')[0].charAt(0) + user?.full_name.split(' ')[1].charAt(0)
                    )}&color=${"#464646"}&background=${"FFFFFF"}`;
                  }}
                />
                  </Link>
                </td>
                <td 
                  
                  className="py-3 cursor-pointer text-left    "
                >
                  <Link to={`/admin/users/details/settings?userId=${user.id}`}>
                    <div  className='flex flex-col items-start'>
                      <span className='text-[14px] '>{user.employee_id}</span>
                      <span className='text-[14px] '>{user.full_name}</span>
                      <span className='text-primary text-[14px] font-semibold'>{user.email}</span>
                    </div>
                  </Link>
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                  {user.department}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                  {user.employment_type}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                  {user.location}
                </td>
                <td className="py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                  {user.title}
                </td>
                <td className="py-3 text-left ">
                {
                  <div className='relative'>
                    <HiDotsHorizontal
                      onClick={() => handleEditClick(index, user.id)}
                      className="cursor-pointer hover:text-primary h-6 w-6"
                    />
                    {selectedRowIndex === index && (
                      <div className='absolute z-10 drop-shadow-lg cursor-pointer w-[70px] bg-[#fff] rounded-sm py-1 text-center right-5'>
                        <span onClick={() => setIsEditPopup(true)}  className='text-primary'>Edit</span>
                      </div>
                    )}
                  </div>
                }
                </td>
                <td className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] pl-[20px] md:pl-[45px] "></td>
              
              </tr>
            ))}
          </tbody>
        </table>

        <div className='w-full py-6 px-14 flex items-center gap-10 justify-end font-semibold text-[12px] text-[#747474]'>
          <div className=''>
            <span>Rows per Page: </span>
            <span>7</span>
          </div>
          <div>
            <span>1-10 of 276</span>
          </div>
          <div className='flex'>
            <span className='cursor-pointer'><img  src={goBack}/></span>
            <span className='cursor-pointer'><img src={goNext}/></span>
          </div>
        </div>

      </div>


      {isEditPopup && (
        <UserDetailsPopUp setIsEditPopup={setIsEditPopup} userId={id}/>
      )}

      {showAddManuallyPopup && (
        <UserDetailsPopUp setShowAddManuallyPopup={setShowAddManuallyPopup}/>
      )}

      {showBulkUploadPopup && (
        <BulkUploadPopUp setShowBulkUploadPopup={setShowBulkUploadPopup}/>
      )}

    </div>
</div>

  )
}

export default ManageUsers