const { createSlice } = require('@reduxjs/toolkit');

const deleteSlice = createSlice({
  name: 'deleteId',
  initialState: '',
  reducers: {
    setDeleteId(state, action) {
      return (state = action.payload);
    },
  },
});

export const { setDeleteId } = deleteSlice.actions;
export const deleteIdReducer = deleteSlice.reducer;
