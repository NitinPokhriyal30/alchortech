import * as React from 'react'
import { Link } from 'react-router-dom'
import Questions from './steps/Questions'
import SelectParticipants from './steps/SelectParticipants'
import RuleAndRewards from './steps/RuleAndRewards'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import QuizDetails from '@/components/QuizPoll/steps/QuizDetails'

const STEPPER = [
  {
    label: 'Quiz Details',
    value: 0,
  },
  {
    label: 'Questions',
    value: 1,
  },
  {
    label: 'Select Participants',
    value: 2,
  },
  {
    label: 'Rules & Rewards',
    value: 3,
  },
]

function handleValidateDetails(quiz) {
  const errors = []

  if (quiz.title.length === 0) {
    errors.push(['title', 'Must have a Quiz Title'])
  } else if (quiz.title.length > 50) {
    errors.push(['title', 'Quiz Title should be less than or 50 characters'])
  }

  if (quiz.description.length === 0) {
    errors.push(['description', 'Must have a Quiz Description'])
  } else if (quiz.description.split(' ').length > 150) {
    errors.push(['description', 'Quiz Description should be less than or 150 words'])
  }

  if (quiz.dateAndTime.start >= quiz.dateAndTime.end) {
    errors.push(['dateAndTime', 'Quiz EndDate always greater than StartDate'])
  }

  if (quiz.termsAndConditions.length === 0) {
    errors.push(['termsAndConditions', 'Must have a Quiz Terms and Conditions'])
  } else if (quiz.termsAndConditions.split(' ').length > 150) {
    errors.push(['description', 'Quiz Term & Conditions should be less than or 150 words'])
  }

  if (quiz.timing.duration == '' || +quiz.timing.duration <= 0) {
    errors.push(['duration', 'Must have a Quiz Duration'])
  } else if (+quiz.timing.duration > 1000) {
    errors.push(['duration', 'Quiz Duration should be less than or 900 minutes'])
  }

  return errors
}

function handleValidateQuestions(questions) {
  const errors = []
  questions.forEach((question, i) => {
    if (question.question.length === 0) {
      errors.push([i, 'Must have question filled'])
    }

    if (['radio', 'check-box', 'dropdown'].includes(question.type) && question.options.length === 0) {
      errors.push([i, 'Must have at least one options'])
    }

    if (['radio', 'check-box', 'dropdown'].includes(question.type) && question.answer.length === 0) {
      errors.push([i, 'Must have answer filled'])
    }
  })
  return errors
}

const QuizCreate = () => {
  const [step, setStep] = React.useState(STEPPER[0].value)
  const [errors, setErrors] = React.useState({})

  const handleStepClick = (newValue) => {
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.details
        return { ...prev }
      })

      const errors = handleValidateDetails(survey)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, details: errors }))
        return
      }
    } else if (step === 1) {
      if (survey.questions.length === 0) {
        toast.error('Your survey must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(survey.questions)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      }
    }
    setStep(newValue)
  }

  const [survey, setServey] = React.useState({
    title: '',
    description: '',
    dateAndTime: {
      start: '',
      end: '',
    },
    termsAndConditions: '',
    isTimeBounded: true,
    timing: {
      duration: '5',
      forceSubmit: 'yes',
    },
    questions: [],
  })

  function handleGoNext() {
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.details
        return { ...prev }
      })

      const errors = handleValidateDetails(survey)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, details: errors }))
        return
      }
    } else if (step === 1) {
      if (survey.questions.length === 0) {
        toast.error('Your survey must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(survey.questions)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      }
    }

    setStep((p) => ++p)
  }

  return (
    <>
      <div>
        <section className="mt-4 flex justify-between px-4 md:pl-11">
          <p className="text-[20px] font-bold text-text-black">Create Quiz</p>

          <Link to="#" className="rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white">
            Preview
          </Link>
        </section>

        <section className="hidden md:flex gap-2 pl-11">
          {STEPPER.map((stepOption, i) => (
            <div className="flex items-center gap-2" key={stepOption.value}>
              <Link
                to="#" // Replace "#" with the actual route for each step
                onClick={() => handleStepClick(stepOption.value)}
                className="flex items-center gap-2"
              >
                <span className={'inline-block h-0.5 w-[max(100px,_2vw)] bg-text-black' + (i == 0 ? ' hidden' : '')}></span>
                <span className={'inline-flex aspect-square w-[2em] items-center justify-center rounded-full border-2 font-bold  ' + (stepOption.value === step ? 'border-primary bg-primary text-white' : 'border-text-black text-text-black')}>{i + 1}</span>
                <span className={'font-semibold ' + (stepOption.value === step ? 'text-primary' : 'text-text-black')}>{stepOption.label}</span>
              </Link>
            </div>
          ))}
        </section>

        <div className="px-11 py-6">
          <div className="h-px w-full bg-400" />
        </div>

        <section className="px-6">
          {step === 0 ? (
            <QuizDetails details={survey} setDetails={setServey} errors={errors.details} />
          ) : step === 1 ? (
            <Questions questions={survey} setQuestions={setServey} errors={errors.questions} isTimeBounded={survey.isTimeBounded} />
          ) : step === 2 ? (
            <SelectParticipants />
          ) : step === 3 ? (
            <RuleAndRewards />
          ) : (
            '🚧dev. in progress 🏗️'
          )}
        </section>

        <section className="flex justify-between p-11">
          <button type="button" className="btn-ghost" onClick={() => setStep((p) => --p)}>
            back
          </button>
          {step < 3 ? (
            <button type="button" className="btn-ghost bg-primary text-white transition-colors hover:text-primary" onClick={handleGoNext}>
              Continue
            </button>
          ) : (
            <button type="button" className="btn-ghost bg-primary text-white transition-colors hover:text-primary">
              submit
            </button>
          )}
        </section>
      </div>
    </>
  )
}

export default QuizCreate
