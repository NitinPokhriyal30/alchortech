import * as React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

let _id = 0
let noop = () => {}
export default function GifPicker({ onClose = noop, ...props }) {
  const [id] = React.useState(props.id || ++_id)
  const [gifs, setGifs] = React.useState(null)
  const [loading, setLoading] = React.useState('')
  const [x, setX] = React.useState(0)
  /** @type {{current: HTMLDivElement}} */
  const innerRef = React.useRef(null)
  const hasMounted = React.useRef(false)

  React.useEffect(() => {
    searchGifs()
  }, [])

  React.useEffect(() => {
    document.addEventListener('click', (ev) => {
      const targetElm = ev.target
      const gifPickerElm = innerRef.current

      if (gifPickerElm != null && !gifPickerElm.contains(targetElm) && hasMounted.current) {
        console.log(hasMounted)
        onClose()
      }
    })

    if (innerRef.current == null) return
    const bounds = innerRef.current.getBoundingClientRect()
    if (bounds.width + bounds.x > window.innerWidth) {
      setX(-100)
    }

    setTimeout(() => (hasMounted.current = true))
  }, [])

  const randomHeights = [36, 24, 36, 48]

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
    <div
      ref={innerRef}
      id={id}
      style={{
        transform: `translateX(${x}%)`,
      }}
      className="rounded-md shadow-md border border-translucent px-4 bg-white absolute sm:inset-auto inset-x-0 bottom-0  overflow-scroll h-[25rem] z-20"
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
              .map(() => randomHeights[Math.round(Math.random() * randomHeights.length)])
              .map((height, i) => (
                <button type="button" key={i} className="mx-auto w-[200px] pt-4 block">
                  <div
                    style={{ height: 0.25 * height + 'rem' }}
                    className="bg-translucent hover:bg-primary-400 rounded"
                  ></div>
                </button>
              ))
          : gifs.map((gifO) => (
              <button
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
              </button>
            ))}
      </div>
    </div>
  )
}
