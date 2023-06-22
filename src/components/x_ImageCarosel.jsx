import * as React from 'react'

export default function ImageCarosel({ ...props }) {
  const [counter, setCounter] = React.useState(0)

  React.useEffect(() => {
    const id = setInterval(() => {
      setCounter((p) => (p + 1) % props.images.length)
    }, 2000)

    return () => clearInterval(id)
  }, [])

  const prevCounter = (counter + props.images.length - 1) % props.images.length

  return (
    <>
      <div className="max-h-[12rem] relative overflow-hidden flex whitespace-nowrap rounded-lg ">
        <img
          key={'-' + counter}
          style={{ flexBasis: '100%' }}
          className="w-full flex-1 flex-shrink-0 object-cover animate-slide-left"
          src={props.images[prevCounter].src}
        />

        <img
          key={counter}
          style={{ flexBasis: '100%' }}
          className="w-full flex-1 flex-shrink-0 object-cover animate-slide-left"
          src={props.images[counter].src}
        />

        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 z-10 space-x-2">
          {props.images.map((_, i) => (
            <span
              key={i}
              className={`shadow inline-block w-2 h-2 rounded-full border ${counter === i ? 'bg-white' : 'bg-translucent-white'
                }`}
            ></span>
          ))}
        </div>
      </div>
    </>
  )
}
