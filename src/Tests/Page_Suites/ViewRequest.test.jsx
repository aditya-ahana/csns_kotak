import React from "react";

import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import { test, expect, vi, describe, beforeEach, afterEach } from "vitest";
import ViewRequest from "../../pages/ViewRequest/ViewRequest";
import ViewRequestDetails from "../../pages/ViewRequest/ViewRequestDetails";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MailDraft from "../../components/Modals/MailDraft";
import { changeReadOnly } from "../../Redux/reducedData";
import { Provider } from "react-redux";
import store from "../../Redux/reduxStore";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const renderViewRequest = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <ViewRequest>
          <MailDraft />
        </ViewRequest>
      </Provider>
    </BrowserRouter>
  );
};

const renderViewDetails = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <ViewRequestDetails />
      </Provider>
    </BrowserRouter>
  );
};

const advanceTimer = () => {
  act(() => {
    vi.advanceTimersByTime(1000);
  });
};

const openFilterMenu = () => {
  const filterMenuButton = screen.getByTestId("filter-menu-button");

  fireEvent.click(filterMenuButton);

  const filterMenu = screen.queryByTestId("filter-menu");
  expect(filterMenu).toBeInTheDocument();
};

test("View Request Page Loader Render Check", () => {
  renderViewRequest();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  advanceTimer();
  expect(loader).not.toBeInTheDocument();
});

test("Render View Request Page", () => {
  renderViewRequest();

  // expect(screen.getByText("viewRequest")).toBeInTheDocument();
  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  advanceTimer();

  expect(loader).not.toBeInTheDocument();

  // screen.debug();
});

test("Open Filter Menu", () => {
  renderViewRequest();
  advanceTimer();
  openFilterMenu();
});

test("Search Input Functionality", () => {
  renderViewRequest();

  advanceTimer();
  const searchBar = screen.getByTestId("searchbar").querySelector("input");

  expect(searchBar.value).toBe("");

  fireEvent.change(searchBar, { target: { value: "user" } });

  expect(searchBar.value).toBe("user");

  fireEvent.change(searchBar, { target: { value: "User".toLowerCase() } });

  expect(searchBar.value).toBe("User".toLowerCase());
});

test("From Date Picker Functionality", async () => {
  renderViewRequest();
  changeReadOnly(false);
  advanceTimer();
  openFilterMenu();

  const fromPicker = screen.getByLabelText("From");

  expect(fromPicker).toBeInTheDocument();

  fireEvent.change(fromPicker, { target: { value: "20-08-2024" } });

  expect(fromPicker.value).toBe("20-08-2024");
  changeReadOnly(true);
});

test("To Date Picker Functionality Check", () => {
  renderViewRequest();
  changeReadOnly(false);
  advanceTimer();
  openFilterMenu();
  const toPicker = screen.getByLabelText("To");

  expect(toPicker).toBeInTheDocument();

  fireEvent.change(toPicker, { target: { value: "21-08-2024" } });

  expect(toPicker.value).toBe("21-08-2024");
  changeReadOnly(true);
});

test("Routing to View Details Page on clicking Details button Functionality check", () => {
  renderViewRequest();

  advanceTimer();
  const viewDetailsButton = screen.queryByTestId("details-page-nav0");

  fireEvent.click(viewDetailsButton);

  expect(renderViewDetails());

  const viewDetailsPage = screen.queryByTestId("view-details-page");

  expect(viewDetailsPage).toBeInTheDocument();
});

test("Viewing Mail Draft modal on clicking the E-draft button Functionality check", () => {
  renderViewRequest();

  advanceTimer();
  const viewEmailDraftButton = screen.queryByTestId("details-page-nav0");

  fireEvent.click(viewEmailDraftButton);

  const draftModal = screen.queryByTestId("email-draft-section");

  expect(draftModal).toBeInTheDocument();
});

test("Close Email Draft Modal Button Functionality Check", () => {
  renderViewRequest();

  advanceTimer();
  const viewEmailDraftButton = screen.queryByTestId("details-page-nav0");

  fireEvent.click(viewEmailDraftButton);

  const draftSection = screen.queryByTestId("email-draft-section");
  const draftModal = screen.queryByTestId("email-draft-modal");

  expect(draftSection).toBeVisible();

  const closeDraftButton = screen.queryByTestId("close-draft-modal");

  expect(closeDraftButton).toBeInTheDocument();

  fireEvent.click(closeDraftButton);

  expect(draftModal).not.toBeVisible();
});

