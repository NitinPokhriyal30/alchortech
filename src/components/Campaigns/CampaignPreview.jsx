import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import campaignCover from '../../assets/images/campaigns/campaignCover.png'
import calenderIcon from '../../assets/images/campaigns/calenderIcon.svg'
import goBack from '../../assets/images/campaigns/goBack.svg'
import participant from '../../assets/images/campaigns/participant.png'
import time from '../../assets/images/campaigns/time.svg'
import { api } from '@/api';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';
import { getAvatarAttributes, processAvatarUrl } from '@/utils';


const CampaignPreview = () => {
    const location = useLocation();
    const { campaignData } = location.state;

    const meQuery = useQuery('me', () => api.users.userById('user_id'));
    const me = meQuery.data;

    React.useEffect(() => {
      
    console.log(campaignData);
      
    }, [])
    
    // Now you can use the campaignData in your CampaignPreview component
    return (
        
        <div>
            <div className='flex flex-col md:flex-row gap-3 mb-4'>
                <div className='w-[72%] ml-2 flex flex-col bg-white p-3 mt-3 rounded-lg drop-shadow-md'>
                <Link to='/campaign/create' className='flex items-center gap-2 ml-2 text-[12px] text-[#A5A5A5]'>
                  <p><img src={goBack} /></p>
                  Go Back
                </Link>
                
                <div className=' p-2'>
                <img className='h-[350px] w-full' src={campaignData.coverImage} />
                </div>
                
                <div className='flex justify-between p-4 mt-1'>
                <div>
                    <p className='text-[26px] font-bold font-Lato text-[#292929]'>{campaignData.campaignName}</p>
                    <p className='text-[14px] font-black font-lato text-[#00BC9F]'>Ends in 7 days</p>
                </div>
                <div>
                    <button  
                    type="button"
                    className="bg-primary text-white hover:text-black py-2 px-8 rounded-md">Participate</button>
                    <p className='text-[14px] text-center  font-lato text-[#00BC9F]'>Earn 20 points</p>
                </div>
                </div>

                <div className='bg-[#F7F7F7] p-4 rounded-lg'>
                <div className='flex gap-4'>
                    <p className='text-[16px] font-black text-[#292929]'>Event Date:</p>
                    <img src={calenderIcon} />
                    <span>Wed, 04 Aug, 2023</span>
                    <img src={time} />
                    <span>10 am PST</span>

                </div>
                <div className='flex gap-4'>
                    <p className='text-[16px] font-black text-[#292929]'>Location:</p>
                    <a href='https://xd.adobe.com/view/6d0534cf-91a0-4d01-b03a-6f18095741e8-3856/screen/c2ccea1b-e3ad-4cd4-8d61-c53e0ee8bb2f/specs/'></a>
                </div>
                </div>

                <div className='p-4 pt-7'>
                <p className='text-[16px] font-black text-[#292929]'>Description</p>
               
                <div className='pt-2' dangerouslySetInnerHTML={{ __html: campaignData.description }} />
               
                </div>

                <div  className='p-4 pt-7'>
                <p className='text-[16px] font-black text-[#292929]'>Terms & Conditions</p>
                <div dangerouslySetInnerHTML={{ __html: campaignData.termsAndConditions }} />

                </div>
            
            </div>


            <div className='w-1/4 mt-3 flex flex-col gap-3'>
                <div className='bg-white rounded-lg drop-shadow-md'>
                    <p className='text-center py-2 border-b-[1px]'>Campaign Owner</p>
                    <div className='flex gap-4 p-4'>
                    <img className="w-[74px] h-[74px] rounded-full object-cover"
                        src={getAvatarAttributes(`${me?.full_name.split(' ')[0]} ${me?.full_name.split(' ')[1]}`, processAvatarUrl(me?.avtar)).src}
                        alt={getAvatarAttributes(`${me?.full_name.split(' ')[0]} ${me?.full_name.split(' ')[1]}`, processAvatarUrl(me?.avtar)).alt}
                        onError={(e) => {
                            // If the image fails to load, use the full_name initials instead
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            me?.full_name.split(' ')[0].charAt(0) + me?.full_name.split(' ')[1].charAt(0)
                            )}&color=${"#464646"}&background=${"FFFFFF"}`;
                        }}
                    />
                    <div>
                        <p className='font-bold font-Lato text-[16px] text-[#5486E3]'>{me.full_name}</p>
                        <p className='text-[#292929]'>{me.title}</p>
                        <p className='text-[#292929]'>{me.department}</p>

                        <p className='text-[#5486E3] text-[12px] underline pt-4'>Ask a Question</p>
                    </div>
                    </div>
                </div>

                <div className='bg-white rounded-lg drop-shadow-md'>
                    <p className='text-center py-2 border-b-[1px]'> Participants</p>
                    <div className='flex items-center gap-4 p-4'>
                        <img className='h-14 rounded-full' src={participant} />
                        <div>
                            <p className='font-bold font-Lato text-[16px] text-[#5486E3]'>Cassie Conley</p>
                            <p className='text-[#292929] text-[12px]'>HR Cooridnator | Shared Services</p>

                            <div>
                           
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center py-2'>
                     <button className='text-primary text-[14px] font-bold font-Lato'>View All</button>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default CampaignPreview;
