import * as React from 'react'
import UserImage from '../../assets/images/post-img/post-user.png'

export default function PersonCard({ name, img, jobTitle, department, location, ...props }) {
  return (
    <div className="border border-300 rounded-md shadow-[0px_2px_7px] shadow-[#0000001d] flex gap-3 pt-[11px] pb-2 px-4">
      <div>
        <img
          src={img}
          className="block rounded-full w-[calc((74/16)*1rem)] h-[calc((74/16)*1rem)] bg-paper mx-auto"
        />
        <div className="grid place-items-center h-10 w-10 mx-auto">
          <img
            className="w-7 aspect-video mx-auto"
            src={`https://flagcdn.com/w40/${location.toLowerCase()}.png`}
          />
        </div>
      </div>

      <div className="leading-[19px]">
        <p className="text-primary font-semibold">{name}</p>
        <p className="text-[#727272] mt-[3px]">{jobTitle}</p>
        <p className="text-[#727272] mt-[3px]">{department}</p>

        <a
          href="/"
          className="mt-[15px] inline-block text-xs py-[calc((6.5/16)*1rem)] px-3 leading-none rounded-md bg-primary text-white "
        >
          Give High5
        </a>
      </div>
    </div>
  )
}
