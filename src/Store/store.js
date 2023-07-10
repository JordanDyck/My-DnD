import {configureStore} from "@reduxjs/toolkit"

import inventoryReducer from "./slices/inventorySlice"

export default configureStore({
  reducer: {
    inventory: inventoryReducer,
  },
})
