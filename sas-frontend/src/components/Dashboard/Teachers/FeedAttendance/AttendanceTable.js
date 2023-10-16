import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { loadingActions } from '../../../../store/loadingSlice';
import { attendaceActions } from '../../../../store/attendanceSlice';
import { subjectActions } from '../../../../store/subjectSlice';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { notificationActions } from '../../../../store/notificationSlice';

function AttendanceTable(props) {
  const thClass =
    'px-3 py-4 text-left bg-blue-900 text-white text-xs font-medium sm:text-sm sm:px-4';
  const tdClass =
    'px-3 py-4 border-t border-b border-gray-300 text-xs sm:text-sm sm:px-4';
  const trClass = 'border-gray-300 even:bg-gray-300';

  const filterData = useSelector((state) => state.filterData.data);
  const dispatch = useDispatch();
  const [listCount, setListCount] = useState(0);

  const attendanceData = useSelector((state) => state.attendance.classStudents);
  const subject = useSelector((state) => state.subject.classSubject);

  useEffect(async () => {
    const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/data/getclassstudents`;
    dispatch(
      loadingActions.setLoading({ loading: true, msg: 'Loading Attendance' })
    );

    const temp = await axios.post(url, filterData).catch((err) => alert(err));
    console.log(temp);
    dispatch(subjectActions.setClassSubject(temp.data.subject[0]));
    dispatch(attendaceActions.setClassStudents(temp.data.students));

    dispatch(loadingActions.setLoading({ loading: false, msg: 'loading' }));
  }, [filterData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    const list = [];

    await attendanceData.forEach((element) => {
      const listdata = {
        roll_number: element.roll_number,
        subject_code: subject.subject_code,
        status: data[element.roll_number]
          ? data[element.roll_number]
          : 'Absent',
        date: props.date.substr(0, 10),
      };
      list.push(listdata);
    });

    dispatch(attendaceActions.setAttendanceList(list));

    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/data/feedattendance`;
            dispatch(
              loadingActions.setLoading({
                loading: true,
                msg: 'Feeding Attendance',
              })
            );
            const temp = await axios.post(url, { list: list }).catch(() => {
              dispatch(
                notificationActions.setNotification({
                  type: 'danger',
                  message:
                    'Attendance for date: ' +
                    props.date.substr(0, 10) +
                    ' already feeded',
                })
              );
            });
            dispatch(
              loadingActions.setLoading({ loading: false, msg: 'loading' })
            );
            dispatch(
              notificationActions.setNotification({
                type: 'success',
                message:
                  'Attendance for date: ' +
                  props.date.substr(0, 10) +
                  ' feeded!',
              })
            );
          },
        },
        {
          label: 'No',
          onClick: () => {},
        },
      ],
    });
  };

  const handleClear = () => {
    document.getElementById('attendanceForm').reset();
  };

  const handleChange = (e) => {
    const isSelected = e.target.checked;
    isSelected ? setListCount(listCount + 1) : setListCount(listCount - 1);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full"
      id="attendanceForm"
    >
      <table className="w-full table-auto rounded-sm max-h-screen overflow-y-scroll">
        <thead>
          <tr>
            <th className={thClass}>Student Roll Number</th>
            <th className={thClass}>Student Name</th>
            <th className={thClass}>Present</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0
            ? attendanceData.map((value, index) => {
                return (
                  <tr className={trClass} key={index}>
                    <td className={tdClass}>{value.roll_number}</td>
                    <td className={tdClass}>{value.name}</td>
                    <td className={tdClass}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="checkbox"
                        name={value.roll_number}
                        value={'Present'}
                      />
                    </td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      <div className="flex flex-col md:flex-row justify-between items-center py-6">
        <p>Total Students Marked: {listCount}</p>

        <div className="my-4 md:my-0">
          <span
            className="bg-red-500 hover:bg-red-700 text-white font-bold mx-2 py-2 px-4 rounded cursor-pointer"
            onClick={handleClear}
          >
            Clear All
          </span>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mx-2 py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default AttendanceTable;
