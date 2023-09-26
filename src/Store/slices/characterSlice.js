import {createSlice} from "@reduxjs/toolkit"

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: localStorage.getItem("raceStats")
      ? JSON.parse(localStorage.getItem("raceStats"))
      : [],
  },
  reducers: {
    saveCharacterDetails: (state, action) => {
      const updatedValue = [...state.value, action.payload]
      state.value = updatedValue
      localStorage.setItem("raceStats", JSON.stringify(updatedValue))
    },
    // replace array with new array (used for deleting items)
    clearCharacterDetails: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {saveCharacterDetails, clearCharacterDetails} =
  characterSlice.actions
export default characterSlice.reducer
