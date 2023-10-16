import React, { useEffect } from 'react';
import StripedTable from './StripedTable';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { attendaceActions } from '../../../../store/attendanceSlice';
import { loadingActions } from '../../../../store/loadingSlice';

function ViewAttendance() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getattendance = async () => {
      const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/data/getattendance`;
      dispatch(
        loadingActions.setLoading({ loading: true, msg: 'Loading Attendance' })
      );
      const attendanceData = await axios.post(url).catch((err) => alert(err));
      dispatch(loadingActions.setLoading({ loading: false, msg: 'loading' }));
      dispatch(attendaceActions.setAttendance(attendanceData.data));
    };

    getattendance();
  }, []);

  return (
    <div className="w-[100%] flex align-middle items-center flex-col py-4">
      <div className="text-center font-semibold text-3xl py-8">
        View Attendance
      </div>
      {/* <div className="flex justify-between">
                <p>Filters:</p>
                <form action="/">
                    <select name="subject" id="subject">
                        <option selected disabled value="">Subject</option>
                        <option value="subject">Subject</option>
                    </select>
                    <select name="teacher" id="teacher">
                        <option selected disabled value="">Teacher</option>
                        <option value="subject">Teacher</option>
                    </select>
                    <select name="status" id="status">
                        <option selected disabled value="">Status</option>
                        <option value="subject">Status</option>
                    </select>
                </form>
            </div> */}
      <div className="h-[80%] overflow-y-scroll w-[90%]">
        <StripedTable />
      </div>
    </div>
  );
}

export default ViewAttendance;
