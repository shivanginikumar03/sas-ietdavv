import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AttendanceTable from './AttendanceTable';
import Select from './Select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loadingActions } from '../../../../store/loadingSlice';
import 'react-calendar-heatmap/dist/styles.css';
import moment from 'moment';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { filterDataActions } from '../../../../store/filterDataSlice';

function AnalyseAttendanceTeachers() {
  const [value, onChange] = useState(new Date());
  const [teaches, setTeaches] = useState({});

  const strengthData = useSelector((state) => state.attendance.strengthondate);

  const dispatch = useDispatch();

  useEffect(async () => {
    const url = `${process.env.REACT_APP_BACKEND_ENDPOINT}/api/data/getteaches`;
    dispatch(loadingActions.setLoading({ loading: true, msg: 'Loading...' }));
    const temp = await axios.post(url).catch((err) => alert(err));
    setTeaches(temp.data);
    dispatch(filterDataActions.setFilterData(temp.data[0]));
    dispatch(loadingActions.setLoading({ loading: false, msg: 'loading' }));
  }, []);

  const date = `${value.getFullYear()}-${value.getMonth() + 1
    }-${value.getDate()}`;
  const rowClass = 'mb-2 flex justify-between items-center';

  var tooltip;
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !tooltip) return null;
    for (const bar of payload)
      if (bar.date === tooltip)
        return (
          <div>
            {moment(bar.date).format('DD-MM-YYYY')}
            <br />
            {bar.count}
          </div>
        );
    return null;
  };

  return (
    <div className="w-[100%] flex align-middle items-center flex-col overflow-y-scroll py-4">
      <div className="text-center font-semibold text-3xl py-8">
        Analyse Attendance
      </div>

      <div className="w-[90%] my-6 flex flex-col sm:flex-row justify-between">
        <div className="sm:w-[40%]">
          <Select title={'Select Class'} data={teaches} />

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={strengthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip active={true} content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                onMouseOver={() => (tooltip = 'count')}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="md:w-[40%] flex flex-col  px-3 mt-6 md:mt-0">
          <label className="block uppercase tracking-wide text-gray-700 text-base font-bold mb-2">
            Select Date
          </label>
          <Calendar onChange={onChange} value={value} />
        </div>
      </div>

      <div className="w-[90%] my-6 flex flex-col sm:flex-row justify-center"></div>

      <div className="w-[90%] my-6 flex flex-col sm:flex-row justify-around">
        <AttendanceTable date={date} />
      </div>
    </div>
  );
}

export default AnalyseAttendanceTeachers;
