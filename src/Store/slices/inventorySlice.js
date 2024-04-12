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
    setcounter: (state, action) => {
      state.value = action.payload
    },
    addStartingEquipment: (state, action) => {
      state.value.push(action.payload)
    },
  },
})

export const {addInventory, setInventory, setcounter, addStartingEquipment} =
  inventorySlice.actions
export default inventorySlice.reducer
