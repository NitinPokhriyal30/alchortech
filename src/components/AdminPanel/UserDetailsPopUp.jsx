import React, {useEffect} from 'react';
import { IoMdClose } from "react-icons/io";
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import { getAvatarAttributes, processAvatarUrl } from '@/utils';


const UserDetailsPopUp = ({setShowAddManuallyPopup,setIsEditPopup ,userId}) => {

 const [userData, setUserData] = React.useState(null);

 const { data: user, isLoading, isError } = useQuery(
  ['user', userId],
  () => api.adminUsers.userDetails({ userId }),
  {
    enabled: !!userId,
  }
);

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isError) {
    return <div>Error loading campaigns</div>;
  }

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const handleClosePopup = () => {
    if(!userId) {
      setShowAddManuallyPopup(false)
    } else {
      setIsEditPopup(false)
    }
  }


  return (
    <div className="bg-black bg-opacity-20 fixed z-50 inset-0">
        <div className="fixed z-[99] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white shadow border border-[#efefef] rounded-md px-20 py-10 relative w-screen md:max-w-[42rem] max-w-xs">
           <div className="p-2 cursor-pointer absolute right-0 top-0 rounded-sm hover:bg-translucent hover:text-primary block w-fit ml-auto">
            <span onClick={() => handleClosePopup()}><IoMdClose /></span>
           </div>
          
           <div><span className='text-[20px] font-bold'>Add User</span></div>

           <div className='flex flex-col mt-10'>

            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>User Name</label>
                <input
                  value={userData?.full_name || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Email Id</label>
                <input
                   value={userData?.email || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Employee Id</label>
                <input
                value={userData?.employee_id || ''}
                className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Gender</label>
                <input
                  value={userData?.gender || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Date of Birth</label>
                <input
                  value={userData?.birth_date || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Date of Joininig</label>
                <input
                  value={userData?.hire_date || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Mobile No.</label>
                <input
                  value={userData?.phone_number || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Department</label>
                <input
                  value={userData?.department || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Employee Type</label>
                <input
                  value={userData?.employment_type || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Designation</label>
                <input
                  value={userData?.title || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Reports To</label>
                <input
                  value={userData?.manager || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Location</label>
                <input
                  value={userData?.location || ''}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
           
           </div>

           <div className='mt-6 mb-6'>
              <button className='text-[#fff] text-[14px] bg-primary rounded-md px-8 py-1'>Submit</button>
           </div>

          </div>
        
        </div>
    </div>
  )
}

export default UserDetailsPopUp