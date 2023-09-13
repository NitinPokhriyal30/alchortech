import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';
import { toast } from 'react-toastify';

const COLORS = {
    gray: 'text-[#A5A5A5]',
};

export default function CampaignParticipants({campaigns, setCampaigns, errors}) {

    const [selectedDepartments, setSelectedDepartments] = useState([]);

    const departments = useQuery('departments', () => api.departments());

    const addDepartment = (departmentId) => {
        setCampaigns((prev) => ({
          ...prev,
          teams: [...prev.teams, departmentId],
        }));
      };
    
      const removeDepartment = (departmentId) => {
        setCampaigns((prev) => ({
          ...prev,
          teams: prev.teams.filter((id) => id !== departmentId),
        }));
      };
    
      const clearSelectedDepartments = () => {
        setCampaigns((prev) => ({
          ...prev,
          teams: [],
        }));
      };

    const clearIndividualParticipants = () => {
        setCampaigns((prev) => ({
        ...prev,
        individuals: [],
        }));
    };

    const clearGroupParticipants = () => {
        setCampaigns((prev) => ({
        ...prev,
        groups: [], 
        }));
    };

    const addNewGroup = () => {
        const newGroup = {
            label: "",
            participants: [],
        };
        setCampaigns((prev) => ({
            ...prev,
            groups: [...prev.groups, newGroup],
        }));
    };

    const addGroupHandler = async(index) =>{
        try { 
            const groupsString = campaigns.groups[index].participants.join(',');
            const groupData = {
                groupName: campaigns.groups[index].label,
                participants: groupsString
              }
            const response = await api.campaigns.addGroup(groupData);

            const newGroupId = response.id;
            setCampaigns((prev) => ({
                ...prev,
                groupIds: [...prev.groupIds, newGroupId],
            }))

            
            toast.success('Added')
        } catch (error) {
            console.error('Error adding group:', error);
        } 
    }
    
    return (
        <div>
            <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">
                <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select Participant Type</p>
                        <p className={'mt-2.5 ' + COLORS.gray}>Employees earn rewards based on individual's/team's performance</p>
                    </div>

                    {/* col 2 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => {
                                setCampaigns((prev) => ({
                                    ...prev,
                                    participantType: 'all',
                                }))
                            }}
                            className={
                                campaigns.participantType === 'all'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-10'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-10'
                            }
                        >
                            All
                        </button>
                        <button
                            onClick={() => {
                                setCampaigns((prev) => ({
                                    ...prev,
                                    participantType: 'teams',
                                }))
                                clearIndividualParticipants();
                                clearGroupParticipants();
                            }}
                            className={
                                campaigns.participantType === 'teams'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9'
                            }
                        >
                            Team
                        </button>
                        <button
                            onClick={() => {
                                setCampaigns((prev) => ({
                                    ...prev,
                                    participantType: 'individual',
                                }))
                                clearGroupParticipants();
                                clearSelectedDepartments();
                            }}
                            className={
                                campaigns.participantType === 'individual'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Individual
                        </button>
                        <button
                            onClick={() => {
                                setCampaigns((prev) => ({
                                    ...prev,
                                    participantType: 'groups',
                                }))
                                clearIndividualParticipants();
                                clearSelectedDepartments();
                            }}
                            className={
                                campaigns.participantType === 'groups'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-2'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-2'
                            }
                        >
                            + Create Group
                        </button>
                    </div>
                </div>
            </div>

            {campaigns.participantType === 'teams' && (
                <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2">
                    <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
                        {/* col 1 */}
                        <div>
                            <p className="text-18px font-bold text-text-black">Select Team</p>
                        </div>

                        {/* col 2 */}
                        <div>   
                            <select className="w-full p-2 border rounded"
                            onChange={(e) => {
                                const selectedValues = Array.from(e.target.options)
                                  .filter((option) => option.selected)
                                  .map((option) => option.value);
                                
                                const currentSelectedDepartments = [...campaigns.teams];
                            
                                selectedValues.forEach((departmentId) => {
                                  if (currentSelectedDepartments.includes(departmentId)) {
                                    removeDepartment(departmentId);
                                  } else {
                                    addDepartment(departmentId);
                                  }
                                });
                              }}
                              multiple
                              value={campaigns.teams}
                            >
                            {departments.data.map((department) => (
                              <option key={department.id} value={department.id}>
                                {department.name}
                              </option>
                            ))}
                          </select>
                        
                        </div>
                    </div>
                </div>
            )}

            {campaigns.participantType === 'individual' && (
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
                                    <RecipientsDropdown {...{campaigns, setCampaigns}}/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {campaigns.participantType == 'groups' &&
                campaigns.groups.map((group, index) => (
                    <div key={index} className="relative">

                        <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2">
                            <button
                                className="absolute top-0 right-0 p-2 text-gray-500"
                                onClick={() => {
                                    const updatedGroups = campaigns.groups.filter((_, i) => i !== index);
                                    setCampaigns((prev) => ({
                                        ...prev,
                                        groups: updatedGroups,
                                    }));
                                }}
                            >
                                &#x2715; {/* Unicode cross symbol */}
                            </button>
                            <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
                                {/* col 1 */}
                                <div>
                                    <p className="text-18px font-bold text-text-black">{`Group ${index+1}`}</p>
                                </div>

                                {/* col 2 */}
                                <div>
                                    <input
                                        className="w-full py-2 px-2 my-4 rounded border-[2px]"
                                        type="text"
                                        onChange={(e) => {
                                            const updatedGroups = [...campaigns.groups];
                                            updatedGroups[index].label = e.target.value;
                                            setCampaigns((prev) => ({
                                                ...prev,
                                                groups: updatedGroups,
                                            }));
                                        }}
                                        placeholder="Name the Group"
                                    />
                                    <div className={'rounded border-[2px] ring-primary focus-within:ring-1'}>
                                        <ul className="group p-2">
                                            <RecipientsDropdown {...{campaigns, setCampaigns }} groupIndex={index}/>
                                        </ul>
                                    </div>
                                    <div className='flex justify-end'>
                                    <button onClick={() => addGroupHandler(index)} className="text-[#ACACAC] hover:text-black border border-[#ACACAC] py-1 px-2 mt-4 rounded-md">
                                        Add Group  
                                    </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            {campaigns.participantType === 'groups' && (
                <button className="text-primary mt-2 mx-4" onClick={addNewGroup}>
                + Add new group
            </button>
            )}
        </div>
    );
}

export function RecipientsDropdown({campaigns, setCampaigns, groupIndex }) {

    const [showDropdown, setShowDropdown] = useState(false)

    const users = useQuery('users', () => api.users.profiles(), {
        initialData: [],
    });
    const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')));

    const usersWithoutMe = users.isLoading ? [] : users.data.filter((x) => x.id !== me.data.id);

    const [searchUserQuery, setSearchUserQuery] = React.useState('');
    const searchedUser = usersWithoutMe.filter((user) =>
    JSON.stringify(user).toLocaleLowerCase().includes(searchUserQuery)
    );

    const isSelectedIndividual = (user) => campaigns.individuals.includes(user.id);
    const isSelectedGroupParticipant = (user) => {
        const group = campaigns.groups?.[groupIndex];
        return group?.participants?.includes(user.id);
    };

    const excludedUsers = campaigns.participantType === 'individual'
    ? campaigns.individuals
    : campaigns.groups.reduce((acc, group, idx) => {
        if (idx !== groupIndex) {
            return acc.concat(group.participants);
        }
        return acc;
    }, []);

      
      const filteredSearchedUser = searchedUser.filter((user) => {
        return (
            !excludedUsers.includes(user.id) &&
            (campaigns.participantType === 'individual'
                ? !isSelectedGroupParticipant(user)
                : !isSelectedIndividual(user))
        );
    });
    

    const USER_BTN_HEIGHT = 28;
    
    return (
        <>
            {/* dropdown trigger */}
            <span className="flex cursor-pointer gap-[2px] hover:font-bold"
                onClick={() => setShowDropdown(!showDropdown)}
            >
            {campaigns.participantType === "individual" && 
            <span className="flex flex-wrap recipients-grid gap-2">
             {campaigns.individuals.length > 0 ? (
                 campaigns.individuals.map((userId) => {
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
                                                 if (isSelectedIndividual(user)) {
                                                     prev.individuals = prev.individuals.filter((id) => id !== user.id);
                                                 } else {
                                                     prev.individuals.push(user.id);
                                                 }
                                                 return { ...prev };
                                             });
                                         }}
                                     >
                                         &#x2715;
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
            </span> }
            {campaigns.participantType === "groups" &&
            <span className="flex flex-wrap recipients-grid gap-2">   
            {campaigns.groups[groupIndex].participants.length > 0 ? (
                campaigns.groups[groupIndex].participants.map((userId) => {
                    const user = usersWithoutMe.find((u) => u.id === userId);
                    return (
                        <span key={userId} className="border-[2px] px-2 py-1 rounded-lg mx-1">
                            {user ? (
                                <span className="">
                                    {user.full_name}{" "}
                                    <button
                                        className="ml-1 text-black cursor-pointer"
                                        onClick={() => {
                                            setCampaigns((prev) => {
                                                const updatedGroups = [...prev.groups];
                                                const group = updatedGroups[groupIndex];
                                                group.participants = group.participants.filter((id) => id !== user.id);
                                                return { ...prev, groups: updatedGroups };
                                            });
                                        }}
                                    >
                                        &#x2715; {/* Unicode cross symbol */}
                                    </button>
                                </span>
                            ) : (
                                ""
                            )}
                        </span>
                    );
                })
            ) : (
                <p className="text-[#ACACAC]">Add members by Name or Email Id</p>
            )}
             
            </span> 
            }
            </span>

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
                                {filteredSearchedUser?.map((user) => {
                                    return (  
                                        <button
                                            key={user.id}
                                            style={{ height: USER_BTN_HEIGHT }}
                                            className={`block w-full  px-4 py-1 text-left ${isSelectedIndividual(user) || isSelectedGroupParticipant(user) ? 'border-b border-primary/80 bg-primary/30' : ''
                                                }`}
                                            type="button"
                                           
                                            onClick={() => {
                                                if (campaigns.participantType === 'individual') {                                                    setCampaigns((prev) => {
                                                        if (isSelectedIndividual(user)) {
                                                            prev.individuals = prev.individuals.filter((id) => id !== user.id);
                                                        } else {
                                                            prev.individuals.push(user.id);
                                                        }
                                                        return { ...prev };
                                                    });
                                                   } else if (campaigns.participantType === 'groups') {
                                                    setCampaigns((prev) => {
                                                        const updatedGroups = [...prev.groups];
                                                        const group = updatedGroups[groupIndex];
                                            
                                                        if (!isSelectedGroupParticipant(user)) {
                                                            group.participants.push(user.id);
                                            
                                                            // Remove the user from other groups' participants if applicable
                                                            updatedGroups.forEach((otherGroup, idx) => {
                                                                if (idx !== groupIndex) {
                                                                    otherGroup.participants = otherGroup.participants.filter((id) => id !== user.id);
                                                                }
                                                            });
                                                        } else {
                                                            group.participants = group.participants.filter((id) => id !== user.id);
                                                        }
                                            
                                                        return { ...prev, groups: updatedGroups };
                                                    });
                                                }
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
