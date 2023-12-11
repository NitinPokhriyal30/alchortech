import { Checkbox, FormControlLabel } from '@mui/material'
import * as React from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { toast } from 'react-toastify'
import clip from '../assets/svg/voice-out/voiceout-icon.png';
import { useQuery } from 'react-query';
import Loader from '@/components/Loader';
import { api } from '@/api';

export default function Feedback({ ...props }) {
    const [data, setData] = React.useState({
        thoughts: '',
        file: null,
    })

    const inputRef = React.useRef()

    const handleFormSubmit = async () => {
        try {
            // Create a new FormData object
            const formData = new FormData();

            // Append the data from your state to the FormData object
            formData.append('thoughts', data.thoughts);
            formData.append('attachment', data.file);

            // Make an HTTP POST request to your API endpoint
            console.log(data);
            const response = await api.feedback.create(formData);

            // Handle the API response here
            toast.success('feedback Saved successfully');
            setData({ ...data, thoughts: '', file: null })
        } catch (error) {
            // Handle any errors that occurred during the request
            toast.error('Error:', error || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen text-text-black px-3 md:px-0 ">
            <div className='flex items-center flex-row justify-between mt-2'>
                <h1 className="flex text-[20px] font-bold px-3 md:px-0 item-center">Feedback</h1>
                <div className='flex flex-none item-center'>
                    <label className="flex flex-row cursor-pointer">
                        {/* <GrAttachment className='mt-1 mr-1' /> */}
                        <img src={clip} alt="" style={{ 'width': '20px', 'height': '20px', 'margin': '3px 5px' }} />
                        <span className="inline-block text-center font-normal text-primary">Attach File</span>
                        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files[0] && setData({ ...data, file: e.target.files[0] })} />
                    </label>
                </div>
            </div>

            <div className='mt-2 w-full min-h-[120px] resize-y rounded-md border border-[#d1d1d1] px-3 py-2 outline-primary bg-white'>

                <textarea spellCheck={false} className=" w-full h-12 resize-none outline-none transition-all placeholder:text-[#b1b1b1]" placeholder="Tell us about what you didn't find?" rows="5" value={data.thoughts} onChange={(e) => setData({ ...data, thoughts: e.target.value })}></textarea>
                {/* <Img file={data.image} className="w-full flex-1 rounded-md" /> */}
                {data.file && (
                    <div>
                        <div className="group flex items-center pb-2">
                            <img
                                src={URL.createObjectURL(data.file)}
                                key={data.file}
                                className="mt-0.5 w-40 rounded-md border"
                            />

                            <button
                                className="ml-4 hidden group-hover:inline-block"
                                onClick={() => setData((prev) => ({ ...prev, file: '' }))}
                            >
                                <RiCloseLine />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className='flex flex-row items-start justify-between mt-2'>

                <button
                    className="w-full max-w-[117px] rounded-md bg-primary py-1 font-bold text-white"
                    onClick={() => {
                        if (!data.thoughts) {
                            toast.error('Must have a description')
                        } else if (data.thoughts.length > 180) {
                            toast.error('Description must be 180 characters or less')
                        } else {
                            handleFormSubmit()
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

export function toFormData(data) {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
        let _value = value
        // stringify only if value is array, object but not image File
        if (typeof value == 'object' && !(value instanceof File || value instanceof Blob)) {
            _value = JSON.stringify(value)
            formData.set(key, _value)
        } else {
            formData.set(key, value)
        }
    })
    return formData
}
