import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ValidateOTP = () => {
  return (
    <div className="flex w-full h-screen items-center justify-center">
      {/* Background */}
      <div className="w-[50%] outline-1 outline-gray-300 rounded-md shadow-2xl">
        <div className="m-10">
          <div className=" block text-[#E23E3E] font-bold text-2xl/9">
            {/* OTP confirmatio   n */}
            <p>OTP Confirmation</p>
          </div>
          <div className="text-gray-500">
            {/* Note */}
            <p>Please enter 111111 below!</p>
          </div>
        </div>
        <div>{/* 2 minutes timer */}</div>
        <div className="w-full p-5">
          <div className="flex flex-nowrap justify-center gap-3 mb-5">
            {/* 6 digit OTP */}
            <input
              type="text"
              maxLength={1}
              className="w-15 h-20 mr-2 text-center  text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              maxLength={1}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              maxLength={1}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              maxLength={1}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              maxLength={1}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              maxLength={1}
              className="w-15 h-20 text-center text-2xl outline-1 rounded-2xl"
            ></input>
          </div>

          <button
            type="submit"
            className="w-full p-2 mt-4 mb-10 bg-[#E23E3E] hover:opacity-90 text-white rounded-2xl"
          >
            {/* button Confirm */}
            Confirm OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ValidateOTP;
