import * as React from 'react'
import { BsSearch } from 'react-icons/bs'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import PersonCard from '../components/Directory/PersonCard'
import UserImage from '../assets/images/user-profile/pp.png'

const colors = {
  shadow: '#0000001d',
}

const names = [
  'Max Ortega',
  'Rodney Saunders',
  'Moises Jackson',
  'Xander Blake',
  'Peyton Olson',
  'Dana Stevens',
  'Julien Navarro',
  'Andres Mclean',
  'Avery Lam',
  'Abel Berger',
  'Jon Hamilton',
  'Elliot Hawkins',
  'Dayanara Wilkinson',
  'Zackary Arellano',
  'Frances Weaver',
  'Lawson Hart',
  'Bo Howe',
  'America Hanson',
  'Shyla Mcclain',
  'Salma Flores',
  'Jaylen Rhodes',
  'Samantha Hines',
  'Gunnar Warren',
  'Robert Howe',
  'Aaliyah Rivera',
  'Jaylee Hoover',
  'Isabela Ferguson',
  'Jaylynn Phillips',
  'Finnegan Johns',
  'Jocelyn Ayers',
]

const job = [
  'Casual worker',
  'Councilier',
  'Assistant',
  'Secretary',
  'Developer',
  'Developer',
  'Developer',
  'Developer',
  'Developer',
  'Developer',
]

const department = ['Senior', 'HR', 'Junior']
const location = ['IN', 'US', 'GB']

function getRandom(list = []) {
  const i = Math.floor(Math.random() * list.length)
  return list[i]
}

const users = names.map((name) => ({
  name,
  jobTitle: getRandom(job),
  department: getRandom(department),
  location: getRandom(location),
}))

export default function DirectoryPage({ ...props }) {
  const [query, setQuery] = React.useState('')
  const [departmentFilter, setDepartmentFilter] = React.useState('')
  const [locationFilter, setLocationFilter] = React.useState('')
  const [page, setPage] = React.useState(0)
  const pageSize = 18

  const filteredUsers = users
    .filter((user) => user.name.toLowerCase().includes(query.toLowerCase()))
    .filter((user) => user.department.includes(departmentFilter))
    .filter((user) => user.location.includes(locationFilter))

  return (
    <div className="col-span-2 pl-3 pr-3 xs:pt-0 sm:pt-3 lg:pl-0">
      <div className="rounded-lg bg-white px-5 py-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <BsSearch />
            <input
              className="ml-1.5 flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit"
              value={query}
              placeholder="Search"
              onChange={(ev) => setQuery(ev.target.value)}
            />
          </div>

          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select
              className="flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit"
              onChange={(ev) => setDepartmentFilter(ev.target.value)}
            >
              <option value="">Filter by Department</option>
              {department.map((depart) => (
                <option value={depart} key={depart}>
                  {depart}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select
              className="flex-1 border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit"
              value={locationFilter}
              onChange={(ev) => setLocationFilter(ev.target.value)}
            >
              <option value="">Filter by Location</option>
              {location.map((loc) => (
                <option value={loc} key={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {filteredUsers.slice(page * pageSize, page * pageSize + pageSize).map((props) => (
            <PersonCard key={props.name} img={UserImage} {...props} />
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-[14rem] items-center justify-between ">
          <div className="flex">
            <button
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, --p))}
              className="grid h-9 w-9 place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300"
            >
              <SlArrowLeft className="text-xl" />
            </button>

            <button
              disabled={(page + 1) * pageSize >= users.length}
              className="ml-3 grid h-9 w-9 place-items-center rounded-[3px] border border-[#d5d5d5] disabled:text-gray-300"
              onClick={() => setPage((p) => Math.min(Math.floor(users.length / pageSize), ++p))}
            >
              <SlArrowRight className="text-xl" />
            </button>
          </div>

          <span>
            Rows {Math.max(1, page * pageSize)} -{' '}
            {Math.min(page * pageSize + pageSize, users.length)} of {users.length}
          </span>
        </div>
      </div>
    </div>
  )
}
