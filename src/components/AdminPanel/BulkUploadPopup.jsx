import React from 'react'
import { IoMdClose } from "react-icons/io";

const BulkUploadPopUp = ({setShowBulkUploadPopup}) => {
  return (
    <div className="bg-black bg-opacity-20 fixed z-50 inset-0">
        <div className="fixed z-[99] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-white shadow border border-[#efefef] rounded-md px-20 py-10 relative w-screen md:max-w-[42rem] max-w-xs">
           <div className="p-2 cursor-pointer absolute right-0 top-0 rounded-sm hover:bg-translucent hover:text-primary block w-fit ml-auto">
            <span onClick={() => {setShowBulkUploadPopup(false)}}><IoMdClose /></span>
           </div>
          
           <div><span className='text-[20px] font-bold'>Bulk Upload</span></div>

           <div className='my-10'>
              <label htmlFor="bulkUploadInput" className="cursor-pointer">
                <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-20 ">
                  <input
                    id="bulkUploadInput"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    />
                  <label htmlFor="bulkUploadInput" className="bg-[#5486E3] py-1 px-4 text-white rounded-md cursor-pointer">
                    Choose File
                  </label>
                  <span className="text-[#A5A5A5] mt-4 text-[14px] text-center">
                    Bulk upload users by importing names, email addresses, and custom properties(department, location, role) from a CSV or XLSX file  
                  </span>
                </div>
              </label>
           </div>

          </div>
        
        </div>
    </div>
  )
}

export default BulkUploadPopUp