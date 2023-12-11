import { FormControlLabel, Radio, Checkbox, RadioGroup } from '@mui/material'
import * as React from 'react'
import { useParams } from 'react-router-dom';

export default function QuizParticipate({ ...props }) {

    const { id } = useParams()

    console.log(id);

    const [quiz, setQuiz] = React.useState({
        title: 'testing quiz',
        questions: [
            { options: undefined, question: "text question", type: "text" },
            { options: undefined, question: "text area question", type: "input" },
            { options: ['option1', 'option 2'], question: "radio question", type: "radio" },
            { options: ['option1', 'option 2'], question: "checkbox question", type: "checkbox" },
            { options: ['option1', 'option 2'], question: "dropdown question", type: "dropdown" },
        ]
    })

    // State to store user responses
    const [userResponses, setUserResponses] = React.useState({});



    // Function to handle user responses
    const handleResponse = (question, response) => {
        setUserResponses((prevResponses) => {
            const existingResponse = prevResponses[question.question];

            let updatedResponse;

            if (question.type === 'text' || question.type === 'input') {
                updatedResponse = [response];
            } else {
                updatedResponse = Array.isArray(existingResponse)
                    ? [...existingResponse, response]
                    : [response];
            }
            return {
                ...prevResponses,
                [question.question]: updatedResponse, // Fix: Use question.question instead of question.type
            };
        });
    };

    // Function to handle form submission
    const handleSubmit = () => {
        console.log('User Responses:', userResponses);
        // Add logic for further actions with the user responses
    };

    const renderQuestion = (question) => {
        switch (question.type) {
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
            case 'input':
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
                            {question.options.map((value) => (
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
                        {question.options.map((value) => (
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
                            {question.options.map((option) => (
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
                <h1>{quiz.title}</h1>
            </div>

            <div className="px-[52px]">
                {quiz.questions.map((question, index) => (
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
