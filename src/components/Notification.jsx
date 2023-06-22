import React from 'react'
import NotificationBell from '../assets/images/navbar/notinfication.png'

const Notification = () => {
    return (
        <div>

            <li className="font-sans block  xxl:mt-2 xl:mt-2 lg:mt-2 md:mt-0 sm:mt-0 xs:mt-0  lg:inline-block  lg:ml-6 align-middle text-black hover:text-gray-700">
                <a href="#" role="button" className="relative flex">
                    <img className='w-[85%]' src={NotificationBell} alt="Notification Bell" />
                    <span className="absolute right-2 top-2 rounded-full bg-[#E55E5E] w-3 h-3 top right p-0 m-0 text-white font-mono text-[10px]  leading-tight text-center">
                        5
                    </span>
                </a>
            </li>

        </div>
    )
}

export default Notification