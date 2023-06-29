import { store } from '../redux/store'
import {
  AttachFile,
  Close,
  EmojiEmotions,
  GifBox,
  GifBoxOutlined,
  GifOutlined,
  Image,
  Link,
} from '@mui/icons-material'
import { Portal, TextField } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import * as React from 'react'
import PostUser from '../assets/images/post-img/post-user.png'
import GifPicker from './GifPickerPopover'
import HoveringWidget from '@/components/HoveringWidget'
import * as Popover from '@radix-ui/react-popover'
import * as HoverCard from '@radix-ui/react-hover-card'
import ToolTip from '@/components/ToolTip'
import { RxCross2 } from 'react-icons/rx'
import { useQuery } from 'react-query'
import { api } from '@/api'
import Cookies from 'js-cookie'
import { queryClient } from '@/queryClient'
import { toast } from 'react-toastify'

const me = {
  id: 101,
  firstName: 'Semad',
  lastName: 'Javed',
  img: PostUser,
}
export default function NewPost({ ...props }) {
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))
  const [loading, setLoading] = React.useState(false)

  const [form, setForm] = React.useState({
    point: 30,
    recipients: [],
    hashtags: [],
    image: null,
    gif: null,
    link: '',
    message: '',
  })

  const user = {
    points: 260,
  }
  return (
    <div>
      <div className="bg-primary  text-white text-sm rounded-t-lg py-2 px-6">
        <ul className="flex flex-wrap items-center divide-x divide-primary-400 gap-y-3 first:pl-0 child:pl-4">
          {/* points button */}

          <li className="group pr-4">
            <PointsRangeDialog {...{ form, setForm }} />
          </li>

          <li className="group pr-4">
            <RecipientsDropdown {...{ form, setForm }} />
          </li>

          <li className="flex-grow group pr-4">
            <HashTagsDropdown {...{ form, setForm }} />
          </li>

          <li style={{ borderWidth: 0 }} className="md:flex-shrink md:basis-auto basis-full">
            <HoverCard.Root>
              <p className="flex font-Lato cursor-pointer items-center leading-4">
                You Have {user.points} points to give
                <HoverCard.Trigger className="ml-2 w-4 h-4 bg-white text-black inline-flex items-center justify-center rounded-full">
                  <span>?</span>
                </HoverCard.Trigger>
              </p>

              <HoverCard.Portal>
                <HoverCard.Content className="w-screen max-w-xs bg-white shadow p-2 rounded z-20">
                  <HoverCard.Arrow className="fill-white" />
                  You monthly allowance will refresh on 1st March. You have 6 days to spend 160
                  points.
                </HoverCard.Content>
              </HoverCard.Portal>
            </HoverCard.Root>
          </li>
        </ul>
      </div>

      {/* text field */}

      <div className="bg-white rounded-b-lg drop-shadow-normal _px-6 py-6 text-gray-400">
        <div className="px-6">
          +{form.point}{' '}
          {form.recipients.map((user) => (
            <span key={user.id}>
              @{user.first_name} {user.last_name}
            </span>
          ))}{' '}
          {form.hashtags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>

        <div className="px-6 border-b focus-within:border-primary focus-within:border-b">
          <textarea
            spellCheck={false}
            className="resize-none h-20 block w-full outline-none  transition-all"
            placeholder="Type Here..."
            onChange={(ev) =>
              setForm((prev) => ({ ...prev, message: ev.target.value.substring(0, 270) }))
            }
            value={form.message}
          ></textarea>

          {form.image && (
            <div>
              <img
                src={URL.createObjectURL(form.image)}
                key={form.image}
                className="mt-4 w-40 border"
              />
            </div>
          )}

          {form.gif && (
            <div>
              <div className="group flex items-center pb-2">
                <img src={form.gif} key={form.image} className="mt-4 w-40 border" />

                <button
                  className="hidden group-hover:inline-block ml-4"
                  onClick={() => setForm((prev) => ({ ...prev, gif: '' }))}
                >
                  <Close fontSize="10" />
                </button>
              </div>
            </div>
          )}

          {form.link && (
            <div>
              <p>URL Link:</p>

              <div className="group flex items-center">
                <a className="text-primary underline" href={form.link}>
                  {form.link}
                </a>
                <button
                  className="hidden group-hover:inline-block ml-4"
                  onClick={() => setForm((prev) => ({ ...prev, link: '' }))}
                >
                  <Close fontSize="10" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        <div id="new-post-footer" className="flex items-baseline px-6 pt-3 gap-4">
          <Popover.Root>
            <Popover.Trigger className="text-iconColor group cursor-pointer relative inline-block">
              <EmojiEmotions />
              <ToolTip title="Add an emoji" />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className="z-20">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setForm((prev) => ({ ...prev, message: prev.message + emoji.emoji }))
                  }}
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <label className="text-iconColor group cursor-pointer relative inline-block">
            <Image />
            <ToolTip title="Add an image" />

            <input
              hidden
              type="file"
              accept="image/*"
              onChange={(ev) => {
                setForm((prev) => ({
                  ...prev,
                  image: ev.target.files[0],
                }))
              }}
            />
          </label>

          <Popover.Root>
            <Popover.Trigger className="text-iconColor group relative inline-block">
              <GifBox />

              <ToolTip title="Add a gif" />
            </Popover.Trigger>

            <GifPicker
              onClick={(url) => {
                setForm((prev) => ({ ...prev, gif: url }))
              }}
            />
          </Popover.Root>

          <Popover.Root>
            <Popover.Trigger className="text-iconColor group cursor-pointer relative inline-block">
              <Link />
              <ToolTip title="Add a link" />
            </Popover.Trigger>

            <Popover.Portal>
              <Popover.Content className=" z-50">
                <AddLinkPopup
                  onChange={(link) =>
                    setForm((prev) => {
                      console.log(link)
                      return { ...prev, link }
                    })
                  }
                />
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>

          <button
            type="submit"
            className=" ml-auto bg-primary text-white font-Lato px-4 py-1 w-full max-w-[6rem] rounded-sm"
            onClick={async () => {
              if (form.hashtags.length === 0) {
                alert('Add atleast one hashtag')
                return
              }
              if (form.recipients.length === 0) {
                alert('Add atleast one recipient')
                return
              }
              if (form.message.length === 0) {
                alert('Add a message')
                return
              }

              const todayDate = new Date()
              const today =
                todayDate.getFullYear() + '-' + todayDate.getMonth() + '-' + todayDate.getDate()

              const data = {
                sender: [me.data],
                active: true,
                flag_transaction: false,
                react_by: {},
                created_by: me.data.id,
                updated_by: me.data.id,
                created: today,
                updated: today,
              }

              try {
                setLoading(true)
                await api.transactions.new({ ...data, ...form })
                await queryClient.refetchQueries('transactions')

                setForm({
                  point: 30,
                  recipients: [],
                  hashtags: [],
                  image: null,
                  gif: null,
                  link: '',
                  message: '',
                })
              } catch {
                toast.error('Transaction failed. Server error')
              } finally {
                setLoading(false)
              }
            }}
          >
            {loading === true ? <>&middot; &middot; &middot;</> : 'Give'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AddLinkPopup({ onChange }) {
  return (
    <div className="bg-white border border-[#00bc9f] p-2 pt-1 rounded-md w-screen max-w-xs">
      <p className="flex justify-between items-center text-18px text-gray-500">
        Add a link
        <Popover.Close className="p-px rounded-sm hover:bg-translucent hover:text-primary">
          <RxCross2 />
        </Popover.Close>
      </p>

      <label className="flex justify-between items-center text-sm mt-3 text-gray-600">
        Link:
        <input
          name="link"
          className="mt-1 w-44 py-2.5 px-5 text-primary leading-5 rounded bg-translucent"
          placeholder="http://"
          onChange={(ev) => onChange(ev.target.value)}
        />
      </label>
    </div>
  )
}

function PointsRangeDialog({ form, setForm }) {
  const properties = useQuery('properties', () => api.properties())
  const points_range = properties.data?.points_range

  const points_colors = [
    'text-[#03BFC7]',
    'text-[#0374C7]',
    'text-[#6554E3]',
    'text-[#B754E3]',
    'text-[#F46CE9]',
  ]

  return (
    <>
      <p className="flex gap-[2px] hover:font-bold cursor-pointer">
        + <span className="font-Lato"> Points</span>
      </p>
      <div className="p-2 rounded-full absolute z-10 shadow bg-white text-black gap-2 hidden group-hover:flex">
        {properties.isLoading
          ? Array(5)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold bg-paper`}
                />
              ))
          : points_range.map((point, i) => (
              <button
                key={point}
                type="button"
                className={`w-8 h-8 flex items-center justify-center rounded-full font-bold hover:bg-primary  hover:text-white ${
                  form.point === point ? 'bg-translucent' : ''
                } ${points_colors[i]}`}
                onClick={() => {
                  setForm((prev) => ({ ...prev, point }))
                }}
              >
                +{point}
              </button>
            ))}
      </div>
    </>
  )
}

function RecipientsDropdown({ form, setForm }) {
  const users = useQuery('users', () => api.users.profiles(), { initialData: [] })

  const [searchUserQuery, setSearchUserQuery] = React.useState('')
  let searchedUser = users.data?.filter((user) =>
    JSON.stringify(user).toLocaleLowerCase().includes(searchUserQuery)
  )

  const USER_BTN_HEIGHT = 28

  return (
    <>
      {/* dropdown trigger */}
      <p className="flex gap-[2px] hover:font-bold cursor-pointer">
        @ <span className="font-Lato">Recipients</span>
      </p>

      {/* container */}
      <div className="absolute shadow z-10 rounded overflow-hidden divide-y bg-white text-black hidden group-hover:block">
        {/* fixed height list */}
        <div style={{ height: 5 * USER_BTN_HEIGHT }} className="overflow-y-auto">
          {users.isRefetching ? (
            <p className="absolute m-auto inset-0 w-[15ch] h-10 text-center text-gray-500">
              Loading...
            </p>
          ) : (
            <>
              {searchedUser.map((user) => {
                const checked = form.recipients.findIndex((x) => x.id === user.id) !== -1
                return (
                  <button
                    style={{ height: USER_BTN_HEIGHT }}
                    className={`w-full block  px-4 py-1 text-left ${
                      checked ? 'bg-translucent' : ''
                    }`}
                    key={user.id}
                    type="button"
                    onClick={() => {
                      setForm((prev) => {
                        const checked = form.recipients.findIndex((x) => x.id === user.id) !== -1
                        if (checked) {
                          prev.recipients = prev.recipients.filter((x) => x.id !== user.id)
                        } else {
                          prev.recipients.push(user)
                        }

                        return { ...prev }
                      })
                    }}
                  >
                    {user.first_name} {user.last_name}
                  </button>
                )
              })}
            </>
          )}
        </div>

        <input
          className="bg-translucent py-1 px-2"
          onChange={(e) => setSearchUserQuery(e.target.value)}
          placeholder="Search @Recipient"
          value={searchUserQuery}
        />
      </div>
    </>
  )
}

function HashTagsDropdown({ form, setForm }) {
  const properties = useQuery('properties', () => api.properties())

  const hashtags = properties.data?.hashtage

  return (
    <>
      <p className="flex gap-[2px] hover:font-bold cursor-pointer">
        # <span className="font-Lato"> Hashtag</span>
      </p>
      <div className="absolute bg-white shadow z-10 text-black flex-col rounded overflow-hidden divide-y hidden group-hover:flex">
        {properties.isLoading ? (
          <p className="h-10 w-[15ch] text-center pt-3">Loading</p>
        ) : (
          hashtags.map((tag) => {
            const checked = form.hashtags.includes(tag)
            return (
              <button
                key={tag}
                type="button"
                className={`text-left px-4 py-1 ${checked ? 'bg-translucent' : ''}`}
                onClick={() => {
                  setForm((prev) => {
                    const checked = prev.hashtags.includes(tag)
                    if (checked) {
                      prev.hashtags = prev.hashtags.filter((x) => x !== tag)
                    } else {
                      prev.hashtags.push(tag)
                    }

                    return { ...prev }
                  })
                }}
              >
                {tag}
              </button>
            )
          })
        )}
      </div>
    </>
  )
}
