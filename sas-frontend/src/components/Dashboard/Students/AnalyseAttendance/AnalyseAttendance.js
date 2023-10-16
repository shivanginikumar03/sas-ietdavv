import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SubjectAnalysis from './SubjectAnalysis';
import SubjectsTable from './SubjectsTable';
import { useDispatch } from 'react-redux';
import { subjectActions } from '../../../../store/subjectSlice';
import axios from 'axios';
import { loadingActions } from '../../../../store/loadingSlice';

function AnalyseAttendance() {
  const dispatch = useDispatch();

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

  const subjects = useSelector((state) => state.subject.subjectData);

  return (
    <div className="w-full flex align-middle items-center flex-col overflow-y-scroll py-4">
      <div className="text-center font-semibold text-3xl py-4">
        Analyse Attendance
      </div>

      <div className="w-[90%] my-6">
        <h1 className="pb-3 text-lg font-semibold">Your Subjects: </h1>
        <SubjectsTable />
      </div>

      {subjects.subjectDetails
        ? subjects.subjectDetails.map((value, index) => {
            const data = subjects.calanderData.filter(
              (items) => items.subject_code === value.subject_code
            );

            return (
              <div className="w-[90%] my-6">
                <h1 className="py-3 text-lg font-semibold">
                  {value.subject_name} ({value.subject_code}):
                </h1>
                <SubjectAnalysis
                  data={data}
                  percentage={
                    subjects.percentage[index]
                      ? subjects.percentage[index]
                      : 100
                  }
                />
              </div>
            );
          })
        : null}
    </div>
  );
}

export default AnalyseAttendance;
