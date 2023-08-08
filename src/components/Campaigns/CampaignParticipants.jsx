import React from 'react'


const COLORS = {
    gray: 'text-[#A5A5A5]',
  }

const CampaignParticipants = () => {
  return (

    <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">
    <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
      {/* col 1 */}
      <div>
        <p className="text-18px font-bold text-text-black">Select Participant Type</p>
        <p className={'mt-2.5 ' + COLORS.gray}>Employees earn rewards based on individual's/team's performance</p>
      </div>

      {/* col 2 */}
      <div className='flex gap-4'>
       <button className='border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-10'>All</button>
       <button className='border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9'>Team</button>
       <button className='border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'>Individual</button>
       <button className='border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-2'>+ Create Group</button>    
      </div>
    </div>
   </div>

  )
}

export default CampaignParticipants