import * as React from 'react'
import UserImage from '../../assets/images/post-img/post-user.png'

export default function PersonCard({ name, img, jobTitle, department, location, ...props }) {
  return (
    <div className="border border-300 rounded-md shadow-[0px_2px_7px] shadow-[#0000001d] flex gap-3 px-4 py-3">
      <div className="flex flex-col items-center">
        <img src={img} className="rounded-full" />
        <img className='inline-block mt-2' src={ `https://flagcdn.com/w40/${location.toLowerCase()}.png`  }/>
      </div>

      <div>
        <p className="text-primary font-semibold">{name}</p>
        <p className="text-[#727272]">{jobTitle}</p>
        <p className="text-[#727272]">{department}</p>

        <a
          href="/"
          className="mt-4 inline-block text-xs py-1.5 px-3 leading-none rounded-md bg-primary text-white "
        >
          Give High5
        </a>
      </div>
    </div>
  )
}
