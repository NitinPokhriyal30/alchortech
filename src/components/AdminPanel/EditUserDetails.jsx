import React from 'react';
import {Link} from 'react-router-dom';
import userPic from '../../assets/images/user-profile/male_avatar.jpg'
import { IoIosCloseCircle, IoIosArrowBack } from "react-icons/io";
import { IoChevronForwardCircleOutline } from "react-icons/io5";
import { useLocation } from 'react-router-dom';
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import { getAvatarAttributes, processAvatarUrl } from '@/utils';

const EditUserDetails = () => {

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('userId');
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const handleDeactivate = () => {
    setShowConfirmation(true);
  };

  const confirmDeactivate = async() => {
    try {
      const formData = new FormData();
      formData.append('userId', userId);
  
      const response = await api.adminUsers.deactivate(formData);
      toast.success('User Deactivated!');
    } catch (error) {
      console.error('Error deactivating user:', error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelDeactivate = () => {
    setShowConfirmation(false);
  };

  const { data: user, isLoading, isError } = useQuery(
    ['user', userId], 
    () => api.adminUsers.userDetails({userId})
  );

    if (isLoading) {
      return <div><Loader /></div>;
    }
  
    if (isError) {
      return <div>Error loading campaigns</div>;
    }


  return (
    <div>

      <div className='my-3 flex items-center justify-between'>
       <span className="font-Lato text-[20px] font-bold text-[#464646]">User Details</span>
       <Link to={`/admin/users`} className='text-primary flex items-center gap-1 text-[14px] font-semibold'>
         <span><IoIosArrowBack /></span>
         <span >Back</span>
       </Link>
      </div>

      <div className='bg-[#fff] flex flex-col md:flex-row gap-[40px] p-10 rounded-md h-[82%] border-l-8 border-[#00BC9F]'>
        <div>
          <div className="h-[170px] w-[170px] rounded-full overflow-hidden relative ">
          <img className="w-full h-full object-cover"
            src={getAvatarAttributes(`${user?.full_name.split(' ')[0]} ${user?.full_name.split(' ')[1]}`, processAvatarUrl(user?.avtar)).src}
            alt={getAvatarAttributes(`${user?.full_name.split(' ')[0]} ${user?.full_name.split(' ')[1]}`, processAvatarUrl(user?.avtar)).alt}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user?.full_name.split(' ')[0].charAt(0) + user?.full_name.split(' ')[1].charAt(0)
              )}&color=${"#464646"}&background=${"FFFFFF"}`;
            }}
          />
          <label htmlFor='imageInput' className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
            <p className="text-white font-normal cursor-pointer text-sm text-center">
              Change<br />Picture
            </p>
          </label>
          <input id='imageInput' type='file' accept='image/*' className='hidden'/>
          </div>
        </div>

      <div className='flex flex-col w-full justify-between'>
       
       

        <div className='flex flex-col'>
            <div className='flex items-center justify-between'> 
                <div className='flex items-center gap-[70px]'>
                    <span className='text-[14px] font-black text-[#00BC9F]'>10 out of 200 Points Left</span>
                    <div className='flex items-center text-primary gap-1 text-[18px]'>
                        <span><IoChevronForwardCircleOutline /></span>
                        <span className='text-[14px] font-black text-primary'>Boost Allowance</span>
                    </div>
                </div>
                <div>
                  <button className='text-primary border-primary border rounded-sm px-8 py-1'>Edit</button>
                </div>
            </div>

            <div className='mt-4 mb-3'>
                <span className='text-[25px] font-bold'>{user.full_name}</span>
            </div>

            <div className='flex items-center mb-3'>
                <div className='flex flex-col w-[50%] md:w-[30%] border-r-[1px] border-[#00BC9F]'>
                    <span className='text-[18px] font-bold'>{user.title}</span>
                    <span className='text-[18px]'>{user.department}</span>
                </div>
                <div className='flex flex-col pl-16 w-[50%] md:w-[60%]'>
                    <span className='text-[18px]'>{user.email}</span>
                    <span className='text-[18px]'>{user.phone_number}</span>
                </div>
            </div>

            <div className='flex items-center mb-3'>
            <div className='flex flex-col w-[50%] md:w-[30%]'>
                <span className='text-[13px] font-Source-Sans-Pro text-[#ACACAC]'>Date of Joining</span>
                <span>{user.hire_date}</span>
            </div>
            <div className='flex flex-col pl-16 w-[50%] md:w-[60%]'>
                <span  className='text-[13px] font-Source-Sans-Pro text-[#ACACAC]'>Birth Date</span>
                <span>{user.birth_date}</span>
            </div>
            </div>

            <div className='flex items-center'>
                <div  className='flex flex-col w-[50%] md:w-[30%]'>
                    <span  className='text-[13px] font-Source-Sans-Pro text-[#ACACAC]'>EmploymentType</span>
                    <span>{user.employment_type}</span>
                </div>
                <div className='flex flex-col pl-16 w-[50%] md:w-[60%]'>
                    <span  className='text-[13px] font-Source-Sans-Pro text-[#ACACAC]'>Gender</span>
                    <span>{user.gender}</span>
                </div>
            </div>
        </div>

        <div className='flex items-center'>
            <div  className='flex flex-col'>
                <span  className='text-[13px] font-Source-Sans-Pro text-[#ACACAC]'>Reports To</span>
                <span className='font-bold'>{user.manager}</span>
            </div>
        </div>

        <div className='flex cursor-pointer items-center gap-1 text-[#FF6565]'>
          <span><IoIosCloseCircle/></span>
          <button onClick={handleDeactivate} className='text-[12px]'>Deactivate</button>
        </div>

        {showConfirmation && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-10 rounded-md">
              <p className="font-bold">Are you sure you want to deactivate this user?</p>
              <div className="flex justify-end mt-4">
                <button className="text-[#FF6565] mr-4" onClick={cancelDeactivate}>
                  Cancel
                </button>
                <button className="text-[#00BC9F]" onClick={confirmDeactivate}>
                  Deactivate
                </button>
              </div>
            </div>
          </div>
        )}
      
      </div>
      
      </div>
      

    </div>
  )
}

export default EditUserDetails