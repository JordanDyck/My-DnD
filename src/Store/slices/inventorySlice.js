import {createSlice} from "@reduxjs/toolkit"
import {setLocalStorage} from "../../Components/utilities"

const getInitialInventory = () => {
  try {
    return JSON.parse(localStorage.getItem(Object.keys(localStorage)[0]))
      .inventory
  } catch {
    return null
  }
}

export const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    value: getInitialInventory(),
  },
  reducers: {
    addInventory: (state, action) => {
      state.value.push(action.payload)
      try {
        const getCharactorName = action.payload.find(
          (prop) => prop[0] === "linkedCharacter"
        )?.[1]
        const character = JSON.parse(localStorage.getItem(getCharactorName))

        const updatedCharacter = {
          ...character,
          inventory: [...character.inventory, action.payload],
        }
        setLocalStorage(character.characterName, updatedCharacter)
      } catch (error) {
        console.log(error)
      }
    },

    setInventory: (state, action) => {
      state.value = action.payload
    },
  },
})

export const {addInventory, setInventory} = inventorySlice.actions
export default inventorySlice.reducer
