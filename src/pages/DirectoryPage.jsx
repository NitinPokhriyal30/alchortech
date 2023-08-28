import * as React from 'react'
import { BsSearch } from 'react-icons/bs'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import PersonCard from '../components/Directory/PersonCard'
import UserImage from '../assets/images/user-profile/pp.png'
import { useQuery } from 'react-query'
import { api } from '@/api'
import Loader from '@/components/Loader'

let inputDelayRef = { current: 0 }
const handleChange = (setQuery) => (ev) => {
  clearTimeout(inputDelayRef.current)

  const value = ev.target.value
  inputDelayRef.current = setTimeout(() => {
    setQuery(value)
  }, 500)
}

export default function DirectoryPage({ ...props }) {
  const [query, setQuery] = React.useState('')
  const [departmentFilter, setDepartmentFilter] = React.useState('')
  const [locationFilter, setLocationFilter] = React.useState('')
  const [page, setPage] = React.useState(1)

  const users = useQuery(
    ['users', query, departmentFilter, locationFilter, page],
    () =>
      api.users.search(
        new URLSearchParams({ params: query, location: locationFilter, department: departmentFilter, page: page, pagination: 1, page_size: 3 })
      )
  )

  const filteredUsers = users.data

  console.log(filteredUsers);

  const response = useQuery("response", () => api.analytics.filters()) || []

  return (
    <div className="col-span-2 px-3 md:px-0 md:pt-3 xs:pt-0 sm: lg:pl-0">
       <div className="rounded-lg bg-white px-5 py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <BsSearch />
            <input className="ml-1.5 flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" defaultValue={query} placeholder="Search" onChange={handleChange(setQuery)} />
          </div>

          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select className="flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" onChange={(ev) => setDepartmentFilter(ev.target.value)}>
              {response.isLoading ? <div className='flex justify-center' >
                <Loader />
              </div> : <>
                <option value="">Filter by Department</option>
                {response.data.departments?.map((depart) => (
                  <option value={depart} key={depart}>
                    {depart}
                  </option>
                ))}
              </>}

            </select>
          </div>

          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select className="flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" value={locationFilter} onChange={(ev) => setLocationFilter(ev.target.value)}>
              {response.isLoading ? <div className='flex justify-center' >
                <Loader />
              </div> : <>
                <option value="">Filter by Location</option>
                {response.data.region?.map((loc) => (
                  <option value={loc} key={loc}>
                    {loc}
                  </option>
                ))}
              </>}
            </select>
          </div>
        </div>
        {users.isLoading  ? <div className='flex justify-center my-20' >
          <Loader />
        </div> : (
          <>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {filteredUsers.data?.map((props, index) => (
                <PersonCard key={index} img={UserImage} {...props} />
              ))}
            </div>

            <div className="mx-auto mt-10 flex max-w-[14rem] items-center justify-between ">
              <div className="flex">
                <button disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, --p))} className="grid h-9 w-9 place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300">
                  <SlArrowLeft className="text-xl" />
                </button>

                  <button disabled={filteredUsers.next == null} className="ml-3 grid h-9 w-9 place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300" onClick={() => setPage((p) => ++p)}>
                  <SlArrowRight className="text-xl" />
                </button>
              </div>

              <span>
                  Page {page} of - {filteredUsers.total_pages}
                {/* {users.data?.count} */}
              </span>
            </div>
          </>
        )}
      </div>

    </div>
  )
}
