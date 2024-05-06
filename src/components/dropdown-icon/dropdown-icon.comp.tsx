import React from "react";

function DropdownIcon({ status }: { status: boolean }) {
  return status ? (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.6667 10L8.52071 6.44626C8.22112 6.18946 7.77904 6.18946 7.47945 6.44626L3.33341 10"
        stroke="#ACADB9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.33325 6L7.47929 9.55374C7.77888 9.81054 8.22096 9.81054 8.52055 9.55374L12.6666 6"
        stroke="#ACADB9"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default DropdownIcon;
