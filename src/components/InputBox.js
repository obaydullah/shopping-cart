import React from "react";

export default function InputBox({ labelText, id, ...attributes }) {
  return (
    <>
      <label
        htmlFor={id}
        className="block text-left text-gray-500 text-sm py-2"
      >
        {labelText}
      </label>
      <input
        className="block w-full focus:outline-none p-2 text-sm mb-1"
        {...attributes}
        id={id}
      />
    </>
  );
}
