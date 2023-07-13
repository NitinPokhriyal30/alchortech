import ToolTip from '@/components/ToolTip'
import { MAX_IMAGE_SIZE_MB } from '@/constant'
import * as React from 'react'
import { toast } from 'react-toastify'

export default function ImagePickerBox({ onChange, children }) {
  return (
    <label className="group relative inline-block cursor-pointer text-iconColor">
      {children}
      <ToolTip title="Add an image" />

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(ev) => {
          if (!ev.target.files[0]) return

          if (ev.target.files[0].size / 1024 / 1024 > MAX_IMAGE_SIZE_MB) {
            toast.error('Image file large than 1.5MB')
            return
          }

          onChange(ev.target.files[0])
        }}
      />
    </label>
  )
}
