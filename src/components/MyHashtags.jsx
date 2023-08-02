import React, {useState, useEffect} from 'react';
import { api } from '@/api';
import { useQuery } from 'react-query';
import Cookies from 'js-cookie';

const MyHashtags = ({sortBy, userId}) => {

  const [sortedHashtags, setSortedHashtags] = useState([]);

  const receivedTransactions = useQuery(
    'transactions',
    () => api.transactions.meAsRecipient(userId, sortBy),
    { enabled: false } // Disable the query by default and enable it manually
  );

  useEffect(() => {
    if (sortBy) {
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
  }, [receivedTransactions.data, sortBy, userId]);
  
  return (
    <div>
      <div>
        <div className="border-[#CECECE] border-b-2 py-2 px-3">
          <p className="text-[20px] font-Lato font-bold text-[#292929] text-center ">My Hashtags</p>
        </div>
        {receivedTransactions.data &&
          receivedTransactions.data.length > 0 ?
          sortedHashtags.map((hashtag, index) => (
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





// import React, { useState, useEffect } from 'react';
// import { api } from '@/api';
// import { useQuery } from 'react-query';

// const UserInteraction = ({ sortBy, userId }) => {
//   const [interactionData, setInteractionData] = useState([]);

//   const receivedTransactions = useQuery(
//     'transactions',
//     () => api.transactions.meAsRecipient(userId, sortBy),
//     { enabled: false } // Disable the query by default and enable it manually
//   );

//   const givenTransactions = useQuery(
//     'transactions',
//     () => api.transactions.meAsSender(userId, sortBy),
//     { enabled: false } // Disable the query by default and enable it manually
//   );

//   useEffect(() => {
//     if (sortBy) {
//       // Enable the queries when sortBy prop is available
//       receivedTransactions.refetch();
//       givenTransactions.refetch();
//     }

//     if (receivedTransactions.data && givenTransactions.data) {
      
//       const senderCounts = receivedTransactions.data.reduce((counts, transaction) => {
        
//         const senderId = transaction.sender.id;
//         counts[senderId] = counts[senderId] ? { ...counts[senderId], given: counts[senderId].given + 1 } : { received: 0, given: 1 };
//         console.log(counts)
//         return counts;
//       }, {});

//       // Calculate sender counts from given transactions and update state
//       const recipientCounts = givenTransactions.data.reduce((counts, transaction) => {
//         transaction.recipients.forEach((recipient) => {
//             const recipientId = recipient.id;
//             counts[recipientId] = counts[recipientId] ? { ...counts[recipientId], received: counts[recipientId].received + 1 } : { received: 1, given: 0 };
//           });
//           console.log(counts)
//           return counts;        
//       }, {});

//       // Combine the recipientCounts and senderCounts dictionaries to get the final interaction data
//       const mergedData = {};
//       for (const [recipientId, { received }] of Object.entries(recipientCounts)) {
//         if (!mergedData[recipientId]) {
//           mergedData[recipientId] = { name: getRecipientFullName(recipientId, receivedTransactions.data), received: received, given: 0 };
//         } else {
//           mergedData[recipientId].received = received;
//         }
//       }

//       for (const [senderId, { given }] of Object.entries(senderCounts)) {
//         if (!mergedData[senderId]) {
//           mergedData[senderId] = { name: getSenderFullName(senderId, givenTransactions.data), received: 0, given: given };
//         } else {
//           mergedData[senderId].given = given;
//         }
//       }

//       // Convert the mergedData object to an array of objects and sort them by total interaction
//       const sortedData = Object.values(mergedData).sort((a, b) => (b.received + b.given) - (a.received + a.given));

//       setInteractionData(sortedData);
//     }
//   }, [receivedTransactions.data, givenTransactions.data, sortBy, userId]);

//   const getRecipientFullName = (recipientId, transactions) => {
//     const transaction = transactions.find((transaction) =>
//       transaction.recipients.some((recipient) => recipient.id === recipientId)
//     );
//     if (transaction) {
//       const recipient = transaction.recipients.find((recipient) => recipient.id === recipientId);
//       return `${recipient.first_name} ${recipient.last_name}`;
//     }
//     return 'Unknown';
//   };

//   const getSenderFullName = (senderId, transactions) => {
//     const transaction = transactions.find((transaction) => transaction.sender.id === senderId);
//     if (transaction) {
//       const sender = transaction.sender;
//       return `${sender.first_name} ${sender.last_name}`;
//     }
//     return 'Unknown';
//   };

//   return (
//     <div>
//       <div>
//         {interactionData.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="border-collapse">
//               <thead>
//                 <tr>
//                  <th className="pb-4 text-start pl-4 text-[16px] text-[#000000] font-Lato font-bold">Name</th>
//                  <th className="pb-4 px-6 text-[#27C4A0]">Received</th>
//                  <th className="pb-4 px-6 text-[#2BBFE2]">Given</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {interactionData.map((interaction, index) => (
//                   <tr key={index} className="hover:bg-[#ececec] rounded-xl">
//                     <td className="p-4 text-[#5486E3] font-semibold text-[16px]">{interaction.name}</td>
//                     <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">{interaction.received}</td>
//                     <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">{interaction.given}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="text-center py-4">No Interaction Data Found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserInteraction;
