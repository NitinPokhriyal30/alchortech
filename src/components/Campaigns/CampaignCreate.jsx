import React, { useEffect } from 'react'
import CampaignDetails from '@/components/Campaigns/steps/CampaignDetails'
import CampaignParticipants from '@/components/Campaigns/steps/CampaignParticipants'
import RulesnRewards from '@/components/Campaigns/steps/RulesnRewards'
import { Link, useNavigate } from 'react-router-dom';
import { api } from '@/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import { processAvatarUrl } from '@/utils';
import Spinner from '@/components/Spinner'


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
    const [coverImageUrl, setCoverImageUrl] = React.useState();
    const [bannerImageUrl, setBannerImageUrl] = React.useState();
    const [attachedDocumentUrl, setAttachedDocumentUrl] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false)
    const [isSpinner, setIsSpinner] = React.useState(false)
    const [isDraft, setIsDraft] = React.useState(false)
    const [hasParticipants , setHasParticipants] = React.useState(false)
    const [hasRulesAndRewards, setHasRulesAndRewards] = React.useState(false)
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

    
    const [rulesNRewards, setRulesNRewards] = React.useState({
        participationRewards: false,
        winnerRewards: false,
        isLater: false,
        allParticipationPoints: '',
        units: '',
        unitPoints: '',
        numberOfWinners: '',
        allWinnerPoints: '',
        winnerPositions: [
           
        ],
        assignRule: '',
        pointReceivers: '',
        assignPoints: '',
    })

    useEffect(() => {
        const fetchCampaignData = async () => {
        if (id) {
            setIsLoading(true)
                try {
                    const response = await api.campaigns.campaignDetails(id);
                    console.log("campaign get by id", response)
                    const teamIds = response.participants?.teams?.map(team => team.id.toString());
                    const individualIds = response.participants?.users?.map(user => user.id.toString());
                    const groups = response.participants?.groups?.map(group => ({
                        label: group.name,
                        participants: group.users.map(user => user.id.toString())
                    }));
                    setIsDraft(true);
                    {response.participants.length !== 0 ? setHasParticipants(true) : setHasParticipants(false)}
                    Object.keys(response.rules_and_rewards).length > 0 ? setHasRulesAndRewards(true) : setHasRulesAndRewards(false);
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
                        isEvent: response.is_event,
                        participantType: response.participants?.participant_type,
                        teams: teamIds ? teamIds : [],
                        individuals: individualIds ? individualIds : [],
                        groups: groups ? groups : [],
                        groupIds: [],
                        owner: '',
                        }) 
                        {Object.keys(response.rules_and_rewards).length > 0 &&
                        setRulesNRewards({
                            participationRewards: (
                                response.rules_and_rewards.all_participation_rewards !== null ||
                                response.rules_and_rewards.units !== null ||
                                response.rules_and_rewards.unit_points !== null
                            ),
                            winnerRewards: (
                                response.rules_and_rewards.later !== null ||
                                response.rules_and_rewards.number_of_winners !== null ||
                                response.rules_and_rewards.all_winner_points !== null
                            ),
                            isLater: response.rules_and_rewards.later,
                            assignRule: response.rules_and_rewards.later  ? "later" : "now" ,
                            pointReceivers: ( response.rules_and_rewards.all_participation_rewards !== null ? "all" : "few" ),
                            assignPoints :  (response.rules_and_rewards.all_winner_points !== null ? "equal" : "positionBased"),
                            allParticipationPoints: response.rules_and_rewards.all_participation_rewards,
                            units: response.rules_and_rewards.units || '',
                            unitPoints: response.rules_and_rewards.unit_points || '',
                            numberOfWinners: response.rules_and_rewards.number_of_winners || '',
                            allWinnerPoints: response.rules_and_rewards.all_winner_points || '',
                            winnerPositions: [], 
                        })}
                    
                    console.log("Updaterdrcfg", campaigns)
                    setCoverImageUrl(processAvatarUrl(response.cover_image))
                    setBannerImageUrl(processAvatarUrl(response.banner_image))
                    setAttachedDocumentUrl(response.attachment)
                    } catch (error) {
                        console.error('Error fetching campaign data:', error);
                    } finally {
                        setIsLoading(false);
                    }
                }

                
    }
    fetchCampaignData();       
    }, [id, campaignId, step]);
   

    const handleStepClick = (newValue) => {
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
        setStep(newValue);
    };

    const handleContinueClick = async () => {
        if (step === 0) {
            if (id) {
                try {
                    setIsSpinner(true)
                    const response = await api.campaigns.update(campaigns, id);
                    setCampaignId(response.id);
                    setIsDraft(true);
                    setStep((p) => Math.min(p + 1, STEPPER.length - 1));
                    navigate(`/campaign/create${response.id ? `?campaignId=${response.id}` : ''}`);
                    toast.success('Campaign details updated successfully!');
                } catch (error) {
                    console.error('Error updating campaign details:', error);
                } finally {
                    setIsSpinner(false);
                }
            } else {
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
                setIsSpinner(true)
                const response = await api.campaigns.create(campaigns);
                setCampaignId(response.id)
                setIsDraft(true)
                setStep((p) => Math.min(p + 1, STEPPER.length - 1))
                navigate(`/campaign/create${response.id ? `?campaignId=${response.id}` : ''}`)
                toast.success('Saved as draft')

            } catch (error) {
                console.error('Error creating campaign:', error);
            } finally {
                setIsSpinner(false)
            }
            }
 
        } else if (step === 1) {
            try {
                setIsSpinner(true)
                const teamsString = campaigns.teams.join(',');
                const individualsString = campaigns.individuals.join(',');
                const transformedGroups = campaigns.groups.map(group => ({
                    name: group.label,
                    users: group.participants.join(',')
                  }));
                const participantsData = {
                    participantType: campaigns.participantType,
                    teams: teamsString,
                    individuals: individualsString,
                    groups: JSON.stringify(transformedGroups)
                };
                if (hasParticipants) {
                    await api.campaigns.updateParticipants(participantsData, id);
                    toast.success('Participants updated successfully!')
                } else {
                    await api.campaigns.addParticipants(participantsData, campaignId);
                    setHasParticipants(true)
                    toast.success('Participants Saved!')
                }
                setStep((p) => Math.min(p + 1, STEPPER.length - 1))
                
            } catch (error) {
                console.error('Error creating campaign:', error);
            } finally {
                setIsSpinner(false)
            }
        } else {
            try {
                setIsLoading(true);
                const filteredRulesNRewards = Object.fromEntries(
                    Object.entries(rulesNRewards).filter(([key, value]) => {
                        if (key === "winnerPositions" && Array.isArray(value) && value.length === 0) {
                            return false;
                        }
                        if (typeof value === 'boolean') {
                            return value;
                        }
                        return value !== "";
                    })
                );
                filteredRulesNRewards.winnerPositions = JSON.stringify(filteredRulesNRewards.winnerPositions);
                if (filteredRulesNRewards.assignRule === "later"){
                    filteredRulesNRewards.later = true;
                }
                if (hasRulesAndRewards) {
                   await api.campaigns.updateRulesAndRewards(filteredRulesNRewards, id);
                   toast.success('Campaign Updated Successfully!');
                } else {
                    await api.campaigns.addRulesAndRewards(filteredRulesNRewards, campaignId);
                    setHasRulesAndRewards(true)
                    toast.success('Campaign Created Successfully!');
                }
                navigate(`/campaign/published`)
            } catch (error) {
               toast.error(error.message);
               console.log("Not working")
            } finally {
                setIsLoading(false);
            }
        }
    };

    React.useEffect(() => {
        console.log(campaigns);
    }, [campaigns])


    return (
    
    <div>
    {
       isLoading && <Loader />
    }
    { !isLoading &&
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
                        to={`/campaign/create${id ? `?campaignId=${id}` : ''}`}
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
                <CampaignDetails 
                campaignDetails={campaigns} 
                setCampaignDetails={setCampaigns} 
                coverImageUrl={coverImageUrl} 
                bannerImageUrl={bannerImageUrl} 
                attachedDocumentUrl= {attachedDocumentUrl} 
                errors={errors} 
                clearError={setErrors}
                /> : null}
            {step === 1 ?
                <CampaignParticipants campaigns={campaigns} setCampaigns={setCampaigns} errors={errors} campaignId={campaignId}
                /> : null}
            {step === 2 ? <RulesnRewards rulesNRewards={rulesNRewards} setRulesNRewards={setRulesNRewards} /> : null}
        </section>


        <section className="flex justify-end gap-3 p-11">
            { step > 0 &&
                <button
                type="button"
                className="text-[#ACACAC] hover:text-black border border-[#ACACAC] py-2 px-8 rounded-md"
                onClick={() => setStep((p) => --p)}
            >
                Go Back
            </button>
            }
            <button
                type="button"
                className="relative bg-primary text-white hover:text-black py-2 px-10 rounded-md"
                onClick={handleContinueClick}
            >
               <Spinner isLoading={isSpinner} />
               {step < 2 ? 'Continue' : 'Create'}
             
            </button>
        </section>
        </div>
    }
    </div>
    )
}

export default CampaignCreate