import {createSlice} from "@reduxjs/toolkit"

const subjectSlice = createSlice({
    name: "subject",
    initialState: {subjectData: {}, classSubject: {}},
    reducers: {
        setSubjectData(state, action){
            state.subjectData = action.payload
        },

        setClassSubject(state, action){
            state.classSubject = action.payload
        },
    }
})
 
export const subjectActions = subjectSlice.actions
export default subjectSlice