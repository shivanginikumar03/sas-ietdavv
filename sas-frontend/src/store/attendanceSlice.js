import {createSlice} from "@reduxjs/toolkit"

const attendaceSlice = createSlice({
    name: "attendance",
    initialState: {attendance: {}, classStudents: [{ roll_number: "rn", name: "name" }], attendanceList: [], strengthondate: [], attendanceondate: []},
    reducers: {
        setAttendance(state, action){
            state.attendance = action.payload
        },

        setClassStudents(state, action){
            state.classStudents = action.payload
        },

        setAttendanceList(state, action){
            state.attendanceList = action.payload
        },
        setAttendanceOnDate(state, action){
            state.attendanceondate = action.payload
        },
        setStrengthOnDate(state, action){
            state.strengthondate = action.payload
        },
    }
})
 
export const attendaceActions = attendaceSlice.actions
export default attendaceSlice