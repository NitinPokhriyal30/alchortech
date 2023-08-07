import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers'
import * as React from 'react'

const COLORS = {
  gray: 'text-[#A5A5A5]',
}

const CampaignDetails = () => {
  return (
    <div className="rounded-lg bg-white px-5 py-6 shadow-[0px_2px_3px_#00000029]">
      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Campaign Name*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Give a meaning fun name to your campagin</p>
        </div>

        {/* col 2 */}
        <div>
          <div
            className={
              'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
            }
          >
            <input
              placeholder="Ex. Go Green, Plant Trees"
              className={
                'w-full bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
              }
            />
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Description*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Maximum 150 words</p>
        </div>

        {/* col 2 */}
        <div>
          <div
            className={
              'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
            }
          >
            <textarea
              rows="10"
              placeholder="Describe your campaign"
              className={
                'w-full bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
              }
            ></textarea>
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Date*</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Mention the Campaign date and time</p>
        </div>

        {/* col 2 */}
        <div>
          <div className="flex items-center gap-4">
            <span className="text-18px font-bold min-w-[70px]">Start</span>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker />
            </LocalizationProvider>
          </div>

          <div className="flex items-center gap-4 mt-2">
            <span className="text-18px font-bold min-w-[70px]">End</span>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DatePicker />
            </LocalizationProvider>
          </div>
        </div>
      </div>

      <hr className="border-px my-6 border-400" />

      <div className="grid grid-cols-[1fr_2fr] items-center gap-8">
        {/* col 1 */}
        <div>
          <p className="text-18px font-bold text-text-black">Terms & Conditions</p>
          <p className={'mt-2.5 ' + COLORS.gray}>Describe the Terms & Conditions of the campaign</p>
        </div>

        {/* col 2 */}
        <div>
          <div
            className={
              'rounded border border-current ring-primary focus-within:ring-1 ' + COLORS.gray
            }
          >
            <textarea
              rows="10"
              placeholder="Describe your campaign"
              className={
                'w-full bg-transparent px-3 py-2 text-[14px] leading-[16px] text-text-black outline-none placeholder:text-[#A5A5A5]'
              }
            ></textarea>
          </div>
          <p className={'text-right ' + COLORS.gray}>0/75</p>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails
