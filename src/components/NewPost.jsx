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

const me = {
  id: 101,
  firstName: 'Semad',
  lastName: 'Javed',
  img: PostUser,
}
export default function NewPost({ ...props }) {
  const properties = useQuery("properties", () => api.properties())
  const [searchUserQuery, setSearchUserQuery] = React.useState('')
  const [form, setForm] = React.useState({
    points: 30,
    recipients: [],
    hashtags: [],
    message: '',
    image: null,
    link: '',
    sender: [me],
    gif: null,
  })

  const users = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      img: PostUser,
    },
    {
      id: 2,
      firstName: 'Lisa',
      img: PostUser,
      lastName: 'Clinton',
    },
    {
      id: 3,
      img: PostUser,
      firstName: 'Neha',
      lastName: 'Bhati',
    },
  ]

  const hashtags = properties.data?.hashtage || []
  const points_range = properties.data?.points_range || []
  const points_colors = [
    'text-[#03BFC7]',
    'text-[#0374C7]',
    'text-[#6554E3]',
    'text-[#B754E3]',
    'text-[#F46CE9]',
  ]

  const user = {
    points: 260,
  }

  const searchedUser = users.filter((user) =>
    JSON.stringify(user).toLocaleLowerCase().includes(searchUserQuery)
  )
  const emptyRows = Math.max(0, 5 - searchedUser.length)
  const USER_BTN_HEIGHT = 28

  return (
    <div>
      <div className="bg-primary  text-white text-sm rounded-t-lg py-2 px-6">
        <ul className="flex flex-wrap items-center divide-x divide-primary-400 gap-y-3 first:pl-0 child:pl-4">
          {/* points button */}

          <li className="group pr-4">
            <p className="flex gap-[2px] hover:font-bold cursor-pointer">
              + <span className="font-Lato"> Points</span>
            </p>
            <div className="p-2 rounded-full absolute z-10 shadow bg-white text-black gap-2 hidden group-hover:flex">
              {points_range.map((point, i) => (
                <button
                  key={point}
                  type="button"
                  className={`w-8 h-8 flex items-center justify-center rounded-full font-bold hover:bg-primary  hover:text-white ${
                    form.points === point ? 'bg-translucent' : ''
                  } ${points_colors[i]}`}
                  onClick={() => {
                    setForm((prev) => ({ ...prev, points: point }))
                  }}
                >
                  +{point}
                </button>
              ))}
            </div>
          </li>

          <li className="group pr-4">
            <p className="flex gap-[2px] hover:font-bold cursor-pointer">
              @ <span className="font-Lato">Recipients</span>
            </p>
            <div className="absolute shadow z-10 rounded divide-y bg-white text-black hidden group-hover:block">
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
                    {user.firstName} {user.lastName}
                  </button>
                )
              })}

              {emptyRows && (
                <button
                  disabled
                  style={{ height: USER_BTN_HEIGHT * emptyRows }}
                  className={`w-full block px-4 py-1`}
                >
                  &nbsp;
                </button>
              )}

              <input
                className="bg-translucent py-1 px-2"
                onChange={(e) => setSearchUserQuery(e.target.value)}
                placeholder="Search @Recipient"
                value={searchUserQuery}
              />
            </div>
          </li>

          <li className="flex-grow group pr-4">
            <p className="flex gap-[2px] hover:font-bold cursor-pointer">
              # <span className="font-Lato"> Hashtag</span>
            </p>
            <div className="absolute bg-white shadow z-10 text-black flex-col rounded divide-y hidden group-hover:flex">
              {hashtags.map((tag, i) => {
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
                    #{tag}
                  </button>
                )
              })}
            </div>
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
                  <HoverCard.Arrow className='fill-white' />
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
          +{form.points}{' '}
          {form.recipients.map((user) => (
            <button key={user.id} type="button">
              @{user.firstName} {user.lastName}
            </button>
          ))}{' '}
          {form.hashtags.map((tag) => (
            <button key={tag} type="button">
              #{tag}
            </button>
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
            onClick={() => {
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

              store.dispatch({
                type: 'redux',
                fn: (prev) => {
                  prev.unshift({
                    ...form,
                    sender: [{ ...me, points: form.points }],
                    reactions: [],
                    timestamp: new Date(),
                    id: Math.random().toString(),
                    comment: {
                      id: Math.random().toString(),
                      user: me,
                      reactions: [],
                      message: '',
                      timestamp: new Date(),
                      replies: [],
                    },
                  })
                },
              })
              setForm({
                points: 30,
                recipients: [],
                hashtags: [],
                message: '',
                image: null,
                link: '',
                sender: [me],
              })
            }}
          >
            Give
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
