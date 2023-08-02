import * as React from 'react'
import GrayBG from '@/assets/images/gray-bg.jpg'
import { useQuery } from 'react-query'
import { api } from '@/api'
import moment from 'moment'
import * as HoverCard from '@radix-ui/react-hover-card'
import { CreateReact, processAvatarUrl } from '@/utils'
import { toFormData } from '@/components/NewPost'
import { queryClient } from '@/queryClient'
import { reactionsUnicode, unicodeToEmoji } from '@/components/PostCard'

const getUserById = (userId, users) => users.find((user) => user.id === userId)

export default function PostComment({ modal, setModal, sortBy, postId, comment, ...props }) {
  const me = useQuery('me')
  const users = useQuery('users', () => api.users.profiles(), {
    initialData: [],
  })

  const placeholderUser = { avtar: GrayBG, first_name: 'FirstName', last_name: '&nbsp;' }
  const user = comment.created_by

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 pl-0 pt-[7px]">
      <img className="h-8.5 w-8.5 rounded-full object-cover"
        src={processAvatarUrl(user.avtar)}
      />

      <div className="relative ">
        <div className="rounded-[15px] rounded-tl-none bg-paper p-[20px] text-[#464646]">
          <p className="flex justify-between text-18px">
            <span className="font-bold">{user.first_name}</span>
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
            {comment.reaction_hashes?.length > 0 ? (
              <div className="flex items-center gap-1 rounded-[17px] border-[0.6px] border-[#D1D1D1] bg-white px-[5px] pr-2 text-lg">
                {unicodeToEmoji(comment.reaction_hashes[0])}
                <span className=" text-sm text-[#747474]">{comment.total_reaction_counts}</span>
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

                        await api.comment.react(reacts)
                        await queryClient.setQueryData(['transaction', sortBy], (prev) => {
                          if (!prev) return
                          const targetComment = prev
                            .find((_post) => _post.id === postId)
                            ?.comments.find((_comment) => _comment.id === comment.id)
                          if (targetComment) {
                            targetComment.reaction_hashes = [...(targetComment.reaction_hashes || []), (reacts.reaction_hash)]
                            targetComment.total_reaction_counts = (targetComment.total_reaction_counts || 0)  + 1
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
