import React, {useState} from 'react';
import ShowModal from './ShowModal';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditUserPopup = ({user, onClose, toast}) => {

  const [showModal, setShowModal] = useState(true);

  const token = Cookies.get('token')

  const closeModal = () => {
    setShowModal(false);
    onClose();
  }

  const [formData, setFormData] = useState({
    firstName: user.user.first_name,
    lastName:  user.user.last_name,
    email: user.user.email,
    country: user.country,
    department: user.department,
    location: user.location,
    userMode: user.user_mode,
    allowanceBoost: user.allowance_boost,
    role: user.role,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response =  await axios.put(`http://backend.letshigh5.com/update/${user.id}/`, formData, {
        headers: {
        Authorization: `Bearer ${token}`
        }})

      if (response.status === 200) {
        toast.success("User Edited Successfully!")
        setTimeout(() => {
            window.location.reload();
        }, 1000)
        
      } else {
        console.log(response.data.error);
      }
    } catch (error) {
        console.log(error);
      }
    closeModal();
  };

  const mainModal = (
    <ShowModal closeModal={closeModal}>
    <div>
        <h3>Edit User</h3>
        <form onSubmit={submitHandler}>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6">Email:</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name='email'  value={formData.email}  disabled />
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6">First Name:</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name='firstName' value={formData.firstName}  disabled/>
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6">Last Name:</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name='lastName' value={formData.lastName}  disabled/>
        </div>


        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6">Role:</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name='role' value={formData.role} onChange={handleChange}/>
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6">Country:</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name='country' value={formData.country} onChange={handleChange}/>
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6" htmlFor="department">Department</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name="department"  value={formData.department} onChange={handleChange} required />
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6" htmlFor="location">Location</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="text" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6"  htmlFor="userMode">User Mode</label>
          <select className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4"  name="userMode" value={formData.userMode} onChange={handleChange}>
            <option value="normal">normal</option>
            <option value="benefactor">benefactor</option>
            <option value="receiver">receiver</option>
            <option value="observer">observer</option>
          </select>
        </div>

        <div className="flex items-center mb-4">
          <label className="inline-block w-24 mr-4 mb-6">Allowance Boost:</label>
          <input className="inline-block w-full p-1 rounded-md border border-gray-300 text-base box-border mb-4" type="number" name='allowanceBoost' value={formData.allowanceBoost} onChange={handleChange}/>
        </div>
        
          <button className="bg-blue-500 text-white border-none py-2 px-4 rounded-md text-base cursor-pointer" type="submit">Save</button>
        </form>
      </div>
   
    </ShowModal>
  )

  return (
    <div>
      {showModal && mainModal} 
    </div>    
    
  )
}


export default EditUserPopup