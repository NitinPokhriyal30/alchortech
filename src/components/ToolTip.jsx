import * as React from 'react'

export default function ToolTip({ title = '' }) {
  return (
    <div className="opacity-0 w-20 bg-white drop-shadow-tooltipShadow text-[#747474] text-center text-xs whitespace-nowrap rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full left-[-30px]  px-3 pointer-events-none">
      {title}
      <svg
        className="absolute text-white drop-shadow-tooltipShadow h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon className="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg>
    </div>
  )
}
