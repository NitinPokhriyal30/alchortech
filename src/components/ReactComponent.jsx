import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import { AiFillCaretDown } from 'react-icons/ai'
import { useQuery } from 'react-query'
import { RiCloseLine } from 'react-icons/ri'
import { api } from '@/api'
import { reactionsUnicode, unicodeToEmoji } from '@/components/PostCard'
import Spinner from '@/components/Spinner'
import { processAvatarUrl } from '@/utils'

const getReactions = (reactions, emoji) => {
    return reactions.filter((reaction) => reaction.reaction.includes(reactionsUnicode[emoji]))
}

const ReactComponent = ({ postId, post }) => {
    const [activeTab, setActiveTab] = useState('')
    const reactionQuery = useQuery(['reactions', postId], () =>
        api.transactions.allReactions({ post_id: postId })
    )

<<<<<<< HEAD
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex)
  }
=======
    reactionQuery.data?.length > 0 && console.log('reaction', post, reactionQuery.data)

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex)
    }
>>>>>>> 10037fbe2f99e2dbd9dab15410655f483f426188

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-50" />

            <Dialog.Content className="fixed left-1/2 top-1/2 z-[99] -translate-x-1/2 -translate-y-1/2 px-4 w-full md:w-auto">
                {reactionQuery.isLoading ? (
                    <div className="relative min-h-[10rem] w-screen max-w-xs rounded-md border border-[#efefef] bg-white p-5 shadow md:max-w-4xl">
                        <Spinner isLoading />
                    </div>
                ) : (
                    <div className="w-full md:w-screen rounded-md border border-[#efefef] bg-white shadow md:max-w-3xl">
                        <div className="mx-auto h-full py-6 text-16px">
                            <div className="flex items-start justify-between border-b-[1px]">
                                <nav className="px-6 flex w-[70%] gap-8 child:pb-2.5">
                                    <button
                                        className={`${activeTab === ''
                                            ? ' rounded-tl-md rounded-tr-md border-b-2 border-[#292929] '
                                            : 'rounded-md  border-b-2 border-transparent font-semibold'
                                            } font-Montserrat font-semibold text-[#292929] `}
                                        onClick={() => handleTabClick('')}
                                    >
                                            <span className='text-[16px] font-normal'>All {reactionQuery.data.length}</span>
                                    </button>

                                    {Object.keys(reactionsUnicode).map((emoji, i) => (
                                        <button
                                            className={`
                      ${getReactions(reactionQuery.data, emoji).length === 0 ? 'hidden ' : ''}
                      ${activeTab === emoji
                                                ? 'rounded-tl-md rounded-tr-md border-b-2 border-[#292929] bg-white'
                                                    : 'rounded-md  border-b-2 border-transparent font-semibold'
                                                }    font-Montserrat font-semibold text-[#292929] `}
                                            onClick={() => handleTabClick(emoji)}
                                        >
                                            <span className='text-xl'>{emoji}</span> <span className='text-[16px] font-normal'>{getReactions(reactionQuery.data, emoji).length}</span>
                                        </button>
                                    ))}
                                </nav>
                                <Dialog.Close className="pr-4  text-gray-400">
                                    <RiCloseLine />
                                </Dialog.Close>
                            </div>

                            <div className="rounded-bl-md rounded-br-md rounded-tr-md bg-white px-6 h-screen max-h-[225px]  overflow-auto">
                                <div className={`${activeTab === '' ? 'block' : 'hidden'}`}>
                                    {reactionQuery.data.map((reaction) => (
                                        <>
                                            <div className=" flex items-center justify-between border-b-[1px] py-2.5 last-of-type:border-b-0">
                                                <div className="flex items-center gap-8.5">
                                                    <div><img
                                                        src={processAvatarUrl(reaction.user_avtar)}
                                                        className='w-9 aspect-square rounded-full ' /></div>
                                                    <div>
                                                        <p className='text-[16px] font-light'>
                                                            <span className='text-18px font-normal text-primary'>{reaction.user_full_name}</span> | {reaction.user_role} -{' '}
                                                            {reaction.user_department}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className='text-xl'>{unicodeToEmoji(reaction.reaction)}</div>
                                            </div>
                                        </>
                                    ))}
                                </div>

                                {Object.keys(reactionsUnicode).map((emoji) => (
                                    <div
                                        className={`${activeTab === emoji && getReactions(reactionQuery.data, emoji).length > 0
                                            ? 'block'
                                            : 'hidden'
                                            }`}
                                    >
                                        {reactionQuery.data
                                            .filter((reaction) => reaction.reaction === reactionsUnicode[emoji])
                                            .map((reaction) => (
                                                <>
                                                    <div className=" flex items-center justify-between border-b-[1px] py-2.5 last-of-type:border-b-0">
                                                        <div className="flex items-center gap-8.5">
                                                            <div><img
                                                                src={processAvatarUrl(reaction.user_avtar)}
                                                                className='w-9 aspect-square rounded-full' /></div>
                                                            <div>
                                                                <p className='text-[16px] font-light'>
                                                                    <span className="text-18px font-normal text-primary">{reaction.user_full_name}</span> | {reaction.user_role} -{' '}
                                                                    {reaction.user_department}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className='text-xl'>{emoji}</div>
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
