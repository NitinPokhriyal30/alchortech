import React, { useState } from 'react';
import {
    Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    TextField,
    InputLabel,
    Select,
    MenuItem,
    Checkbox,
    FormGroup,
    Button,
    IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Questions = ({ questions, setQuestions }) => {
    // State for selected question type and radio options
    const [selectedOption, setSelectedOption] = useState('input');

    // Initial questions state
    // const [questions, setQuestions] = useState({
    //     "questions": [
    //         {
    //             question: 'What is your reason for working from home?',
    //             answer: '',
    //             selectedQuestionType: 'input',
    //             radio: ['option1', 'option2'],
    //             options: [
    //                 { label: 'option1', selected: false },
    //                 { label: 'option2', selected: false },
    //             ],
    //             dropdown: ['option1', 'option2'],
    //         },
    //     ]
    // });

    console.log(questions);

    // Handler for changing the question type
    const handleOptionChange = (event, questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].selectedQuestionType = event.target.value;
        setQuestions(updatedQuestions);
    };

    // Handler for adding a new question
    const addNewQuestion = () => {
        setQuestions(prevState => ({
            ...prevState,
            questions: [
                ...prevState.questions,
                {
                    radio: ['option1', 'option2'],
                    options: [
                        { label: 'option1', selected: false },
                        { label: 'option2', selected: false },
                    ],
                    dropdown: ['option1', 'option2'],
                    question: 'Write a question here',
                    answer: '',
                    selectedQuestionType: 'input'
                }
            ]
        }));
    };

    // Handler for adding a new radio option
    const handleAddRadioOption = (questionIndex) => {
        const updatedQuestions = { ...questions };
        const newOption = `option${updatedQuestions.questions[questionIndex].radio.length + 1}`;
        updatedQuestions.questions[questionIndex].radio.push(newOption);
        setQuestions(updatedQuestions);
    };

    // Handler for adding a new checkbox option
    const handleAddCheckboxOption = (questionIndex) => {
        const updatedQuestions = { ...questions };
        const newOptionLabel = `option${updatedQuestions.questions[questionIndex].options.length + 1}`;
        const newOption = { label: newOptionLabel, selected: false };
        updatedQuestions.questions[questionIndex].options.push(newOption);
        setQuestions(updatedQuestions);
    };

    // Handler for adding a new dropdown option
    const handleAddDropdownOption = (questionIndex) => {
        const updatedQuestions = { ...questions };
        const newOption = {
            label: `option${updatedQuestions.questions[questionIndex].options.length + 1}`,
            selected: false,
        };
        updatedQuestions.questions[questionIndex].options.push(newOption);
        updatedQuestions.questions[questionIndex].dropdown.push(newOption.label);
        setQuestions(updatedQuestions);
    };

    // Handler for changing the question text
    const handleQuestionChange = (event, questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].question = event.target.value;
        setQuestions(updatedQuestions);
    };

    // Handler for editing a radio option text
    const handleEditRadioOption = (questionIndex, optionIndex, newText) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].radio[optionIndex] = newText;
        setQuestions(updatedQuestions);
    };

    // Handler for editing a checkbox option text
    const handleEditCheckboxOption = (questionIndex, optionIndex, newText) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].options[optionIndex].label = newText;
        setQuestions(updatedQuestions);
    };

    // Handler for editing a dropdown option text
    const handleEditDropdownOption = (questionIndex, optionIndex, newText) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].options[optionIndex].label = newText;
        updatedQuestions.questions[questionIndex].dropdown[optionIndex] = newText;
        setQuestions(updatedQuestions);
    };

    // Handler for changing the answer for Text Box type questions
    const handleInputAnswerChange = (event, questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].answer = event.target.value;
        setQuestions(updatedQuestions);
    };

    // Handler for changing the answer for Text Area type questions
    const handleTextAreaAnswerChange = (event, questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].answer = event.target.value;
        setQuestions(updatedQuestions);
    };

    // Handler for changing the answer for Radio type questions
    const handleRadioAnswerChange = (event, questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].answer = event.target.value;
        setQuestions(updatedQuestions);
    };

    // Handler for changing the answer for Checkbox type questions
    const handleCheckboxAnswerChange = (questionIndex, optionIndex) => (event) => {
        const updatedQuestions = { ...questions };
        const updatedOptions = [...updatedQuestions.questions[questionIndex].options];
        updatedOptions[optionIndex].selected = event.target.checked;

        const selectedOptions = updatedOptions
            .filter((option) => option.selected)
            .map((option) => option.label);

        updatedQuestions.questions[questionIndex].answer = selectedOptions;

        setQuestions(updatedQuestions);
    };

    // Handler for changing the answer for Dropdown type questions
    const handleDropdownAnswerChange = (event, questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].answer = event.target.value;
        updatedQuestions.questions[questionIndex].options.forEach((option) => {
            option.selected = option.label === event.target.value;
        });
        setQuestions(updatedQuestions);
    };

    // Handler for deleting a radio option
    const handleDeleteRadioOption = (questionIndex, optionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].radio.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Handler for deleting a checkbox option
    const handleDeleteCheckboxOption = (questionIndex, optionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].options.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Handler for deleting a dropdown option
    const handleDeleteDropdownOption = (questionIndex, optionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions[questionIndex].options.splice(optionIndex, 1);
        updatedQuestions.questions[questionIndex].dropdown.splice(optionIndex, 1);
        setQuestions(updatedQuestions);
    };

    // Handler for deleting a question
    const handleDeleteQuestion = (questionIndex) => {
        const updatedQuestions = { ...questions };
        updatedQuestions.questions.splice(questionIndex, 1);
        setQuestions(updatedQuestions);
    };

    const COLORS = {
        gray: 'text-[#A5A5A5]',
    };

    console.log(questions);

    return (
        <div className="rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]">
            {questions.questions.map((question, index) => (
                <div className="grid grid-cols-[1fr_2fr] items-center gap-8 mb-5" key={index}>
                    {/* Question Type Selector */}
                    <div>
                        <p className="text-18px font-bold text-text-black mb-3">Question {index + 1}</p>
                        <Select
                            id={`demo-simple-select-${index}`}
                            value={question.selectedQuestionType || selectedOption}
                            onChange={event => handleOptionChange(event, index)}
                            fullWidth
                        >
                            <MenuItem value="input">Text Box</MenuItem>
                            <MenuItem value="text-area">Text Area</MenuItem>
                            <MenuItem value="radio">Radio Button</MenuItem>
                            <MenuItem value="check-box">Checkboxes</MenuItem>
                            <MenuItem value="dropdown">Dropdown</MenuItem>
                        </Select>
                        <p className={'mt-2.5 ' + COLORS.gray}>Question Type</p>
                    </div>

                    {/* Question and Input Fields */}
                    <div>
                        <TextField
                            fullWidth
                            margin="normal"
                            variant="standard"
                            placeholder="Enter your question"
                            value={question.question}
                            onChange={event => handleQuestionChange(event, index)}
                        />
                        {question.selectedQuestionType === 'input' && (
                            <div>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Answer"
                                    value={question.answer}
                                    onChange={(event) => handleInputAnswerChange(event, index)}
                                />
                                {/* Delete Question Button */}
                                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                                    Delete Question
                                </Button>
                            </div>
                        )}
                        {question.selectedQuestionType === 'text-area' && (
                            <div>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    multiline
                                    placeholder="Answer"
                                    rows={4}
                                    value={question.answer}
                                    onChange={(event) => handleTextAreaAnswerChange(event, index)}
                                />
                                {/* Delete Question Button */}
                                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                                    Delete Question
                                </Button>
                            </div>
                        )}
                        {question.selectedQuestionType === 'radio' && (
                            <div>
                                <RadioGroup>
                                    {question.radio.map((item, optionIndex) => (
                                        <div key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Checkbox Option */}
                                            <FormControlLabel
                                                value={item}
                                                control={<Radio />}
                                                label={item}
                                                checked={item === question.answer}
                                                onChange={(event) => handleRadioAnswerChange(event, index)}
                                            />
                                            {/* Edit Radio Option */}
                                            <IconButton
                                                onClick={() => {
                                                    const newText = window.prompt('Enter new text:', item);
                                                    if (newText !== null && newText !== '') {
                                                        handleEditRadioOption(index, optionIndex, newText);
                                                    }
                                                }}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            {/* Delete Radio Option */}
                                            <IconButton
                                                onClick={() => handleDeleteRadioOption(index, optionIndex)}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </RadioGroup>
                                {/* Add New Radio Option Button */}
                                <Button variant="contained" onClick={() => handleAddRadioOption(index)}>
                                    Add New Option
                                </Button>
                                {/* Delete Question Button */}
                                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                                    Delete Question
                                </Button>
                            </div>
                        )}
                        {question.selectedQuestionType === 'check-box' && (
                            <div>
                                <FormGroup>
                                    {question.options.map((item, optionIndex) => (
                                        <div key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Checkbox Option */}
                                            <FormControlLabel
                                                value={item.label}
                                                control={<Checkbox checked={item.selected} />}
                                                label={item.label}
                                                onChange={handleCheckboxAnswerChange(index, optionIndex)}
                                            />
                                            {/* Edit Checkbox Option */}
                                            <IconButton
                                                onClick={() => {
                                                    const newText = window.prompt('Enter new text:', item);
                                                    if (newText !== null && newText !== '') {
                                                        handleEditCheckboxOption(index, optionIndex, newText);
                                                    }
                                                }}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            {/* Delete Dropdown Option */}
                                            <IconButton
                                                onClick={() => handleDeleteCheckboxOption(index, optionIndex)}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </FormGroup>
                                {/* Add New Option Button */}
                                <Button variant="contained" onClick={() => handleAddCheckboxOption(index)}>
                                    Add New Option
                                </Button>
                                {/* Delete Question Button */}
                                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                                    Delete Question
                                </Button>
                            </div>
                        )}
                        {question.selectedQuestionType === 'dropdown' && (
                            <div>
                                <FormControl fullWidth>
                                    <Select
                                        labelId={`demo-simple-select-label-${index}`}
                                        id={`demo-simple-select-${index}`}
                                        value={question.answer}
                                        label="Select an Option"
                                        onChange={(event) => handleDropdownAnswerChange(event, index)}
                                    >
                                        {question.options.map((item, optionIndex) => (
                                            <MenuItem key={optionIndex} value={item.label}>
                                                {item.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {/* Edit Dropdown Options */}
                                    {question.dropdown.map((item, optionIndex) => (
                                        <div key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Dropdown Option */}
                                            <span>{item}</span>
                                            {/* Edit Dropdown Option */}
                                            <IconButton
                                                onClick={() => {
                                                    const newText = window.prompt('Enter new text:', item.label);
                                                    if (newText !== null && newText !== '') {
                                                        handleEditDropdownOption(index, optionIndex, newText);
                                                    }
                                                }}
                                                size="small"
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            {/* Delete Dropdown Option */}
                                            <IconButton
                                                onClick={() => handleDeleteDropdownOption(index, optionIndex)}
                                                size="small"
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </div>
                                    ))}
                                </FormControl>
                                {/* Add New Select Option Button */}
                                <Button variant="contained" onClick={() => handleAddDropdownOption(index)}>
                                    Add New Option
                                </Button>
                                {/* Delete Question Button */}
                                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                                    Delete Question
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            ))}

            {/* Add New Question Button */}
            <Button variant="contained" onClick={addNewQuestion}>
                Add New Question
            </Button>
        </div>
    );
};

export default Questions;
