import React, { useState } from 'react';
import Button from './Button';
import FormGroup from './FormGroup';
import InputGroup from './InputGroup';
import { useDispatch } from 'react-redux';
import { notificationActions } from '../../store/notificationSlice';
import logo from '../../assets/logo2.svg';

function SideSignup() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const type = localStorage.getItem('type');

  let dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/createuser`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password, type: type }),
      }
    );

    response.status === 200
      ? dispatch(
        notificationActions.setNotification({
          type: 'success',
          message:
            'Verification email sent please verify your account to continue.',
        })
      )
      : dispatch(
        notificationActions.setNotification({
          type: 'danger',
          message:
            'A user with this email already exist or not authenticated by collage!',
        })
      );
    e.target.reset();
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
            <h2 className="text-3xl font-bold text-gray-800">Signup to SAS</h2>
            <p className="mt-3 text-gray-800">
              Use collage id for Signup! Already a user?
              <a href="/login" className="text-blue-400">
                &nbsp;Login
              </a>
            </p>
          </div>
          <div className="mt-12">
            <FormGroup>
              <InputGroup
                type="email"
                name="email"
                placeholder="Collage email address"
                onChange={handleEmail}
              />
            </FormGroup>
            <FormGroup>
              <InputGroup
                type="password"
                name="password"
                placeholder="password"
                onChange={handlePassword}
              />
            </FormGroup>
            <FormGroup>
              <Button text="Sign Up" submit full />
            </FormGroup>

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

export default SideSignup;
