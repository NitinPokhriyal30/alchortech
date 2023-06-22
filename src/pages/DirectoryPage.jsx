import * as React from 'react'
import { BsSearch } from 'react-icons/bs'
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl'

import PersonCard from '../components/Directory/PersonCard'
import UserImage from '../assets/images/post-img/post-user.png'

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
    <div className="col-span-2 lg:pl-0 sm:pt-3 xs:pt-0 pl-3 pr-3">
      <div className="py-6 px-5 bg-white rounded-lg">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5">
          <div className="border border-400 rounded text-[#acacac] flex items-center px-3 focus-within:outline outline-1 outline-primary-400">
            <BsSearch />
            <input
              className="bg-transparent border-none outline-none ml-1.5 pt-1.5 pb-2 placeholder:text-inherit leading-none flex-1 font-semibold"
              value={query}
              placeholder="Search"
              onChange={(ev) => setQuery(ev.target.value)}
            />
          </div>

          <div className="border border-400 rounded text-[#acacac] flex items-center px-3 focus-within:outline outline-1 outline-primary-400">
            <select
              className="bg-transparent border-none outline-none pt-1.5 pb-2 placeholder:text-inherit leading-none flex-1 font-semibold"
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

          <div className="border border-400 rounded text-[#acacac] flex items-center px-3 focus-within:outline outline-1 outline-primary-400">
            <select
              className="bg-transparent border-none outline-none pt-1.5 pb-2 placeholder:text-inherit leading-none flex-1 font-semibold"
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

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
          {filteredUsers.slice(page * pageSize, page * pageSize + pageSize).map((props) => (
            <PersonCard key={props.name} img={UserImage} {...props} />
          ))}
        </div>

        <div className="flex justify-between mt-10 max-w-[14rem] mx-auto items-center ">
          <div className="flex">
            <button
              disabled={page <= 0}
              onClick={() => setPage((p) => Math.max(0, --p))}
              className="border rounded-md disabled:text-gray-300 p-1"
            >
              <SlArrowLeft className="text-xl" />
            </button>

            <button
              disabled={(page + 1) * pageSize >= users.length}
              className="border rounded-md disabled:text-gray-300 ml-3 p-1"
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
