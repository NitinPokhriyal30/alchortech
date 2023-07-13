import * as React from 'react'
import { RiLoader2Line } from 'react-icons/ri'

export default function Spinner({ isLoading }) {
  return isLoading ? (
    <span className="absolute inset-0 grid place-items-center rounded-[inherit] bg-inherit">
      <RiLoader2Line className="animate-[spin_1.5s_infinite_linear]" />
    </span>
  ) : null
}
