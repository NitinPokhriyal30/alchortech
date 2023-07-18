import React, {useState} from 'react'

export const Analytics = () => {

  const [leaderboard, setleaderboard] = useState([
    {
        name: "Sunita Gulia",
        title: "Director",
        department: "Product development",
        hashtags: ["#One Team", "#Vision", "#Leadership"],
        points: 17
    },
    {
        name: "Lisa Clinton",
        title: "Director",
        department: "HR",
        hashtags: ["#Culture", "Collaboration", "#Vision"],
        points: 15
    },
    {
        name: "Cassie Conley",
        title: "HR Coordinator",
        department: "HR",
        hashtags: ["#Innovation", "#Vision", "#Leadership"],
        points: 14
    },
    {
        name: "Swarup Vuddagiri",
        title: "Sr Consultant",
        department: "Product development",
        hashtags: ["#Customer-service", "#Vision", "#Inclusive"],
        points: 12
    },
    {
        name: "Semad Javed",
        title: "Sr Manager",
        department: "User Experience",
        hashtags: ["#One Team", "#Vision", "#Quality"],
        points: 10
    },
    {
        name: "Pulkit Agrawal",
        title: "Manager",
        department: "Marketing",
        hashtags: ["#Innovation", "Customer-service", "#Leadership"],
        points: 9
    },
    {
        name: "Swarup Vuddagai",
        title: "Director",
        department: "Product development",
        hashtags: ["#Culture", "#Vision", "#Leadership"],
        points: 8
    },
    {
        name: "Lisa Clinton",
        title: "HR Coordinator",
        department: "HR",
        hashtags: ["#innovation", "Customer-service"],
        points: 5
    },
    {
        name: "Swarup Vuddagiri",
        title: "Consultant",
        department: "Product development",
        hashtags: ["#Innovation", "#Leadership"],
        points: 3
    },
    {
        name: "Rafael Merces",
        title: "Consultant",
        department: "Product development",
        hashtags: ["#Customer-service"],
        points: 1
    }
  ])

  return (
    <div>
      <div className='mt-3'>
        <button className='bg-[#5486E3] py-2 px-10 rounded-l-md'>Overall</button>
        <button className='bg-white py-2 px-8 rounded-r-md'>Your Team</button>
      </div>

      <div className='mt-2 bg-white flex flex-col'>
        <p>Leaderboard</p>
      </div>
    </div>
  )
}
