import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import { AiFillCaretDown } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { RiCloseLine } from 'react-icons/ri'
import { api } from '@/api'
import { reactionsUnicode, unicodeToEmoji } from '@/components/PostCard'
import Spinner from '@/components/Spinner'

const getReactions = (reactions, emoji) => {
  return reactions.filter((reaction) => reaction.reaction.includes(reactionsUnicode[emoji]))
}

const ReactComponent = ({ postId, post }) => {
  const [activeTab, setActiveTab] = useState('')
  const reactionQuery = useQuery(['reactions', postId], () =>
    api.transactions.allReactions({ post_id: postId })
  )

  reactionQuery.data?.length > 0 && console.log('reaction', post, reactionQuery.data)

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-20" />

      <Dialog.Content className="fixed left-1/2 top-2/5 z-[99] -translate-x-1/2 -translate-y-1/2">
        {reactionQuery.isLoading ? (
          <div className="relative min-h-[10rem] w-screen max-w-xs rounded-md border border-[#efefef] bg-white p-5 shadow md:max-w-4xl">
            <Spinner isLoading />
          </div>
        ) : (
          <div className="w-screen max-w-xs rounded-md border border-[#efefef] bg-white p-5 shadow md:max-w-4xl">
            <div className="mx-auto  mt-5 h-full  grow py-2">
              <div className="flex items-start justify-between border-b-[1px]">
                <nav className=" mx-3 flex w-[70%] gap-4 ">
                  <button
                    className={`${
                      activeTab === ''
                        ? ' rounded-tl-md rounded-tr-md border-b-2 border-[#292929] '
                        : 'rounded-md  border-b-2 border-transparent font-semibold'
                    }    font-Montserrat font-semibold text-[#292929] `}
                    onClick={() => handleTabClick('')}
                  >
                    All {reactionQuery.data.length}
                  </button>

                  {Object.keys(reactionsUnicode).map((emoji, i) => (
                    <button
                      className={`
                      ${getReactions(reactionQuery.data, emoji).length === 0 ? 'hidden ' : ''}
                      ${
                        activeTab === emoji
                          ? 'rounded-tl-md rounded-tr-md border-b-2 border-[#292929] bg-white '
                          : 'rounded-md  border-b-2 border-transparent font-semibold'
                      }    font-Montserrat font-semibold text-[#292929] `}
                      onClick={() => handleTabClick(emoji)}
                    >
                      {emoji} {getReactions(reactionQuery.data, emoji).length}
                    </button>
                  ))}
                </nav>
                <Dialog.Close className="pr-4  text-gray-400">
                  <RiCloseLine />
                </Dialog.Close>
              </div>

              <div className="rounded-bl-md rounded-br-md rounded-tr-md bg-white px-4">
                <div className={`${activeTab === '' ? 'block' : 'hidden'}`}>
                  {reactionQuery.data.map((reaction) => (
                    <>
                      <div className=" flex items-center justify-between border-b-[1px] py-4">
                        <div className="flex items-center gap-6">
                          <div>🤷‍♀️</div>
                          <div>
                            <p>
                              <span>{reaction.user_full_name}</span> | {reaction.user_role} -{' '}
                              {reaction.user_department}
                            </p>
                          </div>
                        </div>
                        <div>{unicodeToEmoji(reaction.reaction)}</div>
                      </div>
                    </>
                  ))}
                </div>

                {Object.keys(reactionsUnicode).map((emoji) => (
                  <div
                    className={`${
                      activeTab === emoji && getReactions(reactionQuery.data, emoji).length > 0
                        ? 'block'
                        : 'hidden'
                    } `}
                  >
                    {reactionQuery.data
                      .filter((reaction) => reaction.reaction === reactionsUnicode[emoji])
                      .map((reaction) => (
                        <>
                          <div className=" flex items-center justify-between border-b-[1px] py-4">
                            <div className="flex items-center gap-6">
                              <div>🤷‍♀️</div>
                              <div>
                                <p>
                                  <span>{reaction.user_full_name}</span> | {reaction.user_role} -{' '}
                                  {reaction.user_department}
                                </p>
                              </div>
                            </div>
                            <div>{emoji}</div>
                          </div>
                        </>
                      ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default ReactComponent
