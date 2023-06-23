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
import { TextField } from '@mui/material'
import EmojiPicker from 'emoji-picker-react'
import * as React from 'react'
import PostUser from '../assets/images/post-img/post-user.png'
import GifPicker from './GifPicker'

const me = {
  id: 101,
  firstName: 'Semad',
  lastName: 'Javed',
  img: PostUser,
}
export default function NewPost({ ...props }) {
  const [searchUserQuery, setSearchUserQuery] = React.useState('')
  const [footerShow, setFooterShow] = React.useState('')
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

  const hashtags = ['OneTeam', 'TeamBuilding', 'Vision', 'Culture', 'Training']
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

  React.useEffect(() => {
    function handleClick(ev) {
      const footerShowElm = document.querySelector('#footerShow')
      const footerElm = document.querySelector('#new-post-footer')

      if (footerShowElm == null || footerElm == null) return

      if (!footerShowElm.contains(ev.target) && !footerElm.contains(ev.target)) {
        setFooterShow('')
      }
    }
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [])

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
              {[10, 20, 30, 40, 50].map((point, i) => (
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
            <p className="flex font-Lato cursor-pointer items-center leading-4">
              You Have {user.points} points to give
              <span className="relative group ml-2 w-4 h-4 bg-white text-black inline-flex items-center justify-center rounded-full ">
                <span>?</span>

                <p className="-translate-x-1/4 w-52 bg-white shadow p-2 rounded z-20 top-[25px] right-[-68px] absolute hidden group-hover:block">
                  You monthly allowance will refresh on 1st March. You have 6 days to spend 160
                  points.
                </p>
              </span>
            </p>
          </li>
        </ul>
      </div>

      {/* text field */}
      <div className="bg-white rounded-b-lg drop-shadow-normal px-6 py-6 text-gray-400">
        <div>
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

        <div className="border-b focus-within:border-primary focus-within:border-b">
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
        <div id="new-post-footer" className="flex items-baseline pt-3 gap-4">
          <button
            className="text-iconColor group cursor-pointer relative inline-block"
            type="button"
            onClick={() => setFooterShow('emoji')}
          >
            <EmojiEmotions />
            <div className="opacity-0 w-24 bg-white drop-shadow-tooltipShadow text-[#747474] text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-[-20px]  px-3 pointer-events-none">
              Add an emoji
              <svg
                class="absolute text-white drop-shadow-tooltipShadow h-2 w-full -left-4 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xml:space="preserve"
              >
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </div>
          </button>

          <label className="text-iconColor group cursor-pointer relative inline-block">
            <Image />
            <div className="opacity-0 w-[100px] bg-white drop-shadow-tooltipShadow text-[#747474] text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-[-37px]  px-3 pointer-events-none">
              Add an image
              <svg
                class="absolute text-white drop-shadow-tooltipShadow h-2 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xml:space="preserve"
              >
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </div>
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

          <label
            className="text-iconColor group cursor-pointer relative inline-block"
            onClick={() => setFooterShow('gif')}
          >
            <GifBox />
            <div className="opacity-0 w-20 bg-white drop-shadow-tooltipShadow text-[#747474] text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-[-30px]  px-3 pointer-events-none">
              Add a gif
              <svg
                class="absolute text-white drop-shadow-tooltipShadow h-2 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xml:space="preserve"
              >
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </div>
          </label>

          <button
            className="text-iconColor group cursor-pointer relative inline-block"
            onClick={(ev) => setFooterShow('link')}
          >
            <Link />
            <div className="opacity-0 w-20 bg-white drop-shadow-tooltipShadow text-[#747474] text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-[-30px]  px-3 pointer-events-none">
              Add a link
              <svg
                class="absolute text-white drop-shadow-tooltipShadow h-2 w-full left-0 top-full"
                x="0px"
                y="0px"
                viewBox="0 0 255 255"
                xml:space="preserve"
              >
                <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
              </svg>
            </div>
          </button>

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

          {footerShow === 'emoji' ? (
            <div id="footerShow" className="absolute z-10">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setForm((prev) => ({ ...prev, message: prev.message + emoji.emoji }))
                  setFooterShow('')
                }}
              />
            </div>
          ) : footerShow === 'link' ? (
            <div
              id="footerShow"
              className="absolute z-10 translate-y-8 bg-white border border-translucent shadow p-4 rounded"
            >
              <form
                onSubmit={(ev) => {
                  ev.preventDefault()
                  setFooterShow('')
                }}
              >
                <label className="text-sm">URL Link</label>
                <input
                  className="mt-1 w-full block bg-translucent p-2 rounded"
                  placeholder="http://"
                  onChange={(ev) => setForm((prev) => ({ ...prev, link: ev.target.value }))}
                />

                <button className="w-full block bg-primary rounded text-white mt-2">OK</button>
              </form>
            </div>
          ) : footerShow === 'gif' ? (
            <GifPicker
              id="footerShow"
              onClick={(url) => {
                setFooterShow('')
                setForm((prev) => ({ ...prev, gif: url }))
              }}
            />
          ) : null}
        </div>
      </div>
    </div>
  )
}
