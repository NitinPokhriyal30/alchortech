import * as React from 'react'
import UserImage from '../../assets/images/post-img/post-user.png'
import { Link } from 'react-router-dom'
import { getAvatarAttributes, processAvatarUrl } from '@/utils'

export default function PersonCard({ id, full_name, avtar: img, title: jobTitle, department, location, ...props }) {
  const name = full_name

  console.log(id);

  return (
    <div className="flex gap-3 rounded-[4px] border border-400 px-4 pb-2 pt-[11px] shadow-[0px_2px_7px] shadow-[#0000001d]">
      <div>
        <img {...getAvatarAttributes(full_name, processAvatarUrl(img))} className="mx-auto block aspect-square w-[calc((74/16)*1rem)] rounded-full border-2 border-[#00BC9F] bg-paper" />
        <div className="mx-auto grid h-10 w-10 place-items-center">
          <img className="mx-auto aspect-video w-7" alt={location} src={`https://flagcdn.com/w40/${'IN'.toLowerCase()}.png`} />
        </div>
      </div>

      <div className="leading-[19px]">
        <p className="font-semibold text-primary">{name}</p>
        <p className="mt-[3px] text-[#727272]">{jobTitle}</p>
        <p className="mt-[3px] text-[#727272]">{department}</p>

        <Link to={`/${id}`} className="mt-[15px] inline-block rounded-md bg-primary px-3 py-[calc((6.5/16)*1rem)] text-xs leading-none text-white ">
          Give High5
        </Link>
      </div>
    </div>
  )
}
