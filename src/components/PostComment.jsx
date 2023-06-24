import * as React from 'react'
import * as Popover from '@radix-ui/react-popover'
import { BsFillImageFill } from 'react-icons/bs'
import { HiEmojiHappy } from 'react-icons/hi'
import { AiOutlineFileGif } from 'react-icons/ai'
import EmojiPicker from 'emoji-picker-react'
import GifPicker from './GifPickerPopover'
import { BiXCircle } from 'react-icons/bi'

let _id = 0
export default function PostComment({
  modal,
  setModal,
  comment,
  showCommentsFor,
  setShowCommentsFor,
  ...props
}) {
  const [id, setId] = React.useState(() => ++_id)
  const [showReplyInput, setShowReplyInput] = React.useState(false)
  const [form, setForm] = React.useState({ message: '', image: '', gif: '' })

  const PostUser = comment.user.img
  const user = comment.user
  console.log(comment.image, comment.gif)

  return (
    <div className="relative">
      <div className="flex items-start mt-3">
        <div>
          <img className="w-[80%]" src={user.img} alt="comment" />
        </div>
        <div className="w-full ">
          <div>
            <div className="border border-[#dfdfdf] bg-[#f7f7f7] rounded-b-xl rounded-tr-xl w-full px-6 py-3">
              <div className="flex">
                <div className="font-Lato text-[16px] leading-5 text-[#464646]">
                  <p className="font-bold">
                    {user.firstName} {user.lastName}
                  </p>
                  <p>{comment.message} </p>
                </div>

                <p className="ml-auto font-Lato font-normal text-sm text-[#919191]">
                  {new Date(comment.timestamp).toLocaleString()} ago
                </p>
              </div>

              {comment.image && (
                <img
                  className="mt-12 block w-full"
                  src={
                    typeof comment.image === 'string'
                      ? comment.image
                      : URL.createObjectURL(comment.image)
                  }
                />
              )}

              {comment.gif && <img className="mt-2 block w-full" src={comment.gif} />}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-1 pl-4">
            {comment.reactions.length > 0 && (
              <div className="z-10 rounded-[17px] border-[0.6px] bg-white border-[#D1D1D1] pr-2 pb-[2px] text-2xl flex items-center gap-1">
                {comment.reactions[0].emoji}{' '}
                <span className="font-Lato text-xs text-[#747474]">{comment.reactions.length}</span>
              </div>
            )}
            <div className="relative">
              <button className="text-xs hover:bg-[#F7F7F7] rounded-[4px] peer p-2 font-Lato flex items-center gap-1 text-[16px] text-primary">
                React
              </button>
              <div className="hidden drop-shadow-[0px_2px_3px_#00000029] px-4 py-2 bg-white absolute -top-full left-0 peer-hover:flex hover:flex gap-4 rounded-[19px]">
                {['❤', '👍', '👏', '✔', '😍'].map((emoji) => (
                  <button
                    key={emoji}
                    className="w-6 h-6 rounded-full inline-block hover:bg-translucent text-sm font-Lato font-black"
                    onClick={() => props.addReaction(comment.id, emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            <p className="font-Lato text-xs text-primary">|</p>
            <p
              className="hover:bg-[#F7F7F7] rounded-[4px] peer p-2 flex items-center gap-1 text-[16px] font-Lato text-xs text-primary"
              onClick={() => setShowCommentsFor((p) => (p === comment.id ? '' : comment.id))}
            >
              Reply
            </p>
          </div>

          {showCommentsFor === comment.id && (
            <div className="mt-1 mr-0 mb-0 ml-auto">
              <div className="flex mt-3 ">
                <div>
                  <img className="w-[80%]" src={PostUser} alt="comment" />
                </div>

                <div>
                  <div className="w-full flex items-center border border-[#dfdfdf] bg-[#f7f7f7] rounded-b-xl rounded-tr-xl">
                    <form
                      onSubmit={(ev) => {
                        ev.preventDefault()
                        props.addComment(comment.id, form)
                        setShowReplyInput(false)
                        setForm({ message: '', image: '', gif: '' })
                      }}
                      className="flex-1"
                    >
                      <input
                        placeholder="Add a comment"
                        name="message"
                        value={form.message}
                        onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                        className=" bg-transparent w-full px-6 py-3 placeholder:text-[16px] placeholder:text-[#ABACAC] placeholder:font-Lato border-none outline-none"
                      />
                    </form>

                    <div className="mr-3 flex gap-2">
                      <button type="button" onClick={() => setModal(`emoji#${id}`)}>
                        <HiEmojiHappy className="text-[#D1D1D1] text-2xl" />

                        {modal === `emoji#${id}` && (
                          <div id="footerShow" className="absolute z-10">
                            <EmojiPicker
                              onEmojiClick={(emoji) => {
                                setForm((prev) => ({
                                  ...prev,
                                  message: prev.message + emoji.emoji,
                                }))
                                setModal('')
                              }}
                            />
                          </div>
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

                      <Popover.Root>
                        <Popover.Trigger onClick={() => setModal(`gif#${id}`)}>
                          <AiOutlineFileGif className="text-[#D1D1D1] text-2xl" />
                        </Popover.Trigger>

                        <GifPicker
                          onClick={(url) => {
                            setForm((prev) => ({ ...prev, gif: url }))
                          }}
                        />
                      </Popover.Root>
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
          )}

          <div className="">
            {comment.replies.map((comment) => (
              <PostComment
                {...{ modal, setModal }}
                {...{ showCommentFor: showCommentsFor, setShowCommentFor: setShowCommentsFor }}
                key={comment.id}
                comment={comment}
                addComment={props.addComment}
                addReaction={props.addReaction}
              />
            ))}
          </div>
        </div>
      </div>

      {/*------------------ Add A comment----------------------- */}
    </div>
  )
}
