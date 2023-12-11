import * as React from 'react'
import { Link } from 'react-router-dom'
import Questions from './steps/Questions'
import SelectParticipants from './steps/SelectParticipants'
import RuleAndRewards from './steps/RuleAndRewards'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import QuizDetails from '@/components/QuizPoll/steps/QuizDetails'
import { api } from '@/api'

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
  } else if (quiz.title.length > 75) {
    errors.push(['title', 'Quiz Title should be less than or 75 characters'])
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

    if (['radio', 'check-box', 'dropdown'].includes(question.type) && question.options.length < 2) {
      errors.push([i, 'Must have at least one options'])
    }

    if (['radio', 'check-box', 'dropdown'].includes(question.type) && question.answer.length === 0) {
      errors.push([i, 'Must have answer filled'])
    }
  })
  return errors
}

function handleValidateParticipants(quiz) {
  const errors = []

  if (quiz.participantType === 'teams' && quiz.teams.length < 2) {
    errors.push(['teams', 'Must have at least two participant in teams'])
  } else if (quiz.participantType === 'individual' && quiz.individuals.length < 2) {
    errors.push(['individual', 'Must have at least two participant in individual'])
  }

  if (quiz.participantType === 'groups' && quiz.groups.length < 1) {
    errors.push(['groups', 'Must have at least one groups'])
  }

  if (quiz.participantType === 'groups') {
    quiz.groups.forEach((group, i) => {
      if (group.label === "") {
        errors.push(['groupLabel', 'Must have group name filled'])
      } else if (group.participants.length < 2) {
        errors.push(['groupParticipants', 'Must have at least two participant in Group'])
      }
    })
  }

  return errors
}

