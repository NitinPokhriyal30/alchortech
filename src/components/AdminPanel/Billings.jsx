import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const Billings = () => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [expandedRow, setExpandedRow] = React.useState(null);

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const users = [
    {
      id: "E1198",
      invoice_id: "#12345",
      billing_date: "15 November 2023",
      plan_subscription: "7 Day Free Trial",
      renewal_date: "15 November 2023",
      amount: "$1500",
      status: "Paid",
    },
    {
      id: "E1198",
      invoice_id: "#12345",
      billing_date: "15 November 2023",
      plan_subscription: "7 Day Free Trial",
      renewal_date: "15 November 2023",
      amount: "$1500",
      status: "Paid",
    },
  ];

  const depart = 'Product Development';
  const loc = 'San Diego';


  return (
    <div>
      <div className="h-screen w-screen md:w-full">
        <div className="my-4 flex px-[25px]">
          <div className="font-Lato  text-[20px] font-bold text-[#464646]">
            Billings
          </div>
        </div>

        <div className="mx-[25px]  mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
          <table className="z-0 w-full  min-w-[550px] whitespace-nowrap">
            <thead>
              <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
                <th></th>
                <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-3/12">
                  Invoice Id
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                 Billing Date
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                 Plan/Subscription
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-1/12">
                  Renewal Date
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-1/12">
                  Amount
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Status
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Invoice
                </th>
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
                      <span className="text-[16px] font-bold">{user.invoice_id}</span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.billing_date}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.plan_subscription}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.renewal_date}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.amount}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      <span> {user.status}</span>
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
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billings;
