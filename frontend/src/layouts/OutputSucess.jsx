// eslint-disable-next-line react/prop-types
export default function OutputSucess({ data }) {
  return (
    <div className="h-full w-full overflow-auto m-2 bg-[#131315]">
      <div className="flex items-center gap-2 text-[rgba(10,160,20,0.7)]">
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="css-i6dzq1"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
        <span className="font-light">{data}</span>
      </div>
    </div>
  );
}
