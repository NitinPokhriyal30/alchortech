import React, {useState} from 'react'

const MyHashtags = () => {

  const [myHashtags, setMyHashtags] = useState([
    {
        name: '#quality',
        count: 76
    },
    {
        name: '#alcorplay',
        count: 68
    },
    {
        name: '#innovation',
        count: 59
    },
    {
        name: '#oneteam',
        count: 43
    },
    {
        name: '#collaboration',
        count: 34
    },
    {
        name: '#vision',
        count: 28
    },
    {
        name: '#leadership',
        count: 28
    }
  ]) 

  return (
    <div>
      <div className="right-sidebar-container">
        <div className=" border-[#CECECE] border-b-2 py-2 px-3">
          <p className="text-[20px] font-Lato font-bold text-[#292929] text-center ">
            My Hashtags
          </p>
        </div>
             {myHashtags.map((hashtag, index) => (
                <div key={index}>
                   <div className="px-4 py-3 ">
                         <div className="flex justify-between">
                           <div className='text-[#00BC9F] text-[16px] font-Lato font-normal'>{`${hashtag.name}`}</div>
                           <div className='font-semibold text-[14px] text-[#000000]'>{`${hashtag.count}`}</div>
                         </div>
                    </div>
                </div>
            ))}  
        </div>
    </div>
  )
}

export default MyHashtags