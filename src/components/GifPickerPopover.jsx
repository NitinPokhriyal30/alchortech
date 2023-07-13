import * as React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import * as Popover from '@radix-ui/react-popover'
import ToolTip from '@/components/ToolTip'

let _id = 0
let noop = () => {}
export default function GifPicker({ onClose = noop, ...props }) {
  const [id] = React.useState(props.id || ++_id)
  const [gifs, setGifs] = React.useState(null)
  const [loading, setLoading] = React.useState('')

  React.useEffect(() => {
    searchGifs()
  }, [])

  function searchGifs(text) {
    setLoading('gifs')
    fetch(
      text
        ? `https://api.giphy.com/v1/gifs/search?api_key=Wfvwu8YYvWGy2rxlXFs7ad6h987KnSp1&q=${text}&limit=24&offset=0&rating=g&lang=en`
        : 'https://api.giphy.com/v1/gifs/trending?api_key=Wfvwu8YYvWGy2rxlXFs7ad6h987KnSp1&limit=24&rating=g'
    )
      .then((r) => r.json())
      .then((r) => {
        setGifs(r.data)
        setLoading('')
      })
  }

  return (
    <Popover.Portal>
      <Popover.Content className="z-20">
        <div
          id={id}
          className="h-[25rem] overflow-scroll rounded-md border border-translucent bg-white  px-4 shadow-md "
        >
          <form
            className="mt-4 flex gap-4"
            onSubmit={(ev) => {
              ev.preventDefault()
              const text = ev.currentTarget.elements.query.value
              searchGifs(text)
            }}
          >
            <input
              name="query"
              className="block h-full flex-1 rounded border px-1 focus:outline-primary"
              placeholder="Search gifs"
            />

            <button className="w-24 rounded bg-primary text-white" type="submit">
              {loading === 'gifs' ? (
                <AiOutlineLoading fontSize="inherit" className="mx-auto animate-spin" />
              ) : (
                'Search'
              )}
            </button>
          </form>

          <div className="columns-2 gap-4">
            {gifs == null
              ? Array(10)
                  .fill(0)
                  .map((height, i) => (
                    <button
                      type="button"
                      key={i}
                      className="mx-auto block h-[200px] w-[200px] pt-4"
                    >
                      <div className="rounded bg-translucent hover:bg-primary-400"></div>
                    </button>
                  ))
              : gifs.map((gifO) => (
                  <Popover.Close
                    key={gifO.id}
                    className="block w-full pt-4 sm:w-[200px]"
                    onClick={() => props.onClick(gifO.images.original.url)}
                    type="button"
                  >
                    <div className="bg-translucent">
                      <img
                        src={gifO.images.fixed_width.url}
                        style={{ maxHeight: gifO.images.fixed_width.height + 'px' }}
                        className="mx-auto w-[200px] overflow-hidden rounded"
                      />
                    </div>
                  </Popover.Close>
                ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Portal>
  )
}

export function GifPickerBox({ children, onChange }) {
  return (
    <Popover.Root>
      <Popover.Trigger className="group relative inline-block text-iconColor">
        {children}
        <ToolTip title="Add a gif" />
      </Popover.Trigger>

      <GifPicker onClick={onChange} />
    </Popover.Root>
  )
}
