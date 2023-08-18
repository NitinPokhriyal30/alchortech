import { api } from '@/api'
import * as Popover from '@radix-ui/react-popover'
import * as React from 'react'
import { CiSearch } from 'react-icons/ci'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import debounce from 'lodash.debounce'
import { RiArrowLeftLine, RiArrowRightLine, RiLoader2Line, RiSearch2Line, RiSearchLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import Loader from '../Loader'
import { getAvatarAttributes, processAvatarUrl } from '@/utils'

// not using react query because of debounce input
export default function SearchBox({ ...props }) {
  const [isLoading, setIsLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [selectedUser, setSelectedUser] = React.useState(null)
  const [searchQuery, setSearchQuery] = React.useState('')
  const [searchData, setSearchData] = React.useState({})
  const users = useQuery('users', () => api.users.profiles(), {
    initialData: [],
  })

  const handleSearch = async (e) => {
    setIsLoading(true)
    setSelectedUser(null)

    const searchQuery = e.target.value.trim()
    setSearchQuery(searchQuery)

    if (searchQuery === '') {
      setSearchData({})
      return
    }

    try {
      const searchedUser = users.data.filter(
        (user) =>
          console.log(user) ||
          JSON.stringify(user || {})
            .toLowerCase()
            .replace(" ","")
            .includes(searchQuery.toLowerCase())
      )

      const transactions = await api.transactions.all(new URLSearchParams({ pagination: 0, hashtags: searchQuery }))

      setSearchData({ users: searchedUser, hashtags: transactions })
    } catch (e) {
      toast.error('Network Error. Try again after some time.')
      console.log(e)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {show && <div className="absolute inset-0 h-screen w-screen" onClick={() => setShow(false)} />}
      <form onFocus={() => setShow(true)}>
        <div className="relative flex items-center rounded-[20px] pb-[9px] pt-2 text-[#acacac]">
          <CiSearch className="ml-[14px]" />
          <input
            type="search"
            name=""
            className="xs:w-70 py-100 rounded-[20px] bg-transparent pl-[10px] pr-2 font-Lato text-16px placeholder:font-Lato placeholder:text-[16px] placeholder:text-[#ACACAC] focus:outline-none sm:w-96 md:w-[22rem] lg:w-96 xl:w-96 xxl:w-96"
            placeholder="Search Users, Mentioned, Hashtags…"
            onChange={handleSearch}
          />

          {searchQuery !== '' ? (
            <div hidden={!show} className="absolute top-full z-10 mt-1.5 h-screen max-h-[26rem] w-full overflow-y-auto rounded-lg bg-white p-6 shadow-[0px_3px_6px_#00000029]">
              {!!selectedUser ? (
                <SearchUserTransactions user={selectedUser} onBack={() => setSelectedUser(null)} onClick={() => setShow(false)} />
              ) : isLoading ? (
                <p className="mt-[50%] flex justify-center">
                  {/* <RiLoader2Line className="animate-spin" /> */}
                  <Loader />
                </p>
              ) : !Array.isArray(searchData.users) ? (
                <p className="mt-20 flex items-center justify-center gap-x-2 font-semibold">
                  <RiSearchLine /> Type anything in Search Box.
                </p>
              ) : Array.isArray(searchData.hashtags) && searchData.hashtags.length > 0 ? (
                <>
                  <p className="flex items-center gap-3 text-18px font-semibold text-[#00bc9f]">Hashtags</p>

                  <div className="space-y-2.5 pt-2.5">
                    {searchData.hashtags.map((transaction) => (
                      <Link to={`/transactions/${transaction.id}`} className="flex items-start gap-2.5 rounded-md text-16px hover:bg-paper" onClick={() => setShow(false)}>
                        <div>
                          <p className="text-black">
                            <span className="font-semibold">
                              {transaction.sender.first_name} {transaction.sender.last_name}
                            </span>{' '}
                            <span className="italic">Appreciated</span>{' '}
                            <span className="">
                              @{transaction.recipients[0].first_name} {transaction.recipients[0].last_name}
                            </span>
                          </p>
                          <p className="line-clamp-1 text-ellipsis pt-1">{transaction.message}</p>
                          <p className="line-clamp-1 text-ellipsis pt-1">
                            {transaction.hashtags.map((tag) => (
                              <span className={tag.name.startsWith(searchQuery) ? 'bg-[#fff9c9]' : ''}>{tag.name}</span>
                            ))}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : searchData.users.length === 0 ? (
                <p className="mt-20 flex items-center justify-center gap-x-2 font-semibold">No Users for Found</p>
              ) : searchData.users.length > 0 ? (
                <>
                  <p className="flex items-center gap-3 text-18px font-semibold text-[#00bc9f]">Users</p>

                  <div className="space-y-2.5 pt-2.5">
                    {searchData.users.map((user) => (
                      <SearchUserProfile user={user} onClick={() => setSelectedUser(user)} />
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            ''
          )}
        </div>
      </form>
    </>
  )
}

function SearchUserTransactions({ user, onBack, onClick }) {
  const userTransactionQuery = useQuery(['search', 'transaction', user.id], () => api.transactions.all(new URLSearchParams({ pagination: 0, recipients: user.id })))

  return (
    <div>
      <p className="flex items-center gap-3 text-18px font-semibold text-[#00bc9f]">
        <button
          className="rounded-md py-1  hover:bg-paper hover:text-primary"
          type="button"
          onClick={() => {
            onBack()
            // onClick()
          }}
        >
          <RiArrowLeftLine />
        </button>
        Users
      </p>

      <div className="space-y-2.5 pt-2.5">
        <Link to={`/myProfile?userId=${user.id}`}>
          <SearchUserProfile user={user} onClick={onClick} />
        </Link>
      </div>

      <p className="font-font-semibold mt-5 text-18px text-[#00bc9f]">Appreciation</p>
      <div className="space-y-2.5 pt-4">
        {userTransactionQuery.data == null || userTransactionQuery.isLoading ? (
          <div className="space-y-2.5">
            <div className="h-10 w-full animate-pulse rounded-md bg-paper" />
            <div className="h-10 w-full animate-pulse rounded-md bg-paper" />
            <div className="h-10 w-full animate-pulse rounded-md bg-paper" />
            <div className="h-10 w-full animate-pulse rounded-md bg-paper" />
          </div>
        ) : userTransactionQuery.data.length === 0 ? (
          <p className="mt-20 flex items-center justify-center gap-x-2 font-bold">
            No transactions for "{user.first_name} {user.last_name}"
          </p>
        ) : (
          userTransactionQuery.data.map((transaction) => (
            <Link to={`/transactions/${transaction.id}`} className="flex items-start gap-2.5 rounded-md text-16px hover:bg-paper" onClick={onClick}>
              <div>
                <p className="text-black">
                  <span className="font-semibold">
                    {transaction.sender.first_name} {transaction.sender.last_name}
                  </span>{' '}
                  <span className="italic">Appreciated</span>{' '}
                  <span className="bg-[#fff9c9]">
                    @{user.first_name} {user.last_name}
                  </span>
                </p>
                <p className="line-clamp-1 text-ellipsis pt-1">{transaction.message}</p>
                <p className="line-clamp-1 text-ellipsis pt-1">{transaction.hashtags.map((tag) => '#' + tag.name).join(' ')}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

function SearchUserProfile({ user, onClick }) {
  return (
    <div className="flex cursor-pointer items-start gap-2.5 rounded-md text-16px hover:bg-paper" onClick={onClick}>
      <img
        className="aspect-square w-[55px] rounded-full border border-[#707070]"
        src={getAvatarAttributes(`${user.full_name}`, processAvatarUrl(user.avtar)).src}
        alt={getAvatarAttributes(`${user.full_name}`, processAvatarUrl(user.avtar)).alt}
        onError={(e) => {
          // If the image fails to load, use the name initials instead
          e.target.onerror = null
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.first_name.charAt(0) + user.last_name.charAt(0))}&color=${'#464646'}&background=${'FFFFFF'}`
        }}
      />
      <div>
        <p className="font-semibold text-[#2F2F2F]">{user.full_name}</p>
        <p className="mt-1 text-[#7B7B7B]">{user.department}</p>
      </div>
    </div>
  )
}
