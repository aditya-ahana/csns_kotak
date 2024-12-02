import { createSlice } from "@reduxjs/toolkit";
import {
  availableParameters,
  availableReportTypes,
  countryCodeData,
  currentDate,
  fundTransfers,
  readOnly,
  requestPhases,
  requiredReportsData,
  rowOptions,
  viewDetailHeaders,
  viewDetailsData,
  viewRequestData,
  viewRequestHeaders,
  userDataHeaders,
  userRoles,
  userMgtData,
  userStatusOptions
} from "./reducedData";

let initialData = {
  readOnly: readOnly,
  currentDate: currentDate,
  availableReportTypes: availableReportTypes,
  requestPhases: requestPhases,
  rowOptions: rowOptions,
  requiredReportsData: requiredReportsData,
  availableParameters: availableParameters,
  countryCodeData: countryCodeData,
  viewRequestHeaders: viewRequestHeaders,
  viewRequestData: viewRequestData,
  viewDetailHeaders: viewDetailHeaders,
  viewDetailsData: viewDetailsData,
  fundTransfers : fundTransfers,
  userDataHeaders:userDataHeaders,
  userRoles:userRoles,
  userMgtData:userMgtData,
  userStatusOptions:userStatusOptions
};

let updatedData;

const handleReducerDispatch = (state, action, parameter) => {
  if (action.payload) {
    const updater = action;
    parameter = [...parameter, updater.payload];
    //console.log('payload',updater);
    console.log(`Reduxed ${parameter} data : `, parameter);
  } else {
    return state;
  }
};

export const slicedDataConfig = createSlice({
  name: "csns",
  initialState: initialData,
  reducers: {
    setReadOnly: (state, action) => {
      handleReducerDispatch(state, action, state.readOnly);
      //console.log('Payload update triggered')
    },
    setCurrentDate: (state, action) => {
      handleReducerDispatch(state, action, state.currentDate);
    },
    setAvailableReportTypes: (state, action) => {
      handleReducerDispatch(state, action, state.availableReportTypes);
    },
    setRequestPhases: (state, action) => {
      handleReducerDispatch(state, action, state.requestPhases);
    },
    setRowOptions: (state, action) => {
      handleReducerDispatch(state, action, state.rowOptions);
    },
    setRequiredReportsData: (state, action) => {
      handleReducerDispatch(state, action, state.requiredReportsData);
    },
    setAvailableParameters: (state, action) => {
      handleReducerDispatch(state, action, state.availableParameters);
    },
    setCountryCodeData: (state, action) => {
      handleReducerDispatch(state, action, state.availableParameters);
    },
    setViewRequestHeaders: (state, action) => {
      handleReducerDispatch(state, action, state.viewRequestHeaders);
    },
    setViewRequestData: (state, action) => {
      handleReducerDispatch(state, action, state.viewRequestData);
    },
    setViewDetailHeaders: (state, action) => {
      handleReducerDispatch(state, action, state.viewDetailHeaders);
    },
    setViewDetailsData: (state, action) => {
      handleReducerDispatch(state, action, state.viewDetailsData);
    },
    setFundTransfers: (state, action) => {
      handleReducerDispatch(state, action, state.fundTransfers);
    },
   
    setUserDataHeaders: (state, action) => {
      handleReducerDispatch(state, action, state.userDataHeaders);
    },
    setUserRoles: (state, action) => {
      handleReducerDispatch(state, action, state.userRoles);
    },
    setUserMgtData: (state, action) => {
      handleReducerDispatch(state, action, state.userMgtData);
    },
    setUserStatusOptions: (state, action) => {
      handleReducerDispatch(state, action, state.userStatusOptions);
    },
  },
});

export const {
  setReadOnly,
  setCurrentDate,
  setAvailableReportTypes,
  setRequestPhases,
  setRowOptions,
  setRequiredReportsData,
  setAvailableParameters,
  setCountryCodeData,
  setViewRequestHeaders,
  setViewRequestData,
  setViewDetailHeaders,
  setViewDetailsData,
  setFundTransfers,
  setUserDataHeaders,
  setUserRoles,
  setUserMgtData,
  setUserStatusOptions
} = slicedDataConfig.actions;

const dataReducer = slicedDataConfig.reducer;

export default dataReducer;
