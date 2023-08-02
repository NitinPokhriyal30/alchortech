import React, { useState, useEffect } from 'react';
import { api } from '@/api';
import { useQuery } from 'react-query';
import InteractionChart from './InteractionChart'

const UserInteraction = ({ sortBy, userId }) => {
  const [sortedSenders, setSortedSenders] = useState([]);
  const [sortedRecipients, setSortedRecipients] = useState([]);
  const [interactionData, setInteractionData] = useState([]);

  const meQuery = useQuery('me', () => api.auth.user(userId));
  const me = meQuery.data;

  const receivedTransactions = useQuery(
    'receivedTransactions',
    () => api.transactions.meAsRecipient(userId, sortBy),
    { enabled: false } // Disable the query by default and enable it manually
  );

  const givenTransactions = useQuery(
    'givenTransactions',
    () => api.transactions.meAsSender(userId, sortBy),
    { enabled: false } // Disable the query by default and enable it manually
  );

  useEffect(() => {
    if (sortBy) {
      // Enable the queries when sortBy prop is available
      receivedTransactions.refetch();
      givenTransactions.refetch();
    }

    if (receivedTransactions.data) {
      // Calculate sender counts from received transactions and update state
      const senderCounts = receivedTransactions.data.reduce((counts, transaction) => {
        const senderId = transaction.sender.id;
        counts[senderId] = (counts[senderId] || 0) + 1;
        return counts;
      }, {});

      const sortedSenders = Object.entries(senderCounts)
        .map(([id, count]) => ({
          id,
          count,
          name: `${receivedTransactions.data.find((transaction) => transaction.sender.id === id).sender.first_name} ${receivedTransactions.data.find((transaction) => transaction.sender.id === id).sender.last_name}`,
          avtar: receivedTransactions.data.find((transaction) => transaction.sender.id === id).sender.avtar

        }))
        .sort((a, b) => b.count - a.count);

      setSortedSenders(sortedSenders);
    }
  }, [receivedTransactions.data, sortBy, userId]);

  useEffect(() => {
    if (sortBy) {
      // Enable the query when sortBy prop is available
      givenTransactions.refetch();
    }

    if (givenTransactions.data) {
      const recipientCounts = givenTransactions.data.reduce((counts, transaction) => {
        transaction.recipients.forEach((recipient) => {
          const recipientId = recipient.id;
          counts[recipientId] = (counts[recipientId] || 0) + 1;
        });

        return counts;
      }, {});

      const sortedRecipients = Object.entries(recipientCounts)
        .map(([id, count]) => {
          // Find the recipient's name using the ID from givenTransactions.data
          const recipient = givenTransactions.data.find((transaction) =>
            transaction.recipients.some((r) => r.id === id)
          );
          const name = recipient
            ? `${recipient.recipients.find((r) => r.id === id).first_name} ${recipient.recipients.find((r) => r.id === id).last_name}`
            : 'Unknown';
          const avtar = recipient.recipients.find((r) => r.id === id).avtar

          return {
            id,
            count,
            name,
            avtar
          };
        })
        .sort((a, b) => b.count - a.count);

      setSortedRecipients(sortedRecipients);
    }
  }, [givenTransactions.data, sortBy, userId]);

  useEffect(() => {
    // Combine the sender and recipient data into mergedData
    const mergedData = {};

    // Add sender interactions to mergedData
    sortedSenders.forEach(({ id, count, name, avtar }) => {
      const recipientCount = sortedRecipients.find((recipient) => recipient.id === id)?.count || 0;
      mergedData[id] = {
        name,
        received: count,
        given: recipientCount,
        avtar
      };
    });

    // Add recipient interactions to mergedData if not already added
    sortedRecipients.forEach(({ id, count, name, avtar }) => {
      if (!mergedData[id]) {
        mergedData[id] = {
          name,
          received: 0,
          given: count,
          avtar
        };
      }
    });

    // Convert the mergedData object to an array of objects and sort them by the total sum of interactions
    const sortedData = Object.values(mergedData).sort((a, b) => b.received + b.given - (a.received + a.given));

    setInteractionData(sortedData);
  }, [sortedSenders, sortedRecipients]);

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:justify-center">
    <div className="hidden md:block w-2/5 text-center py-4 border-r-2">
        <p className="text-[16px] text-[#000000] font-Lato font-bold">{`${me.first_name}'s Interaction`}</p>
        <div><InteractionChart interactionData={interactionData} myAvatar={me.avtar}/></div>
    </div>
        <div className="w-3/5 py-4 flex justify-center">
        <div>
        {interactionData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="border-collapse">
              <thead>
                <tr>
                  <th className="pb-4 text-start pl-4 text-[16px] text-[#000000] font-Lato font-bold">Name</th>
                  <th className="pb-4 px-6 text-[#27C4A0]">Received</th>
                  <th className="pb-4 px-6 text-[#2BBFE2]">Given</th>
                </tr>
              </thead>
              <tbody>
                {interactionData.map((interaction, index) => (
                  <tr key={index} className="hover:bg-[#ececec] rounded-xl">
                    <td className="p-4 text-[#5486E3] font-semibold text-[16px]">{interaction.name}</td>
                    <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal">{interaction.received}</td>
                    <td className="p-4 text-center text-[16px] text-[#000000] font-Lato font-normal md:pl-6">{interaction.given}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-4">No Interaction Data Found</div>
        )}
      </div>
    </div>
   
    </div>
  );
};

export default UserInteraction;
