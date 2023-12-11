import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAvatarAttributes, processAvatarUrl } from '@/utils'
import CountryFlag from 'react-country-flag';
import countryList from 'country-list';

export default function PersonCard({ id, full_name, avtar: img, title: jobTitle, department, location, country_name, ...props }) {
  const name = full_name
  const navigate = useNavigate(); 

  const normalizedCountryName = country_name.toLowerCase();
  const countryCode = countryList.getCode(normalizedCountryName);

  console.log(countryCode);

  return (
    <div className="flex gap-3 rounded-[4px] border border-400 px-4 pb-2 pt-[11px] shadow-[0px_2px_7px] shadow-[#0000001d]">
      <div>
        <img {...getAvatarAttributes(full_name, processAvatarUrl(img))} className="mx-auto block aspect-square w-[calc((74/16)*1rem)] rounded-full border-2 border-[#00BC9F] bg-paper cursor-pointer" onClick={(e) => { e.preventDefault(), navigate(`/myProfile?userId=${id}`) }} /> 
        <div className="mx-auto grid h-10 w-10 place-items-center">
          {countryCode ? <CountryFlag style={{width : '2em', height: '2em'}} countryCode={countryCode} svg /> : <div>Flag not found</div>}
        </div>
      </div>

      <div className="leading-[19px]">
        <p className="font-semibold text-primary cursor-pointer" onClick={(e) => { e.preventDefault(), navigate(`/myProfile?userId=${id}`) }}>{name}</p>
        <p className="mt-[3px] text-[#727272]">{jobTitle}</p>
        <p className="mt-[3px] text-[#727272]">{department}</p>

        <Link to={`/${id}`} className="mt-[15px] inline-block rounded-md bg-primary px-3 py-[calc((6.5/16)*1rem)] text-xs leading-none text-white ">
          Give High5
        </Link>
      </div>
    </div>
  )
}
