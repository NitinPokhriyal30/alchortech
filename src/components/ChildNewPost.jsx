import { api } from '@/api'
import Cropper from '@/components/Cropper'
import {
  AddLinkBox,
  HashTagsDropdown,
  PointsRangeDialog,
  toFormData
} from '@/components/NewPost'
import ToolTip from '@/components/ToolTip'
import { MAX_IMAGE_SIZE_MB } from '@/constant'
import { queryClient } from '@/queryClient'
import { CreatePost } from '@/utils'
import { Close, EmojiEmotions, GifBox, Image, Link } from '@mui/icons-material'
import * as Popover from '@radix-ui/react-popover'
import EmojiPicker from 'emoji-picker-react'
import Cookies from 'js-cookie'
import * as React from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { GifPickerBox } from './GifPickerPopover'

export default function ChildNewPost({ onClose, post, defaultPoint }) {
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))
  const [loading, setLoading] = React.useState(false)
  const [rawImage, setRawImage] = React.useState('')

  const [form, setForm] = React.useState({
    point: defaultPoint,
    recipients: post.recipients,
    hashtags: post.hashtags,
    image: '',
    gif: '',
    link: '',
    message: '',
  })

  return (
    <>
      {rawImage && (
        <Cropper
          imageFile={rawImage}
          onClose={(image) => {
            setRawImage('')
            setForm((prev) => ({ ...prev, image }))
          }}
        />
      )}
      <div>
        <div className="rounded-t-lg  bg-primary px-6 py-2 text-sm text-white">
          <ul className="flex flex-wrap items-center gap-y-3 divide-x divide-primary-400 first:pl-0 child:pl-4">
            {/* points button */}

            <li className="group pr-4">
              <PointsRangeDialog {...{ form, setForm }} />
            </li>

            <li className="group pr-4">
              <HashTagsDropdown {...{ form, setForm }} />
            </li>
          </ul>
        </div>

        {/* text field */}

        <div className="_px-6 rounded-b-lg bg-white py-6 text-gray-400 drop-shadow-normal">
          <div className="px-6">
            +{form.point}{' '}
            {form.recipients.map((user) => (
              <span key={user.id}>
                @{user.first_name} {user.last_name}
              </span>
            ))}{' '}
            {form.hashtags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>

          <div className="border-b px-6 focus-within:border-b focus-within:border-primary">
            <textarea
              spellCheck={false}
              className="block h-20 w-full resize-none outline-none  transition-all"
              placeholder="Type Here..."
              onChange={(ev) =>
                setForm((prev) => ({ ...prev, message: ev.target.value.substring(0, 270) }))
              }
              value={form.message}
            ></textarea>

            {form.image && (
              <div>
                <img
                  src={URL.createObjectURL(form.image)}
                  key={form.image}
                  className="mt-4 w-40 border"
                />
              </div>
            )}

            {form.gif && (
              <div>
                <div className="group flex items-center pb-2">
                  <img src={form.gif} key={form.image} className="mt-4 w-40 border" />

                  <button
                    className="ml-4 hidden group-hover:inline-block"
                    onClick={() => setForm((prev) => ({ ...prev, gif: '' }))}
                  >
                    <Close fontSize="10" />
                  </button>
                </div>
              </div>
            )}

            {form.link && (
              <div>
                <p>URL Link:</p>

                <div className="group flex items-center">
                  <a className="text-primary underline" href={form.link}>
                    {form.link}
                  </a>
                  <button
                    className="ml-4 hidden group-hover:inline-block"
                    onClick={() => setForm((prev) => ({ ...prev, link: '' }))}
                  >
                    <Close fontSize="10" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* footer */}
          <div id="new-post-footer" className="flex items-baseline gap-4 px-6 pt-3">
            <Popover.Root>
              <Popover.Trigger className="group relative inline-block cursor-pointer text-iconColor">
                <EmojiEmotions />
                <ToolTip title="Add an emoji" />
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content className="z-20">
                  <EmojiPicker
                    onEmojiClick={(emoji) => {
                      setForm((prev) => ({ ...prev, message: prev.message + emoji.emoji }))
                    }}
                  />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
            
            <label className="group relative inline-block cursor-pointer text-iconColor">
              <Image />
              <ToolTip title="Add an image" />

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(ev) => {
                  if (!ev.target.files[0]) return

                  if (ev.target.files[0].size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
                    toast.error('Image file large than 1.5MB')
                    return
                  }

                  setRawImage(ev.target.files[0])
                }}
              />
            </label>

            <GifPickerBox onChange={(url) => setForm((prev) => ({ ...prev, gif: url }))}>
              <GifBox />
            </GifPickerBox>

            <AddLinkBox onChange={(link) => setForm((prev) => ({ ...prev, link }))}>
              <Link />
            </AddLinkBox>

            <button
              disabled={loading}
              type="submit"
              className=" ml-auto w-full max-w-[6rem] rounded-sm bg-primary px-4 py-1 font-Lato text-white disabled:bg-opacity-80"
              onClick={async () => {
                if (form.recipients.length === 0) {
                  toast.error('Add atleast one recipient')
                  return
                }
                if (form.hashtags.length === 0) {
                  toast.error('Add atleast one hashtag')
                  return
                }
                if (form.message.length === 0) {
                  toast.error('Add a message')
                  return
                }

                const recipients = form.recipients.filter((user) => user.id !== me.data.id)
                const data = CreatePost(me.data, post.id, { ...form, recipients })
                const formData = toFormData(data)
                try {
                  setLoading(true)
                  await api.transactions.new(formData)
                  await queryClient.refetchQueries('transactions')
                  await queryClient.refetchQueries('me')

                  onClose()
                } catch {
                  toast.error('Transaction failed. Server error')
                } finally {
                  setLoading(false)
                }
              }}
            >
              {loading === true ? <>&middot; &middot; &middot;</> : 'Give'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
