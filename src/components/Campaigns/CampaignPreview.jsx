import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';

const CampaignPreview = () => {
    const location = useLocation();
    const { campaignData } = location.state;

    React.useEffect(() => {
      
    console.log(campaignData);
      
    }, [])
    
    // Now you can use the campaignData in your CampaignPreview component
    return (
        
        <div>
            <div className='flex flex-col bg-white'>
              <Link>Go Back</Link>
              <div>
               <img src='' />
              </div>
            </div>
        </div>
    );
};

export default CampaignPreview;
