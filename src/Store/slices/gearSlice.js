import {createSlice} from "@reduxjs/toolkit"

export const gearSlice = createSlice({
  name: "gear",
  initialState: {
    value: [],
  },
  reducers: {
    setGear: (state, action) => {
      state.value.push(action.payload)
    },
  },
})

export const {setGear} = gearSlice.actions
export default gearSlice.reducer
