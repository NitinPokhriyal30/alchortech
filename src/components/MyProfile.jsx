import React, { useState, useEffect } from 'react';
import Flag from '../assets/images/user-profile/flag.png';
import AnniversaryBg from '../assets/images/user-profile/anniversarybg.png';
import Uparrow from '../assets/svg/Uparrow.svg';
import Downarrow from '../assets/svg/Downarrow.svg';
import MyHashtags from './HomeRightSidebar/MyHashtags';
import { AiFillCaretDown } from 'react-icons/ai';
import PostCard from '../components/PostCard';
import { AchievementBanner } from '../components/AchievementBanner';
import { api } from '@/api';
import { useQuery } from 'react-query';
import { SERVER_URL } from '@/constant';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const getChildTransactionsFor = (parentId, allTransactions) => {
    return allTransactions.filter((post) => post.parent_id === parentId);
  };

const withIsChild = (allTransactions) => {
    return allTransactions.map((post) => {
      const hasParent = allTransactions.some((parentPost) => post.parent_id === parentPost.id);
      // if a transaction has a parent transaction then it's a child transaction
      post.isChild = hasParent;
  
      return post;
    });
  };

export default function MyProfile() {
    const [activeTab, setActiveTab] = useState('overview');
    const [appreciationType, setAppreciationType] = useState('received');
    const [receivedCount, setReceivedCount] = useState(0);
    const [givenCount, setGivenCount] = useState(0);

    const meQuery = useQuery('me', () => api.auth.me(Cookies.get('user_id')));
    const me = meQuery.data;

    const formattedBirthDate = new Date(me?.birth_date).toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
    });
    
    const formattedHireDate = new Date(me?.hire_date).toLocaleDateString('en-US', {
        month: 'long',
        day: '2-digit',
    });

    const transactionsQuery = useQuery(
        ['transactions', appreciationType], // Added appreciationType as a dependency to trigger the query when it changes
        () => {
          if (appreciationType === 'received') {
            return api.transactions.meAsRecipient(Cookies.get('user_id'));
          } else {
            return api.transactions.meAsSender(Cookies.get('user_id'));
          }
        }, 
    );

    const allPosts = transactionsQuery.isLoading ? [] : withIsChild(transactionsQuery.data || []);
    const parentPosts = allPosts.filter(
        (post) => !post.isChild || getChildTransactionsFor(post.id, allPosts).length > 0
    );

    useEffect(() => {
        // Refetch the transactions query when appreciationType changes
        transactionsQuery.refetch();
        const fetchCounts = async () => {
          const receivedPromise = api.transactions.meAsRecipient(Cookies.get('user_id'));
          const givenPromise = api.transactions.meAsSender(Cookies.get('user_id'));
          
          const receivedCount = await receivedPromise;
          const givenCount = await givenPromise;
          
          setReceivedCount(receivedCount.length);
          setGivenCount(givenCount.length);
        };
    
        fetchCounts()
    }, [appreciationType]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };
    
      const handleAppreciationTypeClick = (type) => {
        setAppreciationType(type);
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          const confirmation = window.confirm('Do you want to change your profile picture?');
          if (confirmation) {
            const formData = new FormData();
            formData.append('avtar', file);
            try {
              const response = await api.auth.changeAvatar(Cookies.get('user_id'), formData);
              toast.success("Profile Picture changed !")
              setTimeout(() => {
                window.location.reload();
              }, 2000)
            } catch (error) {
              toast.error("Size too large !")
            }
          }
        }
    }

    return (
        <div className="drop-shadow-md">
            <div className="flex flex-col md:flex-row h-auto gap-4 mt-3">
              <div className="flex flex-col md:flex-row items-center md:w-[70%] bg-white rounded-lg border-t-8 md:border-t-0 border-l-0 md:border-l-8 border-[#27C4A0]">
                <div className="h-32 md:h-36 w-32 md:w-36 rounded-full overflow-hidden relative ml-4 mr-8 my-8">
                    <img className="w-full h-full object-cover" src={SERVER_URL + (me.avtar || '')} alt="user avatar"/>
                    <label htmlFor='imageInput' className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <p className="text-white font-normal font-lato text-sm text-center">
                        Change<br />Picture
                        </p>
                    </label>
                    <input id='imageInput' type='file' accept='image/*' className='hidden' onChange={handleImageChange}/>
                </div>
                <div className='flex-col text-center md:text-left pr-2'>
                    <div className='ml-[78px] md:ml-[-8px]'>
                        <div>
                            <img className="" src={Flag} alt="flag"/>
                        </div>
                    </div>
                    <p className="font-bold font-Lato text-[#292929] text-[25px]">{me.first_name} {me.last_name}</p>
                    <div className="md:flex mt-2 mb-4">
                        <div className="pr-0 md:pr-4">
                            <p className="font-bold font-lato text-[#000000] text-[18px]">{me.role}</p>
                            <p className="font-normal font-lato text-[#000000] text-[18px]">{me.department}</p>
                        </div>
                        <div className="md:border-l-[1px] sm:border-l-0 pl-0 md:pl-4  border-[#27C4A0]">
                            <p className="font-normal font-lato text-[#000000] text-[18px]">{me.email}</p>
                            <p className="font-normal font-lato text-[#000000] text-[18px]">+91 {me.phone_number}</p>
                        </div>
                    </div>
                </div>
              </div>

              <div className="md:w-[28%] drop-shadow-md h-auto flex flex-col items-center bg-[#5486E3] bg-[center_top_7.5rem] rounded-lg" style={{ backgroundImage: `url(${AnniversaryBg})`, backgroundRepeat: 'no-repeat' }}>
                <div className="font-bold font-Lato text-[#fdfbfb] text-[20px] pb-6 pt-4">Anniversaries</div>
                <div className="font-normal font-lato text-[#fbfbfb] text-[16px]">Birthday</div>
                <div className="font-semibold font-lato text-[#8DFFFF] text-[30px]">{formattedBirthDate}</div>
                <div className="font-normal font-lato  text-[#fbfbfb] text-[16px] pt-2">Work Anniversary</div>
                <div className="font-semibold font-lato text-[#bdfcfc] text-[28px] pb-4">{formattedHireDate}</div>
              </div>

            </div>

            <div className="text-[#8D8D8D] font-semibold text-[14px] font-lato text-left mr-3 mt-4 mb-4">
                <div className="flex flex-col md:flex-row sm:justify-center md:justify-between">
                    <div className="flex justify-center">
                        <button className={activeTab === 'overview' ? 'text-[#000000] border-b-2 border-[#000000]' : ''} onClick={() => handleTabClick('overview')}>
                        Overview
                        </button>
                        <button className={activeTab === 'recentActivities' ? 'text-[#000000] border-b-2 border-[#000000] ml-6' : 'ml-6'} onClick={() => handleTabClick('recentActivities')}>
                        Recent Activities
                        </button>
                        <button className={activeTab === 'achievements' ? 'text-[#000000] border-b-2 border-[#000000] ml-6' : 'ml-6'} onClick={() => handleTabClick('achievements')}>
                        Achievements
                        </button>
                    </div>
                    <div>
                        <div className="flex justify-end">
                            <div className="font-Lato text-[#7B7B7B] text-sm relative flex items-center ml-20">
                                Sort By:
                                <button className="peer font-Lato flex items-center gap-1 text-sm font-semibold pl-1">
                                All <span><AiFillCaretDown /></span>
                                </button>
                                <div className="hidden drop-shadow-[0px_2px_6px_#44444F1A] w-36 px-4 py-2 rounded-lg bg-white absolute z-10 top-[21px] right-[1px] peer-hover:flex hover:flex  flex-col text-end">
                                <p className="text-sm font-Lato">Last 1 year</p>  
                                <p className="text-sm font-Lato">Last 6 months</p>
                                <p className="text-sm font-Lato">Last quarter</p>
                                <p className="text-sm font-Lato">Last month</p>
                                <p className="text-sm font-Lato">This month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-[#CECECE] h-[1px] w-full"></div>
            </div>

            <div className="md:flex gap-2">
                <div className="flex-col md:w-[70%]">
                    <div className={activeTab !== 'achievements' ? 'grid grid-cols-2 gap-0 bg-white p-2 md:p-3 rounded-lg text-white drop-shadow-md' : 'hidden'}>
                        <div onClick={() => handleAppreciationTypeClick('received')} className={appreciationType === 'received' || activeTab === 'overview' ? 'flex flex-col items-center justify-center bg-[#27C4A0] py-2 rounded-l-lg' : 'flex flex-col items-center justify-center bg-[#D1D1D1] py-2 rounded-l-lg'}>
                        <div><img src={Downarrow} alt="down arrow" /></div>
                        <div>Appreciation Received</div>
                        <div className="text-[26px]">{receivedCount}</div>
                        </div>
                        <div onClick={() => handleAppreciationTypeClick('given')} className={appreciationType === 'given' || activeTab === 'overview' ? 'flex flex-col items-center justify-center bg-[#5486E3] py-2 rounded-r-lg' : 'flex flex-col items-center justify-center bg-[#D1D1D1] py-2 rounded-r-lg'}>
                        <div><img src={Uparrow} alt="up arrow" /></div>
                        <div>Appreciation Given</div>
                        <div className="text-[26px]">{givenCount}</div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-white mb-4 rounded-lg h-auto w-auto drop-shadow-md">
                            {activeTab === 'overview' && (
                                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center">
                                <div className="hidden md:block w-2/5 text-center py-4 border-r-2">
                                    <p className="text-[16px] text-[#000000] font-Lato font-bold">Robin's Interaction</p>
                                </div>
                                <div className="w-3/5 py-4 flex justify-center">
                                    <table className="border-collapse">
                                    <thead>
                                        <tr>
                                        <th className="pb-4 text-start pl-4 text-[16px] text-[#000000] font-Lato font-bold">Name</th>
                                        <th className="pb-4 px-6 text-[#27C4A0]">Received</th>
                                        <th className="pb-4 px-6 text-[#2BBFE2]">Given</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="hover:bg-[#ececec] rounded-xl">
                                        <td className="p-4 text-[#5486E3] font-semibold text-[16px]">Pulkit Aggarwal</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">05</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">06</td>
                                        </tr>
                                        <tr className="hover:bg-[#ececec] rounded-xl">
                                        <td className="p-4 text-[#5486E3] font-semibold text-[16px]">Swarup Vuddagiri</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">07</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">04</td>
                                        </tr>
                                        <tr className="hover:bg-[#ececec] rounded-xl">
                                        <td className="p-4 text-[#5486E3] font-semibold text-[16px]">Neha Bhati</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">10</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">06</td>
                                        </tr>
                                        <tr className="hover:bg-[#ececec] rounded-xl">
                                        <td className="p-4 text-[#5486E3] font-semibold text-[16px]">Rafael Merces</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">09</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">03</td>
                                        </tr>
                                        <tr className="hover:bg-[#ececec] rounded-xl">
                                        <td className="p-4 text-[#5486E3] font-semibold text-[16px]">Deepak Kanavikar</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">01</td>
                                        <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">03</td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </div>
                                </div>
                            )}
                            {activeTab === 'recentActivities' && (
                                <div className="relative mt-1" id="post-list">
                                {transactionsQuery.isLoading ? (
                                    <div className="h-64 rounded-md bg-gray-300" />
                                ) : transactionsQuery.data && transactionsQuery.data.length > 0 ? (
                                    parentPosts.slice(0, 2).map((post, i) => (
                                    <div key={post.id}>
                                        <PostCard i={i} post={post} childrenTransactions={getChildTransactionsFor(post.id, allPosts)} />
                                    </div>
                                    ))
                                ) : (
                                    <p>No recent activities found.</p>
                                )}
                                </div>
                            )}
                            {activeTab === 'achievements' && (
                                <div className="bg-white mx-2 py-[0.2px] mt-[-16px]">
                                <AchievementBanner />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="md:w-[28%] h-fit mb-4 ml-2 bg-white rounded-lg drop-shadow-md">
                    <div>
                        <MyHashtags />
                    </div>
                </div>
            </div>
        </div>
    )   
}
