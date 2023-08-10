import React, { useState } from 'react'


const COLORS = {
    gray: 'text-[#A5A5A5]',
};

const RulesnRewards = () => {

    const [rewardType, setRewardType] = useState('');

    return (
        <div>
            <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">
                <div className="grid grid-cols-[1fr_2fr] items-center gap-40">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select Award Payout Format</p>
                        <p className={'mt-2.5 ' + COLORS.gray}>Automatically/manually reward the incentive to participants when they hit the targets you set</p>
                    </div>

                    {/* col 2 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setRewardType('Automatic')}
                            className={
                                rewardType === 'Automatic'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Automatic
                        </button>
                        <button
                            onClick={() => setRewardType('Manual')}
                            className={
                                rewardType === 'Manual'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9'
                            }
                        >
                            Manual
                        </button>
                    </div>
                </div>
                <hr className="border-px my-6 border-400" />

                <div className="grid grid-cols-[1fr_2fr] items-center gap-40">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select Points</p>
                    </div>

                    {/* col 2 */}
                    <div>
                        <div>
                            <select className="border-[2px] rounded p-2 w-full">
                                <option value="" disabled selected>Select Points</option>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                            </select>
                        </div>
                    </div>
                </div>
                <hr className="border-px my-6 border-400" />

                <div className="grid grid-cols-[1fr_2fr] items-center gap-40">
                    {/* col 1 */}
                    <div>
                        <p className="w-44 text-18px font-bold text-text-black">Define the campaign award rules 1 or more</p>
                    </div>

                    {/* col 2 */}
                    <div>
                        <div className="flex flex-col space-y-4">
                            <label className="flex gap-8 items-center">
                                <input type="checkbox" className="form-checkbox h-10 w-20" />
                                <div className='w-44'>
                                    <span>Ongoing Earn</span>
                                    <p className={COLORS.gray}>Earn X points for every Y units during campaign</p>
                                </div>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col text-center'>
                                        <span >X</span>
                                        <input type="number" className="border rounded w-14 p-2" />
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span>Y</span>
                                        <input type="number" className="border rounded w-14 p-2" />
                                    </div>
                                </div>
                            </label>
                            <label className="flex gap-8 items-center">
                                <input type="checkbox" className="form-checkbox h-10 w-20" />
                                <div className='w-44'>
                                    <span>Threshold bonus</span>
                                    <p className={COLORS.gray}>Earn X when Y threshold met</p>
                                </div>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col text-center'>
                                        <span >X</span>
                                        <input type="number" className="border rounded w-14 p-2" />
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span>Y</span>
                                        <input type="number" className="border rounded w-14 p-2" />
                                    </div>
                                </div>
                            </label>
                            <label className="flex gap-8 items-center">
                                <input type="checkbox" className="form-checkbox h-10 w-20" />
                                <div className='w-44'>
                                    <span>Winner takes all</span>
                                    <p className={COLORS.gray}>The participant with the most Sales. The amount of points earned</p>
                                </div>
                                <div className='flex gap-10'>
                                    <div className='flex flex-col text-center'>
                                        <span >X</span>
                                        <input type="number" className="border rounded w-14 p-2" />
                                    </div>
                                    <div className='flex flex-col text-center'>
                                        <span>Y</span>
                                        <input type="number" className="border rounded w-14 p-2" />
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <hr className="border-px my-6 border-400" />

                <div className="grid grid-cols-[1fr_2fr] items-center mb-10 gap-40">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select how results will be entered into the campaign</p>
                    </div>

                    {/* col 2 */}
                    <div className='flex justify-evenly'>
                        <div>
                            <input className="mr-2 h-4 w-4" type="radio" id="option1" name="entryOption" value="option1" />
                            <label htmlFor="option1">By participating employees</label>
                            <p className="ml-6 text-gray-400">Participants enter their own results throughout the campaign</p>
                        </div>
                        <div>
                            <input className="mr-2 h-4 w-4" type="radio" id="option2" name="entryOption" value="option2" />
                            <label htmlFor="option2">By you, the campaign owner</label>
                            <p className="ml-6 text-gray-400">Upload your participants results using an Excel template</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RulesnRewards
