import React, { useRef } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { BsThreeDots } from 'react-icons/bs'
import PostUser from '../assets/images/post-img/post-user.png'
import GifPicker from './GifPickerPopover'
import EmojiPicker from 'emoji-picker-react'
import HoveringWidget from '@/components/HoveringWidget'
import { api } from '@/api'
import Cookies from 'js-cookie'
import { useQuery } from 'react-query'
import { queryClient } from '@/queryClient'
import ChildNewPost from '@/components/ChildNewPost'
import { toast } from 'react-toastify'
import moment from 'moment'
import PostComment from '@/components/PostComment'
import * as HoverCard from '@radix-ui/react-hover-card'
import smiley from '../assets/images/new-post/smiley.svg'
import img from '../assets/images/new-post/img.svg'
import gif from '../assets/images/new-post/gif.svg'
import chat from '../assets/images/post-img/chat.png'
import plus from '../assets/images/post-img/plus.png'
import heart from '../assets/images/post-img/heart.png'
import { RiSendPlane2Fill } from 'react-icons/ri'
import ReactComponent from './ReactComponent'
import * as Dialog from '@radix-ui/react-dialog'
import { pluralize } from '@/components/HomeRightSidebar/CelebrationWidget'
import { getAvatarAttributes, processAvatarUrl } from '@/utils'

export const reactionsUnicode = {
  '😊': 'U+1F60A',
  '😁': 'U+1F601',
  '😍': 'U+1F60D',
  '👍': 'U+1F44D',
  '👏': 'U+1F44F',
}

const points_colors = [
  'text-[#03BFC7]',
  'text-[#0374C7]',
  'text-[#6554E3]',
  'text-[#B754E3]',
  'text-[#F46CE9]',
]

const sortCommentsAndTransactions = (comments, childrenTransactions) => {
  const _childrenTransactions = childrenTransactions.map((transaction) => ({
    type: 'transaction',
    commentOrTransaction: transaction,
  }))

  const _comments = comments.map((comment) => ({
    type: 'comment',
    commentOrTransaction: comment,
  }))

  return _childrenTransactions
    .concat(_comments)
    .flatMap((item) => item)
    .sort((a, b) => {
      const timestamp1 = a.commentOrTransaction.created
      const timestamp2 = b.commentOrTransaction.created
      return new Date(timestamp1) - new Date(timestamp2)
    })
    .reverse()
}

