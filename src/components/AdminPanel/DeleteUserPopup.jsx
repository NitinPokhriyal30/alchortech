import React, {useState} from 'react';
import ShowModal from './ShowModal';
import axios from 'axios';
import Cookies from 'js-cookie';

const DeleteUserPopup = ({userId, onClose, toast}) => {

    const [showModal, setShowModal] = useState(true);

    const token = Cookies.get('token')

    const closeModal = () => {
        setShowModal(false);
        onClose();
      }

    const deleteUserHandler = async (e) => {
        e.preventDefault();
        try {
            const response =  await axios.delete(`http://backend.letshigh5.com/delete/${userId}/`, {
              headers: {
              Authorization: `Bearer ${token}`
              }})
      
            if (response.status === 200) {
              toast.success("User Deleted Successfully!")
              console.log(userId)
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
        }
    

    const mainModal = (
            <ShowModal closeModal={closeModal}>
            <form onSubmit={deleteUserHandler}>
              <h1>{`Are you sure want to remove this user?`}</h1>
              <button className='edit-btn' onClick={closeModal}>Cancel</button>
              <button type='submit' className='edit-btn'>Delete</button>
            </form>
          </ShowModal>
    )

  return (
    <div>
    {showModal && mainModal}
    </div>
  )
}


export default DeleteUserPopup;