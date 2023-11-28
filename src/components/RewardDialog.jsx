import * as Dialog from '@radix-ui/react-dialog'
import React, {useState} from 'react'
import { RxCross2 } from 'react-icons/rx'
import { useQuery } from 'react-query'
import { api } from '../api'
import Loader from '@/components/Loader'
import { toast } from 'react-toastify'

const RewardPopup = ({ voucher, onClose }) => {
  const [loading, setLoading] = React.useState('')
  const [selectedMapping, setSelectedMapping] = useState(null);
  const [sendToFriend, setSendToFriend] = useState(false);
  const [friendEmail, setFriendEmail] = useState('');

  const formData = {
    voucherPointMappingId: selectedMapping ? selectedMapping.id : null,
    email: sendToFriend ? friendEmail : "",
    contact: "",
    tag: "",
    quantity: 1,
  };

  const handleVoucherRedeem = async () => {
    setLoading('redeem');
    try {
      const response = await api.rewards.redeem(formData);
      toast.success(response.message)
    } catch (error) {
      toast.error("You do not have enough points to redeem this voucher")
    } finally {
      setLoading(''); 
    }
  };

  const isRedeemDisabled = !selectedMapping;
 


  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black bg-opacity-20 fixed z-50 inset-0" />

      <Dialog.Content className="fixed z-[99] left-1/2 top-2/5 -translate-x-1/2 -translate-y-1/2">
        <div className="bg-white shadow border border-[#efefef] rounded-md p-2 w-screen md:max-w-4xl max-w-xs">
          <Dialog.Close className="p-2 rounded-sm hover:bg-translucent hover:text-primary block w-fit ml-auto">
            <RxCross2 />
          </Dialog.Close>

          <div className="grid md:grid-cols-2 grid-cols-1  py-3 px-5">
            <div className="m-auto">
              <img src={voucher?.image_url} alt="logo" />
            </div>

            <div className="px-6 md:mt-0 mt-8 md:border-l-2 border-[#EFEFEF]">
              <div>
                <p className=" text-md font-bold text-[#7B7B7B]">{voucher?.name}</p>
              </div>
              <div className="flex gap-4 flex-wrap mt-7">
              {voucher.point_mappings.map((mapping) => (
                <div
                  key={mapping.denomination}
                  className={`py cursor-pointer px-10 border border-primary rounded-xl flex flex-col ${
                    selectedMapping === mapping ? 'border-primary bg-primary text-white' : 'border-[#EFEFEF]'
                  }`}
                  onClick={() => setSelectedMapping(mapping)}
                >
                  <span className="font-bold">${mapping.points}</span>
                  <span>{mapping.denomination}</span>
                </div>
              ))}
              </div>
              <div className="flex items-center mt-3">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  checked={sendToFriend}
                  onChange={() => setSendToFriend(!sendToFriend)}
                  className="w-4 h-4 text-blue-600 bg-transparent border-[1px] border-[#D1D1D1] rounded focus:border-[#D1D1D1] dark:focus:ring-[#D1D1D1] "
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-[13px]   text-[#747474] dark:text-gray-300"
                >
                  Send this gift card to a friend
                </label>
              </div>
              {sendToFriend && (
                <div className="mt-3">
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={friendEmail}
                    onChange={(e) => setFriendEmail(e.target.value)}
                    className="w-full px-2 py-1 border-[1px] border-[#D1D1D1] rounded focus:border-[#D1D1D1] dark:focus:ring-[#D1D1D1]"
                  />
                </div>
              )}
              <div className="py-5">
                <Dialog.Close>
                  <button
                    className="rounded-[4px] md:w-32 w-full py-1  text-[14px] border-[1px] border-[#EFEFEF] px-4 bg-primary text-white"
                    onClick={handleVoucherRedeem}
                    disabled={isRedeemDisabled}
                  >
                    {loading ? <>&middot; &middot; &middot;</> : 'Redeem'}
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default RewardPopup
