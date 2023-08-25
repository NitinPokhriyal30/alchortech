export default function IconBtn({ icon: Icon, label, className, ...props }) {
  return (
    <div className="flex flex-col items-center text-[14px]">
      <button type="button" className={'aspect-square rounded-full border border-inherit p-3 ' + className} {...props}>
        <Icon className="fill-inherit" />
      </button>
      <span>{label}</span>
    </div>
  )
}
