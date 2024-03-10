export default function MyResume() {
  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="w-full p-[20px] text-[25px] sm:px-[60px] sm:pt-[40px]">My Resume</div>
      <div className="t-[18px] flex min-h-[200px] items-center justify-center">
        {`You are yet to setup your `} <div className="pl-[4px] text-warning"> Live Resume.</div>
      </div>
    </div>
  )
}
