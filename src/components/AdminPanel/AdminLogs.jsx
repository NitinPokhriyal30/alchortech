import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import goBack from '../../assets/images/admin/chevron-left.svg';
import goNext from '../../assets/images/admin/chevron-right.svg';

const AdminLogs = () => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage]= React.useState(1);

  const { data: logs, isLoading, isError } = useQuery(
    ['logs', pageSize, page], 
    () => api.adminUsers.adminLogs({pageSize, page})
  );

    if (isLoading) {
      return <div><Loader /></div>;
    }
  
    if (isError) {
      return <div>Error loading logs</div>;
    }


    function formatRedeemDate(redeemDate) {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
    
      const date = new Date(redeemDate);
    
      const formattedDate = `${date.toLocaleDateString('en-US', options).replace(',', '')}`;
    
      return formattedDate;
    }
    

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const depart = 'Product Development';
  const loc = 'San Diego';


  return (
    <div>
      <div className="h-screen w-screen md:w-full">
        <div className="my-4 flex px-[25px]">
          <div className="font-Lato  text-[20px] font-bold text-[#464646]">
            Logs
          </div>
        </div>

        <div className="mx-[25px]  mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
          <div className="flex px-6 py-4">
          <div className=" p-2 w-[90%] grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-5">
          <div className="flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] text-[14px] outline-1 outline-primary-400 focus-within:outline">
            <BsSearch  className="text-[20px]"/>
            <input className="ml-1.5 w-full border-none py-2 font-semibold leading-none outline-none placeholder:text-inherit text-[#A5A5A5]"  placeholder="Search Here"  />
          </div>

          <div className="flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" >
                <option value="">Date Range</option>
                  <option value={depart} key={depart}>
                    {depart}
                  </option>
            </select>
          </div>

          <div className="flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
          <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" >
              <option value="">Browser</option>
                <option value={depart} key={depart}>
                  {depart}
                </option>
          </select>
          </div>

          <div className="flex z-0 bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <select className="w-full border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit">
                <option value="">Location</option>
                
                  <option value={loc} key={loc}>
                    {loc}
                  </option>
            </select>
          </div>

          <div className="flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
          <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" >
              <option value="">Login Result</option>
                <option value={depart} key={depart}>
                  {depart}
                </option>
          </select>
          </div>

          
        </div>

        <div className="flex items-center px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
            <span className="border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit text-[14px] text-primary" >Clear Filter</span>
        </div>

          </div>
          <table className="z-0 w-full  min-w-[550px] whitespace-nowrap">
            <thead>
              <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
                <th></th>
                <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-3/12">
                  Name
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                 Login Date & Time
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                 Ip Address
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-1/12">
                  Platform
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Browser
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-1/12">
                  Location
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Login Result
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {logs.data.map((log, index) => (
                <React.Fragment key={log.user.id}>
                  <tr
                    onClick={() => toggleRow(index)}
                    className="group rounded-xl  cursor-pointer border-[#cecece] hover:bg-[#ececec]"
                  >
                    <td className="border-b-0 py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px]"></td>
                    <td className="border-b cursor-pointer py-3 text-left">
                      <span className="text-[16px] font-bold">{log.user.full_name}</span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {formatRedeemDate(log.timestamp)}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {log.ip}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {log.device}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {log.browser}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      <span> {log.user.location}</span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      <span> {log.success ? <p className="text-[#00BC9F]">Successful</p> : <p className="text-[#E89019]">Failed</p>}</span>
                    </td>
                    <td className="border-b py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]">
                      {expandedRow === index ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </td>
                    <td className="border-b-0 py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]"></td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="expanded-row">
                      <td colSpan="10">
                        <div className="border-b border-[#cecece] drop-shadow-lg px-4 pb-4">
                          <div className="rounded-md bg-[#EDEDED] p-4">
                            <span className="text-[14px] text-[#747474]">
                              <p className="pb-4">User Details</p>
                            </span>
                            <div className="flex flex-wrap gap-2 w-full pb-4 items-center">
                              <div className="w-[20%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  User Name
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.user.full_name}
                                </span>
                              </div>
                              <div className="w-[20%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  Country
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.user.country}
                                </span>
                              </div>
                              <div className="w-[20%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  Location
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                {log.user.location}
                                </span>
                              </div>
                              <div className="w-[30%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  Email ID
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.user.email}
                                </span>
                              </div>
                              <div className="w-[20%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  Employee ID
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.user.employee_id}
                                </span>
                              </div>
                            </div>

      

                            <span className="text-[14px] text-[#747474]">
                              <p className="pb-4">System Log Details</p>
                            </span>

                            <div className="flex gap-2 flex-wrap pb-4 items-center">
                              <div className="w-[30%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  Login Date & Time
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {formatRedeemDate(log.timestamp)}
                                </span>
                              </div>
                              <div className="w-[20%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  IP Addresses
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.ip_adderess}
                                </span>
                              </div>

                              <div className="w-[40%]">
                                <p className="text-[13px] text-[#ACACAC]">
                                  Platform
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.user_agent}
                                </span>
                              </div>

                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Browser
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.browser}
                                </span>
                              </div>

                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Login Result
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {log.browser}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          <div className='w-full py-6 px-14 flex items-center gap-10 justify-end font-semibold text-[12px] text-[#747474]'>
          <div className=''>
            <span>Rows per Page: </span>
            <span>{pageSize}</span>
          </div>
          <div>
            <span>{page} of {logs.total_pages}</span>
          </div>
          <div className='flex'>
            <span className='cursor-pointer'><img onClick={() => setPage(Math.max(1, page - 1))}  src={goBack}/></span>
            <span className='cursor-pointer'><img onClick={() => setPage(Math.min(Math.ceil(logs.count / pageSize), page + 1))} src={goNext}/></span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogs;
