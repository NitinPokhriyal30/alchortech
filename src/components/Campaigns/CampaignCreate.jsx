import CampaignDetails from '@/components/Campaigns/CampaignDetails'
import CampaignParticipants from '@/components/Campaigns/CampaignParticipants'
import RulesnRewards from '@/components/Campaigns/RulesnRewards'
import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const STEPPER = [
    {
        label: 'Campaign Details',
        value: 0,
    },
    {
        label: 'Select Participants',
        value: 1,
    },
    {
        label: 'Rules & Rewards',
        value: 2,
    },
]

const CampaignCreate = () => {
    const navigate = useNavigate();

  
    const [step, setStep] = React.useState(STEPPER[0].value)
    const [errors, setErrors] = React.useState({})

    

    const [campaigns, setCampaigns] = React.useState({
        campaignName: '',
        coverImage: '',
        bannerImage: '',
        description: '',
        dateAndTime: {
          start: '',
          end: '',
        },
        termsAndConditions: '',
        attachedDocument: '',
        participants: [],
        groups: [
            {
                label: '',
                participants: []
            }
        ],
        owner: '',
      })

    const handleStepClick = (newValue) => {
        setStep(newValue);
    };

    React.useEffect(() => {
        console.log(campaigns);

    }, )
    

    return (
        <div className='w-full'>
            <section className="mt-4 flex justify-between mx-6">
                <p className="text-[20px] font-bold text-text-black">Create Campaign</p>

                <button
                    type="button"
                    className="bg-primary text-white hover:text-black py-2 px-8 rounded-md"
                    onClick={() => navigate('/campaign/preview', { state: { campaignData: campaigns } })}
                >
                    View Campaign
                </button>
            </section>

            <section className="flex gap-2 mx-6">
                {STEPPER.map((stepOption, i) => (
                    <div className="md:flex items-center gap-2 hidden" key={stepOption.value}>
                        <Link
                            to="#" // Replace "#" with the actual route for each step
                            onClick={() => handleStepClick(stepOption.value)}
                            className="flex items-center gap-2"
                        >
                            <span
                                className={
                                    'inline-block h-0.5 w-[max(100px,_2vw)] bg-text-black' + (i === 0 ? ' hidden' : '')
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
                                    'font-semibold ' +
                                    (stepOption.value === step ? 'text-primary' : 'text-text-black')
                                }
                            >
                                {stepOption.label}
                            </span>
                        </Link>
                    </div>
                ))}
            </section>

            <div className="px-11 py-6">
                <div className="h-px w-full bg-400" />
            </div>

            <section className="px-6">
                {step === 0 ? 
                    <CampaignDetails  campaignDetails={campaigns} setCampaignDetails={setCampaigns} errors={errors.campaignDetails}
                /> : null}
                {step === 1 ? 
                    <CampaignParticipants campaigns={campaigns} setCampaigns={setCampaigns} errors={errors.participants}
                    /> : null}
                {step === 2 ? <RulesnRewards /> : null}
            </section>
            

            <section className="flex justify-end gap-3 p-11">
                <button
                    type="button"
                    className="text-[#ACACAC] hover:text-black border border-[#ACACAC] py-2 px-8 rounded-md"
                    onClick={() => setStep((p) => Math.max(p - 1, 0))}
                >
                    Go Back
                </button>
                <button
                    type="button"
                    className="bg-primary text-white hover:text-black py-2 px-8 rounded-md"
                    onClick={() => setStep((p) => Math.min(p + 1, STEPPER.length - 1))}
                >
                    Continue
                </button>
            </section>
        </div>
    )
}

export default CampaignCreate
