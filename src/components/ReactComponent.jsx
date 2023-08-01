import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import { AiFillCaretDown } from 'react-icons/ai';
import { useQuery } from 'react-query'

const ReactComponent = () => {

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabIndex) => {
        setActiveTab(tabIndex);
    };

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black bg-opacity-20 fixed z-50 inset-0" />

            <Dialog.Content className="fixed z-[99] left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2">

                    <div className="bg-white shadow border border-[#efefef] rounded-md p-5 w-screen md:max-w-4xl max-w-xs">
                        <div className="grow  h-full mx-auto  py-2 mt-5">
                            <div className="border-b-[1px] flex items-start justify-between">
                                <nav className=" flex gap-4 mx-3 w-[70%] ">
                                    <button
                                        className={`${activeTab === 1
                                            ? " rounded-tl-md rounded-tr-md border-b-2 border-[#292929] "
                                            : "font-semibold  rounded-md border-b-2 border-transparent"
                                            }    font-semibold font-Montserrat text-[#292929] `}
                                        onClick={() => handleTabClick(1)}
                                    >
                                        All 3
                                    </button>
                                    <button
                                        className={`${activeTab === 2
                                            ? "bg-white rounded-tl-md rounded-tr-md border-b-2 border-[#292929] "
                                            : "font-semibold  rounded-md border-b-2 border-transparent"
                                            }    font-semibold font-Montserrat text-[#292929] `}
                                        onClick={() => handleTabClick(2)}
                                    >
                                        😊 2
                                    </button>
                                    <button
                                        className={`${activeTab === 3
                                            ? "bg-white rounded-tl-md rounded-tr-md border-b-2 border-[#292929] "
                                            : "font-semibold  rounded-md border-b-2 border-transparent"
                                            }    font-semibold font-Montserrat text-[#292929] `}
                                        onClick={() => handleTabClick(3)}
                                    >
                                        ❤ 1
                                    </button>
                                </nav>
                                <button className="pr-4  text-gray-400">x</button>
                            </div>
                            <div className="bg-white px-4 rounded-tr-md rounded-br-md rounded-bl-md">
                                <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
                                    <div className=" py-4 flex justify-between items-center border-b-[1px]">
                                        <div className="flex gap-6 items-center">
                                            <div>🤷‍♀️</div>
                                            <div>
                                                <p>
                                                <span> Sunita Gulia</span> | <span>Ditector - Product</span>
                                                    Development
                                                </p>
                                            </div>
                                        </div>
                                        <div>😊</div>
                                    </div>
                                    <div className=" py-4 flex justify-between items-center border-b-[1px]">
                                        <div className="flex gap-6 items-center">
                                            <div>🤷‍♀️</div>
                                            <div>
                                                <p>
                                                    <span> Sunita Gulia</span> | Ditector - Product
                                                    Development
                                                </p>
                                            </div>
                                        </div>
                                        <div>😊</div>
                                    </div>
                                    <div className=" py-4 flex justify-between items-center">
                                        <div className="flex gap-6 items-center">
                                            <div>🤷‍♀️</div>
                                            <div>
                                                <p>
                                                    <span> Sunita Gulia</span> | Ditector - Product
                                                    Development
                                                </p>
                                            </div>
                                        </div>
                                        <div>💖</div>
                                    </div>
                                </div>
                                <div className={`${activeTab === 2 ? "block" : "hidden"} `}>
                                    <div className=" py-4 flex justify-between items-center border-b-[1px]">
                                        <div className="flex gap-6 items-center">
                                            <div>🤷‍♀️</div>
                                            <div>
                                                <p>
                                                    <span> Sunita Gulia</span> | Ditector - Product
                                                    Development
                                                </p>
                                            </div>
                                        </div>
                                        <div>😊</div>
                                    </div>
                                    <div className=" py-4 flex justify-between items-center border-b-[1px]">
                                        <div className="flex gap-6 items-center">
                                            <div>🤷‍♀️</div>
                                            <div>
                                                <p>
                                                    <span> Sunita Gulia</span> | Ditector - Product
                                                    Development
                                                </p>
                                            </div>
                                        </div>
                                        <div>😊</div>
                                    </div>
                                </div>
                                <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
                                    <div className=" py-4 flex justify-between items-center border-b-[1px]">
                                        <div className="flex gap-6 items-center">
                                            <div>🤷‍♀️</div>
                                            <div>
                                                <p>
                                                    <span> Sunita Gulia</span> | Ditector - Product
                                                    Development
                                                </p>
                                            </div>
                                        </div>
                                        <div>💖</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </Dialog.Content>
        </Dialog.Portal>
    )
}

export default ReactComponent