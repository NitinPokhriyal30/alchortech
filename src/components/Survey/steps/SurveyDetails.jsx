import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import Input from '@mui/joy/Input';
import Checkbox from '@mui/joy/Checkbox';
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import dayjs from 'dayjs';

// Register the plugin
dayjs.extend(isBetweenPlugin);

const COLORS = {
  gray: 'text-[#A5A5A5]',
}

const SurveyDetails = ({ surveyDetails, setSurveyDetails }) => {

  const today = dayjs();
  const yesterday = dayjs().subtract(1, 'day');
  const todayStartOfTheDay = today.startOf('day');

  // Initial questions state
  // const [surveyDetails, setSurveyDetails] = useState(
  //   {
  //     title: '',
  //     description: '',
  //     dateAndTime: {
  //       start: '',
  //       end: ''
  //     },
  //     termsAndConditions: '',
  //     isTimeBounded: false,
  //   },
  // );

  // Handler for updating the survey details
  const handleSurveyDetailsChange = (property, value) => {
    setSurveyDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      [property]: value,
    }));
  };

  // Handler for updating the start date and time
  const handleStartDateAndTimeChange = (property, value) => {
    // Combine date and time and format it as needed
    const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss');

    setSurveyDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      dateAndTime: {
        ...prevSurveyDetails.dateAndTime,
        [property]: combinedDateTime,
      },
    }));
  };

  // Handler for updating the end date and time
  const handleEndDateAndTimeChange = (property, value) => {
    // Combine date and time and format it as needed
    const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss');

    setSurveyDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      dateAndTime: {
        ...prevSurveyDetails.dateAndTime,
        [property]: combinedDateTime,
      },
    }));
  };

  // Handler for updating the isTimeBounded value
  const handleIsTimeBoundedChange = (event) => {
    const newValue = event.target.checked;
    setSurveyDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      isTimeBounded: newValue,
    }));
  };


  return (
    <div className="rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]">
      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Title*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Survey Title goes here</p>
        </div>

        {/* col 2 */}
        <div>
          <div>
            <Input
              size="lg"
              placeholder="Ex: Go Green, Plant Trees"
              value={surveyDetails.title}
              onChange={(event) => handleSurveyDetailsChange('title', event.target.value)}
            />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
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
          <div>
            <ReactQuill
              value={surveyDetails.description} // Pass your description state value here
              className='react-quill'
              onChange={(value) => {
                setSurveyDetails((prevSurveyDetails) => ({
                  ...prevSurveyDetails,
                  description: value,
                }));
              }}
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
          <div className="flex items-center gap-4 dateTimeContainer-green">
            <span className="text-18px font-bold min-w-[70px]">Start</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className='input-container' defaultValue={yesterday}
                disablePast onChange={(date) => handleStartDateAndTimeChange('start', date)} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker className='input-container' defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleStartDateAndTimeChange('start', time)} />
            </LocalizationProvider>
          </div>

          <div className="flex items-center gap-4 mt-2 dateTimeContainer-red">
            <span className="text-18px font-bold min-w-[70px]">End</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className='input-container' defaultValue={yesterday}
                disablePast onChange={(date) => handleEndDateAndTimeChange('end', date)} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker className='input-container' defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleEndDateAndTimeChange('end', time)} />
            </LocalizationProvider>
          </div>
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Terms & Conditions</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Describe the Terms & Conditions of the campaign</p>
        </div>

        {/* col 2 */}
        <div>
          <div>
            <ReactQuill
              value={surveyDetails.termsAndConditions} // Pass your description state value here
              className='react-quill'
              onChange={(value) => {
                setSurveyDetails((prevSurveyDetails) => ({
                  ...prevSurveyDetails,
                  termsAndConditions: value,
                }));
              }}
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
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Is it Time Bounded Survey</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Set time limit in minutes</p>
        </div>

        {/* col 2 */}
        <div>
          <div>
            <Checkbox label="Label" onChange={handleIsTimeBoundedChange}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SurveyDetails
