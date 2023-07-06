import * as Dialog from '@radix-ui/react-dialog'
import imageCompression from 'browser-image-compression'
import React, { useCallback, useRef, useState } from 'react'
import ReactEasyCropper from 'react-easy-crop'

export default function Cropper({ imageFile, onClose }) {
  const [loading, setLoading] = React.useState('')
  const [open, setOpen] = React.useState(true)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [cropAreaPixels, setCropAreaPixels] = React.useState({
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
  })
  const [zoom, setZoom] = useState(1)
  const [image] = useState(() => URL.createObjectURL(imageFile))
  const controller = useRef(new AbortController())

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCropAreaPixels(croppedAreaPixels)
  }, [])

  async function saveImage({ x, y, width, height }) {
    return new Promise((res) => {
      const _img = new Image()
      _img.src = image
      _img.onload = async () => {
        let canvas1 = document.createElement('canvas')
        canvas1.width = width
        canvas1.height = height
        let ctx1 = canvas1.getContext('2d')
        ctx1.drawImage(_img, x, y, width, height, 0, 0, width, height)
        canvas1.toBlob((blob) => {
          const size = blob.size / 1024 / 1024
          if (blob.size / 1024 / 1024 < 2.9) {
            const file = new File([blob], 'image.jpeg', { type: 'image/jpeg' })
            res(file)
            return
          }

          controller.current.abort()
          controller.current = new AbortController()
          imageCompression(blob, {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            signal: controller.current.signal,
          }).then((compressed) => {
            const file = new File([compressed], 'image.jpeg', { type: 'image/jpeg' })
            res(file)
          })
        })
      }
    })
  }

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-20" onClick={() => setOpen(false)} />

        <Dialog.Content className="fixed left-1/2 top-2/5 z-[99] w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-[10px] border-400 bg-white p-[13px] shadow-md">
          <div className="relative aspect-video w-full">
            <ReactEasyCropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={(_, area) => setCropAreaPixels(area)}
              onZoomChange={setZoom}
              showGrid={false}
            />
          </div>

          <div className="mt-8 text-right">
            <button
              disabled={loading}
              type="submit"
              className=" ml-auto w-full max-w-[6rem] rounded-sm bg-primary px-4 py-1 font-Lato text-white disabled:bg-opacity-80"
              onClick={async () => {
                try {
                  setLoading(true)
                  onClose(await saveImage(cropAreaPixels))
                  setOpen(false)
                } finally {
                  setLoading(false)
                }
              }}
            >
              {loading === true ? <>&middot; &middot; &middot;</> : 'Done'}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
