import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SimpleSideNav from './SimpleSideNav';
import ViewAttendance from './Students/ViewAttendance/ViewAttendance';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userDataActions } from '../../store/userDataSlice';
import AnalyseAttendance from './Students/AnalyseAttendance/AnalyseAttendance';
import AccountSettings from './Students/AccountSettings/AccountSettings';
import FeedAttendance from './Teachers/FeedAttendance/FeedAttendance';
import AnalyseAttendanceTeachers from './Teachers/AnalyseAttendanceTeachers/AnalyseAttendanceTeachers';
import TeacherAccountSettings from './Teachers/AccountSettings/TeacherAccountSetting';

function Dashboard() {
  let history = useNavigate();
  const dispatch = useDispatch();

  axios.interceptors.request.use(function (config) {
    config.headers.authToken = localStorage.getItem('token');
    return config;
  });

  // const type = useSelector(state => state.type.type)
  const type = localStorage.getItem('type');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const getUser = async () => {
        const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/auth/getuser`;
        const userData = await axios
          .post(url, { type: type })
          .catch((err) => alert(err));
        dispatch(userDataActions.setUserData(userData.data[0]));
      };

      getUser();
    } else {
      history('/');
    }
  }, []);

  const active = useSelector((state) => state.navItem.number);

  const activeComponent = () => {
    switch (active) {
      case 0:
        return type === 'student' ? <ViewAttendance /> : <FeedAttendance />;
      case 1:
        return type === 'student' ? (
          <AnalyseAttendance />
        ) : (
          <AnalyseAttendanceTeachers />
        );
      case 2:
        return type === 'student' ? (
          <AccountSettings />
        ) : (
          <TeacherAccountSettings />
        );
      default:
        return <ViewAttendance />;
    }
  };

  return (
    <div className="w-screen flex h-screen overflow-hidden">
      <SimpleSideNav />
      {activeComponent()}
    </div>
  );
}

export default Dashboard;
