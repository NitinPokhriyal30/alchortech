import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';

const COLORS = {
    gray: 'text-[#A5A5A5]',
};

export default function CampaignParticipants({campaigns, setCampaigns, errors}) {
    const [participantType, setParticipantType] = useState('');
    

    const [groups, setGroups] = useState([
        {
            groupName: 'Group 1',
            participants: [],
        },
    ]);

    const addNewGroup = () => {
        const newGroupName = `Group ${groups.length + 1}`;
        setGroups((prevGroups) => [
            ...prevGroups,
            {
                groupName: newGroupName,
                participants: [],
            },
        ]);
    };

  
   
  useEffect(() => {
    console.log('participant:', campaigns.participantType);
  
    }, [campaigns])
    

    return (
        <div>
            <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">
                <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select Participant Type</p>
                        <p className={'mt-2.5 ' + COLORS.gray}>Employees earn rewards based on individual's/team's performance</p>
                    </div>

                    {/* col 2 */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => setParticipantType('All')}
                            className={
                                participantType === 'All'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-10'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-10'
                            }
                        >
                            All
                        </button>
                        <button
                            onClick={() => setParticipantType('Team')}
                            className={
                                participantType === 'Team'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9'
                            }
                        >
                            Team
                        </button>
                        <button
                            onClick={() => setParticipantType('Individual')}
                            className={
                                participantType === 'Individual'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Individual
                        </button>
                        <button
                            onClick={() => setParticipantType('Group')}
                            className={
                                participantType === 'Group'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-2'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-2'
                            }
                        >
                            + Create Group
                        </button>
                    </div>
                </div>
            </div>

            {participantType === 'Individual' && (
                <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2">
                    <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
                        {/* col 1 */}
                        <div>
                            <p className="text-18px font-bold text-text-black">Select Individual Participant</p>
                        </div>

                        {/* col 2 */}
                        <div>
                            <div
                                className={
                                    'rounded border-[2px] ring-primary focus-within:ring-1 '
                                }
                            >
                                <ul className="group p-2">
                                    <RecipientsDropdown {...{campaigns, setCampaigns}} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {participantType == 'Group' &&
                groups.map((group, index) => (
                    <div key={index} className="relative">

                        <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2">
                            <button
                                className="absolute top-0 right-0 p-2 text-gray-500"
                                onClick={() => {
                                    const updatedGroups = groups.filter((_, i) => i !== index);
                                    setGroups(updatedGroups);
                                }}
                            >
                                &#x2715; {/* Unicode cross symbol */}
                            </button>
                            <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
                                {/* col 1 */}
                                <div>
                                    <p className="text-18px font-bold text-text-black">{group.groupName}</p>
                                </div>

                                {/* col 2 */}
                                <div>
                                    <input
                                        className="w-full py-2 px-2 my-4 rounded border-[2px]"
                                        type="text"
                                        placeholder="Name the Group"
                                    />

                                    <div className={'rounded border-[2px] ring-primary focus-within:ring-1'}>
                                        <ul className="group p-2">
                                            <RecipientsDropdown {...{campaigns, setCampaigns }} />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            {participantType === 'Group' && (
                <button className="text-primary mt-2 mx-4" onClick={addNewGroup}>
                    + Add new group
                </button>
            )}
        </div>
    );
}

export function RecipientsDropdown({campaigns, setCampaigns }) {

    const [showDropdown, setShowDropdown] = useState(false)

    const users = useQuery('users', () => api.users.profiles(), {
        initialData: [],
    });
    const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')));

    const usersWithoutMe = users.isLoading ? [] : users.data.filter((x) => x.id !== me.data.id);

    const [searchUserQuery, setSearchUserQuery] = React.useState('');
    let searchedUser = usersWithoutMe.filter((user) =>
        JSON.stringify(user).toLocaleLowerCase().includes(searchUserQuery)
    );

    const USER_BTN_HEIGHT = 28;
    const isSelected = (user) => campaigns.participants.includes(user.id);

    return (
        <>
            {/* dropdown trigger */}
            <p className="flex cursor-pointer gap-[2px] hover:font-bold"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span className="flex flex-wrap recipients-grid gap-2">
                    {campaigns.participants.length > 0 ? (
                        campaigns.participants.map((userId) => {
                            const user = usersWithoutMe.find((u) => u.id === userId);
                            return (
                                <span key={userId} className="border-[2px] px-2 py-1 rounded-lg mx-1">
                                    {user ? (
                                        <span className=''>
                                            {user.full_name}{' '}
                                            <button
                                                className="ml-1 text-black cursor-pointer"
                                                onClick={() => {
                                                    setCampaigns((prev) => {
                                                        if (isSelected(user)) {
                                                            // Remove the user ID from the participants array
                                                            prev.participants = prev.participants.filter((id) => id !== user.id);
                                                        } else {
                                                            // Add the user ID to the participants array
                                                            prev.participants.push(user.id);
                                                        }
                                                        return { ...prev };
                                                    });
                                                }}
                                            >
                                                &#x2715; {/* Unicode cross symbol */}
                                            </button>
                                        </span>
                                    ) : (
                                        ''
                                    )}
                                </span>
                            );
                        })
                    ) : (
                        <p className='text-[#ACACAC]'>Add member by Name or Email Id</p>
                    )}
                </span>
            </p>

            {/* container */}
            {showDropdown && (
                <div className="absolute z-10 hidden divide-y overflow-hidden rounded bg-white text-black shadow shadow-gray-400 group-hover:block">
                    {/* fixed height list */}
                    <div style={{ height: 5 * USER_BTN_HEIGHT }} className="overflow-y-auto">
                        {users.isLoading ? (
                            <p className="absolute inset-0 m-auto h-10 w-[15ch] text-center text-gray-500">
                                Loading...
                            </p>
                        ) : (
                            <div>
                                {searchedUser?.map((user) => {
                                    return (
                                        
                                        <button
                                            key={user.id}
                                            style={{ height: USER_BTN_HEIGHT }}
                                            className={`block w-full  px-4 py-1 text-left ${isSelected(user) ? 'border-b border-primary/80 bg-primary/30' : ''
                                                }`}
                                            type="button"
                                           
                                            onClick={() => {
                                                setCampaigns((prev) => {
                                                    if (isSelected(user)) {
                                                        prev.participants = prev.participants.filter((id) => id !== user.id);
                                                    } else {
                                                        prev.participants.push(user.id);
                                                    }
                                                    return { ...prev };
                                                });
                                            }}
                                        >
                                            <div className='flex items-center'>
                                                <span>
                                                    <img className="h-6 w-6 rounded-full mr-2"
                                                        src={getAvatarAttributes(`${user?.full_name.split(' ')[0]} ${user?.full_name.split(' ')[1]}`, processAvatarUrl(user?.avtar)).src}
                                                        alt={getAvatarAttributes(`${user?.full_name.split(' ')[0]} ${user?.full_name.split(' ')[1]}`, processAvatarUrl(user?.avtar)).alt}
                                                        onError={(e) => {
                                                          // If the image fails to load, use the name initials instead
                                                          e.target.onerror = null;
                                                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                            user?.full_name.split(' ')[0].charAt(0) + user?.full_name.split(' ')[1].charAt(0)
                                                          )}&color=${"#464646"}&background=${"FFFFFF"}`;
                                                        }}
                                                    />
                                                </span>
                                                <span className='font-bold'>{`${user.full_name}`}</span>
                                                {` | ${user.title} - ${user.department}`}
                                            </div>
                                        </button>

                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <input
                        className="bg-translucent px-2 py-1"
                        onChange={(e) => setSearchUserQuery(e.target.value)}
                        placeholder="Search Participants"
                        value={searchUserQuery}
                    />
                </div>
            )}
        </>
    );
}
