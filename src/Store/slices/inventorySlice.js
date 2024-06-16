import {createSlice} from "@reduxjs/toolkit"

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    value: [],
  },
  reducers: {
    addInventory: (state, action) => {
      state.value.push(action.payload)
    },
    setInventory: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {addInventory, setInventory} = inventorySlice.actions
export default inventorySlice.reducer
