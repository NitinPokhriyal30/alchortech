import SurveyDetails from '@/components/Survey/steps/SurveyDetails'
import * as React from 'react'
import { Link } from 'react-router-dom'
import Questions from './steps/Questions'
import SelectParticipants from './steps/SelectParticipants'
import RuleAndRewards from './steps/RuleAndRewards'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { api } from '@/api'
import { getCurrentDateTime } from '@/utils'

const STEPPER = [
  {
    label: 'Survey Details',
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

function handleValidateSurveyDetails(survey) {
  const errors = []

  if (survey.title.length === 0) {
    errors.push(['title', 'Must have a Survey Title'])
  } else if (survey.title.length > 50) {
    errors.push(['title', 'Survey Title should be less than or 50 characters'])
  }

  if (survey.description.length === 0) {
    errors.push(['description', 'Must have a Survey Description'])
  } else if (survey.description.split(" ").length > 150) {
    errors.push(['description', 'Survey Description should be less than or 150 words'])
  }

  if (survey.dateAndTime.start >= survey.dateAndTime.end) {
    errors.push(['dateAndTime', 'Survey EndDate always greater than StartDate'])
  }

  if (survey.termsAndConditions.length === 0) {
    errors.push(['termsAndConditions', 'Must have a Survey Terms and Conditions'])
  } else if (survey.termsAndConditions.split(" ").length > 150) {
    errors.push(['description', 'Survey Term & Conditions should be less than or 150 words'])
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
  })
  return errors
}

const SurveyCreate = () => {
  const [step, setStep] = React.useState(STEPPER[0].value)
  const [errors, setErrors] = React.useState({})

  const handleStepClick = (newValue) => {
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.surveyDetails
        return { ...prev }
      })

      const errors = handleValidateSurveyDetails(survey)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, surveyDetails: errors }))
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
    setStep(newValue);
  };

  const [survey, setServey] = React.useState({
    title: '',
    description: '',
    dateAndTime: {
      start: getCurrentDateTime(),
      end: getCurrentDateTime(),
    },
    termsAndConditions: '',
    isTimeBounded: false,
    questions: [],
  })

  const handleSurveyDetails = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append the data from your state to the FormData object
      formData.append('title', survey.title);
      formData.append('description', survey.description);
      formData.append('termsAndConditions', survey.termsAndConditions);
      formData.append('startDate', survey.dateAndTime.start);
      formData.append('endDate', survey.dateAndTime.end);

      // Make an HTTP POST request to your API endpoint
      const response = await api.surveys.details(formData);

      console.log(response);
      // Handle the API response here
      // toast.success('Saved successfully');
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
      toast.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  function handleGoNext() {
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.surveyDetails
        return { ...prev }
      })

      const errors = handleValidateSurveyDetails(survey)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, surveyDetails: errors }))
        return
      } else {
        handleSurveyDetails();
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

  function queErrorCheck() {
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.surveyDetails
        return { ...prev }
      })

      const errors = handleValidateSurveyDetails(survey)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, surveyDetails: errors }))
        return
      } else {
        handleSurveyDetails();
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
  }

  return (
    <>
      <div>
        <section className="md:mt-2 flex justify-between p-3 md:px-0">
          <p className="text-[20px] font-bold text-text-black">Create Survey</p>

          <Link to="#" className="rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white">
            Preview
          </Link>
        </section>

        <section className="hidden md:flex gap-2 px-3 py-5 md:px-0">
          {STEPPER?.map((stepOption, i) => (
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

        <div className="px-3 pb-2 md:px-0">
          <div className="h-px w-full bg-400" />
        </div>

        <section className="px-3 md:px-0">
          {step === 0 ? (
            <SurveyDetails surveyDetails={survey} setSurveyDetails={setServey} errors={errors.surveyDetails} />
          ) : step === 1 ? (
              <Questions questions={survey} setQuestions={setServey} errors={errors.questions} isTimeBounded={survey.isTimeBounded} queErrorCheck={queErrorCheck} />
          ) : step === 2 ? (
            <SelectParticipants />
          ) : step === 3 ? (
            <RuleAndRewards />
          ) : (
            '🚧dev. in progress 🏗️'
          )}
        </section>

        {/* <section className="px-3 md:px-0">
          testing
        </section> */}

        <section className="flex justify-between py-5 px-3 md:py-10 md:px-0">
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

export default SurveyCreate