import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';
import { toast } from 'react-toastify';
import { RiInformationLine } from 'react-icons/ri';

const COLORS = {
    gray: 'text-[#A5A5A5]',
};


export default function SelectParticipants({ survey, setServey, surveyId, errors, queErrorCheck }) {

    const [selectedDepartments, setSelectedDepartments] = useState([]);

    const departments = useQuery('departments', () => api.departments());

    const addDepartment = (departmentId) => {
        setServey((prev) => ({
            ...prev,
            teams: [...prev.teams, departmentId],
        }));
    };

    const removeDepartment = (departmentId) => {
        setServey((prev) => ({
            ...prev,
            teams: prev.teams.filter((id) => id !== departmentId),
        }));
    };

    const clearSelectedDepartments = () => {
        setServey((prev) => ({
            ...prev,
            teams: [],
        }));
    };

    const clearIndividualParticipants = () => {
        setServey((prev) => ({
            ...prev,
            individuals: [],
        }));
    };

    const clearGroupParticipants = () => {
        setServey((prev) => ({
            ...prev,
            groups: [],
        }));
    };

    const addNewGroup = () => {
        const groupIndex = survey.groups.length - 1;
        if (survey.groups.length > 0) { 
            
            if (survey.groups[groupIndex].label !== '' && survey.groups[groupIndex].participants.length > 1) {
                const newGroup = {
                    label: "",
                    participants: [],
                };
                setServey((prev) => ({
                    ...prev,
                    groups: [...prev.groups, newGroup],
                }));
                if (groupIndex >= 0) {
                    saveGroup(groupIndex)
                }
            } else {
                queErrorCheck();
            }
        } else {
            const newGroup = {
                label: "",
                participants: [],
            };
            setServey((prev) => ({
                ...prev,
                groups: [...prev.groups, newGroup],
            }));
        }
    };

    const saveGroup = async (groupIndex) => {
        try {
            const groupsString = survey.groups[groupIndex].participants.join(',');
            const groupData = {
                groupName: survey.groups[groupIndex].label,
                participants: groupsString
            }
            const response = await api.surveys.addGroup(groupData);

            const newGroupId = response.id;
            setServey((prev) => ({
                ...prev,
                groupIds: [...prev.groupIds, newGroupId],
            }))


            toast.success('Added')
        } catch (error) {
            console.error('Error adding group:', error);
        }
    }

    const getError = (index) => errors?.find(([_index]) => _index === index)?.[1]

    return (
        <div>
            <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md">
                <div className="grid md:grid-cols-[1fr_2fr] items-center gap-8">
                    {/* col 1 */}
                    <div>
                        <p className="text-18px font-bold text-text-black">Select Participant Type</p>
                        <p className={'mt-2.5 ' + COLORS.gray}>Employees earn rewards based on individual's/teams's performance</p>
                    </div>

                    {/* col 2 */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => {
                                setServey((prev) => ({
                                    ...prev,
                                    participantType: 'all',
                                }))
                            }}
                            className={
                                survey.participantType === 'all'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-10'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-10'
                            }
                        >
                            All
                        </button>
                        <button
                            onClick={() => {
                                setServey((prev) => ({
                                    ...prev,
                                    participantType: 'teams',
                                }))
                                clearIndividualParticipants();
                                clearGroupParticipants();
                            }}
                            className={
                                survey.participantType === 'teams'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-9'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-9'
                            }
                        >
                            teams
                        </button>
                        <button
                            onClick={() => {
                                setServey((prev) => ({
                                    ...prev,
                                    participantType: 'individual',
                                }))
                                clearGroupParticipants();
                                clearSelectedDepartments();
                            }}
                            className={
                                survey.participantType === 'individual'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-5'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-5'
                            }
                        >
                            Individual
                        </button>
                        <button
                            onClick={() => {
                                setServey((prev) => ({
                                    ...prev,
                                    participantType: 'groups',
                                }))
                                clearIndividualParticipants();
                                clearSelectedDepartments();
                            }}
                            className={
                                survey.participantType === 'groups'
                                    ? 'border border-[#5486E3] bg-[#5486E3] text-white rounded-md py-1 px-2'
                                    : 'border border-[#5486E3] text-[#5486E3] rounded-md py-1 px-2'
                            }
                        >
                            + Create Group
                        </button>
                    </div>
                </div>
            </div>

            {survey.participantType === 'teams' && (
                <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2">
                    <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
                        {/* col 1 */}
                        <div>
                            <p className="text-18px font-bold text-text-black">Select teams</p>
                        </div>

                        {/* col 2 */}
                        <div>
                            <select className="w-full p-2 border rounded"
                                onChange={(e) => {
                                    const selectedValues = Array.from(e.target.options)
                                        .filter((option) => option.selected)
                                        .map((option) => option.value);

                                    const currentSelectedDepartments = [...survey.teams];

                                    selectedValues.forEach((departmentId) => {
                                        if (currentSelectedDepartments.includes(departmentId)) {
                                            removeDepartment(departmentId);
                                        } else {
                                            addDepartment(departmentId);
                                        }
                                    });
                                }}
                                multiple
                                value={survey.teams}
                            >
                                {departments.data.map((department) => (
                                    <option key={department.id} value={department.id}>
                                        {department.name}
                                    </option>
                                ))}
                            </select>
                            {getError('teams') && (
                                <p className="text-sm text-red-500">
                                    <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                    {getError('teams')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {survey.participantType === 'individual' && (
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
                                    <RecipientsDropdown {...{ survey, setServey }} />
                                </ul>
                            </div>
                            {getError('individual') && (
                                <p className="text-sm text-red-500">
                                    <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                    {getError('individual')}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {survey.participantType == 'groups' &&
                survey.groups.map((group, index) => (
                    <div key={index} className="relative">

                        <div className="rounded-lg bg-white px-5 py-6 drop-shadow-md mt-2">
                            <button
                                className="absolute top-0 right-0 p-2 text-gray-500"
                                onClick={() => {
                                    const updatedGroups = survey.groups.filter((_, i) => i !== index);
                                    setServey((prev) => ({
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
                                    <p className="text-18px font-bold text-text-black">{`Group ${index + 1}`}</p>
                                </div>

                                {/* col 2 */}
                                <div>
                                    <input
                                        className="w-full py-2 px-2 my-4 rounded border-[2px]"
                                        type="text"
                                        onChange={(e) => {
                                            const updatedGroups = [...survey.groups];
                                            updatedGroups[index].label = e.target.value;
                                            setServey((prev) => ({
                                                ...prev,
                                                groups: updatedGroups,
                                            }));
                                        }}
                                        placeholder="Name the Group"
                                    />
                                    {getError('groupLabel') && survey.groups.length - 1 == index && (
                                        <p className="text-sm text-red-500">
                                            <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                            {getError('groupLabel')}
                                        </p>
                                    )}
                                    <div className={'rounded border-[2px] ring-primary focus-within:ring-1'}>
                                        <ul className="group p-2">
                                            <RecipientsDropdown {...{ survey, setServey }} groupIndex={index} />
                                        </ul>
                                    </div>
                                    {getError('groupParticipants') && survey.groups.length - 1 == index && (
                                        <p className="text-sm text-red-500">
                                            <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                                            {getError('groupParticipants')}
                                        </p>

                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                ))}
            {survey.participantType === 'groups' && (

                <>

                    <button className="text-primary mt-2 mx-4" onClick={addNewGroup}>
                        + Add new group
                    </button>
                    {getError('groups') && (
                        <p className="text-sm text-red-500">
                            <RiInformationLine className="inline align-text-bottom text-[1.1em] " />
                            {getError('groups')}
                        </p>

                    )}
                </>


            )}
        </div>
    )
}


export function RecipientsDropdown({ survey, setServey, groupIndex }) {

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

    const isSelectedIndividual = (user) => survey.individuals.includes(user.id);
    const isSelectedGroupParticipant = (user) => {
        const group = survey.groups?.[groupIndex];
        return group?.participants?.includes(user.id);
    };

    const excludedUsers = survey.participantType === 'individual'
        ? survey.individuals
        : survey.groups.reduce((acc, group, idx) => {
            if (idx !== groupIndex) {
                return acc.concat(group.participants);
            }
            return acc;
        }, []);


    const filteredSearchedUser = searchedUser.filter((user) => {
        return (
            !excludedUsers.includes(user.id) &&
            (survey.participantType === 'individual'
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
                {survey.participantType === "individual" &&
                    <span className="flex flex-wrap recipients-grid gap-2">
                        {survey.individuals.length > 0 ? (
                            survey.individuals.map((userId) => {
                                const user = usersWithoutMe.find((u) => u.id === userId);
                                return (
                                    <span key={userId} className="border-[2px] px-2 py-1 rounded-lg mx-1">
                                        {user ? (
                                            <span className=''>
                                                {user.full_name}{' '}
                                                <button
                                                    className="ml-1 text-black cursor-pointer"
                                                    onClick={() => {
                                                        setServey((prev) => {
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
                    </span>}
                {survey.participantType === "groups" &&
                    <span className="flex flex-wrap recipients-grid gap-2">
                        {survey.groups[groupIndex].participants.length > 0 ? (
                            survey.groups[groupIndex].participants.map((userId) => {
                                const user = usersWithoutMe.find((u) => u.id === userId);
                                return (
                                    <span key={userId} className="border-[2px] px-2 py-1 rounded-lg mx-1">
                                        {user ? (
                                            <span className="">
                                                {user.full_name}{" "}
                                                <button
                                                    className="ml-1 text-black cursor-pointer"
                                                    onClick={() => {
                                                        setServey((prev) => {
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
                                                if (survey.participantType === 'individual') {
                                                    setServey((prev) => {
                                                        if (isSelectedIndividual(user)) {
                                                            prev.individuals = prev.individuals.filter((id) => id !== user.id);
                                                        } else {
                                                            prev.individuals.push(user.id);
                                                        }
                                                        return { ...prev };
                                                    });
                                                } else if (survey.participantType === 'groups') {
                                                    setServey((prev) => {
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