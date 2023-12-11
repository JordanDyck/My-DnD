import {createSlice} from "@reduxjs/toolkit"

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: null,
  },
  reducers: {
    // set current character from local storage to state. do not use to update or display.
    setCurrentCharacter: (state, action) => {
      try {
        const data = JSON.parse(localStorage.getItem(action.payload))
        state.value = data
      } catch (error) {
        console.error("failed to set character", error)
      }
    },

    // used to update and display current character details from state.
    updateCharacter: (state, action) => {
      // set new state, then upload it to localstorage

      try {
        state.value = action.payload
        localStorage.setItem(
          action.payload.characterName,
          JSON.stringify(action.payload)
        )
      } catch (error) {
        console.error("failed to update current character", error)
      }
    },

    // replace array with new array (used for deleting items)
    clearCharacterDetails: (state, action) => {
      state.value = action.payload
      localStorage.removeItem(action.payload.characterName)
    },
  },
})

export const {setCurrentCharacter, updateCharacter, clearCharacterDetails} =
  characterSlice.actions
export default characterSlice.reducer
