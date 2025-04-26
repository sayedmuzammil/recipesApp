import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import {
  FaUserCircle,
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../supabase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const tooglePassword = () => setShowPassword(!showPassword);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let emailErr = false;
    let passwordErr = false;

    if (email.trim() === '') {
      setErrorEmail('Please enter your email');
      emailErr = true;
    } else {
      setErrorEmail('');
    }
    if (password === '') {
      setErrorPassword('Please enter your password');
      passwordErr = true;
    } else {
      setErrorPassword('');
    }

    if (emailErr === false || passwordErr === false) {
      checkLogin(email, password);
    }
  };

  const checkLogin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login failed:', error.message);
      setError(error.message); // show error message on screen
    } else {
      console.log('Login success:', data);
      setError('');
      const username = data.user.user_metadata.display_name;
      console.log('user: ', username);

      localStorage.setItem('username', username);

      navigate('/home'); // change '/dashboard' to your desired route after login
    }
  };

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
        <form onSubmit={handleSubmit}>
          <div className="w-full p-5 mt-10 ">
            {/* username, password */}
            <div
              className={`w-full flex items-center gap-2 p-2 mb-3 rounded-xl outline-1 ${
                errorEmail ? 'outline-red-500' : 'outline-gray-300'
              }  `}
            >
              {/* username -> icon + input field */}
              <FaUserCircle className="ml-2" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-none"
              />
            </div>
            {errorEmail && (
              <p className="text-red-500 text-sm text-left mt-[-0.5rem]">
                {errorEmail}
              </p>
            )}
            <div
              className={`w-full flex items-center gap-2 p-2 mt-3 rounded-xl outline-1 ${
                errorPassword ? 'outline-red-500' : 'outline-gray-300'
              } `}
            >
              {/* password -> icon + input field*/}
              <RiLockPasswordFill className="ml-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {errorPassword && (
              <p className="text-red-500 text-sm text-left mt-[0.5rem]">
                {errorPassword}
              </p>
            )}

            <div
              className="flex w-full mb-4 items-center justify-between"
              style={{ marginTop: '1rem' }}
            >
              {/* remember Me + forgot password */}
              <div className=" flex items-center">
                {/* remember me */}
                <input
                  type="checkbox"
                  name="check"
                  className="mr-2"
                />
                <label>Remember Me</label>
              </div>
              <div className="justify-end text-[#E23E3E]">
                {/* forget password */}
                <p>Forget Password?</p>
              </div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
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
        </form>
      </div>
    </div>
  );
};

export default Login;
