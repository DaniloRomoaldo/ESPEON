// eslint-disable-next-line react/prop-types
export default function OutputError({data}){
    return(
        <div className="h-full w-full overflow-auto m-2 bg-[#131315]">
            <div className="flex items-center gap-2 text-[rgb(204,154,53)]">
                <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span className="font-light">{data}</span> 
            </div>
        </div>
    )
}