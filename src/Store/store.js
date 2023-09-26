import {configureStore} from "@reduxjs/toolkit"

import inventoryReducer from "./slices/inventorySlice"
import gearReducer from "./slices/gearSlice"
import characterReducer from "./slices/characterSlice"

export default configureStore({
  reducer: {
    inventory: inventoryReducer,
    gear: gearReducer,
    character: characterReducer,
  },
})
