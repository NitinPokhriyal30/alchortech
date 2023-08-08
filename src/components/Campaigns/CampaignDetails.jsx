import React, {useState} from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import { DesktopTimePicker } from '@mui/x-date-pickers'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './campaigns.css'

const COLORS = {
  gray: 'text-[#A5A5A5]',
}

const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      // Handle the dropped file here
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

const CampaignDetails = () => {

  const [description, setDescription] = useState("");
  const [tnc, setTnc] = useState("");
  const [isEvent, setIsEvent] = useState(false);
  const [isEndDate, setIsEndDate] = useState(false);

  return (
    <div className="rounded-lg bg-white px-5 py-6 shadow-[0px_2px_3px_#00000029]">
      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Campaign Name*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Give a meaning fun name to your campagin</p>
        </div>

        {/* col 2 */}
        <div>
          <div
            className={
              'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
            }
          >
            <input
              placeholder="Ex. Go Green, Plant Trees"
              className={
                'w-full bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
              }
            />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
      {/* col 1 */}
      <div>
        <p className="text-18px font-bold text-text-black">Cover Image*</p>
        <span className={'mt-2.5 ' + COLORS.gray}>Image Dimension 1200X630px</span>
        <p className={COLORS.gray}>Maximum file size 10mb</p>
      </div>

      {/* col 2 */}
      <div>
        <div
          className={
            'rounded ring-primary focus-within:ring-1 ' + COLORS.gray
          }
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Button to choose file */}
          <label htmlFor="coverImageInput" className="cursor-pointer">
            <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-28 ">
              <label className='bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer'>Choose File</label>
              <span className="text-gray-500">or drop your file here</span>
              <input
                id="coverImageInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  // Handle file selection here
                }}
              />
            </div>
          </label>
        </div>
      </div>
    </div>

    <hr className="border-px my-6 border-400" />

    <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
    {/* col 1 */}
    <div>
      <p className="text-18px font-bold text-text-black">Banner Image*</p>
      <span className={'mt-2.5 ' + COLORS.gray}>Home page slider Image Dimensions 740X173px</span>
      <p className= {COLORS.gray}>Maximum file size 10mb</p>    
      </div>

    {/* col 2 */}
    <div>
      <div
        className={
          'rounded ring-primary focus-within:ring-1 ' + COLORS.gray
        }
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Button to choose file */}
        <label htmlFor="coverImageInput" className="cursor-pointer">
          <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-10">
            <label className='bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer'>Choose File</label>
            <span className="text-gray-500">or drop your file here</span>
            <input
              id="coverImageInput"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                // Handle file selection here
              }}
            />
          </div>
        </label>
      </div>
    </div>
  </div>

  <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Description*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Maximum 150 words</p>
        </div>

        {/* col 2 */}
        <div>
          <div
            className={
              'rounded border ring-primary focus-within:ring-1'
            }
          >
          <ReactQuill
          value={description} // Pass your description state value here
          onChange={(value) => setDescription(value)} // Update your description state here
          placeholder="Describe your campaign"
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'],
              ['link'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean']
            ],
          }}
        />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Date*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Mention the Campaign date and time</p>
        </div>

        {/* col 2 */}
        <div>
          <div className="w-fit flex items-center gap-2 border border-[#00BC9F] p-1 bg-[#F2FDEF]">
            <span className="pl-4 text-18px font-bold min-w-[70px]">Start</span>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker label="Date"/>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopTimePicker label="Time"/>
            </LocalizationProvider>
          </div>

          <label className="flex items-center mt-6 space-x-2">
            <input
            type="checkbox"
            checked={isEndDate}
            onChange={() => setIsEndDate(!isEndDate)}
            className="form-checkbox w-8 h-8"
            />
            <span className={COLORS.gray}>Add end date and time</span>
         </label>

         {isEndDate && 
          <div className="w-fit flex items-center gap-2 border border-[#F89D96] p-1 bg-[#FFF3F2] mt-6">
            <span className="pl-4 text-18px font-bold min-w-[70px]">End</span>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker label="Date"/>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopTimePicker label="Time"/>
            </LocalizationProvider>
          </div>
         }

         
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
      {/* col 1 */}
      <div>
        <p className="text-18px font-bold text-text-black">Is this an Event?</p>
        <p className={'mt-2.5 ' + COLORS.gray}>Mention the event date and time</p>
      </div>

      {/* col 2 */}
      <div>
        <label className="flex items-center space-x-2">
        <input
        type="checkbox"
        checked={isEvent}
        onChange={() => setIsEvent(!isEvent)}
        className="form-checkbox w-8 h-8"
        />
        <span className={COLORS.gray}>Yes</span>
        </label>
        {isEvent && (
          <div className='flex border w-fit p-2 mt-6 gap-2'>
            <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker label="Date"/>
                </LocalizationProvider>
            </div>
            <div>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopTimePicker label="Time"/>
                </LocalizationProvider>
            </div>
          </div>
        )}
      </div>
    </div>

    <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Terms & Conditions*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Describe the Terms & Conditions of the campaign</p>
        </div>

        {/* col 2 */}
        <div>
          <div
            className={
              'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
            }
          >
          <ReactQuill
          value={tnc}
          onChange={(value) => setTnc(value)}
          placeholder="Describe your campaign"
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike'],
              ['link'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['clean']
            ],
          }}
        />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
      {/* col 1 */}
      <div>
        <p className="text-18px font-bold text-text-black">Attach a Document</p>
        <span className={'mt-2.5 ' + COLORS.gray}>Attach any supporting document with</span>
        <p className={COLORS.gray}>max file size of 5mb</p>
        <span className={COLORS.gray}>{`(PDF,DOC,GIF,JPG,PNG)`}</span>     
      </div>

      {/* col 2 */}
      <div>
        <div
          className={
            'rounded ring-primary focus-within:ring-1 ' + COLORS.gray
          }
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {/* Button to choose file */}
          <label htmlFor="coverImageInput" className="cursor-pointer">
            <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-10 ">
              <label className='bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer'>Choose File</label>
              <span className="text-gray-500">or drop your file here</span>
              <input
                id="coverImageInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  // Handle file selection here
                }}
              />
            </div>
          </label>
        </div>
      </div>
    </div>

    </div>
  )
}

export default CampaignDetails
