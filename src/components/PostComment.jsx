import * as React from 'react'
import GrayBG from '@/assets/images/gray-bg.jpg'
import { useQuery } from 'react-query'
import { api } from '@/api'
import moment from 'moment'
import * as HoverCard from '@radix-ui/react-hover-card'
import { CreateReact } from '@/utils'
import { toFormData } from '@/components/NewPost'
import { queryClient } from '@/queryClient'

const getUserById = (userId, users) => users.find((user) => user.id === userId)

export default function PostComment({ modal, setModal, comment, ...props }) {
  const me = useQuery('me')
  const users = useQuery('users', () => api.users.profiles(), {
    initialData: [],
  })
  const user = users.data
    ? getUserById(comment.created_by, users.data)
    : { avtar: GrayBG, first_name: '&nbsp;', last_name: '&nbsp;' }

  return (
    <div className="grid grid-cols-[auto_1fr] gap-4 pl-0 pt-[7px]">
      <img className="h-8.5 w-8.5 rounded-full object-cover" src={user.avtar} />

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
              {comment.image && <img className="w-full rounded-md" src={comment.image} />}
              {comment.gif && <img className="w-full rounded-md" src={comment.gif} />}
            </div>
          ) : null}
        </div>

        <div className="relative z-10 flex items-center text-[12px] leading-[15px] text-primary h-[32px] -translate-y-1.5">
          <p className="inline-block rounded-full  border-[0.5px] border-iconColor bg-white p-1 empty:hidden">
            {comment.react_by.length > 0 ? (
              <span className="text-[18px] leading-[18px]">
                {comment.react_by[comment.react_by.length - 1].react} {comment.react_by.length}
              </span>
            ) : (
              null
            )}
          </p>
          <HoverCard.Root>
            <HoverCard.Trigger className="cursor-pointer ml-3">React</HoverCard.Trigger>
            <HoverCard.Content className="border">
              <div className="absolute bottom-[20px] left-1/2 z-10 flex -translate-x-1/2 gap-4 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029]">
                {['❤', '👍', '👏', '✔ ', '😍'].map((emoji) => (
                  <button
                    key={emoji}
                    className="inline-block h-6 w-6 rounded-full font-Lato text-sm font-black hover:bg-translucent"
                    onClick={async () => {
                      try {
                        const reacts = CreateReact(
                          me.data,
                          { id: comment.id, react_by: comment.react_by },
                          emoji
                        )
                        await api.comment.react(toFormData(reacts))
                        await queryClient.setQueryData(['comments'], (prev) => {
                          if (!prev) return
                          const targetComment = prev.find((_comment) => _comment.id === comment.id)
                          if (targetComment) {
                            targetComment.react_by = reacts.react_by
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
