import { createSlice } from '@reduxjs/toolkit';

const filterDataSlice = createSlice({
  name: 'filterData',
  initialState: { data: { semester_number: 6, branch: 'IT', section: 'A' } },
  reducers: {
    setFilterData(state, action) {
      state.data = action.payload;
    },
  },
});

export const filterDataActions = filterDataSlice.actions;
export default filterDataSlice;
