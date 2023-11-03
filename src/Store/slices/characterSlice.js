import {createSlice} from "@reduxjs/toolkit"

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: [],
  },
  reducers: {
    setCurrentCharacter: (state, action) => {
      state.push(action.payload)
    },

    // replace array with new array (used for deleting items)
    clearCharacterDetails: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {setCurrentCharacter, clearCharacterDetails} =
  characterSlice.actions
export default characterSlice.reducer
