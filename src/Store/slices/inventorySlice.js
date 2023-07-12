import {createSlice} from "@reduxjs/toolkit"

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    value: [],
  },
  reducers: {
    setInventory: (state, action) => {
      state.value.push(action.payload)
    },
  },
})

export const {setInventory} = inventorySlice.actions
export default inventorySlice.reducer
