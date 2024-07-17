import { createSlice } from '@reduxjs/toolkit';

let defaultData = {
  requestTickets : [],
  requestPayloads : [],
  requestTicketSubRequests : []
};

let updatedData;

const handleReducerDispatch = (state, action, parameter) => {
  if(action.payload !== null || action.payload !== undefined){
    const updater = action;
    parameter = [...parameter,updater.payload];
    //console.log('payload',updater);
    console.log(`Reduxed ${parameter} data : `,parameter)
   } else {
     return state;
   }
};

export const slicedDataConfig = createSlice(
{
  name: 'csns',
  initialState : defaultData,
  reducers: {

    setRequestPayloads: (state, action) => {
      handleReducerDispatch(state, action, state.requestPayloads);
      //console.log('Payload update triggered')
    },
    setRequestTickets: (state, action) => {
      handleReducerDispatch(state, action, state.requestTickets)
    },
    setRequestTicketSubRequests: (state, action) => {
     handleReducerDispatch(state, action, state.requestTicketSubRequests)    
    },

  }
 }
);

export const { setRequestPayloads , setRequestTickets , setRequestTicketSubRequests  } = slicedDataConfig.actions;

const dataReducer = slicedDataConfig.reducer;

export default dataReducer;

