import { createSlice } from "@reduxjs/toolkit";
import {
  availableParameters,
  availableReportTypes,
  countryCodeData,
  currentDate,
  readOnly,
  requestPhases,
  requiredReportsData,
  rowOptions,
  viewDetailHeaders,
  viewDetailsData,
  viewRequestData,
  viewRequestHeaders,
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
};

let updatedData;

const handleReducerDispatch = (state, action, parameter) => {
  if (action.payload !== null || action.payload !== undefined) {
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
} = slicedDataConfig.actions;

const dataReducer = slicedDataConfig.reducer;

export default dataReducer;
