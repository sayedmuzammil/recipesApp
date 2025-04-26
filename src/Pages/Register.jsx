import { useState } from 'react';
import {
  FaUserCircle,
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const tooglePassword = () => setShowPassword(!showPassword);
  const toogleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const [username, setUsername] = useState('');
  const [errorUsername, setErrorUsername] = useState('');

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] =
    useState('');
  const [checkTnC, setCheckTnC] = useState('');
  const [errorTnC, setErrorTnC] = useState('');

  const navigate = useNavigate();
  const checkInput = (e) => {
    e.preventDefault();
    let usernameErr = false;
    let emailErr = false;
    let passwordErr = false;
    let confirmPasswordErr = false;
    let tncErr = false;

    if (username === '') {
      setErrorUsername('Please enter your username');
      usernameErr = true;
    } else {
      setErrorUsername('');
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) {
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
    if (confirmPassword === '') {
      setErrorConfirmPassword('Please re-enter your password');
      confirmPasswordErr = true;
    } else if (password !== confirmPassword) {
      setErrorConfirmPassword('Your password is not match');
      confirmPasswordErr = true;
    } else {
      setErrorConfirmPassword('');
    }

    if (!checkTnC) {
      setErrorTnC('Please agree to the Term and Conditions');
      tncErr = true;
    } else {
      setErrorTnC('');
    }

    if (
      usernameErr ||
      emailErr ||
      passwordErr ||
      confirmPasswordErr ||
      tncErr
    ) {
      return;
    } else {
      navigate('/validateOTP', {
        state: { username, email, password },
      });
    }
  };

  return (
    <div className="flex w-full h-screen items-center justify-center">
      {/* background */}
      <div className="w-[50%] outline-1 outline-gray-300 rounded-md shadow-2xl">
        <div className="m-10">
          {/*text: "Create Account", Input details to create a new Account */}

          <div className="block text-[#E23E3E] font-bold text-2xl/9">
            {/* text : create account */}
            <p>Create Account!</p>
          </div>

          <div className="text-gray-500">
            {/* text : input details  account*/}
            <p>Input details to create a new Account</p>
          </div>
        </div>

        <form onSubmit={checkInput}>
          <div className="w-full p-5 mt-10 ">
            {/* email, password, confirm password */}
            <div
              className={`w-full flex items-center gap-2 p-2  rounded-xl outline-1 ${
                errorUsername ? 'outline-red-500' : 'outline-gray-300'
              }`}
            >
              {/* Username -> icon + input field */}
              <FaUserCircle className="ml-2" />
              <input
                type="text"
                name="username"
                placeholder="username"
                value={username}
                minLength={5}
                maxLength={15}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-none"
              />
            </div>
            {errorUsername && (
              <p className="text-red-500 text-sm text-left mt-[0.5rem]">
                {errorUsername}
              </p>
            )}
            <div
              className={`w-full flex items-center gap-2 p-2 mt-3 rounded-xl outline-1 ${
                errorEmail ? 'outline-red-500' : 'outline-gray-300'
              }`}
            >
              {/* email -> icon + input field */}
              <FaUserCircle className="ml-2" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                minLength={3}
                maxLength={15}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-none"
              />
            </div>
            {errorEmail && (
              <p className="text-red-500 text-sm text-left mt-[0.5rem]">
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
                minLength={6} // minimum length supabase password is 6
                maxLength={10}
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
              className={`w-full flex items-center gap-2 p-2 mt-3 rounded-xl outline-1 ${
                errorConfirmPassword
                  ? 'outline-red-500'
                  : 'outline-gray-300'
              } `}
            >
              {/* confirm password -> icon + input field*/}
              <RiLockPasswordFill className="ml-2" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                minLength={3}
                maxLength={10}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className=" w-full rounded-md px-3 py-1.5 text-base text-gray-900 focus:outline-none"
              />

              {showConfirmPassword ? (
                <FaRegEyeSlash
                  className="mr-2"
                  onClick={toogleConfirmPassword}
                />
              ) : (
                <FaRegEye
                  className="mr-2"
                  onClick={toogleConfirmPassword}
                />
              )}
            </div>
            {errorConfirmPassword && (
              <p className="text-red-500 text-sm text-left mt-[0.5rem]">
                {errorConfirmPassword}
              </p>
            )}

            <div
              className="flex w-full items-center justify-between"
              style={{ marginTop: '1rem' }}
            >
              {/* Terms & Conditions */}
              <div className=" flex items-center">
                {/* Agree to Terms & Conditions */}
                <input
                  type="checkbox"
                  name="check"
                  checked={checkTnC}
                  className="mr-2"
                  onChange={() => setCheckTnC(!checkTnC)}
                />
                <label>
                  I agree to{' '}
                  <a href="#" className="text-[#E23E3E]">
                    Terms & Conditions
                  </a>
                </label>
              </div>
            </div>
            {errorTnC && (
              <p className="text-red-500 text-sm text-left mt-[0.5rem]">
                {errorTnC}
              </p>
            )}
            <button
              type="submit"
              className="w-full p-2 mt-4 bg-[#E23E3E] hover:opacity-90 text-white rounded-2xl"
            >
              {/* SIGN-UP */}
              SIGN UP
            </button>

            <div className="mt-5 mb-10">
              {/* back to login */}
              <p>
                Already have an Account ?{' '}
                <Link to="/" style={{ color: '#E23E3E' }}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
