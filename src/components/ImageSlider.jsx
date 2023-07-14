import React, { useEffect } from 'react'

const ImageSlider = () => {
  const bgs = ['bg-hero-slider3', 'bg-hero-slider3', 'bg-hero-slider3']
  const [counter, setCounter] = React.useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setCounter((p) => (p + 1) % bgs.length)
    }, 2000)

    return () => clearInterval(id)
  }, [])

  const prevBg = bgs[(counter + bgs.length - 1) % bgs.length]
  const bg = bgs[counter]

  return (
    <div className="relative flex overflow-x-hidden rounded-lg">
      <div
        key={'-' + counter}
        style={{ flexBasis: '100%' }}
        className={`w-full flex-shrink-0 flex-grow animate-slide-left px-0`}
      >
        <div className={`bg-cover bg-center bg-no-repeat ${prevBg} rounded-lg px-8 pb-10 pt-8`}>
          <p className="font-Lato text-[25px] font-black leading-8 text-white	">
            Take our Survey <br /> & Earn High5 Points
          </p>
          <div className="mt-5">
            <button className="bg-[#292929] px-3 py-1 font-Lato text-sm text-white">
              Take Now
            </button>
          </div>
        </div>
      </div>

      <div
        key={counter}
        style={{ flexBasis: '100%' }}
        className={`w-full flex-shrink-0 flex-grow animate-slide-left px-0`}
      >
        <div className={`bg-cover bg-center bg-no-repeat ${bg} rounded-lg px-8 pb-10 pt-8`}>
          <span className="font-Lato text-[25px] font-black leading-8 text-white">
            Take our Survey <br /> &amp; Earn High5 Points
          </span>
          <div className="mt-5">
            <button className="bg-[#292929] px-3 py-1 font-Lato text-sm text-white">
              Take Now
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-5 z-10 flex justify-center gap-1.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-[7px] w-[7px] rounded-full transition-colors"
            style={{
              backgroundColor:
                i === counter ? 'rgba(255, 255, 255, 100%)' : 'rgba(255, 255, 255, 39%)',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
