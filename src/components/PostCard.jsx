import React, { useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { store } from '../redux/store'
import {
  BsFillChatRightTextFill,
  BsFillImageFill,
  BsPlusCircleFill,
  BsThreeDots,
} from 'react-icons/bs'
import PostUser from '../assets/images/post-img/post-user.png'
import MyProfileImg from '../assets/images/user-profile/male_avatar.jpg'
import { BiHeartCircle, BiXCircle } from 'react-icons/bi'
import { HiEmojiHappy } from 'react-icons/hi'
import { AiOutlineCaretDown, AiOutlineFileGif } from 'react-icons/ai'
import { AchievementBanner } from './AchievementBanner'
import PostComment from './PostComment'
import ThumbNailX from '../assets/slider/slider-bg2.png'
import GifPicker from './GifPickerPopover'
import EmojiPicker from 'emoji-picker-react'
import { addPoints, addReaction, addComment, addCommentReaction } from '../redux/postAction'
import { useSelector } from 'react-redux'
import HoveringWidget from '@/components/HoveringWidget'
import { SERVER_URL } from '@/constant'
import { api } from '@/api'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'
import { getTodayDate } from '@/utils'
import { queryClient } from '@/queryClient'

const POINTS = [
  {
    points: 10,
    color: '#0374C7',
  },
  {
    points: 20,
    color: '#0374C7',
  },
  {
    points: 30,
    color: '#6554E3',
  },
  {
    points: 40,
    color: '#B754E3',
  },
  {
    points: 50,
    color: '#F46CE9',
  },
]

const PostCard = ({ post, childrenTransactions, ...props }) => {
  const [showCommentsFor, setShowCommentsFor] = React.useState('')
  const [modal, setModal] = React.useState('')
  const [form, setForm] = React.useState({ image: '', gif: '', message: '' })
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))
  const addedPoints = post.sender.find((x) => x.id === me.id)?.points
  // const [hasAddedPoints, setHasAddedPoints] = React.useState(0)

  const [, setHasAddedPoints] = React.useState(0)
  post.reactions = []
  post.comment = { replies: [] }

  const isMyPost = post.sender.find((user) => user.id === me.data.id)
  const hasAddedPoints =
    childrenTransactions.find((post) => post.sender.find((user) => user.id === me.data.id))
      ?.point || 0

  return (
    <div className="mb-3">
      <div className="rounded-lg bg-white py-6 shadow-md xs:px-4 sm:px-6 md:px-6 lg:px-6 xl:px-6  xxl:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-1">
                {post.sender.map((user) => (
                  <img
                    key={user.id}
                    className="h-8.5 w-8.5 rounded-full object-cover"
                    src={SERVER_URL + user.avtar}
                    alt="post-user"
                  />
                ))}

                {childrenTransactions?.map((post) =>
                  post.sender.map((user) => (
                    <img
                      key={user.id}
                      className="h-8.5 w-8.5 rounded-full object-cover"
                      src={SERVER_URL + user.avtar}
                      alt="post-user"
                    />
                  ))
                )}
                <p className="font-Lato text-18px font-bold text-primary">
                  +
                  {post.point + childrenTransactions.reduce((total, post) => total + post.point, 0)}
                </p>
              </div>
              <div>
                <p className="font-Lato font-normal text-[#919191]">{post.created}</p>
              </div>
            </div>
          </div>
          <div>
            <BsThreeDots className="text-lg text-[#B1B1B1]" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-Lato text-18px font-bold">
            <span className={`${PROFILE_USERNAME.text}`}>
              {post.sender[0].first_name} {post.sender[0].last_name}:
            </span>{' '}
            <span className="text-primary">
              {post.recipients.map((user) => `@${user.first_name} ${user.last_name}`).join(' ')}
            </span>{' '}
            <span className={`${HASHTAG.text}`}>{post.hashtags.map((hash) => hash).join(' ')}</span>
          </p>

          <p className="mt-1.5 font-Lato text-18px font-normal text-[#464646]">{post.message}</p>

          {post.link && (
            <div className="mt-2">
              <a className="text-blue-400 underline underline-offset-[0.3em]" href={post.link}>
                {post.link}
              </a>
            </div>
          )}

          {(post.gif || post.image) && (
            <div className="mt-2 ">
              {post.gif && <img className="block max-h-48 object-contain" src={post.gif} />}

              {post.image && (
                <img
                  className="block max-h-48 object-contain"
                  src={
                    typeof post.image === 'string' ? post.image : URL.createObjectURL(post.image)
                  }
                />
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mt-2.5 flex items-center gap-2">
            {isMyPost ? null : hasAddedPoints != 0 ? (
              <div>
                <p className="p-2 font-Lato text-[16px] text-primary">
                  You Added {hasAddedPoints} Points!
                </p>
              </div>
            ) : (
              <div className="relative">
                <button className="btn-ghost peer flex items-center gap-2">
                  <BsPlusCircleFill className="h-5 w-5" />
                  Add Points
                </button>

                <div className="absolute bottom-10 left-0 hidden gap-1 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029] hover:flex peer-hover:flex">
                  {POINTS.map(({ points, color }) => (
                    <button
                      key={points}
                      style={{ color: color }}
                      className={`h-8 w-8 rounded-full font-Lato text-sm font-black hover:bg-translucent`}
                      onClick={async () => {
                        const { id, image, ...data } = post
                        data.sender = [me.data]
                        data.point = points
                        data.parent_id = post.id

                        const formData = toFormData(data)
                        try {
                          // setLoading(true)
                          await api.transactions.new(formData)
                          await queryClient.refetchQueries('transactions')
                        } catch (error) {
                          console.log(error)
                          toast.error('Server Error')
                        }
                        setHasAddedPoints(points)
                      }}
                    >
                      +{points}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* post reaction button */}
            <div className="relative ">
              <button className="btn-ghost peer flex items-center gap-2" onClick={async () => {}}>
                <span>
                  <BiHeartCircle className="text-[20px]" />
                </span>
                React
              </button>

              <div className="absolute -top-[80%] left-0 hidden gap-4 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029] hover:flex peer-hover:flex">
                {['❤', '👍', '👏', '✔ ', '😍'].map((emoji) => (
                  <button
                    key={emoji}
                    className="inline-block h-6 w-6 rounded-full font-Lato text-sm font-black hover:bg-translucent"
                    onClick={() => addReaction(post.id, emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button
                className="btn-ghost peer flex items-center gap-1"
                onClick={() =>
                  setShowCommentsFor((p) => (p === post.comment.id ? '' : post.comment.id))
                }
              >
                <span>
                  <BsFillChatRightTextFill className="h-5 w-5" />
                </span>
                Comment
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 border-b-[1px] border-[#EDEDED] pb-1">
            {post.reactions.length > 0 && (
              <div className="text-2xl flex items-center gap-1 rounded-[17px] border-[0.6px] border-[#D1D1D1] pb-[2px] pr-2">
                {post.reactions[0].emoji}
                <span className="font-Lato text-xs text-[#747474]">{post.reactions.length}</span>
              </div>
            )}

            {post.comment.replies.length > 0 && (
              <div>
                <p className="font-Lato text-[16px] text-[#D1D1D1]">
                  {post.comment.replies.length} Comments
                </p>
              </div>
            )}
          </div>
        </div>

        {showCommentsFor === post.comment.id && (
          <>
            <div>
              <div className="mt-3 flex">
                <div>
                  <img className="w-[80%]" src={PostUser} alt="comment" />
                </div>
                <div className="w-full flex-1">
                  <div className="flex items-center rounded-b-xl rounded-tr-xl bg-[#EDEDED]">
                    <form
                      onSubmit={(ev) => {
                        ev.preventDefault()
                        const data = Object.fromEntries(new FormData(ev.target))

                        addComment(post.comment.id, {
                          message: data.message,
                          image: form.image,
                          gif: form.gif,
                        })

                        setForm({ message: '', image: '', gif: '' })
                      }}
                      className="w-full"
                    >
                      <input
                        placeholder="Type your comment here"
                        name="message"
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        className=" w-full border-none bg-transparent px-6 py-3 outline-none placeholder:font-Lato placeholder:text-[16px] placeholder:text-[#ABACAC]"
                      />
                    </form>

                    <div className="ml-auto mr-3 flex items-baseline gap-2">
                      <button
                        type="button"
                        onClick={() => setModal((prev) => (prev === 'emoji' ? '' : 'emoji'))}
                      >
                        <HiEmojiHappy className="text-2xl text-[#D1D1D1]" />

                        {modal === 'emoji' && (
                          <HoveringWidget
                            className="w-full border-4 border-black px-0 md:w-[350px]"
                            style={{
                              backgroundColor: 'transparent',
                              border: 'none',
                              paddingLeft: 0,
                              paddingRight: 0,
                            }}
                            onClose={() => setModal('')}
                          >
                            <EmojiPicker
                              width="100%"
                              onEmojiClick={(emoji) => {
                                setForm((prev) => ({
                                  ...prev,
                                  message: prev.message + emoji.emoji,
                                }))
                                setModal('')
                              }}
                            />
                          </HoveringWidget>
                        )}
                      </button>

                      <label className="cursor-pointer">
                        <BsFillImageFill className="text-2xl text-[#D1D1D1]" />

                        <input
                          hidden
                          type="file"
                          onChange={(e) => {
                            const file = e.target.files[0]
                            setForm((prev) => {
                              prev.image = file
                              return { ...prev }
                            })
                          }}
                        />
                      </label>

                      <Popover.Root>
                        <Popover.Trigger>
                          <AiOutlineFileGif className="text-2xl text-[#D1D1D1]" />
                        </Popover.Trigger>

                        <GifPicker
                          onClick={(url) => {
                            setForm((prev) => ({
                              ...prev,
                              gif: url,
                            }))
                          }}
                        />
                      </Popover.Root>
                    </div>
                  </div>
                  {form.image && (
                    <div className="group relative inline-flex items-start p-4">
                      <img
                        className="block flex-1 rounded pr-4"
                        src={
                          typeof form.image === 'string'
                            ? form.image
                            : URL.createObjectURL(form.image)
                        }
                      />

                      <button
                        type="button"
                        className="text-primary-400 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() =>
                          setForm((prev) => {
                            delete prev.image
                            return { ...prev }
                          })
                        }
                      >
                        <BiXCircle fontSize={24} color="inherit" />
                      </button>
                    </div>
                  )}

                  {form.gif && (
                    <div className="group relative inline-flex items-start p-4">
                      <img className="block flex-1 rounded pr-4" src={form.gif} />

                      <button
                        type="button"
                        className="text-primary-400 opacity-0 transition-opacity group-hover:opacity-100"
                        onClick={() =>
                          setForm((prev) => {
                            delete prev.gif
                            return { ...prev }
                          })
                        }
                      >
                        <BiXCircle fontSize={24} color="inherit" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
        {post.comment.replies?.map((comment) => (
          <PostComment
            {...{ modal, setModal }}
            {...{ showCommentsFor, setShowCommentsFor }}
            key={comment.message}
            comment={comment}
            addComment={addComment}
            addReaction={addCommentReaction}
          />
        ))}
      </div>
    </div>
  )
}

export default PostCard

function Comment(commentData, user, reactions = [], ...replies) {
  return {
    id: Math.random().toString(),
    user: Object.assign(user, { img: PostUser, id: Math.random().toString() }),
    reactions: reactions.map((emoji) => ({
      user: { id: Math.random().toString() },
      emoji,
    })),
    message: '',
    image: null,
    gif: null,
    ...commentData,
    timestamp: new Date(),
    replies: replies || [],
  }
}

const PROFILE_USERNAME = {
  text: 'text-[#464646]',
}
const HASHTAG = {
  text: 'text-[#00BC9F]',
}

function toFormData(data) {
  const formData = new FormData()
  Object.entries(data).forEach(([key, value]) => {
    let _value = value
    // stringify only if value is array, object but not image File
    if (typeof value == 'object' && !(value instanceof File)) _value = JSON.stringify(value)

    formData.set(key, _value)
  })
  return formData
}
