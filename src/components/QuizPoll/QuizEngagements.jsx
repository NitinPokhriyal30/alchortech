import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import { IoIosCloseCircle, IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const QuizEngagements = () => {
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(null);
  const [expandedRow, setExpandedRow] = React.useState(null);

  const toggleRow = (index) => {
    setExpandedRow((prev) => (prev === index ? null : index));
  };

  const users = [
    {
      id: "E1198",
      name: "Lisa Phillips",
      department: "Product Development",
      title: "Developer",
      date: "16/10/2023, 9:28:54 AM"
    },
    {
      id: "E1198",
      name: "Lisa Clinton",
      department: "Product Development",
      title: "Developer",
      date: "16/10/2023, 9:28:54 AM"
    },
  ];


  return (
    <div>
      <div className="h-screen w-screen md:w-full">
        <div className="my-4 flex px-[25px]">
          <div className="font-Lato  text-[20px] font-bold text-[#464646]">
            Quiz Engagements
          </div>
        </div>

        <div className="mx-[25px]  mt-2 flex flex-col overflow-auto rounded-lg bg-white drop-shadow-md">
          <table className="z-0 w-full  min-w-[550px] whitespace-nowrap">
            <thead>
              <tr className="child:!text-12px border-b border-[#cecece] bg-primary child:!py-[15.5px]">
                <th></th>
                <th className="py-[15.5px] text-left font-Lato text-[12px] font-medium text-[#fff] md:w-4/12">
                  Name
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-3/12">
                 Department
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                 Designation
                </th>
                <th className="py-4 text-left font-Lato text-[12px] font-medium text-[#fff] md:w-2/12">
                  Date
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
                      <span className="text-[16px] font-bold">{user.name}</span>
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.department}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.title}
                    </td>
                    <td className="border-b py-3 text-left font-Lato text-[12px] font-normal text-[#292929]">
                      {user.date}
                    </td>
                    <td className="border-b py-4 pl-[20px] text-left font-Lato text-[12px] font-medium text-primary md:pl-[25px]">
                      {expandedRow === index ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </td>
                  </tr>
                  {expandedRow === index && (
                    <tr className="expanded-row">
                      <td colSpan="10">
                        <div className="border-b border-[#cecece] drop-shadow-lg px-4 pb-4">
                          <div className="rounded-md bg-[#EDEDED] p-4">
                            <span className="text-[14px] text-[#747474]">
                              Employee Response 
                            </span>
                            <div className="flex gap-[115px] pb-4 items-center">
                             
                            </div>

                            <div className="pb-4">
                              <p className="text-[13px] text-[#ACACAC]">
                                Employee Message
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

export default QuizEngagements;
