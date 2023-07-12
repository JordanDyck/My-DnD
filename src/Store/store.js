import {configureStore} from "@reduxjs/toolkit"

import inventoryReducer from "./slices/inventorySlice"
import gearReducer from "./slices/gearSlice"

export default configureStore({
  reducer: {
    inventory: inventoryReducer,
    gear: gearReducer,
  },
})
