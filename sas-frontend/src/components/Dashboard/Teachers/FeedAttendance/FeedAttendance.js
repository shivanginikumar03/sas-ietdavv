import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AttendanceTable from './AttendanceTable';
import Select from './Select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions } from '../../../../store/loadingSlice';
import { filterDataActions } from '../../../../store/filterDataSlice';
import { subjectActions } from '../../../../store/subjectSlice';

function FeedAttendance() {
  const [value, onChange] = useState(new Date());
  const [teaches, setTeaches] = useState({});

  const attendanceData = useSelector(
    (state) => state?.attendance?.classStudents
  );

  const subject = useSelector((state) => state?.subject?.classSubject);

  const dispatch = useDispatch();

  useEffect(async () => {
    const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/data/getteaches`;
    dispatch(loadingActions.setLoading({ loading: true, msg: 'Loading...' }));
    const temp = await axios.post(url).catch((err) => alert(err));
    setTeaches(temp.data);
    dispatch(filterDataActions.setFilterData(temp.data[0]));
    dispatch(loadingActions.setLoading({ loading: false, msg: 'loading' }));
  }, []);

  useEffect(() => {
    const getattendance = async () => {
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/data/getsubjects`;
      dispatch(
        loadingActions.setLoading({ loading: true, msg: 'Loading Attendance' })
      );
      const subjectsData = await axios.post(url).catch((err) => alert(err));
      dispatch(
        loadingActions.setLoading({ loading: false, msg: 'Loading Attendance' })
      );
      dispatch(subjectActions.setSubjectData(subjectsData.data));
    };

    getattendance();
  }, []);

  const date = `${value.getFullYear()}-${
    value.getMonth() + 1
  }-${value.getDate()}`;
  const rowClass = 'mb-2 flex justify-between items-center';

  return (
    <div className="w-[100%] flex align-middle items-center flex-col overflow-y-scroll py-4">
      <div className="text-center font-semibold text-3xl py-8">
        Feed Attendance
      </div>

      <div className="w-[90%] my-6 flex flex-col sm:flex-row justify-between">
        <div className="sm:w-[40%]">
          <Select title={'Select Class'} data={teaches} />
          <div className="px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
              Class Details:{' '}
            </label>
            <div className="mt-4">
              <div className={rowClass}>
                <span>Subject Code: </span>
                <span className="text-sm font-normal">
                  {subject?.subject_code}
                </span>
              </div>
              <div className={rowClass}>
                <span>Subject Name</span>
                <span className="text-sm font-normal">
                  {subject?.subject_name}
                </span>
              </div>
              <div className={rowClass}>
                <span>Class Strength: </span>
                <span className="text-sm font-normal">
                  {attendanceData?.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-[40%] flex flex-col  px-3 mt-6 md:mt-0">
          <label className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
            Select Date
          </label>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>

      <div className="w-[90%] my-6 flex flex-col sm:flex-row justify-around">
        <AttendanceTable date={date} />
      </div>
    </div>
  );
}

export default FeedAttendance;
