import React from "react";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const AvailableVouchers = () => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [expandedRow, setExpandedRow] = React.useState(null);

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const users = [
    {
      id: "E1198",
      name: "Flipkart",
      order_id: "7686153",
      product_id: "7686153",
      country: "India",
      number_of_points: 100,
      redemption_date: "21-01-2023 12:08:01 Am",
    },
    {
      id: "E1198",
      name: "Amazon",
      order_id: "7686153",
      product_id: "7686153",
      country: "India",
      number_of_points: 100,
      redemption_date: "21-01-2023 12:08:01 Am",
    },
  ];

  const depart = 'Product Development';
  const loc = 'San Diego';


  return (
    <div>
      <div className="h-screen w-screen md:w-full">
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
          <table className="z-0 w-full  min-w-[550px] whitespace-nowrap">
            <thead>
              <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
                <th></th>
                <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-4/12">
                  Product Name
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Order Id
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Product Id
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Country
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Quantity
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff]">
                  Validity
                </th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <React.Fragment key={user.id}>
                  <tr
                    onClick={() => toggleRow(index)}
                    className="group rounded-xl   border-[#cecece] hover:bg-[#ececec]"
                  >
                    <td className="border-b-0 py-3 text-[16px] font-semibold text-[#5486E3] md:pl-[25px]"></td>
                    <td className="border-b cursor-pointer py-3 text-left">
                      <span className="text-[16px] font-bold">{user.name}</span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.order_id}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.product_id}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.country}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.number_of_points}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      <span> {user.redemption_date}</span>
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
                                  Flipkart
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Order Id
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  1235633
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Product Id
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  1007
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Quantity
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  15
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Categories
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  Flipkart
                                </span>
                              </div>
                            </div>

                            <div className="pb-4">
                              <p className="text-[13px] text-[#ACACAC]">
                                Product Description
                              </p>
                              <p className="font-sans whitespace-normal text-[16px] text-[#464646]">
                                Croma has always been dedicated towards giving
                                its customers an easy and hassle-free access to
                                best consumer electronics products. Croma Gift
                                Card is a perfect gifting option for your loved
                                ones to choose from categories such as Phones,
                                Camera, Computers, Entertainment, Home
                                Appliances, Kitchen Appliances, Gaming and
                                Accessories
                              </p>
                            </div>

                            <span className="text-[14px] text-[#747474]">
                              Product Details
                            </span>

                            <div className="flex gap-[134px] pb-4 items-center">
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Country
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  IN - India
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Pin
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  1235633
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-[113px] pb-4 items-center">
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Currency Code
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  INR
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Currency Name
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  Rupees
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Currency Value
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  1007
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Amount
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  100
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Categories
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  Flipkart
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
                                  INR
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Last Updated Date
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  Rupees
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Order Quantity
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  10
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Order Quantity Limit
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  100
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Product Status
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  Flipkart
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-[120px] pb-4 items-center">
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Voucher Code
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  INR
                                </span>
                              </div>
                              <div>
                                <p className="text-[13px] text-[#ACACAC]">
                                  Image Url
                                </p>
                                <span className="font-sans text-[16px] text-[#464646]">
                                  Flipkart
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
        </div>
      </div>
    </div>
  );
};

export default AvailableVouchers;
