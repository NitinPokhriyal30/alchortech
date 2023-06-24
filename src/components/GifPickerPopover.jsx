import * as React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'
import * as Popover from '@radix-ui/react-popover'

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
          className="rounded-md shadow-md border border-translucent px-4 bg-white  overflow-scroll h-[25rem] "
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
              className="block border flex-1 rounded h-full focus:outline-primary px-1"
              placeholder="Search gifs"
            />

            <button className="rounded bg-primary text-white w-24" type="submit">
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
                      className="mx-auto w-[200px] h-[200px] pt-4 block"
                    >
                      <div className="bg-translucent hover:bg-primary-400 rounded"></div>
                    </button>
                  ))
              : gifs.map((gifO) => (
                  <Popover.Close
                    key={gifO.id}
                    className="sm:w-[200px] w-full pt-4 block"
                    onClick={() => props.onClick(gifO.images.original.url)}
                    type="button"
                  >
                    <div className="bg-translucent">
                      <img
                        src={gifO.images.fixed_width.url}
                        style={{ maxHeight: gifO.images.fixed_width.height + 'px' }}
                        className="mx-auto w-[200px] rounded overflow-hidden"
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
