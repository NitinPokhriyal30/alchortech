import React, { useState } from "react";
import ShowModal from "./ShowModal";
// import './Modal.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddUserPopup = () => {
  const [showModal, setShowModal] = useState(false);

  
  const token = Cookies.get('token')

  const closeModal = () => setShowModal(false);

  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: ''
      // phoneNumber: '',
      // managerEmail: '',
      // hiredOn: '',
      // dateOfBirth: '',
      // department: '',
      // location: '',
      // userMode: '',
      // allowanceBoost: '',
      // role: '',
      // avatar: '',
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "avatar" && files.length > 0) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: reader.result
          }));
        };
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value
        }));
      }
    };
    

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      try {
        const response =  await axios.post(`http://backend.letshigh5.com/register/`, formData, {
          headers: {
          Authorization: `Bearer ${token}`
          }})
  
        if (response.status === 200) {
          toast.success("User Added Successfully!")
          setTimeout(() => {
            window.location.reload();
        }, 3000)
          
        } else {
          console.log(response.data.error);
        }
      } catch (error) {
          console.log(error);
        }
      closeModal();


      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
      });
    };

  const mainModal = (
    <ShowModal closeModal={closeModal} >

      <h3 className="text-center">
        Add User
        <span className="block w-full h-px my-2 mx-auto bg-slate-900"></span>
      </h3>  

      <div className="p-6">
      <form onSubmit={handleSubmit}>

      <div className="flex items-center mb-4">
      <label   htmlFor="firstName">First Name</label>
      <input  type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}  required />
      </div>

      <div className="flex items-center mb-4">
      <label  htmlFor="lastName">Last Name</label>
      <input  type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}  required />
      </div>

      <div className="flex items-center mb-4">
      <label  htmlFor="username">Username</label>
      <input  type="text" id="username" name="username" value={formData.username} onChange={handleChange}  required />
      </div>

      <div className="flex items-center mb-4">
      <label  htmlFor="email">Email</label>
      <input  type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div className="flex items-center mb-4">
      <label  htmlFor="password">Password</label>
      <input  type="text" id="password" name="password" value={formData.password} onChange={handleChange}  required />
      </div>
      
      <div  className="flex justify-center items-center flex-wrap gap-4 mt-5">
      <button className="bg-sky-300 text-center text-white text-light my-2 w-20 rounded-md hover:bg-sky-500 hover:text-black cursor-pointer" onClick={closeModal}>Cancel</button>
      <button className="bg-sky-500 text-center text-white text-light my-2 w-20 rounded-md hover:bg-sky-300 hover:text-black cursor-pointer" type="submit">Save</button>
      </div>
    </form>
    <ToastContainer/>
      </div>
    </ShowModal>
  );

  return (
    <div>
      <button className="bg-sky-500 text-center text-white text-light my-2 h-10 w-20 rounded-md hover:bg-sky-300 hover:text-black cursor-pointer" onClick={() => setShowModal(true)}>
        Add User
      </button>
      {showModal && mainModal}    
    </div>
  );
};

export default AddUserPopup;


// <label htmlFor="phoneNumber">Phone No</label>
//       <input type="Number" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />

//       <div className="form-group">
//       <label htmlFor="managerEmail">Manager Email</label>
//       <input type="email" id="managerEmail" name="managerEmail" value={formData.managerEmail} onChange={handleChange} />
//       </div>

//       <label htmlFor="hiredOn">Hired On</label>
//       <input type="date" id="hiredOn" name="hiredOn" value={formData.hiredOn} onChange={handleChange} />

//       <label htmlFor="dateOfBirth">Date of Birth</label>
//       <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange}/>

//       <label htmlFor="department">Department</label>
//       <input type="text" id="department" name="department"  value={formData.department} onChange={handleChange} required />

//       <label htmlFor="location">Location</label>
//       <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

//       <label htmlFor="userMode">User Mode</label>
//       <select id="userMode" name="userMode" value={formData.userMode} onChange={handleChange}>
//         <option value="normal">normal</option>
//         <option value="benefactor">benefactor</option>
//         <option value="receiver">receiver</option>
//         <option value="observer">observer</option>
//       </select>
    
//       <div className="form-group">
//       <label htmlFor="allowanceBoost">Allowance Boost</label>
//       <input type="number" id="allowanceBoost" name="allowanceBoost" value={formData.allowanceBoost} onChange={handleChange} />
//       </div>
    
//       <label htmlFor="role">Role</label>
//       <input type="text" id="role" name="role" value={formData.role} onChange={handleChange}/>
    
//       <label htmlFor="avatar">Avatar</label>
//       <input type="file" id="avatar" name="avatar" accept="image/*" onChange={handleChange} />
