import React from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewRequest from "../../pages/ViewRequest/ViewRequest";
import ViewRequestDetails from "../../pages/ViewRequest/ViewRequestDetails";
import { requestList, requestPhases } from "../../components/data/requestsData";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MailDraft from "../../components/Modals/MailDraft";

const renderViewRequest = () => {
  return render(
    <BrowserRouter>
      <ViewRequest>
        <MailDraft />
      </ViewRequest>
    </BrowserRouter>
  );
};

const renderViewDetails = () => {
  return render(
    <BrowserRouter>
      <ViewRequestDetails />
    </BrowserRouter>
  );
};

const openFilterMenu = () => {
  const filterMenuButton = screen.getByTestId("filter-menu-button");

  fireEvent.click(filterMenuButton);

  const filterMenu = screen.queryByTestId("filter-menu");
  expect(filterMenu).toBeInTheDocument();
};

test("Render View Request Page", () => {
  renderViewRequest();

  expect(screen.getByText("viewRequest")).toBeInTheDocument();

  // screen.debug();
});

test("Open Filter Menu", () => {
  renderViewRequest();
  openFilterMenu();
  renderViewRequest().unmount();
});

test("Search Input Functionality", () => {
  renderViewRequest();

  const searchBar = screen.getByTestId("searchbar").querySelector("input");

  expect(searchBar.value).toBe("");

  fireEvent.change(searchBar, { target: { value: "user" } });

  expect(searchBar.value).toBe("user");

  fireEvent.change(searchBar, { target: { value: "User".toLowerCase() } });

  expect(searchBar.value).toBe("User".toLowerCase());
});

test("From Date Picker Functionality", async () => {
  renderViewRequest();
  openFilterMenu();

  const fromPicker = screen.getByLabelText("From");

  expect(fromPicker).toBeInTheDocument();

  fireEvent.change(fromPicker, { target: { value: "20-08-2024" } });

  expect(fromPicker.value).toBe("20-08-2024");
});

test("To Date Picker Functionality Check", () => {
  renderViewRequest();
  openFilterMenu();

  const toPicker = screen.getByLabelText("To");

  expect(toPicker).toBeInTheDocument();

  fireEvent.change(toPicker, { target: { value: "21-08-2024" } });

  expect(toPicker.value).toBe("21-08-2024");
});

test("Routing to View Details Page on clicking Details button Functionality check", () => {
  renderViewRequest();

  const viewDetailsButton = screen.queryByTestId("details-page-nav0");

  fireEvent.click(viewDetailsButton);

  expect(renderViewDetails());

  const viewDetailsPage = screen.queryByTestId("view-details-page");

  expect(viewDetailsPage).toBeInTheDocument();
});

test("Viewing Mail Draft modal on clicking the E-draft button Functionality check", () => {
  renderViewRequest();

  const viewEmailDraftButton = screen.queryByTestId("details-page-nav0");

  fireEvent.click(viewEmailDraftButton);

  const draftModal = screen.queryByTestId("email-draft-section");

  expect(draftModal).toBeInTheDocument();
});

test("Close Email Draft Modal Button Functionality Check", () => {
  renderViewRequest();

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
  openFilterMenu();

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


test.skip("Latest Menu Checkbox Functionality Check", () => {
  renderViewRequest();
  openFilterMenu();

  const statusMenu = screen.getByTestId("status-unchecked");

  expect(statusMenu).toBeInTheDocument();

  // screen.debug(statusMenu);

  const statusMenuItem0 = screen.getByTestId("status-menu-item-0");

  const statusMenuItem1 = screen.getByTestId("status-menu-item-1");

  const statusMenuItem2 = screen.getByTestId("status-menu-item-2");

  expect(statusMenuItem0).toBeInTheDocument();
  expect(statusMenuItem1).toBeInTheDocument();
  expect(statusMenuItem2).toBeInTheDocument();

  // screen.debug(statusMenuItem0);

  const status0 = screen.getByTestId("status-checkbox-0");
  const status1 = screen.getByTestId("status-checkbox-1");
  const status2 = screen.getByTestId("status-checkbox-2");

  // const status0 = screen.getByLabelText("checkbox-x-0");
  // const status1 = screen.getByLabelText("checkbox-x-1");
  // const status2 = screen.getByLabelText("checkbox-x-2");

  const status0Checkbox = within(status0).getByRole("checkbox", {
    hidden: true,
    //  name : "status-checkbox-0"
  });
  const status1Checkbox = within(status1).getByRole("checkbox", {
    hidden: true,
    //  name : "status-checkbox-1"
  });
  const status2Checkbox = within(status2).getByRole("checkbox", {
    hidden: true,
    //  name : "status-checkbox-2"
  });

  // fireEvent.click(status0Checkbox);

  expect(status0Checkbox).toBeInTheDocument();
  expect(status1Checkbox).toBeInTheDocument();
  expect(status2Checkbox).toBeInTheDocument();
  // expect(status0Checkbox).toBeChecked();

  // // fireEvent.click(status1Checkbox);

  // // expect(status1Checkbox).toBeChecked();

  // // fireEvent.click(status2Checkbox);

  // // expect(status2Checkbox).toBeChecked();
});
