import * as React from 'react'
import GrayBG from '@/assets/images/gray-bg.jpg'
import { useQuery } from 'react-query'
import { api } from '@/api'
import moment from 'moment'
import * as HoverCard from '@radix-ui/react-hover-card'

const getUserById = (userId, users) => users.find((user) => user.id === userId)

export default function PostComment({ modal, setModal, comment, ...props }) {
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

        <div className="relative z-10 mt-[1px] px-[20px] text-[12px] leading-[15px] text-primary">
          <HoverCard.Root>
            <HoverCard.Trigger className="cursor-pointer">React</HoverCard.Trigger>
            <HoverCard.Content className='border'>
              <div className="z-10 absolute flex bottom-[20px] left-1/2 -translate-x-1/2 gap-4 rounded-[19px] bg-white px-4 py-2 drop-shadow-[0px_2px_3px_#00000029]">
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
            </HoverCard.Content>
          </HoverCard.Root>
        </div>
      </div>
    </div>
  )
}
