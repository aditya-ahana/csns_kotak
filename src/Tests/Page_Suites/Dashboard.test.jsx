import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import { cleanup } from "@testing-library/react";
import { test, expect, vi, describe, beforeEach, afterEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import store from "../../Redux/reduxStore";
import CreateRequest from "../../pages/CreateRequest/CreateRequest";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { Provider } from "react-redux";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
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

const advanceTimer = () => {
  act(() => {
    vi.advanceTimersByTime(1000);
  });
};

test("Dashboard Page Loader Render Check", () => {
  renderDashboard();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  advanceTimer();
  expect(loader).not.toBeInTheDocument();
});

test("Dashboard Render", () => {
  renderDashboard();
  advanceTimer();
  const dashMain = screen.getByTestId("dashboard-main");

  expect(dashMain).toBeInTheDocument();
});

test("Create Request Button Functionality", async () => {
  renderDashboard();
  advanceTimer();
  const createRequestButton = screen.getByTestId("create-request-button");

  expect(createRequestButton).toBeInTheDocument();

  fireEvent.click(createRequestButton);

  expect(renderCreateRequest());

  const createRequestPage = screen.getByTestId("create-request-page");

  expect(createRequestPage).toBeInTheDocument();
});
