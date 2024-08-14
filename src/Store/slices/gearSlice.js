import {createSlice} from "@reduxjs/toolkit"

const getInitialGear = () => {
  try {
    const getCharacterName = JSON.parse(
      localStorage.getItem("currentCharacter")
    )

    return JSON.parse(localStorage.getItem(getCharacterName)).gear
  } catch {
    return null
  }
}

export const gearSlice = createSlice({
  name: "gear",
  initialState: {
    value: getInitialGear(),
  },
  reducers: {
    addGear: (state, action) => {
      state.value.push(action.payload)
      try {
        const getCharacterName = JSON.parse(
          localStorage.getItem("currentCharacter")
        )
        const character = JSON.parse(localStorage.getItem(getCharacterName))

        const updatedCharacter = {
          ...character,
          gear: [...character.gear, action.payload],
        }

        localStorage.setItem(getCharacterName, JSON.stringify(updatedCharacter))
      } catch (error) {
        console.error("failed to update current character", error)
      }
    },
    // replace gear array with new array (used for deleting items)
    setGear: (state, action) => {
      state.value = action.payload
      try {
        const getCharacterName = JSON.parse(
          localStorage.getItem("currentCharacter")
        )
        const character = JSON.parse(localStorage.getItem(getCharacterName))

        const updatedCharacter = {
          ...character,
          gear: action.payload,
        }

        localStorage.setItem(getCharacterName, JSON.stringify(updatedCharacter))
      } catch (error) {
        console.error("failed to update current character", error)
      }
    },
  },
})

export const {addGear, setGear} = gearSlice.actions
export default gearSlice.reducer
