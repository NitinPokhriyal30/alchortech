import React, { useRef } from 'react'
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
import GifPicker from './GifPicker'
import EmojiPicker from 'emoji-picker-react'
import { addPoints, addReaction, addComment, addCommentReaction } from '../redux/postAction'
import { useSelector } from 'react-redux'
import HoveringWidget from '@/components/HoveringWidget'

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

const PostCard = ({ post, ...props }) => {
  const [showCommentsFor, setShowCommentsFor] = React.useState('')
  const [modal, setModal] = React.useState('')
  const [form, setForm] = React.useState({ image: '', gif: '', message: '' })
  const me = useSelector((store) => store.user)
  const addedPoints = post.sender.find((x) => x.id === me.id)?.points
  const hasAddedPoints = !!addedPoints

  return (
    <div className="mb-3">
      <div className="bg-white shadow-md rounded-lg xxl:px-6 xl:px-6 lg:px-6 md:px-6 sm:px-6 xs:px-4  py-6">
        <div className="flex justify-between gap-3 items-center">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-1">
                {post.sender.map((user) => (
                  <img
                    key={user.id}
                    className="h-12 w-12 object-cover rounded-full"
                    src={user.img}
                    alt="post-user"
                  />
                ))}

                <p className="text-lg font-Lato font-bold text-primary">+{post.sender[0].points}</p>
              </div>
              <div>
                <p className="font-Lato font-normal text-[#919191]">
                  {new Date(post.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <BsThreeDots className="text-[#B1B1B1] text-lg" />
          </div>
        </div>

        <div className="mt-4">
          <p className="font-Lato font-bold text-[16px] leading-5">
            <span className="text-[#464646]">
              {post.sender[0].firstName} {post.sender[0].lastName}:
            </span>
            <span className="text-primary">
              {post.recipients.map((user) => `@${user.firstName} ${user.lastName}`).join(' ')}
            </span>
            <span className="text-[#ABACAC]">
              {post.hashtags.map((hash) => `#${hash}`).join(' ')}
            </span>
          </p>

          <p className="font-Lato font-normal mt-2 text-[#464646] text-[16px] leading-5">
            {post.message}
          </p>

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
          <div className="flex items-center gap-5 mt-4">
            {hasAddedPoints ? (
              <div>
                <p className="p-2 font-Lato text-[16px] text-primary">
                  You Added {addedPoints} Points!
                </p>
              </div>
            ) : (
              <div className="relative">
                <button className="hover:bg-translucent rounded-[4px] peer p-2 font-Lato flex items-center gap-1 font-light text-[16px] text-primary">
                  <span>
                    <BsPlusCircleFill />
                  </span>
                  Add Points
                </button>

                <div className="hidden drop-shadow-[0px_2px_3px_#00000029] px-4 py-2 bg-white absolute bottom-10 left-0 peer-hover:flex hover:flex gap-1 rounded-[19px]">
                  {POINTS.map(({ points, color }) => (
                    <button
                      key={points}
                      style={{ color: color }}
                      className={`w-8 h-8 rounded-full text-sm font-Lato font-black hover:bg-translucent`}
                      onClick={() => addPoints(post.id, points)}
                    >
                      +{points}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* post reaction button */}
            <div className="relative ">
              <button className="hover:bg-translucent rounded-[4px] peer p-2 font-Lato flex items-center gap-1 font-light text-[16px] text-primary">
                <span>
                  <BiHeartCircle />
                </span>
                React
              </button>

              <div className="hidden drop-shadow-[0px_2px_3px_#00000029] px-4 py-2 bg-white absolute -top-[80%] left-0 peer-hover:flex hover:flex gap-4 rounded-[19px]">
                {['❤', '👍', '👏', '✔ ', '😍'].map((emoji) => (
                  <button
                    key={emoji}
                    className="w-6 h-6 rounded-full inline-block hover:bg-translucent text-sm font-Lato font-black"
                    onClick={() => addReaction(post.id, emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <button
                className="hover:bg-translucent rounded-[4px] peer p-2 font-Lato flex items-center gap-1 font-light text-[16px] text-primary"
                onClick={() =>
                  setShowCommentsFor((p) => (p === post.comment.id ? '' : post.comment.id))
                }
              >
                <span>
                  <BsFillChatRightTextFill />
                </span>
                Comment
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 border-b-[1px] border-[#EDEDED] pb-1">
            {post.reactions.length > 0 && (
              <div className="rounded-[17px] border-[0.6px] border-[#D1D1D1] pr-2 pb-[2px] text-2xl flex items-center gap-1">
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
              <div className="flex mt-3">
                <div>
                  <img className="w-[80%]" src={PostUser} alt="comment" />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center relative  bg-[#EDEDED] rounded-b-xl rounded-tr-xl">
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
                        className=" bg-transparent w-full px-6 py-3 placeholder:text-[16px] placeholder:text-[#ABACAC] placeholder:font-Lato border-none outline-none"
                      />
                    </form>

                    <div className="ml-auto relative mr-3 gap-2 flex items-baseline  ">
                      <button
                        type="button"
                        onClick={() => setModal((prev) => (prev === 'emoji' ? '' : 'emoji'))}
                      >
                        <HiEmojiHappy className="text-[#D1D1D1] text-2xl" />

                        {modal === 'emoji' && (
                          <HoveringWidget className="px-0" style={{backgroundColor: "transparent", border:"none"}}
                          onClose={() => setModal("")}
                          >
                            <EmojiPicker
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
                        <BsFillImageFill className="text-[#D1D1D1] text-2xl" />

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

                      <div>
                        <button type="button" onClick={() => setModal('gif')}>
                          <AiOutlineFileGif className="text-[#D1D1D1] text-2xl" />
                        </button>
                        {modal === 'gif' && (
                          <GifPicker
                            onClick={(url) => {
                              setModal('')
                              setForm((prev) => {
                                prev.gif = url
                                return { ...prev }
                              })
                            }}
                            onClose={() => setModal('')}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {form.image && (
                    <div className="relative inline-flex items-start p-4 group">
                      <img
                        className="block rounded pr-4 flex-1"
                        src={
                          typeof form.image === 'string'
                            ? form.image
                            : URL.createObjectURL(form.image)
                        }
                      />

                      <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-400"
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
                    <div className="relative inline-flex items-start p-4 group">
                      <img className="block rounded pr-4 flex-1" src={form.gif} />

                      <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-primary-400"
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
