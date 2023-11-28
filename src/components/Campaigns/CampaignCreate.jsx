import React, { useState, useEffect } from 'react'
import CampaignDetails from '@/components/Campaigns/steps/CampaignDetails'
import CampaignParticipants from '@/components/Campaigns/steps/CampaignParticipants'
import RulesnRewards from '@/components/Campaigns/steps/RulesnRewards'
import CampaignPublished from './CampaignPublished'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader';
import { toast } from 'react-toastify';


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

function handleValidateCampaignDetails(campaigns) {
    const errors = []

    if (campaigns.campaignName.length === 0) {
        errors.push(['campaignName', 'Must have a Campaign Name'])
    } else if (campaigns.campaignName.length > 50) {
        errors.push(['campaignName', 'Campaign Title should be less than or 50 characters'])
    }

    if (!campaigns.coverImage) {
        errors.push(['coverImage', 'Must select a Cover Image']);
    }

    if (!campaigns.bannerImage) {
        errors.push(['bannerImage', 'Must select a Banner Image']);
    }

    if (!campaigns.startDate) {
        errors.push(['startDate', 'Must select a Start Date']);
    }

    if (campaigns.description.length === 0) {
        errors.push(['description', 'Must have a  Description'])
    } else if (campaigns.description.split(" ").length > 150) {
        errors.push(['description', 'Campaign Description should be less than or 150 words'])
    }


    if (campaigns.termsAndConditions.length === 0) {
        errors.push(['termsAndConditions', 'Must have a campaign Terms and Conditions'])
    } else if (campaigns.termsAndConditions.split(" ").length > 150) {
        errors.push(['description', 'Campaign Term & Conditions should be less than or 150 words'])
    }

    return errors
}

const CampaignCreate = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('campaignId');
    const navigate = useNavigate();
    const [step, setStep] = React.useState(STEPPER[0].value)
    const [errors, setErrors] = React.useState({})
    const [campaignId, setCampaignId] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false)
    const [campaigns, setCampaigns] = React.useState({
        campaignName: '',
        coverImage: '',
        bannerImage: '',
        description: '',
        startDate: '',
        endDate: '',
        isEvent: false,
        eventDate: '',
        termsAndConditions: '',
        attachedDocuments: '',
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

    useEffect(() => {
        const fetchCampaignData = async () => {
        if (id) {
                try {
                    const response = await api.campaigns.campaignDetails(id) 
                    setCampaigns({
                        campaignName: response.name,
                        coverImage: response.cover_image,
                        bannerImage: response.banner_image,
                        description: response.description,
                        startDate: response.start_date,
                        endDate: response.end_date,
                        eventDate: response.event_date,
                        termsAndConditions: response.terms_and_conditions,
                        attachedDocuments: response.attachment,  
                        })
                        } catch (error) {
                        console.error('Error fetching campaign data:', error);
                        } finally {
                        setIsLoading(false);
                    }
                }
    }
    fetchCampaignData();       
    }, [id]);
   

    const [rulesNRewards, setRulesNRewards] = React.useState({
        participationRewards: false,
        winnerRewards: false,
        allParticipationPoints: '',
        units: '',
        unitPoints: '',
        numberOfWinners: '',
        allWinnerPoints: '',
        winnerPositions: []
    })

    const handleStepClick = (newValue) => {
        if (step === 0) {
            setErrors((prev) => {
                delete prev.campaignDetails;
                return { ...prev };
            });

            const errors = handleValidateCampaignDetails(campaigns);
            if (errors.length > 0) {
                console.error('Your details have some errors:', errors);
                setErrors((prev) => ({ ...prev, campaignDetails: errors }));
                return;
            }
        }
        setStep(newValue);
    };

    const handleContinueClick = async () => {
        if (step === 0) {
            const validationErrors = handleValidateCampaignDetails(campaigns);
            if (validationErrors.length > 0) {
                const errorObject = {};
                validationErrors.forEach(([field, message]) => {
                    errorObject[field] = message;
                });
                setErrors(errorObject)
                toast.error('Campaign details have errors');
                return;
            }
            try {
                setIsLoading(true)
                const response = await api.campaigns.create(campaigns);
                setCampaignId(response.id)
                setStep((p) => Math.min(p + 1, STEPPER.length - 1))
                toast.success('Saved as draft')

            } catch (error) {
                console.error('Error creating campaign:', error);
            } finally {
                setIsLoading(false)
            }
        } else if (step === 1) {
            try {
                setIsLoading(true)
                const teamsString = campaigns.teams.join(',');
                const individualsString = campaigns.individuals.join(',');
                const groupsString = campaigns.groupIds.join(',');
                const participantsData = {
                    participantType: campaigns.participantType,
                    teams: teamsString,
                    individuals: individualsString,
                    groups: groupsString
                };
                await api.campaigns.addParticipants(participantsData, campaignId);
                setStep((p) => Math.min(p + 1, STEPPER.length - 1))
                toast.success('Saved')
            } catch (error) {
                console.error('Error creating campaign:', error);
            } finally {
                setIsLoading(false)
            }
        } else {
            try {
                setIsLoading(true);
                const filteredRulesNRewards = Object.fromEntries(
                    Object.entries(rulesNRewards).filter(([key, value]) => value !== "")
                );
    
                await api.campaigns.addRulesAndRewards(filteredRulesNRewards, campaignId);
                toast.success('Campaign Created Successfully!');
                navigate(`/campaign/published`)
            } catch (error) {
               toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    React.useEffect(() => {
        console.log(rulesNRewards);
    },)


    return (
        <div className='w-full'>
            <section className="mt-4 flex justify-between mx-6">
                <p className="text-[20px] font-bold text-text-black">Create Campaign</p>

                <button
                    type="button"
                    className="bg-primary text-white hover:text-black py-2 px-8 rounded-md"
                    onClick={() => {
                        if (campaignId === undefined) {
                            toast.error('Submit campaign details before previewing.');
                        } else {
                            navigate(`/campaign/preview?campaignId=${campaignId}`);
                        }
                    }}
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
                    <CampaignDetails campaignDetails={campaigns} setCampaignDetails={setCampaigns} errors={errors} clearError={setErrors}
                    /> : null}
                {step === 1 ?
                    <CampaignParticipants campaigns={campaigns} setCampaigns={setCampaigns} errors={errors} campaignId={campaignId}
                    /> : null}
                {step === 2 ? <RulesnRewards rulesNRewards={rulesNRewards} setRulesNRewards={setRulesNRewards} /> : null}
            </section>


            <section className="flex justify-end gap-3 p-11">
                <button
                    type="button"
                    className="text-[#ACACAC] hover:text-black border border-[#ACACAC] py-2 px-8 rounded-md"
                    onClick={() => setStep((p) => --p)}
                >
                    Go Back
                </button>
                <button
                    type="button"
                    className="bg-primary text-white hover:text-black py-2 px-10 rounded-md"
                    onClick={handleContinueClick}
                >
                    {step < 2 ? 'Continue' : 'Create'}
                </button>
            </section>
        </div>
    )
}

export default CampaignCreate