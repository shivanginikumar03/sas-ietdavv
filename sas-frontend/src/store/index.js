import {configureStore} from "@reduxjs/toolkit"
import attendaceSlice from "./attendanceSlice"
import navItemSlice from "./navItemSlice"
import userDataSlice from "./userDataSlice"
import subjectSlice from "./subjectSlice"
import loadingSlice from "./loadingSlice"
import typeSlice from "./typeSlice"
import filterDataSlice from "./filterDataSlice"
import notificationSlice from "./notificationSlice"

const store = configureStore({
    reducer: {
        userData: userDataSlice.reducer,
        navItem: navItemSlice.reducer,
        attendance: attendaceSlice.reducer,
        subject: subjectSlice.reducer,
        loading: loadingSlice.reducer,
        type: typeSlice.reducer,
        filterData: filterDataSlice.reducer,
        notification: notificationSlice.reducer,
    }
})

export default store