import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers'
import React, { useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import isBetweenPlugin from 'dayjs/plugin/isBetween'
import Input from '@mui/joy/Input'
import Checkbox from '@mui/joy/Checkbox'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import dayjs from 'dayjs'
import { RiInformationLine } from 'react-icons/ri'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'

// Register the plugin
dayjs.extend(isBetweenPlugin)

const COLORS = {
  gray: 'text-[#A5A5A5]',
}

const QuizDetails = ({ details, setDetails, errors }) => {
  const today = dayjs()
  const yesterday = dayjs()
  const todayStartOfTheDay = today.startOf('day')

  // Handler for updating the survey details
  const handleSurveyDetailsChange = (property, value) => {
    setDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      [property]: value,
    }))
  }

  // Handler for updating the start date and time
  const handleStartDateAndTimeChange = (property, value) => {
    // Combine date and time and format it as needed
    const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')

    setDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      dateAndTime: {
        ...prevSurveyDetails.dateAndTime,
        [property]: combinedDateTime,
      },
    }))
  }

  // Handler for updating the end date and time
  const handleEndDateAndTimeChange = (property, value) => {
    // Combine date and time and format it as needed
    const combinedDateTime = dayjs(value).format('YYYY-MM-DD HH:mm:ss')

    setDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      dateAndTime: {
        ...prevSurveyDetails.dateAndTime,
        [property]: combinedDateTime,
      },
    }))
  }

  // Handler for updating the isTimeBounded value
  const handleIsTimeBoundedChange = (event) => {
    const newValue = event.target.checked
    setDetails((prevSurveyDetails) => ({
      ...prevSurveyDetails,
      questions: prevSurveyDetails.questions.map((question) => {
        if (newValue === true) {
          question.answer = ''
        } else {
          delete question.answer
        }
        return question
      }),
      isTimeBounded: newValue,
    }))
  }

  const getError = (index) => errors?.find(([_index]) => _index === index)?.[1]

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
            <Input size="lg" placeholder="Ex: Go Green, Plant Trees" value={details.title} onChange={(event) => handleSurveyDetailsChange('title', event.target.value)} />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>

          {getError('title') && (
            <p className="text-sm text-red-500">
              <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
              {getError('title')}
            </p>
          )}
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
              value={details.description} // Pass your description state value here
              className="react-quill"
              onChange={(value) => {
                setDetails((prevSurveyDetails) => ({
                  ...prevSurveyDetails,
                  description: value,
                }))
              }}
              placeholder="Describe your campaign"
              modules={{
                toolbar: [[{ header: '1' }, { header: '2' }, { font: [] }], [{ list: 'ordered' }, { list: 'bullet' }], ['bold', 'italic', 'underline', 'strike'], ['link'], [{ color: [] }, { background: [] }], [{ align: [] }], ['clean']],
              }}
            />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/150 Words</p>

          {getError('description') && (
            <p className="text-sm text-red-500">
              <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
              {getError('description')}
            </p>
          )}
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
          <div className="dateTimeContainer-green flex items-center gap-4">
            <span className="min-w-[70px] text-18px font-bold">Start</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="input-container" defaultValue={today} disablePast onChange={(date) => handleStartDateAndTimeChange('start', date)} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker className="input-container" defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleStartDateAndTimeChange('start', time)} />
            </LocalizationProvider>
          </div>

          <div className="dateTimeContainer-red mt-2 flex items-center gap-4">
            <span className="min-w-[70px] text-18px font-bold">End</span>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker className="input-container" defaultValue={today} disablePast onChange={(date) => handleEndDateAndTimeChange('end', date)} />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker className="input-container" defaultValue={todayStartOfTheDay} disablePast onChange={(time) => handleEndDateAndTimeChange('end', time)} />
            </LocalizationProvider>
          </div>
          {getError('dateAndTime') && (
            <p className="text-sm text-red-500">
              <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
              {getError('dateAndTime')}
            </p>
          )}
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
              value={details.termsAndConditions} // Pass your description state value here
              className="react-quill"
              onChange={(value) => {
                setDetails((prevSurveyDetails) => ({
                  ...prevSurveyDetails,
                  termsAndConditions: value,
                }))
              }}
              placeholder="Describe your campaign"
              modules={{
                toolbar: [[{ header: '1' }, { header: '2' }, { font: [] }], [{ list: 'ordered' }, { list: 'bullet' }], ['bold', 'italic', 'underline', 'strike'], ['link'], [{ color: [] }, { background: [] }], [{ align: [] }], ['clean']],
              }}
            />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/150 words</p>
          {getError('termsAndConditions') && (
            <p className="text-sm text-red-500">
              <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
              {getError('termsAndConditions')}
            </p>
          )}
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
          <label className="flex items-center gap-3">
            <input type="number" className="w-0 min-w-[6ch] rounded-[4px] border border-[#d1d1d1] px-1 py-2" value={details.timing.duration} onChange={(e) => setDetails((prev) => ({ ...prev, timing: { ...prev.timing, duration: e.target.value } }))} />
            Minute(s)
          </label>
          {getError('duration') && (
            <p className="text-sm text-red-500">
              <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
              {getError('duration')}
            </p>
          )}

          <hr className="border-px my-6 border-400" />

          <div>
            <p className="text-18px font-bold text-text-black">Force submit after timer expiry</p>
            <RadioGroup defaultValue="yes" className="!mt-2" onChange={(e) => setDetails((prev) => ({ ...prev, timing: { ...prev.timing, forceSubmit: e.target.value } }))}>
              <FormControlLabel label="Yes" value="yes" control={<Radio />} labelPlacement="right" />
              <FormControlLabel label="No" value="no" control={<Radio />} labelPlacement="right" />
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizDetails
