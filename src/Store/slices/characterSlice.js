import {createSlice} from "@reduxjs/toolkit"
import {setStorage} from "../../Components/utilities"

export const characterSlice = createSlice({
  name: "character",
  initialState: {
    value: [],
  },
  reducers: {
    setCurrentCharacter: (state, action) => {
      state.value = [...state.value, action.payload]
      setStorage(action.payload.characterName, action.payload)
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
