import { api } from '@/api'
import * as Popover from '@radix-ui/react-popover'
import * as React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'

export default function SearchBox({ ...props }) {
  const [show, setShow] = React.useState(false)
  const [searchData, setSearchData] = React.useState({})
  const users = useQuery('users', () => api.users.profiles(), {
    initialData: [],
  })

  const handleSearch = debounce(async (e) => {
    const searchQuery = e.target.value.trim()

    if (searchQuery === '') {
      setSearchData({})
      return
    }

    try {
      const searchedUser = users.data.filter((user) =>
        JSON.stringify(user || {}).includes(searchQuery)
      )
      const allRes = await Promise.all(
        searchedUser.map((user) =>
          api.transactions.all(new URLSearchParams({ pagination: 0, recipients: user.id }))
        )
      )

      setSearchData({
        users: searchedUser,
        transactions: allRes.flatMap((data) => data.results),
      })
    } catch (e) {
      toast.error('Network Error. Try again after some time.')
      console.log(e)
    }
  }, 2000)

  return (
    <form onFocus={() => setShow(true)} onBlur={() => setShow(false)}>
      <div className="relative flex items-center rounded-[20px] pb-[9px] pt-2 text-[#acacac]">
        <CiSearch className="ml-[14px]" />
        <input
          type="search"
          name=""
          className="xs:w-70 py-100 rounded-[20px] bg-transparent pl-[10px] font-Lato text-16px placeholder:font-Lato placeholder:text-[16px] placeholder:text-[#ACACAC] focus:outline-none sm:w-96 md:w-[22rem] lg:w-96 xl:w-96 xxl:w-96"
          placeholder="Search Users, Mentioned, Hashtags…"
          onChange={handleSearch}
        />
        {Array.isArray(searchData.users) && searchData.users?.length > 0 && show === true ? (
          <div className=" absolute top-full z-10 mt-1.5 max-h-[26rem] w-full overflow-y-auto bg-white px-6 py-4 shadow-[0px_3px_6px_#00000029]">
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

                <p className="pt-7 text-18px font-bold text-[#00bc9f]">Appriciations</p>
                <div className="space-y-2.5 pt-4">
                  {searchData.transactions.map((transaction) => (
                    <div className="flex items-start gap-2.5 text-16px">
                      <div>
                        <p className="text-black">
                          <span className="font-bold">
                            {transaction.sender[0].first_name} {transaction.sender[0].last_name}
                          </span>{' '}
                          <span className="italic">Appriciated</span>{' '}
                          <span className="bg-[#fff9c9]">
                            @{transaction.recipients[0].first_name}{' '}
                            {transaction.recipients[0].last_name}
                          </span>
                        </p>
                        <p className="line-clamp-1 text-ellipsis pt-1">{transaction.message}</p>
                        <p>{transaction.hashtags.join(' ')}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </form>
  )
}
