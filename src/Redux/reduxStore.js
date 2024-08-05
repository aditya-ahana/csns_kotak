import { configureStore } from "@reduxjs/toolkit";
import slicedDataConfig from "./csnsReducers";

const store = configureStore({
  reducer: {
    csns: slicedDataConfig,
  },
});

// console.log('STORY',slicedDataConfig);

export default store;
