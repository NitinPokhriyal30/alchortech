import { Checkbox, FormControlLabel } from '@mui/material'
import * as React from 'react'
import GrievanceIcon from '@/assets/svg/voice-out/grievance'
import SuggestionIcon from '@/assets/svg/voice-out/suggestion'
import IconBtn from '@/components/VoiceOut/IconBtn'
import VoiceOutIcon from '@/assets/svg/voice-out/voice-out'
import UploadIcon from '@/assets/svg/upload'
import { RiCloseLine } from 'react-icons/ri'
import { GrAttachment } from 'react-icons/gr'
import { toast } from 'react-toastify'
import ToolTip from '@/components/ToolTip'
import clip from '../assets/svg/voice-out/voiceout-icon.png';

export default function VoiceOutPage({ ...props }) {
  const [data, setData] = React.useState({
    category: 'grievance',
    description: '',
    image: null,
    allowMyName: false,
  })

  const inputRef = React.useRef()

  return (
    <section className="min-h-screen text-text-black px-3 md:px-0">
      <h1 className="md:mt-9 text-[20px] font-bold px-3 md:px-0">Voice Out</h1>
      <div className='flex items-center flex-row justify-between mt-2'>
        <div className='flex flex-row flex-auto'>
          <button className={data.category === 'grievance' ? ' w-full max-w-[125px] rounded-md bg-primary py-1 font-normal text-white mr-2 border border-primary' : ' w-full max-w-[125px] rounded-md text-primary py-1 font-normal border border-primary mr-2'} label="Grievance" onClick={() => setData({ ...data, category: 'grievance' })}>
            Grievance
          </button>
          <button className={data.category === 'suggestion' ? ' w-full max-w-[125px] rounded-md bg-primary py-1 font-normal text-white mr-2 border border-primary' : ' w-full max-w-[125px] rounded-md text-primary py-1 font-normal border border-primary mr-2'} label="Suggestion" onClick={() => setData({ ...data, category: 'suggestion' })}>
            Suggestion
          </button>
          <button className={data.category === 'voice-out' ? ' w-full max-w-[125px] rounded-md bg-primary py-1 font-normal text-white mr-2 border border-primary' : ' w-full max-w-[125px] rounded-md text-primary py-1 font-normal border border-primary mr-2'} label="voice-out" onClick={() => setData({ ...data, category: 'voice-out' })}>
            Voice-Out
          </button>
        </div>
        <div className='flex flex-row flex-none item-center'>
          <label className="flex flex-row cursor-pointer">
            {/* <GrAttachment className='mt-1 mr-1' /> */}
            <img src={clip} alt="" style={{ 'width': '20px', 'height': '20px', 'margin': '3px 5px'}} />
            <span className="inline-block text-center font-normal text-primary">Attach File</span>
            <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && setData({ ...data, image: e.target.files[0] })} />
          </label>
        </div>

      </div>

      <div className='mt-2 w-full min-h-[120px] resize-y rounded-md border border-[#d1d1d1] px-3 py-2 outline-primary bg-white'>

        <textarea spellCheck={false} className=" w-full h-12 resize-none outline-none transition-all placeholder:text-[#b1b1b1]" placeholder="Tell us about what you didn't find?" rows="5" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>
        {/* <Img file={data.image} className="w-full flex-1 rounded-md" /> */}
        {data.image && (
          <div>
            <div className="group flex items-center pb-2">
              <img
                src={URL.createObjectURL(data.image)}
                key={data.image}
                className="mt-0.5 w-40 rounded-md border"
              />

              <button
                className="ml-4 hidden group-hover:inline-block"
                onClick={
                  () => {
                    setData({ ...data, image: '' })
                    if (inputRef.current) inputRef.current.value = ''
                  }
                }

              >
                <RiCloseLine />
              </button>
            </div>
          </div>
        )}
      </div>
      {/* {data.image == null ? (
        <label
          className="mt-2 flex md:w-2/3 flex-col items-center gap-2.5 rounded-lg border border-dashed border-[#d1d1d1] fill-[#d1d1d1] p-4"
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={(e) => {
            e.preventDefault()
            e.stopPropagation()
            console.log(e.dataTransfer)
            setData({ image: e.dataTransfer.files[0] })
          }}
        >
          <UploadIcon />
          <span className="inline-block w-full max-w-[117px] rounded-md bg-primary p-2 text-center font-bold text-white">Choose File</span>
          <span className="text-[#d1d1d1]">or drop your file here.</span>
          <input type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && setData({ ...data, image: e.target.files[0] })} />
        </label>
      ) : (
        <div className="mt-2 flex w-2/3 flex-col items-center gap-2.5 rounded-lg border border-dashed border-[#d1d1d1] fill-[#d1d1d1] p-4">
          <span className="grid grid-cols-[1fr_auto] items-start gap-2">
            <Img file={data.image} className="w-full flex-1 rounded-md" />
            <button onClick={() => setData({ ...data, image: null })}>
              <RiCloseLine />
            </button>
          </span>
        </div>
      )} */}
      <div className='flex flex-row items-start justify-between mt-2'>
        <div className="font-normal">
          <FormControlLabel control={<Checkbox />} label="anonymous" onChange={(e) => setData({ ...data, allowMyName: e.target.checked })} />
        </div>

        <button
          className="w-full max-w-[117px] rounded-md bg-primary py-1 font-bold text-white"
          onClick={() => {
            if (!data.category) {
              toast.error('Select a category')
            } else if (!data.description) {
              toast.error('Must have a description')
            } else if (data.description.length > 180) {
              toast.error('Description must be 180 characters or less')
            } else {
              toast.success('Saved successfully')
              console.log(data)
            }
          }}
        >
          Submit
        </button>
      </div>
    </section>
  )
}

function Img({ file, src: _src, ...props }) {
  const [objectUrl, setObjectUrl] = React.useState('')

  React.useEffect(() => {
    if (!file) {
      setObjectUrl('')
      return
    }

    const newUrl = URL.createObjectURL(file)
    setObjectUrl(newUrl)

    return () => URL.revokeObjectURL(newUrl)
  }, [file])

  return <img src={objectUrl} {...props} />
}
