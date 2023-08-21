import { FormControlLabel, Radio, Checkbox, RadioGroup } from '@mui/material'
import * as React from 'react'

export default function SurveyPreview({ ...props }) {
  const title = 'Human Resource - Work from home survey'
  const timeRemaining = '00:01:24'
  const [answer, setAnswer] = React.useState(0)

  return (
    <div className="mb-10 rounded-[7px] bg-white">
      <div className="flex border-b border-[#d1d1d1] px-[52px] pb-3 pt-6 text-[24px] font-bold leading-[29px] text-[#292929]">
        <h1>{title}</h1>

        <span className="ml-auto text-[12px] text-[#00BC9F]">Time remaining: </span>
        <span className="ml-5">{timeRemaining}</span>
      </div>

      <div className="px-[52px]">
        {/* question */}
        <div className="border-b border-[#d1d1d1] pb-3 pt-9">
          <p className="pb-6 text-18px font-bold">Are you planning to work from home?</p>

          <RadioGroup>
            <FormControlLabel control={<Radio />} value="yes" label="yes" />

            <FormControlLabel control={<Radio />} value="no" label="no" />

            <FormControlLabel control={<Radio />} value="i haven't decided yet" label="i haven't decided yet" />
          </RadioGroup>
        </div>

        {/* question */}
        <div className="border-b border-[#d1d1d1] pb-3 pt-9">
          <p className="pb-6 text-18px font-bold">What is your reason for working from home?</p>

          <input className="w-full max-w-[465px] border-b border-[#d1d1d1] bg-transparent py-2.5 outline-none focus:border-primary" type="text" placeholder="Your answer" />
        </div>

        {/* question */}
        <div className="border-b border-[#d1d1d1] pb-3 pt-9">
          <p className="pb-6 text-18px font-bold">How much notice period would you require to get to the office?</p>

          <RadioGroup>
            {['0-1 hr', '3-10 hr', '1 day', '1-5 days', 'More than 5 days'].map((value) => (
              <FormControlLabel control={<Radio />} value={value} label={value} />
            ))}
          </RadioGroup>
        </div>

        {/* question */}
        <div className="border-b border-[#d1d1d1] pb-3 pt-9">
          <p className="pb-6 text-18px font-bold">How do you feel about the work from home arrangement so far?</p>

          <RadioGroup className={'!flex-row !items-end'}>
            <span className="mr-10 leading-[44px]">Bad</span>
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <FormControlLabel className="!mx-0 !inline-flex !w-fit" key={i} control={<Radio />} checked={answer >= i + 1} onClick={() => setAnswer(i + 1)} label={'' + (i + 1)} labelPlacement="top" value={String(i + 1)} />
              ))}
            <span className="ml-10 leading-[44px]">Awesome</span>
          </RadioGroup>
        </div>

        {/* question */}
        <div className="border-b border-[#d1d1d1] pb-3 pt-9">
          <p className="pb-6 text-18px font-bold">How comfortable do you feel returning to the office?</p>

          <select className="w-full max-w-[465px] cursor-pointer rounded-[4px] border border-[#d1d1d1] bg-transparent px-[14px] py-2.5 text-16px outline-none focus:border-primary">
            <option>option 1</option>
            <option>option 2</option>
            <option>option 3</option>
            <option>option 4</option>
          </select>
        </div>

        {/* question */}
        <div className="border-b border-[#d1d1d1] pb-3 pt-9">
          <p className="pb-6 text-18px font-bold">Tell us about your biggest concerns with the idea of returning to a workplace. (Select all that apply)</p>

          {[
            'Getting exposed to the novel coronavirus while traveling to work',
            'Catching the novel coronavirus at my workplace',
            'Unknowingly spreading the virus to co-workers and staff',
            'A decreased flexibility after working from home',
            'Health reasons preventing me from getting back to the office',
          ].map((value) => (
            <FormControlLabel className="!flex" key={value} control={<Checkbox />} label={value} value={value} />
          ))}
        </div>

        <div className="mb-[60px] mt-14 ">
          <button className="w-full max-w-[117px] rounded-[4px] bg-primary p-[9.5px] text-white " type="button">
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
