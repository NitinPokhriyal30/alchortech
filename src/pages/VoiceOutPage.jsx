import { Checkbox, FormControlLabel } from '@mui/material'
import * as React from 'react'
import GrievanceIcon from '@/assets/svg/voice-out/grievance'
import SuggestionIcon from '@/assets/svg/voice-out/suggestion'
import IconBtn from '@/components/VoiceOut/IconBtn'
import VoiceOutIcon from '@/assets/svg/voice-out/voice-out'
import UploadIcon from '@/assets/svg/upload'
import { RiCloseLine } from 'react-icons/ri'
import { toast } from 'react-toastify'

export default function VoiceOutPage({ ...props }) {
  const [data, setData] = React.useState({
    category: 'grievance',
    description: '',
    image: null,
    allowMyName: false,
  })
  return (
    <section className="min-h-screen text-text-black">
      <h1 className="mt-[7px] text-[20px] font-bold">Voice Out</h1>

      <div className="box mt-[18px] rounded-lg bg-white p-7 shadow-[0px_2px_3px_#00000029]">
        <p className="text-18px font-bold">Select Category</p>
        <div className="mt-6 flex flex-col gap-12 md:flex-row">
          <IconBtn icon={GrievanceIcon} className={data.category === 'grievance' ? 'border-[#FF9157] bg-[#FF9157] fill-white' : ''} label="Grievance" onClick={() => setData({ ...data, category: 'grievance' })} />
          <IconBtn icon={SuggestionIcon} className={data.category === 'suggestion' ? 'border-[#00BC9F] bg-[#00BC9F] fill-white' : ''} label="Suggestion" onClick={() => setData({ ...data, category: 'suggestion' })} />
          <IconBtn icon={VoiceOutIcon} className={data.category === 'voice-out' ? 'border-[#00BC9F] bg-[#00BC9F] fill-white' : ''} label="Voice-Out" onClick={() => setData({ ...data, category: 'voice-out' })} />
        </div>

        <p className="mt-[18px] text-18px font-bold">Describe your thoughts</p>
        <textarea className="mt-2 w-full resize-y rounded-lg border border-[#d1d1d1] px-3 py-2 outline-primary" placeholder="Tell us about what you didn't find?" rows="5" value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })}></textarea>

        <p className="mt-[18px] text-18px font-bold">Attachement (optional)</p>
        <p className="text-[14px] text-[#A5A5A5]">
          Attach any supporting document with max file size of 5 MB <br />
          (PDF, DOC, GIF, JPG, PNG)
        </p>

        {data.image == null ? (
          <label
            className="mt-2 flex w-2/3 flex-col items-center gap-2.5 rounded-lg border border-dashed border-[#d1d1d1] fill-[#d1d1d1] p-4"
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
              <button className="inline-grid aspect-square w-6 shrink-0 place-items-center rounded-full border border-current text-text-black hover:border-text-black hover:bg-text-black hover:text-white" onClick={() => setData({ ...data, image: null })}>
                <RiCloseLine />
              </button>
            </span>
          </div>
        )}
        <div className="mt-6 px-2">
          <FormControlLabel control={<Checkbox />} label="Allow my name" onChange={(e) => setData({ ...data, allowMyName: e.target.checked })} />
        </div>

        <button
          className="mt-9 w-full max-w-[117px] rounded-md bg-primary py-2 font-bold text-white"
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
