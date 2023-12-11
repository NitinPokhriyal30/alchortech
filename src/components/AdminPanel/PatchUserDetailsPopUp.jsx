import React, {useEffect} from 'react';
import { IoMdClose } from "react-icons/io";
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import { getAvatarAttributes, processAvatarUrl } from '@/utils';
import { toast } from 'react-toastify';


const PatchUserDetailsPopUp = ({setShowAddManuallyPopup,setIsEditPopup ,userId, setSelectedRowIndex}) => {
  const [formData, setFormData] = React.useState({});

  const { data: user } = useQuery(
    ['user', userId],
    () => api.adminUsers.userDetails({ userId }),
    {
      enabled: !!userId,
    }
  );

  const { data: departments } = useQuery(
    ['departments'],
    () => api.departments()
  );

  const { data: accounts } = useQuery(
    ['accounts'],
    () => api.users.profiles()
  );
  
  const { data: countries } = useQuery(
    ['countries'],
    () => api.countries()
  );
  
  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleClosePopup = () => {
    if(!userId) {
      setShowAddManuallyPopup(false)
      setSelectedRowIndex(null);
    } else {
      setIsEditPopup(false)
      setSelectedRowIndex(null);
    }
  }

  const handleUpdateUser = async () => {
    try {
      await api.adminUsers.patchUser({userId, formData});
      toast.success('User Updated!');
      setIsEditPopup(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  }

  useEffect(() => {
    if (user && departments && accounts) {
      
  
      const selectedManager = accounts.find(
        (account) => account.full_name === user.manager
      );

      setFormData({
        fullName: user?.full_name || '',
        email: user?.email || '',
        employeeId: user?.employee_id || '',
        gender: user?.gender || '',
        birthDate: user?.birth_date || '',
        hireDate: user?.hire_date || '',
        phoneNumber: user?.phone_number || '',
        departmentName: user.department || '',
        employeeType: user?.employment_type || '',
        title: user?.title || '',
        manager: selectedManager ? selectedManager.id : '',
        location: user?.location || '',
      });
      console.log("departments", formData)
    }
  }, [user, userId, departments, accounts]);
  
  if (!user) {
    return <Loader />;
  }

  return (
    <div className="bg-black bg-opacity-20 fixed z-50 inset-0">
        <div className="fixed z-[99] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white shadow border border-[#efefef] rounded-md px-20 py-10 relative w-screen md:max-w-[42rem] max-w-xs">
           <div onClick={() => handleClosePopup()} className="p-2 cursor-pointer absolute right-0 top-0 rounded-sm hover:bg-translucent hover:text-primary block w-fit ml-auto">
            <span><IoMdClose /></span>
           </div>
          
           <div><span className='text-[20px] font-bold'>Edit User Details</span></div>

           <div className='flex flex-col mt-10'>

            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>User Name</label>
                <input
                  value={formData?.fullName}
                  onChange={(e) => handleFieldChange('fullName', e.target.value)}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Email Id</label>
                <input
                  value={formData?.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Employee Id</label>
                <input
                value={formData?.employeeId}
                onChange={(e) => handleFieldChange('employeeId', e.target.value)}
                className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label className="text-[13px] text-[#464646]">Gender</label>
                <select
                  value={formData?.gender}
                  onChange={(e) => handleFieldChange('gender', e.target.value)}
                  className="w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Date of Birth</label>
                <input
                  value={formData?.birthDate}
                  type='date'
                  onChange={(e) => handleFieldChange('birthDate', e.target.value)}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Date of Joininig</label>
                <input
                  value={formData?.hireDate}
                  type='date'
                  onChange={(e) => handleFieldChange('hireDate', e.target.value)}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
            </div>
            <div className='flex gap-3'>
              <div className='flex flex-col w-[50%]'>
                <label className='text-[13px] text-[#464646]'>Mobile No.</label>
                <input
                  value={formData?.phoneNumber}
                  onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                  className='w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
                />
              </div>
              <div className="flex flex-col w-[50%]">
                <label className="text-[13px] text-[#464646]">Department</label>
                <select
                  value={formData.departmentName}
                  onChange={(e) => handleFieldChange('departmentName', e.target.value)}
                  className="w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none"
                >
                  {departments?.map((department) => (
                    <option key={department.id} value={department.name}>{department.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className="flex flex-col w-[50%]">
                <label className="text-[13px] text-[#464646]">Employee Type</label>
                <select
                  value={formData?.employeeType}
                  onChange={(e) => handleFieldChange('employeeType', e.target.value)}
                  className="w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none"
                >
                  <option value="full-time">Full-Time</option>
                  <option value="part-time">Part-Time</option>
                </select>
              </div>
              <div className="flex flex-col w-[50%]">
                <label className="text-[13px] text-[#464646]">Designation</label>
                <select
                  value={formData?.title}
                  onChange={(e) => handleFieldChange('title', e.target.value)}
                  className="w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none"
                >
                  <option value="Developer">Developer</option>
                  <option value="HR">HR</option>
                  <option value="Sr Developer">Sr Developer</option>
                </select>
              </div>
            </div>
            <div className='flex gap-3'>
              <div className="flex flex-col w-[50%]">
                <label className="text-[13px] text-[#464646]">Reports To</label>
                <select
                  value={formData?.manager ? formData.manager.id : ''}
                  onChange={(e) => handleFieldChange('manager', e.target.value)}
                  className="w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none"
                >
                {accounts?.map((account) => (
                  <option key={account.id} value={account.id}>{account.full_name}</option>
                ))}
                </select>
              </div>
              <div className="flex flex-col w-[50%]">
                <label className="text-[13px] text-[#464646]">Location</label>
                <select
                  value={formData?.location}
                  onChange={(e) => handleFieldChange('location', e.target.value)}
                  className="w-full border border-[#D1D1D1] bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none"
                >
                {countries?.map((country) => (
                  <option key={country.name} value={country.name}>{country.name}</option>
                ))}
                </select>
              </div>
            </div>
           
           </div>

           <div className='mt-6 mb-6'>
           {
            userId ?  
            <div className='flex gap-6'>
              <button className='text-[#fff] text-[14px] bg-primary rounded-md px-8 py-1' onClick={() => handleUpdateUser()}>Update</button>
              <button className='text-[14px] border-primary border text-primary rounded-md px-8 py-1' onClick={() => handleClosePopup()}>Cancel</button>
            </div> 
            : 
            <button className='text-[#fff] text-[14px] bg-primary rounded-md px-8 py-1'>Submit</button>
           }
           </div>

          </div>
        
        </div>
    </div>
  )
}

export default PatchUserDetailsPopUp