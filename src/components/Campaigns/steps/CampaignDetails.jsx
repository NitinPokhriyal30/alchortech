import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import { DesktopTimePicker } from '@mui/x-date-pickers'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './campaigns.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { RiInformationLine } from 'react-icons/ri'

const COLORS = {
    gray: 'text-[#A5A5A5]',
}

const CampaignDetails = ({ campaignDetails, setCampaignDetails, errors, clearError }) => {
    const today = dayjs()
    const todayStartOfTheDay = today.startOf('day')
    const [isEndDate, setIsEndDate] = useState(false);
      
    const getError = (field) => errors?.[field];


    const handleCampaignDetailsChange = (property, value) => {
        const updatedErrors = { ...errors };
        delete updatedErrors[property];
        setCampaignDetails((prevCampaignDetails) => ({
        ...prevCampaignDetails,
        [property]: value,
        }))
        clearError(updatedErrors);
    }

    const handleCoverImageChange = (event) => {
        handleFileInputChange('coverImage', event.target.files[0]);
    };

    const handleBannerImageChange = (event) => {
        handleFileInputChange('bannerImage', event.target.files[0]);
    };

    const handleAttachedDocumentChange = (event) => {
        handleFileInputChange('attachedDocuments', event.target.files[0]);
    };

    const handleFileInputChange = (property, file) => {
        const updatedErrors = { ...errors };
        delete updatedErrors[property];
        if (file) {
            setCampaignDetails((prevCampaignDetails) => ({
                ...prevCampaignDetails,
                [property]: file,
            }));
        }
        clearError(updatedErrors)
    };

    const handleDrop = (e, property) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) {
          handleFileInputChange(property, file);
        }
      };
      
      const handleDragOver = (e) => {
        e.preventDefault();
      };
    
    const handleQuillChange = (property, content) => {
        handleCampaignDetailsChange(property, content);
    };
     
    const handleStartDateAndTimeChange = (property, value) => {
        const updatedErrors = { ...errors };
        delete updatedErrors[property]; 
        const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
        setCampaignDetails((prevCampaignDetails) => ({
          ...prevCampaignDetails,
            startDate: combinedDateTime,
          
        }))
        clearError(updatedErrors)
      }

  const handleEndDateAndTimeChange = (property, value) => {  
    const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    setCampaignDetails((prevCampaignDetails) => ({
      ...prevCampaignDetails,
      endDate: combinedDateTime,
    }))
   
  }

  const handleEventDateTimeChange = (property, value) => {
    const updatedErrors = { ...errors };
    delete updatedErrors[property];
    const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    setCampaignDetails((prevCampaignDetails) => ({
        ...prevCampaignDetails,
        
        eventDate: combinedDateTime,
      }))
    clearError(updatedErrors)
    };


  useEffect(() => {
   
  }, [])


    return (
        <div className="rounded-lg bg-white px-5 py-6 shadow-[0px_2px_3px_#00000029]">
            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
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
                            value={campaignDetails.campaignName} 
                            onChange={(event) => handleCampaignDetailsChange('campaignName', event.target.value)}
                        />
                    </div> 
                    <p className={'text-right ' + COLORS.gray}>0/75</p>
                    {getError('campaignName') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('campaignName')}
                        </p>
                      )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                {/* col 1 */}
                <div>
                    <p className="text-18px font-bold text-text-black">Cover Image*</p>
                    <span className={'mt-2.5 ' + COLORS.gray}>Image Dimension 1200X630px</span>
                    <p className={COLORS.gray}>Maximum file size 10mb</p>
                </div>

                {/* col 2 */}
                <div>
                    <div className={'rounded ring-primary focus-within:ring-1 ' + COLORS.gray} onDrop={(e) => handleDrop(e, 'coverImage')} onDragOver={handleDragOver}>
                        <label htmlFor="coverImageInput" className="cursor-pointer">
                            <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-28 ">
                                <input
                                    id="coverImageInput"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleCoverImageChange}
                                />
                                <label htmlFor="coverImageInput" className="bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer">
                                Choose File
                                </label>
                                <span className="text-gray-500">
                                  {campaignDetails.coverImage.name || 'or drop your file here'}  
                                </span>
                                
                            </div>
                        </label>
                    </div>
                    {getError('coverImage') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('coverImage')}
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                {/* col 1 */}
                <div>
                    <p className="text-18px font-bold text-text-black">Banner Image*</p>
                    <span className={'mt-2.5 ' + COLORS.gray}>Home page slider Image Dimensions 740X173px</span>
                    <p className={COLORS.gray}>Maximum file size 10mb</p>
                </div>

                {/* col 2 */}
                <div>
                    <div
                        className={'rounded ring-primary focus-within:ring-1 ' + COLORS.gray} onDrop={(e) => handleDrop(e, 'bannerImage')} onDragOver={handleDragOver}>
                        <label htmlFor="bannerImageInput" className="cursor-pointer">
                            <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-10">
                                <input
                                    id="bannerImageInput"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleBannerImageChange}
                                />
                                <label htmlFor="bannerImageInput" className="bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer">
                                    Choose File
                                </label>
                                <span className="text-gray-500">
                                    {campaignDetails.bannerImage.name || 'or drop your file here'}  
                                </span>
                            </div>
                        </label>
                    </div>
                    {getError('bannerImage') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('bannerImage')}
                        </p>
                    )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
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
                            value={campaignDetails.description}
                            onChange={(content, _, __, editor) => handleQuillChange('description', editor.getHTML())}
                            placeholder="Describe your campaign"
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
                    {getError('description') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('description')}
                        </p>
                      )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                {/* col 1 */}
                <div>
                    <p className="text-18px font-bold text-text-black">Date*</p>
                    <p className={'mt-2.5 ' + COLORS.gray}>Mention the Campaign date and time</p>
                </div>

                {/* col 2 */}
                <div>
                    <div className="w-fit flex items-center gap-2 border border-[#00BC9F] p-1 bg-[#F2FDEF]">
                        <span className="pl-4 text-18px font-bold min-w-[70px]">Start</span>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker label="Date" defaultValue={today} disablePast onChange={(date) => handleStartDateAndTimeChange('start', date)}  />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DesktopTimePicker label="Time" defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleStartDateAndTimeChange('start', time)} />
                        </LocalizationProvider>
                    </div>
                    {getError('startDate') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('startDate')}
                        </p>
                    )}

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
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker label="Date" defaultValue={today} disablePast onChange={(date) => handleEndDateAndTimeChange('end', date)} />
                            </LocalizationProvider>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopTimePicker label="Time"  defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleEndDateAndTimeChange('end', time)}/>
                            </LocalizationProvider>
                        </div>
                    }
                    {getError('dateAndTime') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('dateAndTime')}
                        </p>
                      )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
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
                            checked={campaignDetails.isEvent}
                            onChange={() => handleCampaignDetailsChange('isEvent', !campaignDetails.isEvent)}
                            className="form-checkbox w-8 h-8"
                        />
                        <span className={COLORS.gray}>Yes</span>
                    </label>
                    {campaignDetails.isEvent && (
                        <div className='flex border w-fit p-2 mt-6 gap-2'>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                    label="Date" 
                                    defaultValue={today}
                                    disablePast
                                    onChange={(date) => handleEventDateTimeChange(date)}
                                    />
                                </LocalizationProvider>
                            </div>
                            <div>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopTimePicker label="Time"  defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleEventDateTimeChange(time)}/>
                                </LocalizationProvider>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
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
                            value={campaignDetails.termsAndConditions}
                            onChange={(content, _, __, editor) => handleQuillChange('termsAndConditions', editor.getHTML())}
                            placeholder="Describe your campaign"
                            modules={{
                                toolbar: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
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
                    {getError('termsAndConditions') && (
                        <p className="text-sm text-red-500">
                          <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                          {getError('termsAndConditions')}
                        </p>
                      )}
                </div>
            </div>

            <hr className="border-px my-6 border-400" />

            <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                {/* col 1 */}
                <div>
                    <p className="text-18px font-bold text-text-black">Attach a Document</p>
                    <span className={'mt-2.5 ' + COLORS.gray}>Attach any supporting document with</span>
                    <p className={COLORS.gray}>max file size of 5mb</p>
                    <span className={COLORS.gray}>{`(PDF,DOC,GIF,JPG,PNG)`}</span>
                </div>

                {/* col 2 */}
                <div>
                    <div className={'rounded ring-primary focus-within:ring-1 ' + COLORS.gray} onDrop={(e) => handleDrop(e, 'attachedDocuments')} onDragOver={handleDragOver}>
                        <label htmlFor="attachedDocument" className="cursor-pointer">
                        <div className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 rounded-md py-10">
                        <input
                            id="attachedDocument"
                            className="hidden"
                            type="file"
                            accept="image/*"
                            onChange={handleAttachedDocumentChange}
                        />
                        <label htmlFor="attachedDocument" className="bg-[#5486E3] py-2 px-4 text-white rounded-md cursor-pointer">
                            Choose File
                        </label>
                        <span className="text-gray-500">
                            {campaignDetails.attachedDocuments.name || 'No file chosen'}  
                        </span>
                        </div>
                    </label>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CampaignDetails
