import React from "react";

const PopularCategories = ({voucherCategories}) => {
    return (
        <div>
            <div className="right-sidebar-container">
                <div className="border-b border-[#EDEDED] py-1 px-3">
                    <p className="text-[16px]  font-semibold text-[#464646] text-center ">
                        Popular Categories
                    </p>
                </div>
                <div className=" px-4 pt-3 ">

                {voucherCategories.voucherCategories.map((category) => (
                    <div className="flex items-top pb-2 justify-between">
                    <div>
                        <p className="text-[#585858]  text-[16px]">{category.name}</p>
                    </div>
                    <div>
                        <p className="text-[#BCBCBC] text-[14px]">{category.vouchers.length}</p>
                    </div>
                </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
