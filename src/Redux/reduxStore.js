import { configureStore, createSlice } from '@reduxjs/toolkit';

const defaultData = {
  createdDate : null,
  requestTickets : [],
  requestPayloads : [],
  requestTicketSubRequests : []
};

const slicedDataConfig = createSlice(
{
  name: 'data',
  defaultData,
  reducers: {
    setCreatedDate: (state, action) => {
      if(action.payload !== null || action.payload !== undefined){
      state.createdDate = action.payload;
      }
    },
    setRequestPayload: (state, action) => {
      if(action.payload !== null || action.payload !== undefined){
      state.requestPayload = action.payload;
     }
    },
    setRequestTickets: (state, action) => {
      if(action.payload !== null || action.payload !== undefined){
      state.requestTickets = action.payload;
     }
    },
    setRequestTicketSubRequests: (state, action) => {
      if(action.payload !== null || action.payload !== undefined){
      state.requestTicketSubRequests = action.payload;
     }
    }
  }
 }
);

export const { setCreatedDate , setRequestPayload , setRequestTickets , setRequestTicketSubRequests  } = slicedDataConfig.actions;

const store = configureStore({
  reducer: {
    // data: slicedDataConfig.reducer,
  },
});

export default store;
