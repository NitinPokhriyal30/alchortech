import React, { useState } from 'react';
import { AiOutlinePlus, AiFillClockCircle, AiFillCloseCircle, AiFillRightCircle, AiFillCaretDown } from 'react-icons/ai'
import { BsPencilFill } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'
import { Link } from 'react-router-dom'

const CampaignsTable = () => {

    const [sortBy, setSortBy] = useState('Last 30 Days');

    return (
        <div>

            <div className='flex justify-between mt-4 mx-4'>
                <div className='text-[20px] font-Lato text-[#464646] font-bold'>Campaigns</div>
                <div className='bg-[#5486E3] rounded-md p-2 text-white font-Lato'>
                    <Link to="/campaign/create" className="flex items-center gap-1">
                        <span>{<AiOutlinePlus />}</span>
                        Create Campaign
                    </Link>
                </div>
            </div>

            <div className='flex justify-between mt-4 px-4'>
                <div className='flex gap-6'>
                    <button className='flex items-center gap-2 text-[#8D8D8D] text-[14px]'><span>{<BsPencilFill />}</span>Draft</button>
                    <button className='flex items-center gap-2 text-[#8D8D8D] text-[14px]' ><span>{<AiFillClockCircle />}</span> Scheduled</button>
                    <button className='flex items-center gap-2 text-[#8D8D8D] text-[14px]'><span>{<AiFillRightCircle />}</span>Running</button>
                    <button className='flex items-center gap-2 text-[#8D8D8D] text-[14px]'><span>{<AiFillCloseCircle />}</span>Closed</button>
                </div>
                <div>
                    <div className=" text-[#7B7B7B] text-sm relative flex items-center ml-20">
                        Sort By:
                        <button className="peer font-Lato flex items-center gap-1 text-sm font-semibold pl-1">
                            {sortBy}
                            <span><AiFillCaretDown /></span>
                        </button>
                        <div className="hidden drop-shadow-[0px_2px_6px_#44444F1A] w-36 px-4 py-2 rounded-lg bg-white absolute z-10 top-[21px] right-[1px] peer-hover:flex hover:flex  flex-col child:cursor-pointer text-end">
                            <p className="text-sm font-Lato" onClick={() => setFilterBy("all")}>Last 60 days</p>
                            <p className="text-sm font-Lato" onClick={() => setFilterBy("last_six_months")}>Last 6 months</p>
                            <p className="text-sm font-Lato" onClick={() => setFilterBy("last_quarter")}>Last quarter</p>
                            <p className="text-sm font-Lato" onClick={() => setFilterBy("this_quarter")}>This quarter</p>
                            <p className="text-sm font-Lato" onClick={() => setFilterBy("last_month")}>Last month</p>
                            <p className="text-sm font-Lato" onClick={() => setFilterBy("this_month")}>This month</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[97%] h-[1px] bg-[#7B7B7B] mt-1 mx-4'></div>

            <div className='bg-white rounded-lg drop-shadow-md mt-2 mx-4'>
                <table className='w-full'>
                    <thead>
                        <tr className='border-b border-[#7B7B7B] '>
                            <th className="py-4 text-start pl-14 text-[16px] text-[#292929] font-Lato font-semibold w-auto">Name</th>
                            <th className="py-4 text-[16px] text-[#292929] font-Lato font-semibold w-1/4">Start date</th>
                            <th className="py-4 text-[16px] text-[#292929] font-Lato font-semibold w-1/4">End date</th>
                            <th className="py-4 text-[16px] text-[#292929] font-Lato font-semibold w-1/4">Type</th>
                        </tr>
                    </thead>
                    <tbody className='group'>
                        <tr className="hover:bg-[#ececec] rounded-xl border-b border-[#7B7B7B] group" onMouseEnter={(e) => e.currentTarget.lastChild.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.lastChild.style.opacity = 0}>
                            <td className="py-3 pl-14 text-[#5486E3] font-semibold text-[16px]">Gold Plan Sales Challenge</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 13, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 18, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Automatic</td>
                            <td className="py-3 text-center opacity-0 transition-opacity duration-200"><RxCross1 className="text-[#292929] cursor-pointer" /></td>
                        </tr>
                        <tr className="hover:bg-[#ececec] rounded-xl border-b border-[#7B7B7B] group" onMouseEnter={(e) => e.currentTarget.lastChild.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.lastChild.style.opacity = 0}>
                            <td className="py-3 pl-14 text-[#5486E3] font-semibold text-[16px]">Gold Plan Sales Challenge</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 13, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 18, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Automatic</td>
                            <td className="py-3 text-center opacity-0 transition-opacity duration-200"><RxCross1 className="text-[#292929] cursor-pointer" /></td>
                        </tr>
                        <tr className="hover:bg-[#ececec] rounded-xl border-b border-[#7B7B7B] group" onMouseEnter={(e) => e.currentTarget.lastChild.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.lastChild.style.opacity = 0}>
                            <td className="py-3 pl-14 text-[#5486E3] font-semibold text-[16px]">Gold Plan Sales Challenge</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 13, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 18, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Automatic</td>
                            <td className="py-3 text-center opacity-0 transition-opacity duration-200"><RxCross1 className="text-[#292929] cursor-pointer" /></td>
                        </tr>
                        <tr className="hover:bg-[#ececec] rounded-xl border-b border-[#7B7B7B] group" onMouseEnter={(e) => e.currentTarget.lastChild.style.opacity = 1} onMouseLeave={(e) => e.currentTarget.lastChild.style.opacity = 0}>
                            <td className="py-3 pl-14 text-[#5486E3] font-semibold text-[16px]">Gold Plan Sales Challenge</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 13, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Feb 18, 2023</td>
                            <td className="py-3 text-center text-[16px] text-[#000000] font-Lato font-normal">Automatic</td>
                            <td className="py-3 text-center opacity-0 transition-opacity duration-200"><RxCross1 className="text-[#292929] cursor-pointer" /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CampaignsTable
