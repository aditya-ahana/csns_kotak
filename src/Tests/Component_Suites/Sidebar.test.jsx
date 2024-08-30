import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import { test, expect,vi,describe } from "vitest";
import { cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/reduxStore";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../pages/Dashboard/Dashboard";
import ViewRequest from "../../pages/ViewRequest/ViewRequest";
import MailDraft from "../../components/Modals/MailDraft";
import CreateRequest from "../../pages/CreateRequest/CreateRequest";

const renderSidebar = () => {
  return render(
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );
};

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

const renderViewRequest = () => {
  return render(
    <BrowserRouter>
      <ViewRequest>
        <MailDraft />
      </ViewRequest>
    </BrowserRouter>
  );
};

test("Sidebar Render Check", () => {
  expect(renderSidebar());

  const sidebarContainer = screen.getByTestId("sidebar");

  expect(sidebarContainer).toBeInTheDocument();
});

test("Create Request Page Navigation Check", () => {
  renderSidebar();

  const createRequestTab = screen.getByTestId("sidebar-element-1");

  expect(createRequestTab).toBeInTheDocument();

  fireEvent.click(createRequestTab);

  expect(renderCreateRequest());

  expect(screen.getByTestId("create-request-page")).toBeInTheDocument();
});

test("View Request Page Navigation Check", () => {
  renderSidebar();

  const viewRequestTab = screen.getByTestId("sidebar-element-2");

  expect(viewRequestTab).toBeInTheDocument();

  fireEvent.click(viewRequestTab);

  expect(renderViewRequest());

  expect(screen.getByTestId("view-request-page")).toBeInTheDocument();
});

test("Dashboard Page Navigation Check", () => {
  renderSidebar();

  const createRequestTab = screen.getByTestId("sidebar-element-1");

  expect(createRequestTab).toBeInTheDocument();

  fireEvent.click(createRequestTab);

  expect(renderCreateRequest());

  expect(screen.getByTestId("create-request-page")).toBeInTheDocument();

  const dashboardTab = screen.getByTestId("sidebar-element-1");

  expect(dashboardTab).toBeInTheDocument();

  fireEvent.click(dashboardTab);

  expect(renderDashboard());

  expect(screen.getByTestId("dashboard-main")).toBeInTheDocument();
});
