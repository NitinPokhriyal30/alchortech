import SurveyDetails from '@/components/Survey/steps/SurveyDetails'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Questions from './steps/Questions'
import SelectParticipants from './steps/SelectParticipants'
import RuleAndRewards from './steps/RuleAndRewards'
import { toast } from 'react-toastify'
import dayjs from 'dayjs'
import { api } from '@/api'
import { getCurrentDateTime } from '@/utils'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom';

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

const NEW_QUESTION_INITIAL = {
  type: "radio",
  options: ["option1"],
  answer: "",
  question: "",
  img: undefined,
}

const SurveyCreate = () => {

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

  function handleValidateQuestions(questions, newQuestion) {
    const errors = []
    // questions.forEach((question, i) => {
    //   if (question.question.length === 0) {
    //     errors.push(['questionTitle', 'Must have question filled'])
    //   }

    //   if (['radio', 'checkbox', 'dropdown'].includes(question.type) && question.options.length < 2) {
    //     errors.push(['questionOptions', 'Must have at least two options'])
    //   }
    // })

    if (newQuestion.question === '' && showQuestionForm === true) {
      errors.push(['questionFormTitle', 'Must have question filled'])
    } else if (newQuestion.type === 'radio' || newQuestion.type === 'checkbox' || newQuestion.type === 'dropdown' ) {
      if (newQuestion.options.length < 2 && showQuestionForm === true) {
        errors.push(['questionFormOptions', 'Must have at least two options'])
      }
    }
    return errors

  }

  function handleValidateParticipants(survey) {
    const errors = []

    if (survey.participantType === 'teams' && survey.teams.length < 2) {
      errors.push(['teams', 'Must have at least two participant in teams'])
    } else if (survey.participantType === 'individual' && survey.individuals.length < 2) {
      errors.push(['individual', 'Must have at least two participant in individual'])
    }

    if (survey.participantType === 'groups' && survey.groups.length < 1) {
      errors.push(['groups', 'Must have at least one groups'])
    }

    if (survey.participantType === 'groups') {
      survey.groups.forEach((group, i) => {
        if (group.label === "") {
          errors.push(['groupLabel', 'Must have group name filled'])
        } else if (group.participants.length < 2) {
          errors.push(['groupParticipants', 'Must have at least two participant in Group'])
        }
      })
    }

    return errors
  }

  function handleValidateRules(rulesNRewards) {
    const errors = []

    if (rulesNRewards.participationRewards === false) {
      errors.push(['participationRewards', 'Must select participation Points'])
    } else if (rulesNRewards.participationRewardsType === '') {
      errors.push(['participationRewardsType', 'Must select participation Type'])
    } else if (rulesNRewards.participationRewards === true && rulesNRewards.participationRewardsType === "all" && rulesNRewards.allParticipationPoints === 0) {
      errors.push(['allParticipationPoints', 'Points to be given must have greater than 0'])
    }

    if (rulesNRewards.participationRewards === true && rulesNRewards.participationRewardsType === "few" && rulesNRewards.unitPoints === 0 && rulesNRewards.units === 0) {
      errors.push(['unitPoints', 'Both values must have greater than 0'])
    }

    return errors
  }

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
      if (survey.questions.length === 0 && newQuestion.question === '') {
        toast.error('Your survey must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(survey.questions, newQuestion)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      }
    } else if (step === 2) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.surveyParticipants
        return { ...prev }
      })

      const errors = handleValidateParticipants(survey)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, surveyParticipants: errors }))
        return
      }
    } else if (step === 3) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.surveyRules
        return { ...prev }
      })

      const errors = handleValidateRules(rulesNRewards)
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, surveyRules: errors }))
        return
      }
    }
    setStep(newValue);
  };

  const [surveyId, setSurveyId] = React.useState();
  const [isSaving, setIsSaving] = React.useState(false);
  const [showQuestionForm, setShowQuestionForm] = React.useState(false);
  const [newQuestion, setNewQuestion] = React.useState(NEW_QUESTION_INITIAL);
  const [rulesRewardsIsCreated, setRulesRewardsIsCreated] = React.useState(false);
  const [selectParticipantsIsCreated, setSelectParticipantsIsCreated] = React.useState(false);
  const { id } = useParams()


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

  console.log(survey);

  React.useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const surveyData = await api.surveys.surveyById(id);
        console.log(surveyData);
        setServey({
          ...survey,
          'title': surveyData.title,
          'description': surveyData.description,
          'termsAndConditions': surveyData.terms_and_conditions,
          'dateAndTime': {
            start: surveyData.start_date,
            end: surveyData.end_date,
          },
          'questions': surveyData.questions,
          'participantType': surveyData.participants.participant_type,
          'individuals': surveyData.participants.users?.map(user => user.id) || [],
          'groups': surveyData.participants.groups?.map((item) => ({
            'id': item.id,
            'label': item.name,
            'participants': item.users?.map(user => user.id) || [],
          })) || [
              {
                label: '',
                participants: []
              }
            ]
        });
        setSurveyId(surveyData.id)
      } catch (error) {
        // Handle error
        console.log(error);
      }
    };

    if (id)
      fetchSurveyData();
  }, [id, newQuestion]);

  const [rulesNRewards, setRulesNRewards] = React.useState({
    participationRewards: false,
    participationRewardsType: '',
    allParticipationPoints: '',
    units: '',
    unitPoints: '',
  })

  const navigate = useNavigate();

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
      const response = await api.surveys.createDetails(formData);
      setSurveyId(response.id)
      navigate(`/survey/create/${response.id}`);
      // Handle the API response here
      toast.success('Saved successfully');
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
      toast.error('Error:', error.message);
    }
  };

  const updateSurveyDetails = async () => {
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
      const response = await api.surveys.updateDetails(formData, surveyId);
      // setSurveyId(response.id)
      // Handle the API response here
      toast.success('Survey Details Updated successfully');
    } catch (error) {
      // Handle any errors that occurred during the request
      console.log(error);
      toast.error('Error:', error.message);
    }
  };

  const handleSurveyParticipant = async () => {

    try {

      if (survey.participantType === 'groups') {
        const transformedGroups = survey.groups?.map(group => ({
          name: group.label,
          users: group.participants.join(',')
        }));
        const participantsData = {
          participantType: survey.participantType,
          groups: JSON.stringify(transformedGroups)
        };
        await api.surveys.addParticipants(participantsData, surveyId);
        toast.success('Groupe Saved')

        const newGroupId = response.id;
        setServey((prev) => ({
          ...prev,
          groupIds: [...prev.groupIds, newGroupId],
        }))
      } else {
        const teamsString = survey.teams.join(',');
        const individualsString = survey.individuals.join(',');
        const groupsString = survey.groupIds.join(',');
        const participantsData = {
          participantType: survey.participantType,
          teams: teamsString,
          individuals: individualsString,
          groups: groupsString
        };
        await api.surveys.addParticipants(participantsData, surveyId);
        toast.success('Saved successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error('Error:', error.message);
    }
  };

  const updateSurveyParticipant = async () => {

    try {

      if (survey.participantType === 'group') {
        const groupIndex = survey.groups.length - 1;
        const allGroups = []
        survey.groups.map((item) => {
          const groupsString = item.participants.join(',');
          const groupData = [{
            name: item.label,
            users: groupsString
          }]
          allGroups.push(JSON.stringify(groupData))
        })
        const participantsData = {
          participantType: survey.participantType === 'group' && 'groups',
          groups: allGroups
        }
        console.log(participantsData);
        // api.surveys.addGroup(participantsData, surveyId);
        toast.success('Groupe Saved')

        const newGroupId = response.id;
        setServey((prev) => ({
          ...prev,
          groupIds: [...prev.groupIds, newGroupId],
        }))
      } else {
        const teamsString = survey.teams.join(',');
        const individualsString = survey.individuals.join(',');
        const groupsString = survey.groupIds.join(',');
        const participantsData = {
          participantType: survey.participantType,
          teams: teamsString,
          individuals: individualsString,
          groups: groupsString
        };
        await api.surveys.updateParticipants(participantsData, surveyId);
        toast.success('Survey Participant updated successfully')
      }
    } catch (error) {
      console.log(error);
      toast.error('Error:', error.message);
    }
  };

  const handleSurveyRules = async () => {

    try {
      const filteredRulesNRewards = Object.fromEntries(
        Object.entries(rulesNRewards).filter(([key, value]) => value !== "")
      );

      await api.surveys.addRulesAndRewards(filteredRulesNRewards, surveyId);
      toast.success('Survey Rules & Reward Created Successfully!');
      // navigate(`/survey/published`)
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const updateSurveyRules = async () => {

    try {
      const filteredRulesNRewards = Object.fromEntries(
        Object.entries(rulesNRewards).filter(([key, value]) => value !== "")
      );

      await api.surveys.updateRulesAndRewards(filteredRulesNRewards, surveyId);
      toast.success('Survey Rules & Reward Updated Successfully!');
      // navigate(`/survey/published`)
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const saveQuestion = async (questionIndex) => {
    const question = typeof questionIndex === "object" ? questionIndex : survey.questions[questionIndex];

    try {
      if (question.type !== 'text' && question.type !== 'char') {
        const inputArray = question.options;

        let outputArray = inputArray?.map(function (item) {
          return { "text": item };
        });

        const data = {
          question: question.question,
          questionType: question.type,
          answerOptions: JSON.stringify(outputArray)
        };

        // Make an HTTP POST request to your API endpoint
        const response = await api.surveys.questions(data, surveyId);
        // Handle the API response here
        toast.success(response.message);
      } else {

        const data = {
          question: question.question,
          questionType: question.type,
        };

        // Make an HTTP POST request to your API endpoint
        const response = await api.surveys.questions(data, surveyId);
        // Handle the API response here
        toast.success(response.message);

      }
    } catch (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    } finally {
      // setIsLoading(false);
    }

  }

  const saveLastQuestion = async () => {
    const questionIndex = survey.questions.length - 1;

    if (showQuestionForm !== true) {
    } else {
      setErrors(prev => {
        delete prev.questions
        return { ...prev }
      })
      if (!["text", "char"].includes(newQuestion.type)) {
        if (newQuestion.question !== '' && (newQuestion.options || newQuestion.answer_options)?.length > 1) {
          setIsSaving(true)
          await saveQuestion(newQuestion)
          setServey(prev => ({
            ...prev,
            questions: prev.questions.concat([newQuestion])
          }))
          setIsSaving(false)
          setNewQuestion(NEW_QUESTION_INITIAL)
          setShowQuestionForm(false)
        } else {
          queErrorCheck([newQuestion]);
        }
      } else {
        if (newQuestion.question !== '') {
          setIsSaving(true)
          await saveQuestion(newQuestion)
          setServey(prev => ({
            ...prev,
            questions: prev.questions.concat([newQuestion])
          }))
          setIsSaving(false)
          setNewQuestion(NEW_QUESTION_INITIAL)
          setShowQuestionForm(false)
        } else {
          queErrorCheck([newQuestion]);
        }
      }
      return
    }

    if (survey.questions.length > 0) {
      if (survey.questions[questionIndex].type !== 'text' && survey.questions[questionIndex].type !== 'char') {
        // check for answer_option.length also
        if (survey.questions[questionIndex].question !== '' && survey.questions[questionIndex].options.length > 1) {
          saveQuestion(questionIndex)
        } else {
          queErrorCheck();
        }
      } else {
        if (survey.questions[questionIndex].question !== '') {
          saveQuestion(questionIndex)
        } else {
          queErrorCheck();
        }
      }

    } else {
      queErrorCheck();
    }
  }

  const handleGoNext = async () => {
    if (step === 0) {

      if (surveyId === undefined) {
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
          setStep((p) => ++p)
        }
      } else {
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
          updateSurveyDetails();
          setStep((p) => ++p)
        }
      }

    } else if (step === 1) {
      if (survey.questions.length === 0 && showQuestionForm === false) {
        toast.error('Your survey must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })

      const errors = handleValidateQuestions(survey.questions, newQuestion)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      } else {
        if (showQuestionForm === true) {
          saveLastQuestion()
        }
        setStep((p) => ++p)
      }
    } else if (step === 2) {
      if (selectParticipantsIsCreated) {
        // clear prev errors
        setErrors((prev) => {
          delete prev.surveyParticipants
          return { ...prev }
        })

        const errors = handleValidateParticipants(survey)
        if (errors.length > 0) {
          toast.error('Your details have some errors')
          setErrors((prev) => ({ ...prev, surveyParticipants: errors }))
          return
        } else {
          updateSurveyParticipant();
          setStep((p) => ++p)
        }

      } else {
        // clear prev errors
        setErrors((prev) => {
          delete prev.surveyParticipants
          return { ...prev }
        })

        const errors = handleValidateParticipants(survey)
        if (errors.length > 0) {
          toast.error('Your details have some errors')
          setErrors((prev) => ({ ...prev, surveyParticipants: errors }))
          return
        } else {
          setSelectParticipantsIsCreated(true)
          handleSurveyParticipant();
          setStep((p) => ++p)
        }
      }
    } else if (step === 3) {
      if (rulesRewardsIsCreated) {
        // clear prev errors
        setErrors((prev) => {
          delete prev.surveyRules
          return { ...prev }
        })

        const errors = handleValidateRules(rulesNRewards)
        if (errors.length > 0) {
          console.log(errors);
          toast.error('Your details have some errors')
          setErrors((prev) => ({ ...prev, surveyRules: errors }))
          return
        } else {
          updateSurveyRules();
        }
      } else {
        // clear prev errors
        setErrors((prev) => {
          delete prev.surveyRules
          return { ...prev }
        })

        const errors = handleValidateRules(rulesNRewards)
        if (errors.length > 0) {
          console.log(errors);
          toast.error('Your details have some errors')
          setErrors((prev) => ({ ...prev, surveyRules: errors }))
          return
        } else {
          setRulesRewardsIsCreated(true)
          handleSurveyRules();
        }
      }
    }
  }

  function queErrorCheck(payload) {
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
      if (survey.questions.length === 0 && showQuestionForm === false) {
        toast.error('Your survey must have questions')
        return
      }

      // clear prev errors
      setErrors((prev) => {
        delete prev.questions
        return { ...prev }
      })
      const errors = handleValidateQuestions(survey.questions.concat(payload), newQuestion)
      console.log("x",errors)
      if (errors.length > 0) {
        toast.error('Your question have some errors')
        setErrors((prev) => ({ ...prev, questions: errors }))
        return
      }
    } else if (step === 2) {
      // clear prev errors
      setErrors((prev) => {
        delete prev.surveyParticipants
        return { ...prev }
      })

      const errors = handleValidateParticipants(survey)
      console.log(errors);
      if (errors.length > 0) {
        toast.error('Your details have some errors')
        setErrors((prev) => ({ ...prev, surveyParticipants: errors }))
        return
      }
    }
  }

  return (
    <>
      <div>
        <section className="md:mt-2 flex justify-between p-3 md:px-0">
          <p className="text-[20px] font-bold text-text-black">Create Survey</p>
          {step > 2 && <Link to={`/survey/preview/${surveyId}`} className="rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white">
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
            <SurveyDetails surveyDetails={survey} setSurveyDetails={setServey} errors={errors.surveyDetails} />
          ) : step === 1 ? (
              <Questions questions={survey} setQuestions={setServey} errors={errors.questions} setErrors={setErrors} isTimeBounded={survey.isTimeBounded} queErrorCheck={queErrorCheck} surveyId={surveyId} showQuestionForm={showQuestionForm} setShowQuestionForm={setShowQuestionForm} NEW_QUESTION_INITIAL={NEW_QUESTION_INITIAL} newQuestion={newQuestion} setNewQuestion={setNewQuestion} isSaving={isSaving} setIsSaving={setIsSaving} />
          ) : step === 2 ? (
                <SelectParticipants survey={survey} setServey={setServey} surveyId={surveyId} errors={errors.surveyParticipants} queErrorCheck={queErrorCheck} updateSurveyParticipant={updateSurveyParticipant} />
          ) : step === 3 ? (
            <RuleAndRewards rulesNRewards={rulesNRewards} setRulesNRewards={setRulesNRewards} errors={errors.surveyRules} />
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
            <button type="button" className="btn-ghost bg-primary text-white transition-colors hover:text-primary" onClick={handleGoNext}>
              submit
            </button>
          )}
        </section>
      </div>
    </>
  )
}

export default SurveyCreate





