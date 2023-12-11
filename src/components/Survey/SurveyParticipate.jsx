import { api } from '@/api';
import { FormControlLabel, Radio, Checkbox, RadioGroup } from '@mui/material'
import * as React from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

export default function SurveyParticipate({ ...props }) {

    const { id } = useParams()

    const survey = useQuery(['survey', id], () => api.surveys.surveyById(id))

    // State to store user responses
    const [userResponses, setUserResponses] = React.useState({});



    // Function to handle user responses
    const handleResponse = (question, response) => {
        setUserResponses((prevResponses) => {
            const existingResponse = prevResponses[question.question];

            let updatedResponse;

            if (question.question_type === 'text' || question.question_type === 'char') {
                updatedResponse = [response];
            } else {
                updatedResponse = Array.isArray(existingResponse)
                    ? [...existingResponse, response]
                    : [response];
            }
            return {
                ...prevResponses,
                [question.question]: updatedResponse, // Fix: Use question.question instead of question.question_type
            };
        });
    };

    // Function to handle form submission
    const handleSubmit = () => {
        console.log('User Responses:', userResponses);
        // Add logic for further actions with the user responses
    };

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
                            onChange={(e) => handleResponse(question, e.target.value)}
                        />
                    </div>
                );
            case 'char':
                return (
                    <div className="border-b border-[#d1d1d1] pb-3 pt-9">
                        <p className="pb-6 text-18px font-bold">{question.question}</p>
                        <input
                            className="w-full max-w-[465px] border-b border-[#d1d1d1] bg-transparent py-2.5 outline-none focus:border-primary"
                            type="text"
                            placeholder="Your answer"
                            onChange={(e) => handleResponse(question, e.target.value)}
                        />
                    </div>
                );
            case 'radio':
                return (
                    <div className="border-b border-[#d1d1d1] pb-3 pt-9">
                        <p className="pb-6 text-18px font-bold">{question.question}</p>
                        <RadioGroup>
                            {question.answer_options.map((value) => (
                                <FormControlLabel
                                    key={value}
                                    control={<Radio />}
                                    value={value}
                                    label={value}
                                    onChange={(e) => handleResponse(question, e.target.value)}
                                />
                            ))}
                        </RadioGroup>
                    </div>
                );
            case 'checkbox':
                return (
                    <div className="border-b border-[#d1d1d1] pb-3 pt-9">
                        <p className="pb-6 text-18px font-bold">{question.question}</p>
                        {question.answer_options.map((value) => (
                            <FormControlLabel
                                key={value}
                                control={<Checkbox />}
                                label={value}
                                value={value}
                                onChange={() => handleResponse(question, value)}
                            />
                        ))}
                    </div>
                );
            case 'dropdown':
                return (
                    <div className="border-b border-[#d1d1d1] pb-3 pt-9">
                        <p className="pb-6 text-18px font-bold">{question.question}</p>
                        <select className="w-full max-w-[465px] cursor-pointer rounded-[4px] border border-[#d1d1d1] bg-transparent px-[14px] py-2.5 text-16px outline-none focus:border-primary" onChange={(e) => handleResponse(question, e.target.value)}>
                            {question.answer_options.map((option) => (
                                <option key={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                );
            default:
                return null;
        }
    };

    if (survey.isLoading) {
        return (<div className='flex justify-center' >
            <Loader />
        </div>)
    }

    return (
        <div className="mb-10 rounded-[7px] bg-white">
            <div className="flex-col md:flex-row flex border-b border-[#d1d1d1] px-[52px] pb-3 pt-6 text-[24px] font-bold leading-[29px] text-[#292929]">
                <h1>{survey.data.title}</h1>
            </div>

            <div className="px-[52px]">
                {survey.data.questions.map((question, index) => (
                    <React.Fragment key={index}>{renderQuestion(question)}</React.Fragment>
                ))}

                <div className="mb-[60px] mt-14">
                    <button
                        className="w-full max-w-[117px] rounded-[4px] bg-primary p-[9.5px] text-white "
                        type="button"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}
