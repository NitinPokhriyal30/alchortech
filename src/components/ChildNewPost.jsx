import { api } from '@/api'
import Cropper from '@/components/Cropper'
import { AddLinkBox, HashTagsDropdown, PointsRangeDialog, toFormData } from '@/components/NewPost'
import ToolTip from '@/components/ToolTip'
import { MAX_IMAGE_SIZE_MB, SERVER_URL } from '@/constant'
import { queryClient } from '@/queryClient'
import { CreatePost } from '@/utils'
import { Close, EmojiEmotions, GifBox, Image, Link } from '@mui/icons-material'
import Cookies from 'js-cookie'
import * as React from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { GifPickerBox } from './GifPickerPopover'
import EmojiPickerBox from '@/components/EmojiPickerBox'
import ImagePickerBox from '@/components/ImagePickerBox'
import Spinner from '@/components/Spinner'
import smiley from '../assets/images/new-post/smiley.svg'
import img from '../assets/images/new-post/img.svg'
import gif from '../assets/images/new-post/gif.svg'
import link from '../assets/images/new-post/link.svg'

function validateNewPostForm(form, me) {
  let isValid = true
  if (form.recipients.length === 0) {
    toast.error('Add atleast one recipient')
    isValid = false
  }
  if (form.hashtags.length === 0) {
    toast.error('Add atleast one hashtag')

    isValid = false
  }
  if (form.message.length === 0) {
    toast.error('Add a message')
    isValid = false
  }
  if (form.point > me.points_available) {
    toast.error('You don\'t have enough points to give')

    isValid = false
  }

  return isValid
}

export default function ChildNewPost({ onClose, post, defaultPoint, sortBy, }) {

  // console.log(post);
  const me = useQuery('me', () => api.auth.me(Cookies.get('user_id')))
  const users = useQuery('users', () => api.users.profiles(), { initialData: [] })
  const [loading, setLoading] = React.useState(false)
  const [rawImage, setRawImage] = React.useState('')

  const [form, setForm] = React.useState({
    point: defaultPoint,
    recipients: post.recipients.map((user) => user.id),
    hashtags: post.hashtags,
    image: '',
    gif: '',
    link: '',
    message: '',
  })

  return (
    <>
      {/* {rawImage && (
        <Cropper
          imageFile={rawImage}
          onClose={(image) => {
            setRawImage('')
            setForm((prev) => ({ ...prev, image }))
          }}
        />
      )} */}
      <div>
        <div className="rounded-t-lg  bg-primary px-6 py-2 text-sm text-white">
          <ul className="flex flex-wrap items-center gap-y-3 divide-x divide-primary-400 first:pl-0 child:pl-4">
            {/* points button */}

            <li className="group !pl-0 pr-4">
              <PointsRangeDialog {...{ form, setForm }} />
            </li>

            <li className="group pr-4">
              <HashTagsDropdown {...{ form, setForm }} />
            </li>
          </ul>
        </div>

        {/* text field */}

        <div className="_px-6 rounded-b-lg bg-white pb-3 pt-6 text-[#b1b1b1] drop-shadow-normal">
          <div className="px-6">
            {form.point == 0 ? (
              <span>+30 </span>
            ) : (
              <span className="text-[#464646]">+{form.point} </span>
            )}
            {form.recipients
              .filter((userId) => userId !== me.data.id)
              .map((userId) => (users.data || []).find((user) => user.id === userId))

              .map((user) => (
                <span className="text-[#464646]" key={user.id}>
                  @{user.first_name} {user.last_name} { }
                </span>
              ))}{' '}
            {form.hashtags.length == 0 ? (
              <span>#HashTag</span>
            ) : (
              form.hashtags.map((tag) => (
                <span className="text-[#464646]" key={tag.name}>
                  {'#' + tag.name + ' '}
                </span>
              ))
            )}
          </div>

          <div className="border-b px-6 focus-within:border-b focus-within:border-primary">
            <textarea
              spellCheck={false}
              className="block h-10 w-full resize-none text-[#464646]  outline-none transition-all placeholder:text-[#b1b1b1]"
              placeholder="For helping me launch a marketing campaign so that we can generate new business"
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
                  className="mt-4 w-40 border rounded-md border"
                />
              </div>
            )}

            {form.gif && (
              <div>
                <div className="group flex items-center pb-2">
                  <img src={form.gif} key={form.image} className="mt-4 w-40 border rounded-md border" />

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
            <EmojiPickerBox
              onClick={(emoji) =>
                setForm((prev) => ({ ...prev, message: prev.message + emoji.emoji }))
              }
            >
              {/* <EmojiEmotions /> */}
              <img src={smiley} alt="smiley" width={'20px'} />
            </EmojiPickerBox>

            <ImagePickerBox onChange={(image) => setForm((prev) => ({ ...prev, image }))}>
              {/* <Image /> */}
              <img src={img} alt="img" width={'26px'} />
            </ImagePickerBox>

            <GifPickerBox onChange={(url) => setForm((prev) => ({ ...prev, gif: url }))}>
              {/* <GifBox /> */}
              <img src={gif} alt="gif" width={'20px'} />
            </GifPickerBox>

            <AddLinkBox onChange={(link) => setForm((prev) => ({ ...prev, link }))}>
              {/* <Link /> */}
              <img src={link} alt="link" width={'20px'} />
            </AddLinkBox>

            <button
              disabled={loading}
              type="submit"
              className="relative ml-auto w-full max-w-[6rem] rounded-sm bg-primary px-4 py-1  text-white disabled:bg-opacity-80"
              onClick={async () => {
                try {
                  setLoading(true)
                  const recipients = form.recipients
                    .filter((userId) => userId !== me.data.id)
                    .join(',')
                  // const hashtags = form.hashtags.map(({ name }) => name).join(',')

                  if (recipients.length === 0) {
                    toast.error('Cant give points to your self')
                    return
                  }
                  if (!validateNewPostForm(form, me.data)) return

                  const data = CreatePost(me.data.id, post.id, { ...form, recipients, hashtags: form.hashtags.map(item => item.name).join(',') })
                  const formData = toFormData(data)
                  const newTransaction = await api.transactions.new(formData)
                  newTransaction.sender.avtar = newTransaction.sender.avtar?.substring(
                    SERVER_URL.length
                  ) || ''
                  queryClient.setQueryData(['transaction', sortBy], (prev) => {
                    if (!prev) return
                    const targetPost = prev.find((_post) => _post.id === post.id)
                    if (targetPost) targetPost.children.push(newTransaction)

                    return [...prev]
                  })
                  await queryClient.refetchQueries('me')

                  onClose()
                } catch (e) {
                  console.log('child-new-post', e)
                  toast.error('Transaction failed. Server error')
                } finally {
                  setLoading(false)
                }
              }}
            >
              <Spinner isLoading={loading} />
              Give
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
