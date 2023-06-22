import React, {useState} from 'react';
import EditUserPopup from './EditUserPopup';
import DeleteUserPopup from './DeleteUserPopup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'

const Table = ({headers, data, renderCell, showEditButton, showDeleteButton, showDetailsButton}) => {

    const [editUserId, setEditUserId] = useState(null);
    const [userId, setUserId] = useState(null);
    
    const tableStyle = {
        borderCollapse: 'collapse',
        width: '100%',
      };
    
      const thStyle = {
        backgroundColor: '#ddd',
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'left',
      };
    
      const tdStyle = {
        border: '1px solid #ccc',
        padding: '8px',
        textAlign: 'center',
      };

      const handleEditClick = (userId) => {
        setEditUserId(userId);
      };

      const handleEditFormClose = () => {
        setEditUserId(null);
      };

      const handleDeleteClick = (id) => {
        setUserId(id);
      };

      const handleDeleteFormClose = () => {
        setUserId(null);
      };

      const renderActionButton = (user) => {
        if (showEditButton && showDeleteButton) {
          return (
            <React.Fragment>
              <button className="icon-btn" onClick={() => handleEditClick(user.id)}>
                <FaPencilAlt />
              </button>
              <button className="icon-btn" onClick={() => handleDeleteClick(user.id)}>
                <FaTrashAlt />
              </button>
            </React.Fragment>
          );
        } else if (showDetailsButton) {
          return (
            <button className='edit-btn' >
              Detail
            </button>
          );
        }
        return null;
      };
    

  return (
    <div>
    <ToastContainer />
    <table style={tableStyle}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key} style={thStyle}>
                {header}
              </th>
            ))}
              <th style={thStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id}>
               {headers.map((header) => (
                <td key={header.key} style={tdStyle}>{renderCell(header, user)}</td>
               ))}
               <td style={tdStyle}>{renderActionButton(user)}</td>
            </tr>
          ))}
      </tbody>
    </table>
    {editUserId && <EditUserPopup user={data.find((user) => user.id === editUserId)} onClose={handleEditFormClose} toast={toast} />}
    {userId && <DeleteUserPopup userId={data.find((user) => user.id === userId)} onClose={handleDeleteFormClose} toast={toast} />}
    </div>
  )
}

export default Table