import {createSlice} from "@reduxjs/toolkit"

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: [],
  },
  reducers: {
    saveClassDetails: (state, action) => {
      const updatedValue = [...state.value, action.payload]
      state.value = updatedValue
      localStorage.setItem("classStats", JSON.stringify(updatedValue))
    },

    saveLvlDetails: (state, action) => {
      state.value = action.payload
    },

    saveRaceDetails: (state, action) => {
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

export const {
  saveClassDetails,
  saveLvlDetails,
  saveRaceDetails,
  clearCharacterDetails,
} = characterSlice.actions
export default characterSlice.reducer
