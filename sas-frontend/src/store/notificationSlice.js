import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: {notification: {type:"info", message:"Welcome to SAS-IETDAVV"}},
    reducers: {
        setNotification(state, action){
            state.notification = action.payload
        }
    }
})
 
export const notificationActions = notificationSlice.actions
export default notificationSlice