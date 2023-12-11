import { FormControlLabel, Radio, Checkbox, RadioGroup } from '@mui/material'
import * as React from 'react'
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import { useQuery } from 'react-query';
import { api } from '@/api';

export default function SurveyPreview({ ...props }) {

  const { id } = useParams()  

  const survey = useQuery(['survey', id], () => api.surveys.surveyById(id))

  if (survey.isLoading) {
    return (<div className='flex justify-center' >
      <Loader />
    </div>)
  }

  const renderQuestion = (question) => {
    switch (question.question_type) {
      case 'text':
        return (
          <div className="border-b border-[#d1d1d1] pb-3 pt-9">
            <p className="pb-6 text-18px font-bold">{question.question}</p>
            <input
              className="w-full max-w-[465px] border-b border-[#d1d1d1] bg-transparent py-2.5 outline-none focus:border-primary"
              type="input"
              placeholder="Your answer"
            />
          </div>
        );
      case 'input':
        return (
          <div className="border-b border-[#d1d1d1] pb-3 pt-9">
            <p className="pb-6 text-18px font-bold">{question.question}</p>
            <input
              className="w-full max-w-[465px] border-b border-[#d1d1d1] bg-transparent py-2.5 outline-none focus:border-primary"
              type="text"
              placeholder="Your answer"
            />
          </div>
        );
      case 'radio':
        return (
          <div className="border-b border-[#d1d1d1] pb-3 pt-9">
            <p className="pb-6 text-18px font-bold">{question.question}</p>
            <RadioGroup>
              {question.answer_options?.map((value) => (
                <FormControlLabel
                  key={value}
                  control={<Radio />}
                  value={value}
                  label={value}
                />
              ))}
            </RadioGroup>
          </div>
        );
      case 'checkbox':
        return (
          <div className="border-b border-[#d1d1d1] pb-3 pt-9">
            <p className="pb-6 text-18px font-bold">{question.question}</p>
            {question.answer_options?.map((value) => (
              <FormControlLabel
                key={value}
                control={<Checkbox />}
                label={value}
                value={value}
              />
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <div className="border-b border-[#d1d1d1] pb-3 pt-9">
            <p className="pb-6 text-18px font-bold">{question.question}</p>
            <select className="w-full max-w-[465px] cursor-pointer rounded-[4px] border border-[#d1d1d1] bg-transparent px-[14px] py-2.5 text-16px outline-none focus:border-primary">
              {question.answer_options?.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-10 rounded-[7px] bg-white">
      <div className="flex-col md:flex-row flex border-b border-[#d1d1d1] px-[52px] pb-3 pt-6 text-[24px] font-bold leading-[29px] text-[#292929]">
        <h1>{survey.data.title}</h1>
      </div>

      <div className="px-[52px]">
        {survey.data.questions?.map((question, index) => (
          <React.Fragment key={index}>{renderQuestion(question)}</React.Fragment>
        ))}

        <div className="mb-[60px] mt-14">
          <button
            className="w-full max-w-[117px] rounded-[4px] bg-primary p-[9.5px] text-white "
            type="button"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
