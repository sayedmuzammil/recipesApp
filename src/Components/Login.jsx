import { useState } from 'react';
import {
  FaUserCircle,
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const tooglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {/* background */}
      <div className="w-[50%] outline-1 outline-gray-300 rounded-md shadow-2xl">
        <div className="m-10">
          {/*text: "welcome back", login to your account */}

          <div className="block text-[#E23E3E] font-bold text-2xl/9">
            {/* text : welcome back */}
            <p>Welcome back!</p>
          </div>

          <div className="text-gray-500">
            {/* text : login to your account */}
            <p>Login to your account</p>
          </div>
        </div>

        <div className="w-full p-5 mt-10 ">
          {/* username, password */}
          <div className="w-full flex items-center gap-2 p-2 mb-3 rounded-xl outline-1 outline-gray-300 ">
            {/* username -> icon + input field */}
            <FaUserCircle className="ml-2" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-none"
            />
          </div>
          <div className="w-full flex items-center gap-2 p-2 mt-3 rounded-xl outline-1 outline-gray-300">
            {/* password -> icon + input field*/}
            <RiLockPasswordFill className="ml-2" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className=" w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-none"
            />

            {showPassword ? (
              <FaRegEyeSlash
                className="mr-2"
                onClick={tooglePassword}
              />
            ) : (
              <FaRegEye className="mr-2" onClick={tooglePassword} />
            )}
          </div>

          <div
            className="flex w-full mb-4 items-center justify-between"
            style={{ marginTop: '1rem' }}
          >
            {/* remember Me + forgot password */}
            <div className=" flex items-center">
              {/* remember me */}
              <input type="checkbox" name="check" className="mr-2" />
              <label>Remember Me</label>
            </div>
            <div className="justify-end text-[#E23E3E]">
              {/* forget password */}
              <p>Forget Password?</p>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-[#E23E3E] hover:opacity-90 text-white rounded-2xl"
          >
            {/* button login */}
            LOG IN
          </button>
          <div className="mt-5 mb-10">
            {/* sign up */}
            <p>
              You don't have an account ?{' '}
              <Link to="/register" style={{ color: '#E23E3E' }}>
                SIGN-UP
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
