import React, { useState } from 'react'


const COLORS = {
    gray: 'text-[#A5A5A5]',
};

const RulesnRewards = () => {

    const [rewardType, setRewardType] = useState('');
    const [allParticipantsChecked, setAllParticipantsChecked] = useState(false);
    const [fewParticipantsChecked, setFewParticipantsChecked] = useState(false);
    const [nowChecked, setNowChecked] = useState(false);
    const [laterChecked, setLaterChecked] = useState(false);
    const [isEqualPoints, setIsEqualPoints] = useState(false);
    const [isPositionBased, setIsPositionBased] = useState(false);

    const handleAllParticipantsChange = () => {
        setAllParticipantsChecked(true);
        setFewParticipantsChecked(false);
      };
    
      const handleFewParticipantsChange = () => {
        setAllParticipantsChecked(false);
        setFewParticipantsChecked(true);
      };

      const handleNow = () => {
        setNowChecked(true);
        setLaterChecked(false);
      };

      const handleLater = () => {
        setLaterChecked(true);
        setNowChecked(false);
      };

      const handleEqualPoints = () => {
        setIsEqualPoints(true);
        setIsPositionBased(false);
      };

      const handlePositionBased = () => {
        setIsPositionBased(true);
        setIsEqualPoints(false);
        
      };

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
                            onClick={() => setRewardType('Participant')}
                            className={
                                rewardType === 'Participant'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Particpation Points
                        </button>
                        <button
                            onClick={() => setRewardType('Winner')}
                            className={
                                rewardType === 'Winner'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Winner Points
                        </button>
                    </div>
                </div>
                <hr className="border-px my-6 border-400" />

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
                                checked={allParticipantsChecked}
                                onChange={handleAllParticipantsChange}
                                className='h-6 w-6'
                            />
                            All Participants
                        </label>
                        <label className='flex gap-2'>
                            <input
                                type="checkbox"
                                checked={fewParticipantsChecked}
                                onChange={handleFewParticipantsChange}
                                className='h-6 w-6'
                            />
                            Few Participants
                        </label>
                    </div>
                    {allParticipantsChecked && (
                        <div className='flex items-center gap-4'>
                            <input type="number" className="border-[1px] border-[#909090] rounded w-20 p-1" />
                            <span >Points to be given</span>
                        </div>
                    )}
                    {fewParticipantsChecked && (
                        <div className='flex items-center gap-2'>
                            <span >First</span>
                            <input type="number" className="border-[1px] border-[#909090] rounded w-16 p-1" />
                            <span >Participants will get points</span>
                            <input type="number" className="border-[1px] border-[#909090] rounded w-16 p-1" />
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
                                    checked={nowChecked}
                                    onChange={handleNow}
                                    className='w-6 h-6'
                                />
                                Now
                            </label>
                            <label className='flex gap-2'>
                                <input
                                    type="checkbox"
                                    checked={laterChecked}
                                    onChange={handleLater}
                                    className='w-6 h-6'
                                />
                                Later
                            </label>
                        </div>
                    {nowChecked && (
                        <div className='flex items-center gap-2'>
                            <span >How many winners?</span>
                            <input type="number" className="border-[1px] border-[#909090] rounded w-20 p-1" />
                        </div>
                    )}
                    </div>   
                </div>
                }

                {nowChecked && (
                    <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40 mt-10">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Assign Points</p>
                    </div>

                    {/* col 2 */}
                    <div className="flex flex-col gap-4">
                    <div className="flex gap-8">
                        <label  className='flex gap-2'>
                            <input
                                type="checkbox"
                                checked={isEqualPoints}
                                onChange={handleEqualPoints}
                                className='w-6 h-6'
                            />
                            Equal Points 
                        </label>
                        <label className='flex gap-2'>
                            <input
                                type="checkbox"
                                checked={isPositionBased}
                                onChange={handlePositionBased}
                                className='w-6 h-6'
                            />
                            Position Based
                        </label>
                    </div>
                    {isEqualPoints && (
                        <div className='flex items-center gap-4'>
                        <span >Points to be given?</span>
                        <input type="number" className="border-[1px] border-[#909090] rounded w-20 p-1" />
                        </div>
                    )}

                    {isPositionBased && (
                        <div >
                            
                           <div className='flex flex-col gap-4'>
                           <div className='flex items-center gap-4'>
                            <span >First</span>
                            <input type="number" className="border-[1px] border-[#909090] rounded w-20 p-1" />
                            <span >Positions</span>
                           </div>
                           <div className='flex items-center gap-4'>
                           <span >1st Position</span>
                           <input type="number" className="border-[1px] border-[#909090] rounded w-20 p-1" />
                           <span >Points</span>
                           </div>
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








// <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40">
//                     {/* col 1 */}
//                     <div>
//                         <p className="text-18px font-bold text-text-black">Select Points</p>
//                     </div>

//                     {/* col 2 */}
//                     <div>
//                         <div>
//                             <select className="border-[2px] rounded p-2 w-full">
//                                 <option value="" disabled selected>Select Points</option>
//                                 <option value="10">10</option>
//                                 <option value="20">20</option>
//                                 <option value="30">30</option>
//                                 <option value="40">40</option>
//                                 <option value="50">50</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
//                 <hr className="border-px my-6 border-400" />

//                 <div className="grid md:grid-cols-[1fr_2fr] items-center gap-40">
//                     {/* col 1 */}
//                     <div>
//                         <p className="w-44 text-18px font-bold text-text-black">Define the campaign award rules 1 or more</p>
//                     </div>

//                     {/* col 2 */}
//                     <div>
//                         <div className="flex flex-col space-y-4">
//                             <label className="flex flex-col md:flex-row justify-start gap-8 items-center">
//                                 <input type="checkbox" className="form-checkbox h-10 w-20" />
//                                 <div className='w-44'>
//                                     <span>Ongoing Earn</span>
//                                     <p className={COLORS.gray}>Earn X points for every Y units during campaign</p>
//                                 </div>
//                                 <div className='flex gap-10'>
//                                     <div className='flex flex-col text-center'>
//                                         <span >X</span>
//                                         <input type="number" className="border rounded w-14 p-2" />
//                                     </div>
//                                     <div className='flex flex-col text-center'>
//                                         <span>Y</span>
//                                         <input type="number" className="border rounded w-14 p-2" />
//                                     </div>
//                                 </div>
//                             </label>
//                             <label className="flex flex-col md:flex-row gap-8 items-center">
//                                 <input type="checkbox" className="form-checkbox h-10 w-20" />
//                                 <div className='w-44'>
//                                     <span>Threshold bonus</span>
//                                     <p className={COLORS.gray}>Earn X when Y threshold met</p>
//                                 </div>
//                                 <div className='flex gap-10'>
//                                     <div className='flex flex-col text-center'>
//                                         <span >X</span>
//                                         <input type="number" className="border rounded w-14 p-2" />
//                                     </div>
//                                     <div className='flex flex-col text-center'>
//                                         <span>Y</span>
//                                         <input type="number" className="border rounded w-14 p-2" />
//                                     </div>
//                                 </div>
//                             </label>
//                             <label className="flex flex-col md:flex-row gap-8 items-center">
//                                 <input type="checkbox" className="form-checkbox h-10 w-20" />
//                                 <div className='w-44'>
//                                     <span>Winner takes all</span>
//                                     <p className={COLORS.gray}>The participant with the most Sales. The amount of points earned</p>
//                                 </div>
//                                 <div className='flex gap-10'>
//                                     <div className='flex flex-col text-center'>
//                                         <span >X</span>
//                                         <input type="number" className="border rounded w-14 p-2" />
//                                     </div>
//                                     <div className='flex flex-col text-center'>
//                                         <span>Y</span>
//                                         <input type="number" className="border rounded w-14 p-2" />
//                                     </div>
//                                 </div>
//                             </label>
//                         </div>
//                     </div>
//                 </div>
//                 <hr className="border-px my-6 border-400" />

//                 <div className="grid md:grid-cols-[1fr_2fr] items-center mb-10 gap-40">
//                     {/* col 1 */}
//                     <div>
//                         <p className="text-18px font-bold text-text-black">Select how results will be entered into the campaign</p>
//                     </div>

//                     {/* col 2 */}
//                     <div className='flex flex-col md:flex-row justify-evenly'>
//                         <div>
//                             <input className="mr-2 h-4 w-4" type="radio" id="option1" name="entryOption" value="option1" />
//                             <label htmlFor="option1">By participating employees</label>
//                             <p className="ml-6 text-gray-400">Participants enter their own results throughout the campaign</p>
//                         </div>
//                         <div>
//                             <input className="mr-2 h-4 w-4" type="radio" id="option2" name="entryOption" value="option2" />
//                             <label htmlFor="option2">By you, the campaign owner</label>
//                             <p className="ml-6 text-gray-400">Upload your participants results using an Excel template</p>
//                         </div>
//                     </div>
//                 </div>
