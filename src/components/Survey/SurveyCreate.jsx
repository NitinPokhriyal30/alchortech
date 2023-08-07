import SurveyDetails from '@/components/Survey/steps/SurveyDetails'
import * as React from 'react'
import { Link } from 'react-router-dom'

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

const SurveyCreate = () => {
  const [step, setStep] = React.useState(STEPPER[0].value)

  return (
    <div>
      <section className="mt-4 flex justify-between pl-11">
        <p className="text-[20px] font-bold text-text-black">Create Survey</p>

        <Link to="#" className="rounded-md bg-[#5486E3] px-6 py-2 font-Lato text-white">
          Preview
        </Link>
      </section>

      <section className="flex gap-2 pl-11">
        {STEPPER.map((stepOption, i) => (
          <div className="flex items-center gap-2" key={stepOption.value}>
            <span
              className={
                'inline-block h-0.5 w-[max(100px,_2vw)] bg-text-black' + (i == 0 ? ' hidden' : '')
              }
            ></span>
            <span
              className={
                'inline-flex aspect-square w-[2em] items-center justify-center rounded-full border-2 font-bold  ' +
                (stepOption.value === step
                  ? 'border-primary bg-primary text-white'
                  : 'border-text-black text-text-black')
              }
            >
              {i + 1}
            </span>
            <span
              className={
                'font-semibold ' + (stepOption.value === step ? 'text-primary' : 'text-text-black')
              }
            >
              {stepOption.label}
            </span>
          </div>
        ))}
      </section>

      <div className="px-11 py-6">
        <div className="h-px w-full bg-400" />
      </div>

      <section className="px-6">{step === 0 ? <SurveyDetails /> : '🚧dev. in progress 🏗️'}</section>

      <section className="flex justify-between p-11">
        <button type="button" className="btn-ghost" onClick={() => setStep((p) => --p)}>
          back
        </button>
        <button
          type="button"
          className="btn-ghost bg-primary text-white transition-colors hover:text-primary"
          onClick={() => setStep((p) => ++p)}
        >
          Continue
        </button>
      </section>
    </div>
  )
}

export default SurveyCreate
