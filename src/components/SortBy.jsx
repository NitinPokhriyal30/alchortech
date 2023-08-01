import React from 'react'
import { AiFillCaretDown } from 'react-icons/ai'

const SortBy = ({ value, onChange }) => { 
  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <div className="h-[1px] w-full bg-[#CECECE]"></div>
        <div className="group relative whitespace-nowrap xs:w-[50%] sm:w-[40%] md:w-[33%] lg:w-fit xxl:w-fit">
          <div className="relative flex items-center  text-sm text-[#7B7B7B]">
            Sort By:
            <button className="peer flex items-center gap-1 pl-1  text-sm font-semibold">
              {value}
              <span>
                <AiFillCaretDown />
              </span>
            </button>
          </div>

          <div className='hidden group-hover:block absolute right-0 z-10 p-2  rounded-md bg-white shadow border child:cursor-pointer'>
            <p className="bg-translucent  text-sm" onClick={() => onChange('everything')}>
              Everything
            </p>
            <p className="bg-translucent  text-sm" onClick={() => onChange('popular')}>
              Popular
            </p>
            <p className="bg-translucent  text-sm" onClick={() => onChange('relevant')}>
              Relevant
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SortBy
