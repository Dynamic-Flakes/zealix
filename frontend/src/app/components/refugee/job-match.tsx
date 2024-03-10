export default function JobMatch() {
  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="w-full p-[20px] text-[25px] sm:px-[60px] sm:pt-[40px]">Job Match</div>
      <div className="t-[18px] flex min-h-[200px] items-center justify-center">
        {`You do not have any new `} <div className="pl-[4px] text-warning"> Job Matches.</div>
      </div>
    </div>
  )
}
