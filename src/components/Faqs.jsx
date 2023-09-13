import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { api } from '../api'
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai'
import {BsSearch} from 'react-icons/bs'

const Faqs = () => {

 const [category, setCategory] = useState("Rewards & Redemptions");
 const [expandedQuestion, setExpandedQuestion] = useState(null);

 const { data: list } = useQuery('list', api.faqs.list);
 const { data: categories } = useQuery('categories', api.faqs.categories);


 const handleQuestionClick = (index) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div>

      <div className='flex items-center pl-20 mx-3 py-5 my-3 bg-[#00BC9F] rounded-xl'>
        <p className='text-white text-[18px] font-bold'>Help Center</p>
        
        <div className="mx-auto w-[53%] bg-white p-2 flex items-center rounded-xl text-[#acacac]">
          <BsSearch  />
          <input
            type="search"
            className="xs:w-70 sm:w-96 md:w-[22rem] lg:w-96 xl:w-96 xxl:w-96 pl-[10px] pr-2 font-Lato text-[16px] placeholder:font-Lato placeholder:text-[16px] placeholder:text-[#ACACAC] focus:outline-none "
            placeholder="Ask your question or enter keyword"
            />
        </div>
      </div>

     

      <div className='flex flex-col md:flex-row pl-20 py-12 mx-3 bg-white rounded-xl drop-shadow-md'>
        <div className='flex flex-col gap-4'>
          <p className='font-bold text-[18px] text-[#000000]'>Help Topics</p>
          {categories && (            
            <ul>
            {categories.map((item) => (
            <div>
              <div 
                 key={item.id}
                 className={`font-600 cursor-pointer py-3 ${category === item.category ? 'text-[#5486E3] font-bold' : 'text-black'}`}
                 onClick={() => setCategory(item.category)}
              >
                 {item.category}
              </div>
              </div>
            ))}
          </ul>
            
          )}
        </div>

        <div className='mx-auto w-[60%] gap-4 flex flex-col'>
           <p className='font-bold text-[18px] text-[#000000]'>{category}</p>
           {list && (
            <ul>
              {list.map((item, index) => (
                <li 
                   key={item.id}
                   className='font-600 text-[16px] border-b-[1px] cursor-pointer py-3'
                   onClick={() => handleQuestionClick(index)}
                   >
                   
                    <div className='flex justify-between'>
                        <p className={`${expandedQuestion === index ? 'text-[#5486E3] font-bold' : 'text-[#000000]'}`}>{item.question}</p>
                        <span>{expandedQuestion === index ? <AiOutlineUp /> : <AiOutlineDown />}</span>
                    </div>
                    
                    {expandedQuestion === index && <div className='text-[#5D5D5D] text-[14px] font-medium pt-4'>{item.answer}</div>}
                </li>
              ))}
            </ul>)}
         </div>   
      </div>

    </div>
  )
}

export default Faqs