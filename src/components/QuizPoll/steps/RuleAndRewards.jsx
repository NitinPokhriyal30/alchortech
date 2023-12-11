import React, { useState, useEffect } from 'react'
import { RiInformationLine } from 'react-icons/ri';


const COLORS = {
    gray: 'text-[#A5A5A5]',
};

const RuleAndRewards = ({ rulesNRewards, setRulesNRewards, errors }) => {


    const handleRulesNRewards = (property, value) => {
        setRulesNRewards((prevRulesNRewards) => ({
            ...prevRulesNRewards,
            [property]: value,
        }))
    }

    const handleParticipationCriteria = (value) => {
        if (value === 'Participant') {
            setRulesNRewards((prevRulesNRewards) => ({
                ...prevRulesNRewards,
                participationRewards: !prevRulesNRewards.participationRewards,
            }));
        } else if (value === 'Winner') {
            setRulesNRewards((prevRulesNRewards) => ({
                ...prevRulesNRewards,
                winnerRewards: !prevRulesNRewards.winnerRewards,
            }));
        }
    }

    const handleParticipationRewardsType = (value) => {
        setRulesNRewards((prevRulesNRewards) => ({
            ...prevRulesNRewards,
            participationRewardsType: value,
        }));
    }

    const handleAssignRulesTime = (value) => {
        setRulesNRewards((prevRulesNRewards) => ({
            ...prevRulesNRewards,
            assignRulesTime: value,
        }));
    }

    const handleAssignPointsType = (value) => {
        setRulesNRewards((prevRulesNRewards) => ({
            ...prevRulesNRewards,
            assignPointsType: value,
        }));
    }

    const handlePositionsCount = (value) => {
        // If handlePositionsCount is greater than the current length, push new positions
        if (rulesNRewards.winnerPositions.length < value) {
            const newPositions = Array(value - rulesNRewards.winnerPositions.length)
                .fill()
                .map((_, index) => ({
                    position_name: `Position ${rulesNRewards.winnerPositions.length + index + 1}`,
                    position: rulesNRewards.winnerPositions.length + index + 1,
                    points: 0,
                }));

            setRulesNRewards((prevRulesNRewards) => ({
                ...prevRulesNRewards,
                winnerPositions: [...prevRulesNRewards.winnerPositions, ...newPositions],
            }));
        }

        // If handlePositionsCount is less than the current length, remove positions
        if (rulesNRewards.winnerPositions.length > value) {
            setRulesNRewards((prevRulesNRewards) => ({
                ...prevRulesNRewards,
                winnerPositions: prevRulesNRewards.winnerPositions.slice(0, value),
            }));
        }
    };

    function getOrdinalSuffix(number) {
        const lastDigit = number % 10;
        const secondLastDigit = Math.floor((number % 100) / 10);
        if (secondLastDigit === 1) {
            return 'th';
        }
        switch (lastDigit) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }

    function getPositionName(index) {
        const name =
            index === 0
                ? "First"
                : index === 1
                    ? "Second"
                    : index === 2
                        ? "Third"
                        : index === 3
                            ? "Fourth"
                            : index === 5
                                ? "Fifth"
                                : `${index + 1}${getOrdinalSuffix(index + 1)} Position`

        return name
    }

    function formatObjectKeysWithQuotes(obj) {
        const newObj = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                newObj[`"${key}"`] = obj[key];
            }
        }
        return newObj;
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
                        <button
                            onClick={() => handleParticipationCriteria('Winner')}
                            className={
                                rulesNRewards.winnerRewards
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Winner Points
                        </button>
                        {getError('rewards') && (
                            <p className="text-sm text-red-500">
                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                {getError('rewards')}
                            </p>
                        )}
                    </div>
                </div>

                {rulesNRewards.participationRewards === true && <hr className="border-px my-6 border-400" />}


                {rulesNRewards.participationRewards === true &&
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40 my-10">

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
                                            min={0}
                                            onChange={(event) => handleRulesNRewards('units', Number(event.target.value))}
                                        />
                                        <span >Participants will get points</span>
                                        <input
                                            type="number"
                                            className="border-[1px] border-[#909090] rounded w-16 p-1"
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

                {rulesNRewards.winnerRewards === true && <hr />}


                {rulesNRewards.winnerRewards === true &&
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40 my-10">
                        {/* col 1 */}
                        <div>
                            <p className="text-18px font-bold text-text-black">Assign Rule</p>
                        </div>

                        {/* col 2 */}
                        <div className="flex flex-col gap-4">
                            <div className='flex gap-8'>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={rulesNRewards.assignRulesTime === 'now'}
                                        onChange={() => handleAssignRulesTime('now')}
                                        className='w-6 h-6'
                                    />
                                    Now
                                </label>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={rulesNRewards.assignRulesTime === 'later'}
                                        onChange={() => handleAssignRulesTime('later')}
                                        className='w-6 h-6'
                                    />
                                    Later
                                </label>
                                <div>
                                    {getError('assignRulesTime') && (
                                        <p className="text-sm text-red-500">
                                            <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                            {getError('assignRulesTime')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {rulesNRewards.assignRulesTime === 'now' && (
                                <div className='flex items-center gap-2'>
                                    <span >How many winners?</span>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-20 p-1"
                                        value={rulesNRewards.numberOfWinners}
                                        min={0}
                                        onChange={(event) => handleRulesNRewards('numberOfWinners', Number(event.target.value))}
                                    />
                                    <div>
                                        {getError('numberOfWinners') && (
                                            <p className="text-sm text-red-500">
                                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                                {getError('numberOfWinners')}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }

                {rulesNRewards.assignRulesTime === 'now' && rulesNRewards.numberOfWinners !== 0 && rulesNRewards.winnerRewards === true && (
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40 my-10">
                        {/* col 1 */}
                        <div>
                            <p className="text-18px font-bold text-text-black">Assign Points</p>
                        </div>

                        {/* col 2 */}
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-8">
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={rulesNRewards.assignPointsType === 'equal'}
                                        onChange={() => handleAssignPointsType('equal')}
                                        className='w-6 h-6'
                                    />
                                    Equal Points
                                </label>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={rulesNRewards.assignPointsType === 'positionBased'}
                                        onChange={() => handleAssignPointsType('positionBased')}
                                        className='w-6 h-6'
                                    />
                                    Position Based
                                </label>
                                <div>
                                    {getError('assignPointsType') && (
                                        <p className="text-sm text-red-500">
                                            <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                            {getError('assignPointsType')}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {rulesNRewards.assignPointsType === 'equal' && (
                                <>
                                    <div className='flex items-center gap-4'>
                                        <span >Points to be given?</span>
                                        <input
                                            type="number"
                                            value={rulesNRewards.allWinnerPoints}
                                            min={0}
                                            className="border-[1px] border-[#909090] rounded w-20 p-1"
                                            onChange={(event) => handleRulesNRewards('allWinnerPoints', event.target.value)}
                                        />
                                    </div>
                                    <div>
                                        {getError('allWinnerPoints') && (
                                            <p className="text-sm text-red-500">
                                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                                {getError('allWinnerPoints')}
                                            </p>
                                        )}
                                    </div>
                                </>
                            )}

                            {rulesNRewards.assignPointsType === 'positionBased' && (
                                <div >
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex items-center gap-4'>
                                            <span >First</span>
                                            <input
                                                type="number"
                                                min={0}
                                                className="border-[1px] border-[#909090] rounded w-20 p-1"
                                                onChange={(event) => handlePositionsCount(event.target.value)}
                                            />
                                            <span >Positions</span>
                                            {getError('winnerPositionsLength') && (
                                                <p className="text-sm text-red-500">
                                                    <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                                    {getError('winnerPositionsLength')}
                                                </p>
                                            )}
                                        </div>
                                        {rulesNRewards.winnerPositions.length > 0 && (
                                            <div className='flex flex-col gap-4'>
                                                {Array.from({ length: rulesNRewards.winnerPositions.length }, (_, index) => (
                                                    <div key={index} className='flex items-center gap-4'>
                                                        <span>{index + 1}{getOrdinalSuffix(index + 1)} Position</span>
                                                        <input
                                                            type="number"
                                                            className="border-[1px] border-[#909090] rounded w-20 p-1"
                                                            value={rulesNRewards.winnerPositions[index].points}
                                                            min={0}
                                                            onChange={(event) => {
                                                                const newWinnerPositions = [...rulesNRewards.winnerPositions];
                                                                const positionIndex = index;
                                                                const newPosition = {
                                                                    position_name: getPositionName(index),
                                                                    position: positionIndex + 1,
                                                                    points: Number(event.target.value),
                                                                };
                                                                newWinnerPositions[positionIndex] = (newPosition);
                                                                handleRulesNRewards('winnerPositions', newWinnerPositions);
                                                            }}
                                                        />
                                                        <span>Points</span>
                                                        {getError('winnerPositionsPoint') && rulesNRewards.winnerPositions[index].points === 0 &&(
                                                            <p className="text-sm text-red-500">
                                                                <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                                                {getError('winnerPositionsPoint')}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default RuleAndRewards