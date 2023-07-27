import React, { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { RxCross2 } from 'react-icons/rx'
import { AiFillCaretDown } from 'react-icons/ai';
import { useQuery } from 'react-query'

const ReactComponent = (reactBy) => {

    console.log(reactBy);
    
    const [reacts, setReacts] = React.useState(reactBy)
    const [activeTab, setActiveTab] = useState('overview');

    const userInfo = useQuery('userInfo', () => api.userById(Cookies.get('user_id')))

    console.log(userInfo); 

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

  return (
      <Dialog.Portal>
          <Dialog.Overlay className="bg-black bg-opacity-20 fixed z-50 inset-0" />

          <Dialog.Content className="fixed z-[99] left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white shadow border border-[#efefef] rounded-md p-5 w-screen md:max-w-4xl max-w-xs">

                  <div >
                      {/* {reacts.map((item) => (
                          <p>{ item.react}</p>
                      ))} */}
                      <div className="flex flex-col md:flex-row sm:justify-center md:justify-between border-b">
                          <div className="flex justify-center">
                              <button className={activeTab === 'overview' ? 'text-[#000000] border-b-2 border-[#000000]' : ''} onClick={() => handleTabClick('overview')}>
                                  All 3
                              </button>
                              <button className={activeTab === 'recentActivities' ? 'text-[#000000] border-b-2 border-[#000000] ml-6' : 'ml-6'} onClick={() => handleTabClick('recentActivities')}>
                                  😄 2
                              </button>
                              <button className={activeTab === 'achievements' ? 'text-[#000000] border-b-2 border-[#000000] ml-6' : 'ml-6'} onClick={() => handleTabClick('achievements')}>
                                  ❤️ 3
                              </button>
                          </div>
                          <div>
                              <div className="flex justify-end">
                                  <Dialog.Close className="p-2 rounded-sm hover:bg-translucent hover:text-primary block w-fit ml-auto">
                                      <RxCross2 />
                                  </Dialog.Close>
                              </div>
                          </div>
                      </div>
                      <div className="flex flex-col md:flex-row sm:justify-center md:justify-between">
                          <div className="flex justify-center">
                              {/* <img
                                  className="aspect-square w-[55px] rounded-full border border-[#707070]"
                                  src={user.avtar}
                              /> */}
                          </div>
                          <div className="flex justify-center">
                              <p>Sunita Gulia | Ditector - Product Development</p>
                          </div>
                          <div className='flex justify-center'> 
                              😊
                          </div>
                      </div>
                  </div>
              </div>
          </Dialog.Content>
      </Dialog.Portal>
  )
}

export default ReactComponent