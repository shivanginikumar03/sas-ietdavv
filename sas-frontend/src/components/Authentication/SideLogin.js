import React, { useState } from 'react';
import Button from './Button';
import FormGroup from './FormGroup';
import InputGroup from './InputGroup';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions } from '../../store/loadingSlice';
import { notificationActions } from '../../store/notificationSlice';
import logo from '../../assets/logo2.svg';

function SideLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  let history = useNavigate();
  const dispatch = useDispatch();
  // const type = useSelector(state => state.type.type)
  const type = localStorage.getItem('type');

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(
      loadingActions.setLoading({ loading: true, msg: 'Authenticating...' })
    );
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
          type: type,
        }),
      }
    );

    const json = await response.json();

    dispatch(loadingActions.setLoading({ loading: false, msg: 'loading' }));
    if (response.status === 200) {
      localStorage.setItem('token', json.authToken);
      history('/dashboard');
    } else {
      dispatch(
        notificationActions.setNotification({
          type: 'danger',
          message: 'Incorrect Email or Password!',
        })
      );
    }
  };

  const handleEmail = (e) => {
    setCredentials({ ...credentials, email: e });
  };

  const handlePassword = (e) => {
    setCredentials({ ...credentials, password: e });
  };

  return (
    <div className="absolute w-screen h-screen flex">
      <div className="hidden lg:block w-5/12 h-full">
        <img
          src="https://content3.jdmagicbox.com/comp/indore/d6/0731px731.x731.171001174539.g3d6/catalogue/iet-davv-khandwa-road-indore-education-consultants-tv769yp9sl.jpg?clr=1b2b4b"
          className="w-full h-full object-cover"
          alt="clg"
        />
      </div>
      <div className="w-full lg:w-7/12 overflow-scroll py-10 relative">
        <form
          className="w-5/6 sm:w-1/2 mx-auto text-center"
          onSubmit={handleSubmit}
        >
          <img src={logo} className="block mx-auto w-3/4 py-2" alt="logo" />
          <div className="mt-3 sm:mt-10">
            <h2 className="text-3xl font-bold text-gray-800">
              {type === 'student' ? 'Welcome back' : 'Faculty Login'}
            </h2>
            <p className="mt-3 text-gray-800">
              New to Student Attendance System?{' '}
              <a href="/signup" className="text-blue-400">
                Sign up
              </a>
            </p>
          </div>
          <div className="mt-12">
            <FormGroup>
              <InputGroup
                type="email"
                name="email"
                placeholder="Your email address"
                onChange={handleEmail}
                value={credentials.email}
              />
            </FormGroup>
            <FormGroup>
              <InputGroup
                type="password"
                name="password"
                placeholder="Your password"
                onChange={handlePassword}
                value={credentials.password}
              />
            </FormGroup>
            <FormGroup>
              <Button text="Log In" submit full />
            </FormGroup>
            <div className="text-right">
              <a href="/" className="text-blue-400">
                Forgot your password?
              </a>
            </div>

            <div className="mt-6 border-t border-b border-gray-300"></div>

            <p className="text-sm mt-6 text-left">
              By continuing you accept our{' '}
              <a href="/" className="text-blue-400">
                Terms of Use
              </a>{' '}
              and{' '}
              <a href="/" className="text-blue-400">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SideLogin;
