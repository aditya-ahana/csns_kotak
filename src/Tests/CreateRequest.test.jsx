import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import CreateRequest from "../pages/CreateRequest/CreateRequest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../Redux/reduxStore";

const renderCreateRequest = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateRequest />
      </Provider>
    </BrowserRouter>
  );
};

describe("View Create Request Page", () => {
  test("Render Create Request component", () => {
    renderCreateRequest();
    cleanup();
  });
});
