import React, { useState } from 'react'
import { Radio, RadioGroup, FormControl, FormControlLabel, TextField, InputLabel, Select, MenuItem, Checkbox, FormGroup, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { RiInformationLine } from 'react-icons/ri'

/**
 * @param {{
 *  questions: {
 *    questions: {
 *      type: "input" | "text-area" | "radio" | "check-box" | "dropdown";
 *      options?: string[];
 *      answer: string;
 *      question: string;
 *    }[]
 *  }
 * }} param0
 */
const Questions = ({ questions, setQuestions, isTimeBounded, errors }) => {
  // State for selected question type and radio options
  const [selectedOption, setSelectedOption] = useState('input')
  // const [isTimeBounded, setIsTimeBounded] = useState(true)

  // Handler for changing the question type
  const handleOptionChange = (event, questionIndex) => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions[questionIndex].type = event.target.value
    // preserve options;
    if (['radio', 'dropdown', 'check-box'].includes(event.target.value)) {
      updatedQuestions.questions[questionIndex].options = ['option 1']
    } else if (['input', 'text-area'].includes(event.target.value)) {
      updatedQuestions.questions[questionIndex].options = undefined
    }
    setQuestions(updatedQuestions)
  }

  // Handler for adding a new question
  const addNewQuestion = () => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions.push({
      type: 'radio',
      options: ['option1'],
      question: '',
      answer: isTimeBounded ? '' : undefined,
    })
    setQuestions(updatedQuestions)
  }

  // Handler for adding a new radio option
  const handleAddOption = (questionIndex) => {
    const updatedQuestions = { ...questions }
    const newOption = `option ${updatedQuestions.questions[questionIndex].options.length + 1}`
    updatedQuestions.questions[questionIndex].options.push(newOption)
    setQuestions(updatedQuestions)
  }

  // Handler for changing the question text
  const handleQuestionChange = (event, questionIndex) => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions[questionIndex].question = event.target.value
    setQuestions(updatedQuestions)
  }

  // Handler for editing a radio option text
  const handleEditOption = (questionIndex, optionIndex, newText) => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions[questionIndex].options[optionIndex] = newText
    setQuestions(updatedQuestions)
  }

  // Handler for changing the answer for Text Box type questions
  const handleAnswerChange = (event, questionIndex) => {
    if (isTimeBounded === false) return
    const updatedQuestions = { ...questions }
    updatedQuestions.questions[questionIndex].answer = event.target.value
    setQuestions(updatedQuestions)
  }

  // Handler for changing the answer for Checkbox type questions
  const handleCheckboxAnswerChange = (questionIndex, optionIndex) => (event) => {
    if (isTimeBounded === false) return
    const updatedQuestions = { ...questions }
    const value = encodeURIComponent(event.target.value)
    const answer = updatedQuestions.questions[questionIndex].answer.split(',').filter(Boolean)

    if (answer.includes(value)) {
      answer.splice(answer.indexOf(value), 1)
    } else {
      answer.push(value)
    }

    updatedQuestions.questions[questionIndex].answer = Array.from(new Set(answer)).join(',')

    setQuestions(updatedQuestions)
  }

  // Handler for deleting a radio option
  const handleDeleteOption = (questionIndex, optionIndex) => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions[questionIndex].options.splice(optionIndex, 1)
    setQuestions(updatedQuestions)
  }

  // Handler for deleting a question
  const handleDeleteQuestion = (questionIndex) => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions.splice(questionIndex, 1)
    setQuestions(updatedQuestions)
  }

  const COLORS = {
    gray: 'text-[#A5A5A5]',
  }

  return (
    <div className="rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]">
      <pre>{JSON.stringify(questions.questions, null, 2)}</pre>
      {questions.questions.map((question, index) => (
        <div className="items-top mb-5 grid grid-cols-[1fr_2fr] gap-8" key={index}>
          {/* Question Type Selector */}
          <div>
            <p className="my-[25px] text-18px font-bold text-text-black">Question {index + 1}</p>
            {isTimeBounded ? (
              <Select id={`demo-simple-select-${index}`} value={question.type || selectedOption} onChange={(event) => handleOptionChange(event, index)} fullWidth>
                <MenuItem value="radio">Radio Button</MenuItem>
                <MenuItem value="check-box">Checkboxes</MenuItem>
                <MenuItem value="dropdown">Dropdown</MenuItem>
              </Select>
            ) : (
              <Select id={`demo-simple-select-${index}`} value={question.type || selectedOption} onChange={(event) => handleOptionChange(event, index)} fullWidth>
                <MenuItem value="input">Text Box</MenuItem>
                <MenuItem value="text-area">Text Area</MenuItem>
                <MenuItem value="radio">Radio Button</MenuItem>
                <MenuItem value="check-box">Checkboxes</MenuItem>
                <MenuItem value="dropdown">Dropdown</MenuItem>
              </Select>
            )}

            <p className={'mt-2.5 ' + COLORS.gray}>
              <RiInformationLine className="inline align-text-bottom text-[1.1em]" /> Question Type
            </p>
          </div>

          {/* Question and Input Fields */}
          <div>
            <TextField fullWidth margin="normal" variant="standard" placeholder="Enter your question" value={question.question} onChange={(event) => handleQuestionChange(event, index)} />
            {question.type === 'input' && (
              <div>
                {isTimeBounded === true && <TextField margin="normal" fullWidth variant="outlined" placeholder="Answer" value={question.answer} onChange={(event) => handleInputAnswerChange(event, index)} />}
                {/* Delete Question Button */}
                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </Button>
              </div>
            )}
            {question.type === 'text-area' && (
              <div>
                {isTimeBounded === true && <TextField fullWidth margin="normal" variant="outlined" multiline placeholder="Answer" rows={4} value={question.answer} onChange={(event) => handleAnswerChange(event, index)} />}
                {/* Delete Question Button */}
                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </Button>
              </div>
            )}
            {question.type === 'radio' && (
              <div>
                <RadioGroup>
                  {question.options.map((item, optionIndex) => (
                    <div key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Checkbox Option */}
                      <FormControlLabel value={item} control={<Radio />} label={item} checked={item === question.answer} onChange={(event) => handleAnswerChange(event, index)} disabled={isTimeBounded === false} />
                      {/* Edit Radio Option */}
                      <IconButton
                        onClick={() => {
                          const newText = window.prompt('Enter new text:', item)
                          if (newText !== null && newText !== '') {
                            handleEditOption(index, optionIndex, newText)
                          }
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      {/* Delete Radio Option */}
                      <IconButton onClick={() => handleDeleteOption(index, optionIndex)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </RadioGroup>
                {/* Add New Radio Option Button */}
                <Button variant="contained" onClick={() => handleAddOption(index)}>
                  Add New Option
                </Button>
                {/* Delete Question Button */}
                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </Button>
              </div>
            )}
            {question.type === 'check-box' && (
              <div>
                <FormGroup>
                  {question.options.map((item, optionIndex) => (
                    <div key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Checkbox Option */}
                      <FormControlLabel value={item} control={<Checkbox checked={isTimeBounded === true && question.answer.split(',').includes(encodeURIComponent(item))} />} label={item} onChange={handleCheckboxAnswerChange(index, optionIndex)} disabled={isTimeBounded === false} />
                      {/* Edit Checkbox Option */}
                      <IconButton
                        onClick={() => {
                          const newText = window.prompt('Enter new text:', item)
                          if (newText !== null && newText !== '') {
                            handleEditOption(index, optionIndex, newText)
                          }
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      {/* Delete Dropdown Option */}
                      <IconButton onClick={() => handleDeleteOption(index, optionIndex)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </FormGroup>
                {/* Add New Option Button */}
                <Button variant="contained" onClick={() => handleAddOption(index)}>
                  Add New Option
                </Button>
                {/* Delete Question Button */}
                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </Button>
              </div>
            )}
            {question.type === 'dropdown' && (
              <div>
                <FormControl fullWidth>
                  <Select className="my-[15px]" labelId={`demo-simple-select-label-${index}`} id={`demo-simple-select-${index}`} value={question.answer} onChange={(event) => handleAnswerChange(event, index)} disabled={isTimeBounded === false}>
                    {question.options.map((item, optionIndex) => (
                      <MenuItem key={optionIndex} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                  {/* Edit Dropdown Options */}
                  {question.options.map((item, optionIndex) => (
                    <div key={optionIndex} style={{ display: 'flex', alignItems: 'center' }}>
                      {/* Dropdown Option */}
                      <span>{item}</span>
                      {/* Edit Dropdown Option */}
                      <IconButton
                        onClick={() => {
                          const newText = window.prompt('Enter new text:', item)
                          if (newText !== null && newText !== '') {
                            handleEditOption(index, optionIndex, newText)
                          }
                        }}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      {/* Delete Dropdown Option */}
                      <IconButton onClick={() => handleDeleteOption(index, optionIndex)} size="small">
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </FormControl>
                {/* Add New Select Option Button */}
                <Button variant="contained" onClick={() => handleAddOption(index)}>
                  Add New Option
                </Button>
                {/* Delete Question Button */}
                <Button variant="contained" onClick={() => handleDeleteQuestion(index)}>
                  Delete Question
                </Button>
              </div>
            )}

            {errors?.find(([_index]) => _index === index)?.[1] && (
              <p className="text-small mt-2 text-red-500">
                <RiInformationLine className="inline align-text-bottom text-[1.1em]" />
                {errors.find(([_index]) => _index === index)[1]}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Add New Question Button */}
      <Button variant="contained" onClick={addNewQuestion}>
        Add New Question
      </Button>
    </div>
  )
}

export default Questions
