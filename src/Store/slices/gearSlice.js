import {createSlice} from "@reduxjs/toolkit"

export const gearSlice = createSlice({
  name: "gear",
  initialState: {
    value: [],
  },
  reducers: {
    addGear: (state, action) => {
      state.value.push(action.payload)
    },
    // replace gear array with new array (used for deleting items)
    setGear: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {addGear, setGear} = gearSlice.actions
export default gearSlice.reducer
