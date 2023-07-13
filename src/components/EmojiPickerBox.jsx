import * as React from "react"
import ToolTip from '@/components/ToolTip'
import * as Popover from '@radix-ui/react-popover'
import EmojiPicker from 'emoji-picker-react'

export default function EmojiPickerBox({ onClick, children }) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger className="group relative inline-block cursor-pointer text-iconColor">
        {children}
        <ToolTip title="Add an emoji" />
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="z-20">
          <EmojiPicker onEmojiClick={(emoji) => {
            setOpen(false)
            onClick(emoji)
          }} />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
