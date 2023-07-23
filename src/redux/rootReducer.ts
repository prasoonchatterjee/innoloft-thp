import { createSlice } from "@reduxjs/toolkit";

const initialState = {}

export const rootSlice = createSlice({
  name:'rootState',
  initialState,
  reducers: {
    setAppState: (state, action) => action.payload
  }
})

export const {setAppState} = rootSlice.actions; 
export default rootSlice.reducer