test("Clear Filter Button Rendering on Date Range Select", () => {
  renderViewRequest();
  advanceTimer();
  openFilterMenu();

  advanceTimer();
  const fromPicker = screen.getByLabelText("From");

  expect(fromPicker).toBeInTheDocument();

  fireEvent.change(fromPicker, { target: { value: "20-08-2024" } });

  expect(fromPicker.value).toBe("20-08-2024");

  const toPicker = screen.getByLabelText("To");

  expect(toPicker).toBeInTheDocument();

  fireEvent.change(toPicker, { target: { value: "21-08-2024" } });

  expect(toPicker.value).toBe("21-08-2024");

  const clearFilterButton = screen.queryByTestId("menu-clear-button");

  expect(clearFilterButton).toBeInTheDocument();
});

test("Select Rows Per Page Dropdown Functionality Check", () => {
  renderViewRequest();

  advanceTimer();
  const pagination = screen.getByTestId("view-request-pagination");
  expect(pagination).toBeInTheDocument();

  const rowsDropdown = within(pagination).getByRole("combobox");
  expect(rowsDropdown).toBeInTheDocument();

  fireEvent.mouseDown(rowsDropdown);

  const rowsDisplay = screen.getByTestId("rows-display");

  expect(rowsDisplay).toHaveTextContent("10");

  const rowOptions = screen.getAllByRole("option");

  fireEvent.click(
    rowOptions.find((option) => option.getAttribute("data-value") === "5")
  );

  expect(rowsDisplay).toHaveTextContent("5");

  fireEvent.click(
    rowOptions.find((option) => option.getAttribute("data-value") === "10")
  );

  expect(rowsDisplay).toHaveTextContent("10");

  fireEvent.click(
    rowOptions.find((option) => option.getAttribute("data-value") === "25")
  );

  expect(rowsDisplay).toHaveTextContent("25");

  fireEvent.click(
    rowOptions.find((option) => option.getAttribute("data-value") === "40")
  );

  expect(rowsDisplay).toHaveTextContent("40");
});

test("Latest Menu Checkbox Functionality Check", async () => {
  renderViewRequest();
  advanceTimer();
  openFilterMenu();

  const statusMenuItems = screen.getAllByRole("option");
  const statusItem0 = statusMenuItems.find(
    (report) => report.getAttribute("value") === "Completed"
  );

  const statusItem1 = statusMenuItems.find(
    (status) => status.getAttribute("value") === "In-progress"
  );
  const statusItem2 = statusMenuItems.find(
    (status) => status.getAttribute("value") === "Failed"
  );

  const status0 = within(statusItem0).getByTestId("status-checkbox");

  const status1 = within(statusItem1).getByTestId("status-checkbox");
  const status2 = within(statusItem2).getByTestId("status-checkbox");

  const status0Checkbox = within(status0).getByRole("checkbox");
  screen.debug(status0Checkbox);
  const status1Checkbox = within(status1).getByRole("checkbox");
  const status2Checkbox = within(status2).getByRole("checkbox");

  fireEvent.change(status0Checkbox, { target: { checked: true } });

  expect(status0Checkbox).toBeChecked();

  fireEvent.change(status1Checkbox, { target: { checked: true } });

  expect(status0Checkbox).toBeChecked();
  expect(status1Checkbox).toBeChecked();

  fireEvent.change(status2Checkbox, { target: { checked: true } });

  expect(status0Checkbox).toBeChecked();
  expect(status1Checkbox).toBeChecked();
  expect(status2Checkbox).toBeChecked();

  fireEvent.change(status1Checkbox, { target: { checked: false } });

  expect(status0Checkbox).toBeChecked();
  expect(status1Checkbox).not.toBeChecked();
  expect(status2Checkbox).toBeChecked();

  fireEvent.change(status0Checkbox, { target: { checked: false } });

  expect(status0Checkbox).not.toBeChecked();
  expect(status1Checkbox).not.toBeChecked();
  expect(status2Checkbox).toBeChecked();
});
