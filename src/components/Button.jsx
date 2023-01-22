import React from "react";

const Button = ({ nextPage, prevPage }) => {
  return (
    <div className="flex justify-between mx-20 text-white my-4">
      <button
        onClick={prevPage}
        className="hover:bg-[#E4453B] p-2 px-6 rounded shadow-xl active:scale-110 bg-red-600"
      >
        Prev
      </button>
      <button
        onClick={nextPage}
        className="hover:bg-[#E4453B] p-2 px-6 rounded shadow-xl active:scale-110 bg-red-600"
      >
        Next
      </button>
    </div>
  );
};

export default Button;
