import {createSlice} from "@reduxjs/toolkit"

const navItemSlice = createSlice({
    name: "navItem",
    initialState: {number: 0},
    reducers: {
        setNavItemNumber(state, action){
            state.number = action.payload
        }
    }
})
 
export const navItemActions = navItemSlice.actions
export default navItemSlice