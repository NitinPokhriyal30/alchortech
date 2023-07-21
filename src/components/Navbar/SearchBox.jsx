import { api } from '@/api'
import * as React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'

export default function SearchBox({ ...props }) {
  const [searchData, setSearchData] = React.useState({})
  const users = useQuery('users', () => api.users.profiles(), {
    initialData: [],
  })

  async function handleSearch(e) {
    const searchQuery = e.target.value.trim()

    if (searchQuery === '') {
      setSearchData({})
      return
    }

    try {
      await api.transactions.all(new URLSearchParams({ pagination: 0 }))
      setSearchData({
        users: users.data.filter((user) => JSON.stringify(user || {}).includes(searchQuery)),
      })
    } catch (e) {
      toast.error('Network Error. Try again after some time.')
      console.log(e)
    }
  }

  return (
    <form>
      <div className="relative flex items-center rounded-[20px] pb-[9px] pt-2 text-[#acacac]">
        <CiSearch className="ml-[14px]" />
        <input
          type="search"
          name=""
          className="xs:w-70 py-100 rounded-[20px] bg-transparent pl-[10px] font-Lato text-16px placeholder:font-Lato placeholder:text-[16px] placeholder:text-[#ACACAC] focus:outline-none sm:w-96 md:w-[22rem] lg:w-96 xl:w-96 xxl:w-96"
          placeholder="Search Users, Mentioned, Hashtags…"
          onChange={handleSearch}
        />

        <div
          hidden={Object.keys(searchData).length === 0}
          className="absolute top-full z-10 mt-1.5 max-h-[26rem] w-full overflow-y-auto bg-white px-6 py-4 shadow-[0px_3px_6px_#00000029]"
        >
          {Array.isArray(searchData.users) ? (
            <>
              <p className="text-18px font-bold text-[#00bc9f]">Users</p>
              <div className="space-y-2.5 pt-2.5">
                {searchData.users.map((user) => (
                  <div className="flex items-start gap-2.5 text-16px">
                    <img
                      className="aspect-square w-[50px] rounded-full border border-[#707070]"
                      src={user.avtar}
                    />
                    <div>
                      <p className="font-bold text-[#2F2F2F]">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="mt-1 text-[#7B7B7B]">{user.department}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            0
          )}
        </div>
      </div>
    </form>
  )
}
