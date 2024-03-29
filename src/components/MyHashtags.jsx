import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const MyHashtags = ({ filterBy, userId }) => {

  const [sortedHashtags, setSortedHashtags] = useState([]);
  const receivedTransactions = useQuery(
    'transactions',
    () => api.transactions.meAsRecipient(userId, filterBy),
    { enabled: false } // Disable the query by default and enable it manually
  );

  useEffect(() => {
    if (filterBy) {
      // Enable the query when sortBy prop is available
      receivedTransactions.refetch();
    }

    if (receivedTransactions.data) {
      // Calculate hashtag counts from received transactions and update state
      const hashtagCounts = receivedTransactions.data.reduce((counts, transaction) => {
        transaction.hashtags.forEach((hashtag) => {
          counts[`#${hashtag.name}`] = (counts[hashtag] || 0) + 1;
        });
        return counts;
      }, {});



      // Convert hashtag counts to an array of objects and sort them in descending order

      const sortedHashtags = Object.entries(hashtagCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count);

      setSortedHashtags(sortedHashtags);
    }

  }, [receivedTransactions.data, filterBy, userId]);

  return (

    <div>
      <div>
        <div className="border-[#CECECE] border-b-2 py-2 px-3">
          <p className="text-[20px] font-Lato font-bold text-[#292929] text-center ">My Hashtags</p>
        </div>

        {receivedTransactions.data &&
          receivedTransactions.data.length > 0 ?
          sortedHashtags?.map((hashtag, index) => (
            <div key={index}>
              <div className="px-6 py-3">
                <div className="flex justify-between">
                  <div className="text-[#00BC9F] text-[16px] font-Lato font-normal">{hashtag.name}</div>
                  <div className="font-semibold text-[14px] text-[#000000]">{hashtag.count}</div>
                </div>
              </div>
            </div>
          )) : <div className='text-center py-4'>No Hashtag's Received</div>
        }
      </div>
    </div>
  )
}

export default MyHashtags