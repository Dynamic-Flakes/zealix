export default function CandidateShortlist() {
  return (
    <div className="h-[80vh] overflow-y-auto">
      <div className="w-full p-[20px] text-[25px] sm:px-[60px] sm:pt-[40px]">
        Candidate Shortlist
      </div>
      <div className="t-[18px] flex min-h-[200px] items-center justify-center">
        {`No candidate has been `} <div className="pl-[4px] text-warning"> Shortlisted.</div>
      </div>
    </div>
  )
}
