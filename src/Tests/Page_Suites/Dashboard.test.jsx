import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import store from "../../Redux/reduxStore";
import CreateRequest from "../../pages/CreateRequest/CreateRequest";
import userEvent from "@testing-library/user-event";
import { requiredReportsData } from "../../components/data/requestsData";
import dayjs from "dayjs";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { Provider } from "react-redux";

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
};

const renderCreateRequest = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <CreateRequest />
      </Provider>
    </BrowserRouter>
  );
};

test("Dashboard Page Loader Render Check",() => {
  renderDashboard();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  setTimeout(() => {
    expect(loader).not.toBeInTheDocument();
  },1000)
});

test("Dashboard Render", () => {
  renderDashboard();
  setTimeout(() => {

  const dashMain = screen.getByTestId("dashboard-main");

  expect(dashMain).toBeInTheDocument();
  },1000);
});

test("Create Request Button Functionality", async () => {
  renderDashboard();
  setTimeout(() => {

  const createRequestButton = screen.getByTestId("create-request-button");

  expect(createRequestButton).toBeInTheDocument();

  fireEvent.click(createRequestButton);

  expect(renderCreateRequest());

  const createRequestPage = screen.getByTestId("create-request-page");

  expect(createRequestPage).toBeInTheDocument();
},1000);
});
