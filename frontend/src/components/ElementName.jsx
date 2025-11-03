/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

export default function ElementName({ name }) {
  return (
    <div className="grow">
      <span className="text-xs sm:text-sm md:text-base text-gray-100 dark:text-neutral-200">
        {name}
      </span>
    </div>
  );
}
