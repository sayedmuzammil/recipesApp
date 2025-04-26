import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import supabase from '../supabase';

const ValidateOTP = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const inputArr = useRef([]);
  const [error, setError] = useState('');

  const inputChange = (e, index) => {
    const value = e.target.value;
    // Only allow numeric values
    if (!/^[0-9]?$/.test(value)) {
      e.target.value = '';
      return;
    }

    if (value && index < inputArr.current.length - 1) {
      inputArr.current[index + 1].focus();
    }
  };

  const inputBackspaceChange = (e, index) => {
    if (e.key === 'Backspace' && !e.target.value && index > 0) {
      inputArr.current[index - 1].focus();
    }
  };

  const checkOTP = async () => {
    const otp = inputArr.current.map((ref) => ref.value).join('');
    try {
      if (otp === '111111') {
        const { username, email, password } = state;

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { display_name: username } },
        });

        if (error) {
          setError(error.message);
        } else {
          alert('Registration is sucessfull!. Please Login');
          navigate('/');
        }
      } else {
        setError('Invalid OTP. Please enter 111111.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

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
            {/* Option 1 : Map */}

            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                ref={(el) => (inputArr.current[i] = el)}
                onChange={(e) => inputChange(e, i)}
                onKeyDown={(e) => inputBackspaceChange(e, i)}
                className="w-[60px] h-[80px] text-center text-2xl outline-1 rounded-2xl"
              />
            ))}

            {/* Option 2 : Manual input */}
            {/* 
            <input
              type="text"
              key={1}
              maxLength={1}
              ref={(el) => (inputArr.current[0] = el)}
              onChange={(e) => inputChange(e, 0)}
              onKeyDown={(e) => inputBackspaceChange(e, 0)}
              className="w-15 h-20 mr-2 text-center  text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              key={2}
              maxLength={1}
              ref={(el) => (inputArr.current[1] = el)}
              onChange={(e) => inputChange(e, 1)}
              onKeyDown={(e) => inputBackspaceChange(e, 1)}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              key={3}
              maxLength={1}
              ref={(el) => (inputArr.current[2] = el)}
              onChange={(e) => inputChange(e, 2)}
              onKeyDown={(e) => inputBackspaceChange(e, 2)}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              key={4}
              maxLength={1}
              ref={(el) => (inputArr.current[3] = el)}
              onChange={(e) => inputChange(e, 3)}
              onKeyDown={(e) => inputBackspaceChange(e, 3)}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              key={5}
              maxLength={1}
              ref={(el) => (inputArr.current[4] = el)}
              onChange={(e) => inputChange(e, 4)}
              onKeyDown={(e) => inputBackspaceChange(e, 4)}
              className="w-15 h-20 mr-2 text-center text-2xl outline-1 rounded-2xl"
            ></input>
            <input
              type="text"
              key={6}
              maxLength={1}
              ref={(el) => (inputArr.current[5] = el)}
              onChange={(e) => inputChange(e, 5)}
              onKeyDown={(e) => inputBackspaceChange(e, 5)}
              className="w-15 h-20 text-center text-2xl outline-1 rounded-2xl"
            ></input>
             */}
          </div>
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-center mb-3">{error}</p>
          )}

          <button
            type="submit"
            onClick={checkOTP}
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
