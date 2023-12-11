import React from 'react'
import RewardDialog from './RewardDialog'
import PopularCategories from './HomeRightSidebar/PopularCategories'
import { RedeemPointsWidget } from './HomeRightSidebar/RedeemPointsWidget'
import * as Dialog from '@radix-ui/react-dialog'
import { BsSearch } from 'react-icons/bs'
import {Link} from 'react-router-dom'
import { useQuery } from 'react-query'
import { api } from '../api'
import Loader from '@/components/Loader'

const MyRewards = () => {

  const [searchQuery, setSearchQuery] = React.useState('');

  const { data: voucherCategories, isLoading, isError } = useQuery(
    ['rewards'], 
    () => api.rewards.redeemable()
  );

  if (isLoading) {
    return <div><Loader /></div>;
  }

  if (isError) {
    return <div>Error loading campaigns</div>;
  }


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredVoucherCategories = voucherCategories.voucherCategories.map((category) => ({
    ...category,
    vouchers: category.vouchers.filter((voucher) =>
      voucher.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));


  const openRewardPopup = (voucher) => {
    setSelectedVoucher(voucher);
    setIsRewardPopupOpen(true);
  };

  const closeRewardPopup = () => {
    setSelectedVoucher(null);
    setIsRewardPopupOpen(false);
  };

  return (
    <>
      {/* rewards (center slot) */}
      <div className="pl-3 pr-3 lg:pl-0 mb-6">

      <div className="bg-[#fff] mt-3 rounded-tl-lg rounded-tr-lg p-4 flex w-full justify-between">
      <div className="flex w-[40%] bg-[#fff] items-center rounded border border-400 px-3 text-[#acacac] outline-1 outline-primary-400 focus-within:outline">
        <BsSearch />
        <input 
            className="w-full ml-1.5 border-none pb-2 pt-1.5 font-semibold leading-none outline-none placeholder:text-inherit text-[12px] text-[#A5A5A5]"
            placeholder="Search Vouchers by Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
      </div>

  
      <Link to="/my-rewards/rewards-history" className="flex items-center">
        <span className="cursor-pointer font-semibold text-[14px] text-primary" >Reward History</span>
      </Link>
    </div>
    {filteredVoucherCategories.map((voucherCategory) => (
      <div key={voucherCategory.id} className="mt-2">
        <div className="rounded-t-lg bg-primary px-6 py-2 text-sm text-white">
          <p className=" ">{voucherCategory.name}</p>
        </div>
        <div className="rounded-b-lg bg-white px-6 py-4 drop-shadow-normal">
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(227px,1fr))]">
            {voucherCategory.vouchers.map((voucher, index) => (
              <RewardCard key={index} voucher={voucher} />
            ))}
          </div>
        </div>
      </div>
    ))}

      </div>

      {/* right sidebar */}
      <div className="flex w-full flex-col gap-3 overflow-y-auto pb-5 pl-3 pt-3 md:pl-1 lg:max-w-[250px] xl:max-w-[319px]">
        <RedeemPointsWidget />
        <PopularCategories voucherCategories={voucherCategories}/> 
      </div>
    </>
  )
}

function RewardCard({ voucher }) {

  const { image_url, name, valueDenominations } = voucher;

  const denominationsArray = valueDenominations.split(',').map(Number);
  const smallestValue = Math.min(...denominationsArray);
 
  return (
    <Dialog.Root>
      <div className="flex flex-col items-center justify-between rounded-[4px] border-[1px] border-[#EFEFEF] px-4 py-3">
        <div className="my-3 flex items-center justify-center p-2">
          <img className="m-auto w-46 h-32" src={image_url} alt="logo" />
        </div>

        <div className="text-center">
          <p className=" text-[13px]">{name}</p>
          <p className=" text-[13px] font-black">Starts with {smallestValue} points</p>
          <div className="py-3">
            <Dialog.Trigger>
              <button className="rounded border border-[#EFEFEF] bg-[#f7f7f7] px-4  text-[14px] text-primary hover:border-translucent hover:bg-translucent">
                Redeem
              </button>
            </Dialog.Trigger>
          </div>
        </div>
      </div>

      <RewardDialog voucher={voucher} />
    </Dialog.Root>
  )
}

export default MyRewards
