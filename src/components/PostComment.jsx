import * as React from 'react'
import { api } from '@/api'
import moment from 'moment'
import * as HoverCard from '@radix-ui/react-hover-card'
import { getAvatarAttributes, processAvatarUrl } from '@/utils'
import { queryClient } from '@/queryClient'
import { reactionsUnicode, unicodeToEmoji } from '@/components/PostCard'


export default function PostComment({ modal, setModal, sortBy, postId, comment, ...props }) {
  const user = comment.created_by

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 pl-0 pt-[7px]">
      <img
        className="h-8.5 w-8.5 rounded-full object-cover"
        src={getAvatarAttributes(`${user.full_name}`, processAvatarUrl(user.avtar)).src}
        alt={getAvatarAttributes(`${user.full_name}`, processAvatarUrl(user.avtar)).alt}
        onError={(e) => {
          // If the image fails to load, use the name initials instead
          e.target.onerror = null;
          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user.full_name.split(' ')[0].charAt(0) + user.full_name.split(' ')[1].charAt(0)
          )}&color=${"#464646"}&background=${"FFFFFF"}`;
        }}
      />

      <div className="relative ">
        <div className="rounded-[15px] rounded-tl-none bg-paper p-[20px] text-[#464646]">
          <p className="flex justify-between text-18px">
            <span className="font-bold">{user.full_name.split(' ')[0]}</span>
            <span className="text-[14px] leading-[17px] text-[#919191]">
              {moment(comment.created).fromNow()}
            </span>
          </p>
          <p>
            <span>{comment.comment}</span>
          </p>
          {comment.image || comment.gif ? (
            <div className="mt-[10px] space-y-[12px]">
              {comment.image && (
                <img className="w-full rounded-md"
                  src={processAvatarUrl(comment.image)}
                />
              )}
              {comment.gif && <img className="w-full rounded-md" src={comment.gif} />}
            </div>
          ) : null}
        </div>

        <div className="relative z-10 flex h-[32px] -translate-y-1.5 items-center text-[12px] leading-[15px] text-primary">
          <p className="lex items-center gap-3 pb-1">
            {comment.user_reaction_info != null &&
              comment.user_reaction_info.reaction_hashes.length > 0 ? (
              <div className="flex items-center gap-1 rounded-[17px] border-[0.6px] border-[#D1D1D1] bg-white px-[5px] pr-2 text-lg">
                {unicodeToEmoji(comment.user_reaction_info.reaction_hashes[0])}
                <span className=" text-sm text-[#747474]">
                  {comment.user_reaction_info.total_reaction_count}
                </span>
              </div>
            ) : null}
          </p>
          <HoverCard.Root>
            <HoverCard.Trigger className="ml-3 cursor-pointer">React</HoverCard.Trigger>
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
                          object_id: comment.id,
                          content_type: 'comment',
                        }

                        if (comment.user_reaction_info?.is_reacted === true) {
                          await api.transactions.updateReaction({
                            post_id: comment.id,
                            reaction_hash: reactionsUnicode[emoji],
                          })
                        } else {
                          await api.comment.react(reacts)
                        }

                        const comments = await api.comment.by_id({ post_id: postId })
                        queryClient.setQueryData(['transaction', sortBy], (prev) => {
                          if (!prev) return
                          const targetPost = prev
                            .find((_post) => _post.id === postId)

                          if (targetPost) {
                            targetPost.comments = comments;
                          }

                          return [...prev]
                        })
                      } catch (e) {
                        console.log(e)
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
}
