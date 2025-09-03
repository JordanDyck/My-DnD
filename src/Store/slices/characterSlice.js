import {createSlice} from "@reduxjs/toolkit"

const getInitialCharacter = () => {
  try {
    const lastUsedCharacter = JSON.parse(localStorage.getItem("currentCharacter"))
    return JSON.parse(localStorage.getItem(lastUsedCharacter))
  } catch {
    return null
  }
}

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: getInitialCharacter(),
  },
  reducers: {
    // set selected character from local storage to state. do not use to update.
    setCurrentCharacter: (state, action) => {
      try {
        const data = JSON.parse(localStorage.getItem(action.payload))
        state.value = data
      } catch (error) {
        console.error("failed to set character. character will be deleted", error)
        localStorage.removeItem(action.payload)
        state.value = ""
      }
    },

    // used to update and display new character details from state.
    updateCharacter: (state, action) => {
      // set new state, then upload it to localstorage
      try {
        state.value = action.payload
        localStorage.setItem(action.payload.characterName, JSON.stringify(action.payload))
      } catch (error) {
        console.error("failed to update current character", error)
      }
    },

    // delete current character from state and localStorage
    clearCharacterDetails: (state, action) => {
      state.value = null
      localStorage.removeItem(action.payload.characterName)
    },
  },
})

export const {setCurrentCharacter, updateCharacter, clearCharacterDetails} = characterSlice.actions
export default characterSlice.reducer
