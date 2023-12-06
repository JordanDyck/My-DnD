import {createSlice} from "@reduxjs/toolkit"

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: null,
  },
  reducers: {
    // set current character from local storage.
    setCurrentCharacter: (state, action) => {
      try {
        const data = JSON.parse(localStorage.getItem(action.payload))
        state.value = data
      } catch (error) {
        console.error("failed to set character", error)
      }
    },

    // replace array with new array (used for deleting items)
    clearCharacterDetails: (state, action) => {
      state.value = action.payload
      localStorage.removeItem(action.payload.characterName)
    },
  },
})

export const {setCurrentCharacter, clearCharacterDetails} =
  characterSlice.actions
export default characterSlice.reducer
