import React, { useState, useEffect } from 'react'


const COLORS = {
    gray: 'text-[#A5A5A5]',
};

const RulesnRewards = ({ rulesNRewards, setRulesNRewards }) => {

    const [rewardType, setRewardType] = useState('');
    const [pointReceivers, setPointReceivers] = useState('');
    const [assignRule, setAssignRule] = useState('');
    const [assignPoints, setAssignPoints] = useState('');
    const [positionsCount, setPositionsCount] = useState(0)


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
        } else if (value === 'Winner') {
            setRulesNRewards((prevRulesNRewards) => ({
                ...prevRulesNRewards,
                winnerRewards: !prevRulesNRewards.winnerRewards,
            }));
        }
    }

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

    useEffect(() => {
        console.log(positionsCount);
    })


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
                                        checked={pointReceivers === 'all'}
                                        onChange={() => setPointReceivers('all')}
                                        className='h-6 w-6'
                                    />
                                    All Participants
                                </label>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={pointReceivers === 'few'}
                                        onChange={() => setPointReceivers('few')}
                                        className='h-6 w-6'
                                    />
                                    Few Participants
                                </label>
                            </div>
                            {pointReceivers === 'all' && (
                                <div className='flex items-center gap-4'>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-20 p-1"
                                        onChange={(event) => handleRulesNRewards('allParticipationPoints', Number(event.target.value))}
                                    />
                                    <span >Points to be given</span>
                                </div>
                            )}
                            {pointReceivers === 'few' && (
                                <div className='flex items-center gap-2'>
                                    <span >First</span>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-16 p-1"
                                        onChange={(event) => handleRulesNRewards('units', event.target.value)}
                                    />
                                    <span >Participants will get points</span>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-16 p-1"
                                        onChange={(event) => handleRulesNRewards('unitPoints', event.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                }

                {rewardType === 'Winner' &&
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40">
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
                                        checked={assignRule === 'now'}
                                        onChange={() => setAssignRule('now')}
                                        className='w-6 h-6'
                                    />
                                    Now
                                </label>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={assignRule === 'later'}
                                        onChange={() => setAssignRule('later')}
                                        className='w-6 h-6'
                                    />
                                    Later
                                </label>
                            </div>
                            {assignRule === 'now' && (
                                <div className='flex items-center gap-2'>
                                    <span >How many winners?</span>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-20 p-1"
                                        onChange={(event) => handleRulesNRewards('numberOfWinners', event.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                }

                {assignRule === 'now' && rewardType === 'Winner' && (
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40 mt-10">
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
                                        checked={assignPoints === 'equal'}
                                        onChange={() => setAssignPoints('equal')}
                                        className='w-6 h-6'
                                    />
                                    Equal Points
                                </label>
                                <label className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        checked={assignPoints === 'positionBased'}
                                        onChange={() => setAssignPoints('positionBased')}
                                        className='w-6 h-6'
                                    />
                                    Position Based
                                </label>
                            </div>
                            {assignPoints === 'equal' && (
                                <div className='flex items-center gap-4'>
                                    <span >Points to be given?</span>
                                    <input
                                        type="number"
                                        className="border-[1px] border-[#909090] rounded w-20 p-1"
                                        onChange={(event) => handleRulesNRewards('allWinnerPoints', event.target.value)}
                                    />
                                </div>
                            )}

                            {assignPoints === 'positionBased' && (
                                <div >
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex items-center gap-4'>
                                            <span >First</span>
                                            <input
                                                type="number"
                                                className="border-[1px] border-[#909090] rounded w-20 p-1"
                                                onChange={(event) => setPositionsCount(event.target.value)}
                                            />
                                            <span >Positions</span>
                                        </div>
                                        {positionsCount > 0 && (
                                            <div className='flex flex-col gap-4'>
                                                {Array.from({ length: positionsCount }, (_, index) => (
                                                    <div key={index} className='flex items-center gap-4'>
                                                        <span>{index + 1}{getOrdinalSuffix(index + 1)} Position</span>
                                                        <input
                                                            type="number"
                                                            className="border-[1px] border-[#909090] rounded w-20 p-1"
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

export default RulesnRewards

  
  
  
  
  