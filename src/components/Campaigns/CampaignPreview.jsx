import * as React from 'react';
import { Link } from 'react-router-dom';
import calenderIcon from '../../assets/images/campaigns/calenderIcon.svg'
import goBack from '../../assets/images/campaigns/goBack.svg'
import time from '../../assets/images/campaigns/time.svg'
import { api } from '@/api';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';
import { AiOutlineClose } from 'react-icons/ai'
import { toast } from 'react-toastify';


const CampaignPreview = () => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const campaignId = queryParams.get('campaignId');
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);
    const [attachment, setAttachment] = React.useState();
    const [comment, setComment] = React.useState();

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const { data: campaign, isLoading, isError } = useQuery(['campaignDetails', campaignId], () => api.campaigns.campaignDetails(campaignId));

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error fetching campaign details</div>;
    }

    const handleParticipation = async () => {
        try {
            const formData = {
                attachment: attachment,
                comment: comment
            }
            const response = await api.campaigns.participate(formData, campaignId)
            toast.success(response.message)
            closeDialog()
        } catch (error) {
            console.log("Error participating:", error);
        }
    }

    return (

        <div>
            <div className='flex flex-col md:flex-row gap-3 mb-4'>
                <div className='w-[72%] ml-2 flex flex-col bg-white p-3 mt-3 rounded-lg drop-shadow-md'>
                    <Link to='/campaigns' className='flex items-center gap-2 ml-2 text-[12px] text-[#A5A5A5]'>
                        <p><img src={goBack} /></p>
                        Go Back
                    </Link>
                    <div className=' p-2'>
                        <img className='h-[350px] w-full' src={processAvatarUrl(campaign.cover_image)} />
                    </div>

                    <div className='flex justify-between p-4 mt-1'>
                        <div>
                            <p className='text-[26px] font-bold font-Lato text-[#292929]'>{campaign.campaignName}</p>
                            <p className='text-[14px] font-black font-lato text-[#00BC9F]'>Ends in 7 days</p>
                        </div>
                        <div>
                            <button
                                type="button"
                                onClick={openDialog}
                                className="bg-primary text-white hover:text-black py-2 px-8 rounded-md">Participate</button>
                            <p className='text-[14px] text-center  font-lato text-[#00BC9F]'>Earn 20 points</p>
                        </div>

                    </div>

                    <div className='bg-[#F7F7F7] p-4 rounded-lg'>
                        <div className='flex gap-4'>
                            <p className='text-[16px] font-black text-[#292929]'>Event Date:</p>
                            {campaign.event_date &&
                                <div className='flex gap-4'>
                                    <img src={calenderIcon} />
                                    <span>{campaign.event_date}</span>
                                    <img src={time} />
                                    <span></span>
                                </div>
                            }

                        </div>
                        <div className='flex gap-4'>
                            <p className='text-[16px] font-black text-[#292929]'>Location:</p>
                            <a href='https://xd.adobe.com/view/6d0534cf-91a0-4d01-b03a-6f18095741e8-3856/screen/c2ccea1b-e3ad-4cd4-8d61-c53e0ee8bb2f/specs/'></a>
                        </div>
                    </div>

                    <div className='p-4 pt-7'>
                        <p className='text-[16px] font-black text-[#292929]'>Description</p>
                        <div className='pt-2' dangerouslySetInnerHTML={{ __html: campaign.description }} />
                    </div>

                    <div className='p-4 pt-7'>
                        <p className='text-[16px] font-black text-[#292929]'>Terms & Conditions</p>
                        <div dangerouslySetInnerHTML={{ __html: campaign.terms_and_conditions }} />
                    </div>

                </div>


                <div className='w-1/4 mt-3 flex flex-col gap-3'>
                    <div className='bg-white rounded-lg drop-shadow-md'>
                        <p className='text-center py-2 border-b-[1px]'>Campaign Owner</p>
                        <div className='flex gap-4 p-4'>
                            <img className="w-[74px] h-[74px] rounded-full object-cover"
                                src={getAvatarAttributes(`${campaign.owner?.full_name.split(' ')[0]} ${campaign.owner?.full_name.split(' ')[1]}`, processAvatarUrl(campaign.owner?.avtar)).src}
                                alt={getAvatarAttributes(`${campaign.owner?.full_name.split(' ')[0]} ${campaign.owner?.full_name.split(' ')[1]}`, processAvatarUrl(campaign.owner?.avtar)).alt}
                                onError={(e) => {
                                    // If the image fails to load, use the full_name initials instead
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        campaign.owner?.full_name.split(' ')[0].charAt(0) + campaign.owner?.full_name.split(' ')[1].charAt(0)
                                    )}&color=${"#464646"}&background=${"FFFFFF"}`;
                                }}
                            />
                            <div>
                                <p className='font-bold font-Lato text-[16px] text-[#5486E3]'>{campaign.owner.full_name}</p>
                                <p className='text-[#292929]'>{campaign.owner.title}</p>
                                <p className='text-[#292929]'>{campaign.owner.department}</p>

                                <p className='text-[#5486E3] text-[12px] underline pt-4'>Ask a Question</p>
                            </div>
                        </div>
                    </div>

                    <div className='bg-white rounded-lg drop-shadow-md'>
                        <p className='text-center py-2 border-b-[1px]'> Participants</p>
                        {campaign.participants.map((participant, index) => (
                            <div className='flex items-center gap-4 pt-4' key={index}>
                                <div className='h-14 w-14 ml-4'>
                                    <img
                                        className="h-full w-full rounded-full"
                                        src={getAvatarAttributes(`${participant.full_name.split(' ')[0]} ${participant.full_name.split(' ')[1]}`, processAvatarUrl(participant.avtar)).src}
                                        alt={getAvatarAttributes(`${participant.full_name.split(' ')[0]} ${participant.full_name.split(' ')[1]}`, processAvatarUrl(participant.avtar)).alt}
                                        onError={(e) => {
                                            // If the image fails to load, use the full_name initials instead
                                            e.target.onerror = null;
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                participant.full_name.split(' ')[0].charAt(0) + participant.full_name.split(' ')[1].charAt(0)
                                            )}&color=${"#464646"}&background=${"FFFFFF"}`;
                                        }}
                                    />
                                </div>
                                <div>
                                    <p className='font-bold font-Lato text-[16px] text-[#5486E3]'>{participant.full_name}</p>
                                    <p className='text-[#292929] text-[12px]'>{participant.title} | {participant.department}</p>
                                    <div>
                                        {/* Additional participant details */}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='flex justify-center py-2'>
                            <button className='text-primary text-[14px] font-bold font-Lato'>View All</button>
                        </div>
                    </div>
                </div>
            </div>
            {isDialogOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-400 bg-opacity-30">
                    <div className="bg-white p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                            <h2 className="text-[24px] mx-auto font-bold mb-4">{campaign.name}</h2>
                            <button onClick={closeDialog} className="mb-10 text-gray-400">{<AiOutlineClose />}</button>
                        </div>
                        <div className="mb-4">
                            <label className="flex flex-col justify-center items-center border-dashed border-2 border-gray-300 bg-gray-200 rounded-md px-36 mx-20 py-24">
                                <div className="flex flex-col cursor-pointer">
                                    <input
                                        id="attachment"
                                        onChange={(e) => { setAttachment(e.target.files[0]) }}
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <label htmlFor="attachment" className="bg-[#5486E3] py-1 px-6 text-white rounded-md cursor-pointer">
                                        Upload
                                    </label>
                                    <span className="text-gray-500 text-[12px] pt-2">
                                        Jpg, Png, Doc, Pdf
                                    </span>
                                </div>
                            </label>
                        </div>
                        <div className="mb-4 px-20">
                            <label htmlFor="textInput" className="block font-bold text-gray-800">Put your thoughts here</label>
                            <input
                                type="text"
                                onChange={(e) => { setComment(e.target.value) }}
                                placeholder="We would like to hear about the photo"
                                className="border border-gray-300 p-2 pb-10 text-[14px] rounded-lg w-full mt-2"
                            />
                        </div>
                        <div className="flex justify-end px-20">
                            <button
                                type="button"
                                className="bg-primary text-white hover:text-black py-1 px-6 rounded-md"
                                onClick={handleParticipation}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default CampaignPreview;

















  