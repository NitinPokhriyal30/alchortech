import React, { useEffect, useState } from 'react'
import { RiInformationLine } from 'react-icons/ri';


const COLORS = {
    gray: 'text-[#A5A5A5]',
};

const RuleAndRewards = ({ rulesNRewards, setRulesNRewards, errors }) => {

    const [rewardType, setRewardType] = useState('');


    const handleRulesNRewards = (property, value) => {
        setRulesNRewards((prevRulesNRewards) => ({
            ...prevRulesNRewards,
            [property]: value,
        }))
    }

    const handleParticipationCriteria = (value) => {
        setRewardType(value);
        if (value === 'Participant') {
            setRulesNRewards((prevRulesNRewards) => ({
                ...prevRulesNRewards,
                participationRewards: !prevRulesNRewards.participationRewards,
            }));
        }
    }

    const handleParticipationRewardsType = (value) => {
        setRulesNRewards((prevRulesNRewards) => ({
            ...prevRulesNRewards,
            participationRewardsType: value,
        }));
    }

    const getError = (index) => errors?.find(([_index]) => _index === index)?.[1]

    return (
        <div>
            <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">

                <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select Points Criteria</p>
                    </div>

                    {/* col 2 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleParticipationCriteria('Participant')}
                            className={
                                rulesNRewards.participationRewards
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Particpation Points
                        </button>
                        {getError('participationRewards') && (
                            <p className="text-sm text-red-500">
                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                {getError('participationRewards')}
                            </p>
                        )}
                    </div>
                </div>

                {rewardType != '' && <hr className="border-px my-6 border-400" />}


                {rewardType === 'Participant' &&
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40">

                        {/* col 1 */}
                        <div>
                            <p className="text-18px font-bold text-text-black">Select Points Receivers</p>
                        </div>

                        {/* col 2 */}
                        <div className="flex flex-col  gap-10">
                            <div className='flex gap-8'>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={rulesNRewards.participationRewardsType === 'all'}
                                        onChange={() => handleParticipationRewardsType('all')}
                                        className='h-6 w-6'
                                    />
                                    All Participants
                                </label>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={rulesNRewards.participationRewardsType === 'few'}
                                        onChange={() => handleParticipationRewardsType('few')}
                                        className='h-6 w-6'
                                    />
                                    Few Participants
                                </label>
                                <div>
                                    {getError('participationRewardsType') && (
                                        <p className="text-sm text-red-500">
                                            <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                            {getError('participationRewardsType')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {rulesNRewards.participationRewardsType === 'all' && (
                                <div className='flex items-center gap-4'>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-20 p-1"
                                        value={rulesNRewards.allParticipationPoints}
                                        min={0}
                                        onChange={(event) => handleRulesNRewards('allParticipationPoints', Number(event.target.value))}
                                    />
                                    <span >Points to be given</span>
                                    <div>
                                        {getError('allParticipationPoints') && (
                                            <p className="text-sm text-red-500">
                                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                                {getError('allParticipationPoints')}
                                            </p>
                                        )}
                                    </div>
                                </div>

                            )}
                            {rulesNRewards.participationRewardsType === 'few' && (
                                <>
                                    <div className='flex items-center gap-2'>
                                        <span >First</span>
                                        <input
                                            type="number"
                                            className="border-[1px] border-[#909090] rounded w-16 p-1"
                                            value={rulesNRewards.units}
                                            min={0}
                                            onChange={(event) => handleRulesNRewards('units', Number(event.target.value))}
                                        />
                                        <span >Participants will get points</span>
                                        <input
                                            type="number"
                                            className="border-[1px] border-[#909090] rounded w-16 p-1"
                                            value={rulesNRewards.unitPoints}
                                            min={0}
                                            onChange={(event) => handleRulesNRewards('unitPoints', Number(event.target.value))}
                                        />
                                    </div>
                                    <div>
                                        {getError('unitPoints') && (
                                            <p className="text-sm text-red-500">
                                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                                {getError('unitPoints')}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                }
            </div>

        </div>
    )
}

export default RuleAndRewards