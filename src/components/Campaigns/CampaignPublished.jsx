import React from 'react'
import {Link} from 'react-router-dom';

const CampaignPublished = () => {
  return (
    <div className='w-full'>
     
      <div className='flex flex-col gap-10 h-full justify-center items-center'>
       <div>
       <p className='font-bold text-center text-[#107969] text-[20px]'>Done</p>
       <Link to='/campaigns' className='text-[#5486E3] text-center text-[14px] underline' >Create another campaign</Link>
       </div>
        <button
        type="button"
        className="bg-primary text-white hover:text-black py-2 px-8 rounded-md">
        Preview
        </button>
      </div>

    </div>
  )
}

export default CampaignPublished