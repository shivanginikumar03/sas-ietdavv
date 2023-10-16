import {createSlice} from "@reduxjs/toolkit"

const loadingSlice = createSlice({
    name: "loading",
    initialState: {loading: {loading: false, msg: "message"}},
    reducers: {
        setLoading(state, action){
            state.loading = action.payload
        }
    }
})
 
export const loadingActions = loadingSlice.actions
export default loadingSlice