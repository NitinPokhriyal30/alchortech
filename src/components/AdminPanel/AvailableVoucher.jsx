import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { api } from '../../api'
import Loader from '@/components/Loader'
import { useQuery } from 'react-query'
import goBack from '../../assets/images/admin/chevron-left.svg';
import goNext from '../../assets/images/admin/chevron-right.svg';

const AvailableVouchers = () => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [pageSize, setPageSize] = React.useState(10);
  const [page, setPage]= React.useState(1);

  const { data: vouchers, isLoading, isError } = useQuery(
    ['vouchers', pageSize, page], 
    () => api.adminUsers.availableVouchers({pageSize, page})
  );

    if (isLoading) {
      return <div><Loader /></div>;
    }
  
    if (isError) {
      return <div>Error loading campaigns</div>;
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
      const date = new Date(redeemDate)
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
      <div className=" md:w-full mb-16">
        <div className="my-4 flex px-[25px]">
          <div className="font-Lato  text-[20px] font-bold text-[#464646]">
            Available Vouchers
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
              <option value="">Vendor</option>
                <option value={depart} key={depart}>
                  {depart}
                </option>
          </select>
          </div>

          <div className="flex bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
          <select className="w-full border-none bg-transparent pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit" >
              <option value="">Vendor</option>
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
          <table className="z-0 w-full overflow-y-auto  min-w-[550px] whitespace-nowrap">
            <thead>
              <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
                <th></th>
                <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-4/12">
                  Product Name
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Product Id
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Country
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Quantity Limit
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">
                  Validity
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vouchers.vouchers.map((voucher, index) => (
                <React.Fragment key={voucher.id}>
                  <tr
                    onClick={() => toggleRow(index)}
                    className="group rounded-xl cursor-pointer  border-[#cecece] hover:bg-[#ececec]"
                  >
                    <td className="border-b-0 py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px]"></td>
                    <td className="border-b  py-3 text-left">
                      <span className="text-[16px] font-bold">{voucher.name}</span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {voucher.product_id}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {voucher.countries[0].name}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {voucher.order_quantity_limit}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      <p dangerouslySetInnerHTML={{ __html: voucher.expiry_and_validity }} />
                    </td>
                    <td className="border-b  py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]">
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
                      <td colSpan="9">
                        <div className="border-b border-[#cecece] drop-shadow-lg px-4 pb-4">
                          <div className="rounded-md bg-[#EDEDED] p-4">
                            <span className="text-[14px] text-[#747474]">
                              Product Details
                            </span>
                            <div className="flex gap-[115px] pb-4 items-center">
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Product Name
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.name}
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Product Id
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.product_id}
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Quantity
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.order_quantity_limit}
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Categories
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.categories[0].name}
                                </span>
                              </div>
                            </div>

                            <div className="pb-4 wrap">
                              <p className="text-[13px]  text-[#ACACAC]">
                                Product Description
                              </p>
                              <p className="font-sans whitespace-normal text-[16px] text-[#464646]">
                                <p dangerouslySetInnerHTML={{ __html: voucher.description }} />
                              </p>
                            </div>

                            <span className="text-[14px] text-[#747474]">
                              Currency Details
                            </span>

                            <div className="flex gap-[134px] pb-4 items-center">
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Country
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.countries[0].name}
                                </span>
                              </div>
                              <div>
                              <p className="text-[13px] text-[#ACACAC]">
                                Currency Code
                              </p>
                              <span className="font-sans text-[16px] text-[#464646]">
                                {voucher.currency_code}
                              </span>
                            </div>
                            <div>
                              <p className="text-[13px] text-[#ACACAC]">
                                Currency Name
                              </p>
                              <span className="font-sans text-[16px] text-[#464646]">
                                {voucher.currency_name}
                              </span>
                            </div>
                            <div>
                              <p className="text-[13px] text-[#ACACAC]">
                                Currency Fee
                              </p>
                              <span className="font-sans text-[16px] text-[#464646]">
                                {voucher.fee}
                              </span>
                            </div>
                            </div>

                            <span className="text-[14px] text-[#747474]">
                              Product Validity & Order Details
                            </span>

                            <div className="flex gap-[106px] pb-4 items-center">
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Expiry & Validity
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                   <p dangerouslySetInnerHTML={{ __html: voucher.expiry_and_validity }} />
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Last Updated Date
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {formatRedeemDate(voucher.last_update_date)}
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Order Quantity Limit
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.order_quantity_limit}
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Value Type
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  {voucher.valueType}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col pb-4">
                              <div >
                                <p className="text-[13px] text-[#ACACAC]">
                                  Redemption Instruction
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                <p dangerouslySetInnerHTML={{ __html: voucher.redemption_instructions }} />
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Image Url
                                </p>
                                <span className="font-sans text-[16px]  text-[#464646]">
                                  <img className="h-20 w-40" src={voucher.image_url} alt="logo"/>
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
            <span>{page}-{pageSize} of {vouchers.count}</span>
          </div>
          <div className='flex'>
            <span className='cursor-pointer'><img onClick={() => setPage(Math.max(1, page - 1))}  src={goBack}/></span>
            <span className='cursor-pointer'><img onClick={() => setPage(Math.min(Math.ceil(vouchers.count / pageSize), page + 1))} src={goNext}/></span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableVouchers;
