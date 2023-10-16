import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notificationActions } from '../../../../store/notificationSlice';

function AccountSettings() {
  const dispatch = useDispatch();
  const type = localStorage.getItem('type');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword =
      document.getElementById('confirmNewPassword').value;

    if (newPassword === confirmNewPassword && newPassword.length > 4) {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/changepassword`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            newPassword: newPassword,
            password: password,
            type: type,
          }),
        }
      );

      console.log(response);

      response.status === 200
        ? dispatch(
            notificationActions.setNotification({
              type: 'success',
              message: 'Your Password Has Been Changed',
            })
          )
        : dispatch(
            notificationActions.setNotification({
              type: 'danger',
              message: 'Some Error Occured! Please Fille Right Information',
            })
          );

      e.target.reset();
    } else {
      dispatch(
        notificationActions.setNotification({
          type: 'danger',
          message: 'Please confirm your password',
        })
      );
    }
  };

  const userData = useSelector((state) => state.userData.userData);
  return (
    <div className="w-[100%] flex align-middle items-center flex-col overflow-y-scroll py-4">
      <div className="text-center font-semibold text-3xl py-8">
        Account Settings
      </div>

      <div className="w-[80%]">
        <p className="text-xl pb-3 font-semibold">Your Details</p>

        <div className="flex justify-between border-b-2 py-3">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:{' '}
          </label>
          <p>{userData.name}</p>
        </div>

        <div className="flex justify-between border-b-2 py-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Roll Number:{' '}
          </label>
          <p>{userData.roll_number}</p>
        </div>

        <div className="flex justify-between border-b-2 py-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:{' '}
          </label>
          <p>{userData.email}</p>
        </div>

        <div className="flex justify-between border-b-2 py-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Enrollment Number:{' '}
          </label>
          <p>{userData.enrollment_number}</p>
        </div>

        <p className="text-xl py-4 font-semibold">Change Password</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Current Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter Your Current Password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="newPassword"
              type="password"
              placeholder="Enter Your New Password"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Confirm New Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmNewPassword"
              type="password"
              placeholder="Enter Your New Password"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountSettings;
