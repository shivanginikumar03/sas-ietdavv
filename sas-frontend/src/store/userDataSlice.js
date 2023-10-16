import {createSlice} from "@reduxjs/toolkit"

const userDataSlice = createSlice({
    name: "userData",
    initialState: {userData: {}},
    reducers: {
        setUserData(state, action){
            state.userData = action.payload
        }
    }
})
 
export const userDataActions = userDataSlice.actions
export default userDataSlice