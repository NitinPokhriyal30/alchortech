import * as React from 'react'
import { AiOutlineLoading } from 'react-icons/ai'

let _id = 0
let noop = () => {}
export default function HoveringWidget({
  className = '',
  style = {},
  onClose = noop,
  children,
  ...props
}) {
  const [id] = React.useState(props.id || ++_id)
  const [x, setX] = React.useState(0)
  /** @type {{current: HTMLDivElement}} */
  const innerRef = React.useRef(null)
  const hasMounted = React.useRef(false)

  React.useEffect(() => {
    document.addEventListener('click', (ev) => {
      const targetElm = ev.target
      const boxElm = innerRef.current

      if (boxElm != null && !boxElm.contains(targetElm) && hasMounted.current) {
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

  return (
    <div
      ref={innerRef}
      id={id}
      style={{
        transform: `translateX(${x}%)`,
        ...style,
      }}
      className={
        'rounded-md shadow-md border border-translucent px-4 bg-white absolute sm:inset-auto inset-x-0 bottom-0  overflow-scroll z-20 ' +
        className
      }
    >
      {children}
    </div>
  )
}
