import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import {toast} from 'react-toastify'
import goBack from '../../assets/images/admin/chevron-left.svg';
import goNext from '../../assets/images/admin/chevron-right.svg';

const AvailableVouchers = () => {
  const [tab, setTab] = React.useState("pending");
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage]= React.useState(1);


  const { data: approvals, isLoading, isError } = useQuery(
    ['approvals', tab], 
    () => api.adminUsers.approvals({tab})
  );

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isError) {
    return <div>Error loading approvals</div>;
  }

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const depart = "Product Development";
  const loc = "San Diego";

  const handleApproveRequest = async (id) => {
    const formData = new FormData();
    formData.append('requestId', id)
    try {
      await api.adminUsers.approveRewards({formData});
      toast.success('Request Approved!');
    } catch (error) {
      console.error('Error approving request:', error);
    }
  }


  return (
    <div>
      <div className="md:w-full mb-16">
        <div className="my-4 flex px-[25px]">
          <div className="font-Lato  text-[20px] font-bold text-[#464646]">
            Approvals
          </div>
        </div>

        <div className="z-0 mt-4 flex flex-col justify-between gap-y-4 px-[25px] md:flex-row md:justify-between">
          <div className="flex justify-around md:justify-start md:gap-6">
            <button
              className={
                "flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] " +
                (tab === "pending" && "!border-primary  text-primary")
              }
              onClick={() => setTab("pending")}
            >
              Pending
            </button>
            <button
              className={
                "flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] " +
                (tab === "approved" && "!border-primary  text-primary")
              }
              onClick={() => setTab("approved")}
            >
              Approved
            </button>
            <button
              className={
                "flex items-center gap-2 border-b-2 border-b-transparent text-[14px] text-[#8D8D8D] " +
                (tab === "rejected" && "!border-primary  text-primary")
              }
              onClick={() => setTab("rejected")}
            >
              Rejected
            </button>
          </div>
          <div className="flex items-center gap-2">
           <span className="text-[14px] text-[#8D8D8D] font-bold">Sort By:</span>
           <p className="text-[14px] text-[#8D8D8D]">All</p>
          </div>
        </div>

        <div className="mb-1 px-[25px]">
          <div className="h-[1px] w-full bg-[#cecece]"></div>
        </div>

        {approvals.length < 1 ? 
         <div className="bg-white flex py-4 justify-center drop-shadow-md rounded-lg mt-2 mx-6">
           <span className="text-red-500 font-bold">No Record Available!</span>
         </div> :
         <div className="mx-[25px]  mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
          <div className="flex px-6 py-4">
            <div className=" grid w-[90%] grid-cols-1 gap-2 p-2 sm:grid-cols-2 md:grid-cols-5">
              <div className="flex items-center rounded border border-400 bg-[#fff] px-3 text-[14px] text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <BsSearch className="text-[20px]" />
                <input
                  className="ml-1.5 w-full border-none py-2 font-semibold leading-none text-[#A5A5A5] outline-none placeholder:text-inherit"
                  placeholder="Search Here"
                />
              </div>

              <div className="flex items-center rounded border border-400 bg-[#fff] px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit">
                  <option value="">Date Range</option>
                  <option value={depart} key={depart}>
                    {depart}
                  </option>
                </select>
              </div>

              <div className="z-0 flex items-center rounded border border-400 bg-[#fff] px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <select className="w-full border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit">
                  <option value="">Location</option>

                  <option value={loc} key={loc}>
                    {loc}
                  </option>
                </select>
              </div>

              <div className="flex items-center rounded border border-400 bg-[#fff] px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit">
                  <option value="">Vendor</option>
                  <option value={depart} key={depart}>
                    {depart}
                  </option>
                </select>
              </div>

              <div className="flex items-center rounded border border-400 bg-[#fff] px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
                <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit">
                  <option value="">Vendor</option>
                  <option value={depart} key={depart}>
                    {depart}
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
              <span className="border-none bg-transparent pb-2 pt-1.5 text-[14px] font-semibold leading-none text-primary outline-none placeholder:text-inherit">
                Clear Filter
              </span>
            </div>
          </div>
          <table className="z-0 w-full  min-w-[550px] whitespace-nowrap">
            <thead>
              <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
                <th></th>
                <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-3/12">
                  Voucher Name
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Quantity
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Request By
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-1/12">
                  Contact
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-1/12">
                  Status
                </th>
                <th></th>
                <th></th>
                
              </tr>
            </thead>
            <tbody>
              {approvals.map((approval, index) => (
                <React.Fragment key={approval.id}>
                  <tr
                    onClick={() => toggleRow(index)}
                    className="group rounded-xl   border-[#cecece] hover:bg-[#ececec]"
                  >
                    <td className="border-b-0 py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px]"></td>
                    <td className="cursor-pointer border-b py-3 text-left">
                      <span className="text-[16px] font-bold">
                        {approval.voucher_name}
                      </span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {approval.quantity}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {approval.email}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {approval.contact}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {approval.approved}
                    </td>  
                    <td className="border-b py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]">
                       <div className="flex gap-3">
                          <button 
                            className="border rounded-md border-primary py-1 px-3"
                            onClick={() => handleApproveRequest(approval.id)}
                            >
                            Approve
                          </button>
                          <button className="border rounded-md text-gray-500  border-gray-500 py-1 px-3">Reject</button>
                       </div>
                    </td>
                    <td className="border-b-0 py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]"></td>
                  </tr>
                 
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
            <span>{page} of {approvals.total_pages}</span>
          </div>
          <div className='flex'>
            <span className='cursor-pointer'><img onClick={() => setPage(Math.max(1, page - 1))}  src={goBack}/></span>
            <span className='cursor-pointer'><img onClick={() => setPage(Math.min(Math.ceil(approvals.count / pageSize), page + 1))} src={goNext}/></span>
          </div>
        </div>
        </div>
        }
      </div>
    </div>
  );
};

export default AvailableVouchers;