function handleValidateRuleNRewards(rulesNRewards) {
  const errors = []

  if (rulesNRewards.participationRewards === false && rulesNRewards.winnerRewards === false) {
    errors.push(['rewards', 'Must select any one Participation Points or Winner Points'])
  } else if (rulesNRewards.participationRewards === true && rulesNRewards.participationRewardsType === '') {
    errors.push(['participationRewardsType', 'Must select participation Type'])
  }

  if (rulesNRewards.participationRewards === true && rulesNRewards.participationRewardsType === "all" && rulesNRewards.allParticipationPoints === 0) {
    errors.push(['allParticipationPoints', 'Points to be given must have greater than 0'])
  } else if (rulesNRewards.participationRewards === true && rulesNRewards.participationRewardsType === "few" && rulesNRewards.unitPoints === 0 && rulesNRewards.units === 0) {
    errors.push(['unitPoints', 'Both values must have greater than 0'])
  }

  if (rulesNRewards.winnerRewards === true && rulesNRewards.assignRulesTime === '') {
    errors.push(['assignRulesTime', 'Must select any one assign rule now or later'])
  } else if (rulesNRewards.winnerRewards === true && rulesNRewards.assignRulesTime === 'now' && rulesNRewards.numberOfWinners === 0) {
    errors.push(['numberOfWinners', 'Number of winners must have greater than 0'])
  }
  
  if (rulesNRewards.assignPointsType === '') {
    errors.push(['assignPointsType', 'Must select any one assign points equal or position based'])
  } else if (rulesNRewards.assignPointsType === 'equal' && rulesNRewards.allWinnerPoints === 0) {
    errors.push(['allWinnerPoints', 'Number of points given must have greater than 0'])
  }

  if (rulesNRewards.assignPointsType === 'positionBased' && rulesNRewards.winnerPositions.length === 0) {
    errors.push(['winnerPositionsLength', 'Must have at least one Winner Position'])
  }

  if (rulesNRewards.assignPointsType === 'positionBased' && rulesNRewards.winnerPositions.length !== 0) {
    rulesNRewards.winnerPositions.forEach((item, i) => {
      if (item.points === 0) {
        errors.push(['winnerPositionsPoint', 'Number of points given must have greater than 0'])
      }
    })
  }

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

      const errors = handleValidateDetails(quiz)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, details: errors }))
        return
      }
    } else if (step === 1) {
      if (quiz.questions.length === 0) {
        toast.error('Your quiz must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(quiz.questions)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      }
    }
    setStep(newValue)
  }

  const [quizId, setQuizId] = React.useState();
  const [quiz, setQuiz] = React.useState({
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
    participantType: '',
    teams: [],
    individuals: [],
    groups: [
      {
        label: '',
        participants: []
      }
    ],
    groupIds: [],
    owner: '',
  })

  const [rulesNRewards, setRulesNRewards] = React.useState({
    participationRewards: false,
    winnerRewards: false,
    assignRulesTime: '',
    participationRewardsType: '',
    assignPointsType: '',
    allParticipationPoints: 0,
    units: 0,
    unitPoints: 0,
    numberOfWinners: 0,
    allWinnerPoints: 0,
    winnerPositions: []
  })

  const handleQuizDetails = async () => {
    try {
      // Create a new FormData object
      const formData = new FormData();

      // Append the data from your state to the FormData object
      formData.append('title', quiz.title);
      formData.append('description', quiz.description);
      formData.append('termsAndConditions', quiz.termsAndConditions);
      formData.append('startDate', quiz.dateAndTime.start);
      formData.append('endDate', quiz.dateAndTime.end);

      // Make an HTTP POST request to your API endpoint
      const response = await api.quizs.details(formData); 
      setQuizId(response.id) 
      // Handle the API response here
      toast.success('Saved successfully');
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
      toast.error('Error:', error.message);
    }
  };

  const saveQuestion = async (questionIndex) => {

    try {
      const data = {
        question: survey.questions[questionIndex].question,
        questionType: survey.questions[questionIndex].type,
        answerOptions: survey.questions[questionIndex].answer
      };

      // Make an HTTP POST request to your API endpoint
      const response = await api.surveys.questions(data, surveyId);
      // Handle the API response here
      toast.success(response.message);

    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    }

  }

  const handleQuizParticipant = async () => {

    try {

      if (quiz.participantType === 'groups') {
        const groupIndex = quiz.groups.length - 1;
        const groupsString = quiz.groups[groupIndex].participants.join(',');
        const groupData = {
          groupName: quiz.groups[groupIndex].label,
          participants: groupsString
        }
        const response = await api.quizs.addGroup(groupData);
        toast.success('Groupe Saved')

        const newGroupId = response.id;
        setQuiz((prev) => ({
          ...prev,
          groupIds: [...prev.groupIds, newGroupId],
        }))
      } else {
        const teamsString = quiz.teams.join(',');
        const individualsString = quiz.individuals.join(',');
        const groupsString = quiz.groupIds.join(',');
        const participantsData = {
          participantType: quiz.participantType,
          teams: teamsString,
          individuals: individualsString,
          groups: groupsString
        };
        await api.quizs.addParticipants(participantsData, quizId);
        toast.success('Saved successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error('Error:', error.message);
    }
  };

  const handleRulesNRewards = async () => {
    try {
      const filteredRulesNRewards = Object.fromEntries(
        Object.entries(rulesNRewards).filter(([key, value]) => value !== "")
      );

      await api.quizs.addRulesAndRewards(filteredRulesNRewards, quizId);
      toast.success('Survey Created Successfully!');
      // navigate(`/survey/published`)
    } catch (error) {
      toast.error(error.message);
    }
  }

  const saveLastQuestion = async () => {
    const questionIndex = quiz.questions.length - 1;

    if (quiz.questions.length > 0) {
      if (quiz.questions[questionIndex].question !== '') {
        saveQuestion(questionIndex)
      } else {
        queErrorCheck();
      }
    }
  }
  
  

  function handleGoNext() {
    console.log(quiz);
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.details
        return { ...prev }
      })

      const errors = handleValidateDetails(quiz)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, details: errors }))
        return
      } else {
        handleQuizDetails();
        setStep((p) => ++p)
      }
    } else if (step === 1) {
      if (quiz.questions.length === 0) {
        toast.error('Your quiz must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(quiz.questions)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      } else {
        saveLastQuestion()
        setStep((p) => ++p)
      }
    } else if (step === 2) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.quizParticipants
        return { ...prev }
      })

      const errors = handleValidateParticipants(quiz)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, quizParticipants: errors }))
        return
      } else {
        handleQuizParticipant();
        setStep((p) => ++p)
      }
    } else {
      console.log(rulesNRewards);
      // clear prev errors
      setErrors((prev) => {
        delete prev.rulesNRewards
        return { ...prev }
      })

      const errors = handleValidateRuleNRewards(rulesNRewards)
      console.log(errors);
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, rulesNRewards: errors }))
        return
      } else {
        handleRulesNRewards();
      }
    }
  }

  function queErrorCheck() {
    if (step === 0) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.details
        return { ...prev }
      })

      const errors = handleValidateDetails(quiz)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, details: errors }))
        return
      } else {
        handleQuizDetails();
      }
    } else if (step === 1) {
      if (quiz.questions.length === 0) {
        toast.error('Your quiz must have questions')
        setErrors((prev) => ({ ...prev, details: errors }))
        return
      } else {
        setStep((p) => ++p)
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(quiz.questions)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      }
    } else if (step === 2) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.quizParticipants
        return { ...prev }
      })

      const errors = handleValidateParticipants(quiz)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, quizParticipants: errors }))
        return
      } else {
        handleQuizParticipant();
      }
    }
  }

  return (
    <>
      <div>
        <section className="flex justify-between px-3 pb-3 mt-0 md:px-0 md:mt-4">
          <p className="text-[20px] font-bold text-text-black">Create Quiz</p>

          {step > 2 && <Link to={`/quiz/preview/${quizId}`} className="rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white">
            Preview
          </Link>}
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
            <QuizDetails details={quiz} setDetails={setQuiz} errors={errors.details} />
          ) : step === 1 ? (
            <Questions questions={quiz} setQuestions={setQuiz} errors={errors.questions} isTimeBounded={quiz.isTimeBounded} queErrorCheck={queErrorCheck} quizId={quizId} handleValidateQuestions={handleValidateQuestions} />
          ) : step === 2 ? (
            <SelectParticipants quiz={quiz} setQuiz={setQuiz} quizId={quizId} errors={errors.quizParticipants} queErrorCheck={queErrorCheck} />
          ) : step === 3 ? (
                  <RuleAndRewards rulesNRewards={rulesNRewards} setRulesNRewards={setRulesNRewards} errors={errors.rulesNRewards} />
          ) : (
            '🚧dev. in progress 🏗️'
          )}
        </section>

        <section className="flex justify-between py-5 px-3 md:py-10 md:px-0">
          <button type="button" className="btn-ghost" onClick={() => setStep((p) => --p)}>
            back
          </button>

          {step < 4 && (<button
            type="button"
            className="btn-ghost bg-primary text-white transition-colors hover:text-primary"
            onClick={handleGoNext}
          >
            {step < 3 ? 'Continue' : 'submit'}
          </button>)}
        </section>
      </div>
    </>
  )
}

export default QuizCreate