const PostCard = ({ post, childrenTransactions, ...props }) => {
  const [showCommentsFor, setShowCommentsFor] = React.useState('')
  const [modal, setModal] = React.useState('')
  const [point, setPoint] = React.useState(30)
  const [form, setForm] = React.useState({ image: '', gif: '', message: '' })
  const imageInputRef = React.useRef()
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))
  // const comments = useQuery('comments', () => api.comment.all())
  const properties = useQuery('properties', () => api.properties())
  // const addedPoints = post.sender.find((x) => x.id === me.id)?.points

  post.reactions = []
  post.comment = { replies: [] }

  const commentsAndTransactions = sortCommentsAndTransactions(post.comments, post.children)

  console.log(me.data);

  return (
    <div className="mb-3">
      <div className="rounded-lg bg-white pb-6 pt-6 shadow-md xs:px-4 sm:px-6 md:px-6 lg:px-6 xl:px-6  xxl:px-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-1">
                <img
                  key={post.sender.id}
                  className="h-8.5 w-8.5 rounded-full object-cover"
                  src={getAvatarAttributes(`${post.sender.first_name} ${ post.sender.last_name }`, processAvatarUrl(post.sender.avtar)).src}
                  alt={getAvatarAttributes(`${post.sender.first_name} ${post.sender.last_name}`, processAvatarUrl(post.sender.avtar)).alt}
                  onError={(e) => { 
                    // If the image fails to load, use the name initials instead
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      post.sender.first_name.charAt(0) + post.sender.last_name.charAt(0)
                    )}&color=${"#464646"}&background=${"FFFFFF"}`;
                  }}
                />

                {post.children?.map((post) => (
                  <img
                    key={post.sender.id}
                    className="h-8.5 w-8.5 rounded-full object-cover"
                    src={getAvatarAttributes(`${post.sender.first_name} ${post.sender.last_name}`, processAvatarUrl(post.sender.avtar)).src}
                    alt={getAvatarAttributes(`${post.sender.first_name} ${post.sender.last_name}`, processAvatarUrl(post.sender.avtar)).alt}
                    onError={(e) => {
                      // If the image fails to load, use the name initials instead
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        post.sender.first_name.charAt(0) + post.sender.last_name.charAt(0)
                      )}&color=${"#464646"}&background=${"FFFFFF"}`;
                    }}
                  />
                ))}
                <p className="ml-1  text-18px font-bold text-primary">
                  +{post.point + post.children.reduce((total, post) => total + post.point, 0)}
                </p>

                <p className="ml-5  font-normal text-[#00BC9F]">{moment(post.created).fromNow()}</p>
              </div>
            </div>
          </div>
          <div>
            <BsThreeDots className="text-lg text-[#B1B1B1]" />
          </div>
        </div>

        <div className="mt-4">
          <p className=" text-18px font-bold">
            <span className={`${PROFILE_USERNAME.text}`}>
              {post.sender.first_name} {post.sender.last_name}:
            </span>{' '}
            <span className="text-primary">
              {post.recipients.map((user) => `@${user.first_name} ${user.last_name}`).join(' ')}
            </span>{' '}
            <span className={`${HASHTAG.text}`}>
              {post.hashtags.map((hash) => '#' + hash.name).join(' ')}
            </span>
          </p>

          <p className="mt-1.5  text-18px font-normal text-[#464646]">{post.message}</p>

          {post.link && (
            <div className="mt-2">
              <a className="text-blue-400 underline underline-offset-[0.3em]" href={post.link}>
                {post.link}
              </a>
            </div>
          )}

          {(post.gif || post.image) && (
            <div className="mt-2 flex flex-col gap-[1rem] md:gap-[1rem]">
              {post.gif && (
                <img className="block w-full max-w-full rounded-md object-contain" src={post.gif} />
              )}

              {post.image && (
                <img
                  className="block max-w-full rounded-md object-contain"
                  src={
                    typeof post.image === 'string'
                      ? processAvatarUrl(post.image)
                      : URL.createObjectURL(post.image)
                  }
                />
              )}
            </div>
          )}
        </div>

        <div>
          <div className="mt-2.5 flex items-center gap-1">
            {
              <div className="relative">
                <button className="btn-ghost peer flex items-center gap-1 !pl-[5px]">
                  <span className="rounded-[20px] bg-blue-500 p-[3px]">
                    <img src={plus} alt="chat" />
                  </span>
                  Add Points
                </button>

                <div className="absolute bottom-8 left-0 hidden gap-1 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029] hover:flex peer-hover:flex">
                  {properties?.data?.points_allowed?.map((points, index) => (
                    <button
                      key={index}
                      // style={{ color: color }}
                      className={`h-8 w-8 rounded-full  text-sm font-black hover:bg-translucent ${points_colors[index]}`}
                      onClick={() => {
                        setPoint(points)
                        setModal('child-new-post')
                        setShowCommentsFor('')
                      }}
                    >
                      +{points}
                    </button>
                  ))}
                </div>
              </div>
            }

            {/* post reaction button */}
            <div className="relative ">
              <button className="btn-ghost peer flex items-center gap-1" onClick={async () => {}}>
                <span className="rounded-[20px] bg-blue-500 p-[4px]">
                  <img src={heart} alt="heart" />
                </span>
                React
              </button>

              <div className="absolute -top-[80%] left-0 hidden gap-4 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029] hover:flex peer-hover:flex">
                {['😊', '😁', '😍', '👍', '👏'].map((emoji) => (
                  <button
                    key={emoji}
                    className="inline-block h-6 w-6 rounded-full  text-[20px] font-black hover:bg-translucent"
                    onClick={async () => {
                      try {
                        const reacts = {
                          reaction_hash: reactionsUnicode[emoji],
                          object_id: post.id,
                          content_type: 'transaction',
                        }

                        if (post.user_reaction_info?.is_reacted === true) { 
                          await api.transactions.updateReaction({
                            post_id: post.id,
                            reaction_hash: reactionsUnicode[emoji],
                          })
                        } else {
                          await api.transactions.react(reacts)
                        }
                        const reactions = await api.transactions.allReactions({ post_id: post.id })
                        await queryClient.setQueryData(['transaction', props.sortBy], (prev) => {
                          if (!prev) return
                          const targetPost = prev.find((_post) => _post.id === post.id)
                          if (targetPost) {
                            targetPost.user_reaction_info = {
                              reaction_hashes: Array.from(
                                new Set(reactions.map(({ reaction }) => reaction))
                              ),
                              total_reaction_counts: reactions.length,
                              latest_user_reaction_full_name:
                                me.data.first_name + ' ' + me.data.last_name,
                              is_reacted: true,
                            }
                            console.log(
                              'post card > parent react btn',
                              targetPost.user_reaction_info
                            )
                          }

                          return [...prev]
                        })
                      } catch (e) {
                        console.log('postcard > react button', e)
                      }
                    }}
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
                <span className="rounded-[20px] bg-blue-500 p-[5px]">
                  <img src={chat} alt="chat" />
                </span>
                Comment
              </button>
            </div>
          </div>

          <div className={'mt-1 flex items-center gap-2 pb-1 '}>
            <Dialog.Root>
              <div
                className={
                  'rounded-full border-[0.5px] border-[#d1d1d1] px-3 text-[16px] text-[#747474] ' +
                  (post.user_reaction_info == null ||
                  post.user_reaction_info.total_reaction_counts === 0
                    ? 'hidden'
                    : '')
                }
              >
                <Dialog.Trigger
                  className={
                    ((post.user_reaction_info == null ||
                      post.user_reaction_info.total_reaction_counts === 0) &&
                      'pointer-events-none cursor-default ') + ' flex items-center '
                  }
                >
                  {post.user_reaction_info != null ? (
                    <>
                      <span>
                        <span className='text-lg'>
                        {post.user_reaction_info.reaction_hashes.map((hash) =>
                          unicodeToEmoji(hash)
                          )}
                        </span>
                        {' ' + post.user_reaction_info.latest_user_reaction_full_name + ' '}
                        {post.user_reaction_info.total_reaction_counts > 1
                          ? 'and ' +
                            pluralize(
                              post.user_reaction_info.total_reaction_counts - 1,
                              'other',
                              's'
                            )
                          : ''}
                      </span>
                      {/* <p className="pl-[3px] text-16px">
                        {post.user_reaction_info?.total_reaction_counts}
                      </p> */}
                    </>
                  ) : (
                    '😊 0'
                  )}{' '}
                </Dialog.Trigger>
              </div>

              <ReactComponent postId={post.id} key={post.user_reaction_info?.total_reaction_counts + post.user_reaction_info?.reaction_hashes.join()} />
            </Dialog.Root>

            <p
              className={
                'text-16px text-[#d1d1d1] ' + (commentsAndTransactions.length === 0 ? 'hidden' : '')
              }
            >
              {commentsAndTransactions.length + ' '}
              Comment
            </p>
          </div>
        </div>

        <div className="border-t border-[#EDEDED] pt-2 empty:hidden">
          {showCommentsFor === post.comment.id ? (
            <div>
              <div className="my-[8px] flex gap-4">
                <div>
                  <img
                    className="h-[34px] w-[34px] rounded-full object-cover"
                    src={getAvatarAttributes(`${me.data.first_name} ${ me.data.last_name }`, processAvatarUrl(me.data.avtar)).src}
                    alt={me.data.first_name}
                    onError={(e) => {
                      // If the image fails to load, use the name initials instead
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        me.data.first_name.charAt(0) + me.data.last_name.charAt(0)
                      )}&color=${"#464646"}&background=${"FFFFFF"}`;
                    }}
                  />
                </div>
                <div className="w-full flex-1">
                  <div className="grid grid-cols-[1fr_auto_auto] items-end overflow-x-hidden rounded-b-xl rounded-tr-xl bg-paper">
                    <div className="self-center">
                      <form
                        id={post.id}
                        onSubmit={async (ev) => {
                          try {
                            ev.preventDefault()

                            const newComment = await api.comment.new({
                              post_id: post.id,
                              comment: form.message,
                              image: form.image,
                              gif: form.gif,
                            })

                            await queryClient.setQueryData(
                              ['transaction', props.sortBy],
                              (prev) => {
                                if (!prev) return prev

                                const targetPostComments = prev.find(
                                  (_post) => _post.id === post.id
                                ).comments
                                targetPostComments?.push(newComment)

                                return [...prev]
                              }
                            )
                            if (imageInputRef.current) imageInputRef.current.value = ''
                            setForm({ message: '', image: '', gif: '' })
                          } catch (e) {
                            console.log('e', e)
                            toast.error('Failed to post comment')
                          }
                        }}
                        className="w-full"
                      >
                        <input
                          placeholder="Type your comment here"
                          name="message"
                          value={form.message}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          className=" placeholder: w-full border-none bg-transparent px-6 py-3 text-[#464646] outline-none placeholder:text-[16px] placeholder:text-[#ABACAC]"
                        />
                      </form>
                      <div className="px-6 pb-6 empty:hidden">
                        {form.image && (
                          <div className="group relative flex w-fit items-center pt-3">
                            <img
                              className="block w-40 rounded-md"
                              src={
                                typeof form.image === 'string'
                                  ? form.image
                                  : URL.createObjectURL(form.image)
                              }
                            />

                            <button
                              type="button"
                              className="ml-4 p-2 text-[#464646] opacity-0 group-hover:opacity-100"
                              onClick={() => {
                                if (imageInputRef.current) imageInputRef.current.value = ''
                                setForm((prev) => {
                                  delete prev.image
                                  return { ...prev }
                                })
                              }}
                            >
                              &times;
                            </button>
                          </div>
                        )}

                        {form.gif && (
                          <div className="group relative flex w-fit items-center pt-[16px]">
                            <img className="block w-40 rounded-md" src={form.gif} />

                            <button
                              type="button"
                              className="ml-4 p-2 text-[#464646] opacity-0 group-hover:opacity-100"
                              onClick={() =>
                                setForm((prev) => {
                                  delete prev.gif
                                  return { ...prev }
                                })
                              }
                            >
                              &times;
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="ml-auto mr-2 flex h-[56px] items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setModal((prev) => (prev === 'emoji' ? '' : 'emoji'))}
                      >
                        {/* <HiEmojiHappy className="text-2xl text-[#D1D1D1]" /> */}
                        <img src={smiley} alt="smiley" width={'18px'} />

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
                        {/* <BsFillImageFill className="text-2xl text-[#D1D1D1]" /> */}
                        <img src={img} alt="img" width={'25px'} />
                        <input
                          ref={imageInputRef}
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
                          <img src={gif} alt="gif" width={'18px'} />
                          {/* <AiOutlineFileGif className="text-2xl text-[#D1D1D1]" /> */}
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
                    <button
                      disabled={!form.message && !form.image && !form.gif}
                      className={
                        'block rounded-r-xl py-5 pl-0.5 pr-5 font-semibold text-primary transition-all disabled:cursor-auto disabled:text-gray-300'
                      }
                      form={post.id}
                      type="submit"
                    >
                      <RiSendPlane2Fill />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : modal === 'child-new-post' ? (
            <div className="mb-2 mt-2 flex gap-4">
                <img
                  className="h-[34px] w-[34px] rounded-full"
                  src={getAvatarAttributes(`${me.data.first_name} ${me.data.last_name}`, processAvatarUrl(me.data.avtar)).src}
                  alt={getAvatarAttributes(`${me.data.first_name} ${me.data.last_name}`, processAvatarUrl(me.data.avtar)).alt}
                  onError={(e) => {
                    // If the image fails to load, use the name initials instead
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      me.data.first_name.charAt(0) + me.data.last_name.charAt(0)
                    )}&color=${"#464646"}&background=${"FFFFFF"}`;
                  }}
                />
              <div className="flex-1">
                <ChildNewPost
                  key={point}
                  post={post}
                  defaultPoint={point}
                  onClose={() => setModal('')}
                  sortBy={props.sortBy}
                />
              </div>
            </div>
          ) : null}

          {/* <PostCommentList postId={post.id} /> */}
          {commentsAndTransactions.map(({ type, commentOrTransaction }) =>
            type === 'comment' ? (
              <PostComment
                key={commentOrTransaction.id}
                comment={commentOrTransaction}
                postId={post.id}
                sortBy={props.sortBy}
              />
            ) : (
              <div
                key={commentOrTransaction.id}
                className="grid grid-cols-[auto_1fr] gap-4 pl-0 pt-[7px]"
              >
                  <img
                    className="h-8.5 w-8.5 rounded-full object-cover"
                    src={getAvatarAttributes(`${commentOrTransaction.sender.first_name} ${commentOrTransaction.sender.last_name}`, processAvatarUrl(commentOrTransaction.sender.avtar)).src}
                    alt={getAvatarAttributes(`${commentOrTransaction.sender.first_name} ${commentOrTransaction.sender.last_name}`, processAvatarUrl(commentOrTransaction.sender.avtar)).alt}
                    onError={(e) => {
                      // If the image fails to load, use the name initials instead
                      e.target.onerror = null;
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        commentOrTransaction.sender.first_name.charAt(0) + commentOrTransaction.sender.last_name.charAt(0)
                      )}&color=${"#464646"}&background=${"FFFFFF"}`;
                    }}
                  />

                <div className="relative ">
                  <div className="rounded-[15px] rounded-tl-none bg-paper p-[20px] text-[#464646]">
                    <p className="flex justify-between text-18px">
                      <span className="font-bold">{commentOrTransaction.sender.first_name}</span>
                      <span className="text-[14px] leading-[17px] text-[#919191]">
                        {moment(commentOrTransaction.created).fromNow()}
                      </span>
                    </p>
                    <p>
                      +{commentOrTransaction.point}
                      <span className="ml-2">{commentOrTransaction.message}</span>
                    </p>

                    {commentOrTransaction.image || commentOrTransaction.gif ? (
                      <div className="mt-[21px] space-y-[20px]">
                        {commentOrTransaction.image && (
                          <img className="w-full rounded-md" src={commentOrTransaction.image} />
                        )}
                        {commentOrTransaction.gif && (
                          <img className="w-full rounded-md" src={commentOrTransaction.gif} />
                        )}
                      </div>
                    ) : null}

                    {commentOrTransaction.link ? (
                      <div className="mt-6 space-y-6">
                        Attached Link:{' '}
                        <a className="text-blue-500 underline" href={commentOrTransaction.link}>
                          {commentOrTransaction.link}
                        </a>
                      </div>
                    ) : null}
                  </div>
                  <div className="relative z-10 flex h-[32px] -translate-y-1.5 items-center text-[12px] leading-[15px] text-primary">
                    <p className="lex items-center gap-3 pb-1">
                      {commentOrTransaction?.user_reaction_info?.reaction_hashes?.length > 0 ? (
                        <div className="flex items-center gap-1 rounded-[17px] border-[0.6px] border-[#D1D1D1] bg-white px-[5px] pr-2 text-lg">
                          {unicodeToEmoji(
                            commentOrTransaction.user_reaction_info.reaction_hashes[0]
                          )}
                          <span className=" text-sm text-[#747474]">
                            {commentOrTransaction.user_reaction_info.total_reaction_count}
                          </span>
                        </div>
                      ) : null}
                    </p>
                    <HoverCard.Root>
                      <HoverCard.Trigger className="ml-3  cursor-pointer">React</HoverCard.Trigger>
                      <HoverCard.Content className="border">
                        <div className="absolute bottom-[20px] left-1/2 z-10 flex -translate-x-1/2 gap-4 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029]">
                          {['😊', '😁', '😍', '👍', '👏'].map((emoji) => (
                            <button
                              key={emoji}
                              className="inline-block h-6 w-6 rounded-full  text-sm font-black hover:bg-translucent"
                              onClick={async () => {
                                try {
                                  const reacts = {
                                    reaction_hash: reactionsUnicode[emoji],
                                    object_id: commentOrTransaction.id,
                                    content_type: 'transaction',
                                  }

                                  if (
                                    commentOrTransaction.user_reaction_info?.is_reacted === true
                                  ) {
                                    await api.transactions.updateReaction({
                                      post_id: commentOrTransaction.id,
                                      reaction_hash: reactionsUnicode[emoji],
                                    })
                                  } else {
                                    await api.transactions.react(reacts)
                                  }

                                  const reactions = await api.transactions.allReactions({
                                    post_id: commentOrTransaction.id,
                                  })

                                  queryClient.setQueryData(
                                    ['transaction', props.sortBy],
                                    (prev) => {
                                      if (!prev) return prev

                                      const targetPost = prev
                                        .find((_post) => _post.id === post.id)
                                        ?.children.find(
                                          (_post) => _post.id === commentOrTransaction.id
                                        )

                                      if (targetPost) {
                                        targetPost.user_reaction_info = {
                                          reaction_hashes: Array.from(
                                            new Set(reactions.map(({ reaction }) => reaction))
                                          ),
                                          total_reaction_count: reactions.length,
                                          latest_user_reaction_full_name:
                                            me.data.first_name + ' ' + me.data.last_name,
                                          is_reacted: true,
                                        }
                                      }

                                      return [...prev]
                                    }
                                  )
                                } catch (e) {
                                  console.log('postcard > react button', e)
                                  toast.error("Server Error! Can't react on this post/comment")
                                }
                              }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </HoverCard.Content>
                    </HoverCard.Root>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
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

export function unicodeToEmoji(hash) {
  return String.fromCodePoint(parseInt(hash.substring(2), 16))
}
