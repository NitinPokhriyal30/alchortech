import React, { useEffect, useRef, useState } from 'react'
import { Radio, RadioGroup, Select, FormControl, FormControlLabel, TextField, InputLabel, MenuItem, Checkbox, FormGroup, Button, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { RiAddLine, RiAttachmentLine, RiDeleteBin2Line, RiDeleteBin3Line, RiDeleteBin4Line, RiDeleteBin5Line, RiDeleteBin6Line, RiDeleteBin7Line, RiInformationLine } from 'react-icons/ri'

/**
 * @param {{
 *  questions: {
 *    questions: {
 *      type: "input" | "text-area" | "radio" | "check-box" | "dropdown";
 *      options?: string[];
 *      answer: string;
 *      question: string;
 *      img?: File
 *    }[]
 *  }
 * }} param0
 */
const Questions = ({ questions, setQuestions, isTimeBounded, errors }) => {
  const [selectedOption, setSelectedOption] = useState('input')
  const questionImgRefs = useRef([])
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

  const handleQuestionImageChange = (/** @type {import('react').ChangeEvent<HTMLInputElement>} */ event, questionIndex) => {
    const updatedQuestions = { ...questions }

    updatedQuestions.questions[questionIndex].img = event.target.files[0]

    setQuestions(updatedQuestions)
  }

  const handleQuestionImageRemove = (index) => {
    const updatedQuestions = { ...questions }
    updatedQuestions.questions[index].img = undefined

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
    <div className="space-y-5">
      {questions.questions.map((question, index) => (
        <div className="rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]">
          <div className="items-top mb-5 grid grid-cols-[1fr_2fr] gap-8" key={index}>
            {/* Question Type Selector */}
            <div>
              <p className="mb-2.5 mt-[25px] text-18px font-black text-text-black">Question {index + 1}</p>
              <select className="w-full rounded-[4px] border border-[#d1d1d1] p-2.5 text-16px" value={question.type || selectedOption} onChange={(event) => handleOptionChange(event, index)} fullWidth>
                {isTimeBounded ? (
                  <>
                    <option value="radio">Radio Button</option>
                    <option value="check-box">Checkboxes</option>
                    <option value="dropdown">Dropdown</option>
                  </>
                ) : (
                  <>
                    <option value="input">Text Box</option>
                    <option value="text-area">Text Area</option>
                    <option value="radio">Radio Button</option>
                    <option value="check-box">Checkboxes</option>
                    <option value="dropdown">Dropdown</option>
                  </>
                )}
              </select>

              <p className={'mt-1 ' + COLORS.gray}>
                <RiInformationLine className="inline align-text-bottom text-[1.1em]" /> Question Type
              </p>
            </div>

            {/* Question and Input Fields */}
            <div>
              <QuestionInput
                question={question}
                placeholder="Enter your question"
                value={question.question}
                onChange={(event) => handleQuestionChange(event, index)}
                endSlot={
                  question.img ? (
                    <button type="button" onClick={() => handleQuestionImageRemove(index)}>
                      <RiDeleteBin7Line fontSize={'1.2em'} color="inherit" />
                    </button>
                  ) : (
                    <label className="flex" onChange={(event) => handleQuestionImageChange(event, index)}>
                      <RiAttachmentLine fontSize={'1.2em'} color="inherit" />
                      <input hidden type="file" accept="image/*" />
                    </label>
                  )
                }
              />

              {question.type === 'input' && <div>{isTimeBounded === true && <TextField margin="normal" fullWidth variant="outlined" placeholder="Answer" value={question.answer} onChange={(event) => handleInputAnswerChange(event, index)} />}</div>}

              {question.type === 'text-area' && <div>{isTimeBounded === true && <TextField fullWidth margin="normal" variant="outlined" multiline placeholder="Answer" rows={4} value={question.answer} onChange={(event) => handleAnswerChange(event, index)} />}</div>}

              {question.type === 'radio' && (
                <div className="pt-2">
                  <RadioGroup>
                    {question.options.map((item, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
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
                </div>
              )}
              {question.type === 'dropdown' && (
                <div className="pt-1">
                  <Select
                    className={'my-[15px] w-full ' + (!isTimeBounded && '!hidden')}
                    labelId={`demo-simple-select-label-${index}`}
                    id={`demo-simple-select-${index}`}
                    value={isTimeBounded === false ? question.options[0] : question.answer}
                    onChange={(event) => handleAnswerChange(event, index)}
                    disabled={isTimeBounded === false}
                  >
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
                </div>
              )}

              {errors?.find(([_index]) => _index === index)?.[1] && (
                <p className="text-small mt-2 text-red-500">
                  <RiInformationLine className="inline align-text-bottom text-[1.1em]" />
                  {errors.find(([_index]) => _index === index)[1]}
                </p>
              )}

              {['radio', 'check-box', 'dropdown'].includes(question.type) && (
                <div className="-ml-3 flex cursor-pointer items-center rounded-md pl-3 hover:bg-paper">
                  {/* Checkbox Option */}
                  <FormControlLabel className="!cursor-pointer" value={'add new option'} control={question.type === 'radio' ? <Radio /> : <Checkbox />} label={<span className="text-primary">Add new option</span>} onClick={() => handleAddOption(index)} disabled />
                </div>
              )}

              <div className="mt-5 flex">
                {/* Add New Question Button */}
                <button hidden={index !== questions.questions.length - 1} className={'text-primary ' + ''} onClick={addNewQuestion}>
                  <RiAddLine className="text- inline" /> Add New Question
                </button>

                {/* Delete Question Button */}
                <button className="ml-auto text-[1.2em]" variant="contained" onClick={() => handleDeleteQuestion(index)}>
                  <RiDeleteBin7Line />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div hidden={questions.questions.length} className="rounded-lg bg-white px-5 py-10 shadow-[0px_2px_3px_#00000029]">
        <button className={'text-primary '} onClick={addNewQuestion}>
          <RiAddLine className="text- inline" /> Add New Question
        </button>
      </div>
    </div>
  )
}

function QuestionInput({ endSlot, question: { img }, ...props }) {
  const [objectUrl, setObjectURL] = React.useState('')
  useEffect(() => {
    if (!img) {
      setObjectURL('')
      return
    }
    const url = URL.createObjectURL(img)
    setObjectURL(url)

    return () => URL.revokeObjectURL(url)
  }, [img])

  return (
    <>
      <div className="flex items-center border-b border-[#d1d1d1] focus-within:border-primary ">
        <input className="w-full px-0.5 py-2.5 text-16px outline-none " {...props} />
        {endSlot}
      </div>

      {objectUrl && (
        <div className="border-b border-[#d1d1d1] pb-2.5">
          <img className="mt-2.5 w-full rounded-md" src={objectUrl} alt="question img" />
        </div>
      )}
    </>
  )
}

export default Questions
