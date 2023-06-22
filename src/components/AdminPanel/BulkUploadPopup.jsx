import React, {useState} from 'react';
import ShowModal from './ShowModal';

const BulkUploadPopup = () => {

 const [showModal, setShowModal] = useState(false);

 const [selectedFile, setSelectedFile] = useState(null);

 const closeModal = () => setShowModal(false);

 const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadHandler = () => {
    console.log(selectedFile)

    const formData = new FormData();
    formData.append('file', selectedFile);

    console.log(formData)
  }

 const mainModal = (
    <ShowModal closeModal={closeModal}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3>Bulk Import Users from CSV/XLSX File</h3>
      <p>Import names, email addresses, and custom properties (department, location, role) from a CSV or XLSX file.</p>
      <div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', border: '2px dashed gray',width: '80%', height: '130px' }}
        onDragEnter={(e) => e.preventDefault()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          setSelectedFile(file);
      }}>
        <p>Drag and drop your file here</p> 
      </div>
      <p style={{ fontWeight: 'bold', marginTop: '10px' }}>OR</p>
      <p style={{color: "#007bff"}}>Choose CSV/XLXS File from your local system</p>
     
      <input type="file" id="upload-file" style={{border: "none"}} onChange={handleFileChange} />
      <button onClick={uploadHandler}>Upload</button>
     
        {selectedFile && (
            <div style={{ marginTop: '10px' }}>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
    </div>
  </ShowModal>
  );


  return (
    <div>
      <button 
        className="bg-sky-500 text-center text-white text-light px-2 mx-2 my-2 h-10 rounded-md hover:bg-sky-300 hover:text-black cursor-pointer" onClick={() => setShowModal(true)}>
        Bulk Upload
      </button>
      {showModal && mainModal}    
    </div>
  )
}

export default BulkUploadPopup