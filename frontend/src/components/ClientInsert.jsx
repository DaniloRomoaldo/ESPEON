/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import ElementName from "./ElementName";

export default function InsertClientElement({ name }) {
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
        <path d="M5 12h14"></path>
      </svg>
      <ElementName name={name} />
    </div>
  );
}
