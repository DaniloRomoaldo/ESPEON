/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ElementName from "../ElementName";

export default function FunctionsIcon({ name }) {
  return (
    <div className="flex items-center gap-x-3">
      <svg
        className="shrink-0 size-4 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
          <path d="M5 16V9h14V2H5l14 14h-7m-7 0l7 7v-7m-7 0h7"></path>
        </svg>
      </svg>
      <ElementName name={name} />
    </div>
  );
}
