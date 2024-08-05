import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewRequest from "../pages/ViewRequest/ViewRequest";
import ViewRequestDetails from "../pages/ViewRequest/ViewRequestDetails";
import { requestList } from "../components/data/requestsData";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";

const renderViewRequest = () => {
  return render(
    <BrowserRouter>
      <ViewRequest />
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

describe("View Request Page", () => {
  test("Render View Request component", () => {
    renderViewRequest();
    cleanup();
  });
});

// test("View Details Page Display",() => {
//    renderViewRequest();

//    requestList.forEach((request,index) => {
//      const viewDetailsButton = screen.getByTestId(`details-page-nav${index}`);

//      fireEvent.click(viewDetailsButton);
//     });

//      renderViewDetails();

//      const viewDetailsPage = screen.getByTestId("view-details-page");
//      expect(viewDetailsPage).toBeInTheDocument();

//      cleanup();

// });

test("Open Filter Menu", () => {
  renderViewRequest();
  const filterMenuButton = screen.getByTestId("filter-menu-button");

  fireEvent.click(filterMenuButton);

  const filterMenu = screen.queryByTestId("filter-menu");
  expect(filterMenu).toBeInTheDocument();

  cleanup();
  renderViewRequest().unmount();
});

test("Clear Filter Button Rendering", () => {
  renderViewRequest();

  const filterMenuButton = screen.getByTestId("filter-menu-button");
  fireEvent.click(filterMenuButton);

  const filterMenu = screen.queryByTestId("filter-menu");
  expect(filterMenu).toBeInTheDocument();

  const unCheckedBox = screen.queryByTestId("status-unchecked");
  expect(unCheckedBox).toBeInTheDocument();

  if (!unCheckedBox) {
    const checkedBox = screen.queryByTestId("checked-box");
    expect(checkedBox).toBeInTheDocument();

    fireEvent.click(checkedBox);

    const clearButton = screen.queryByTestId("menu-clear-button");
    expect(clearButton).toBeInTheDocument();
  }

  cleanup();
  renderViewRequest().unmount();
});

test("Close Filter Menu", () => {
  renderViewRequest();

  const filterMenuButton = screen.getByTestId("filter-menu-button");
  fireEvent.click(filterMenuButton);

  const filterMenu = screen.queryByTestId("filter-menu");
  expect(filterMenu).toBeInTheDocument();

  const unCheckedBox = screen.queryByTestId("status-unchecked");
  expect(unCheckedBox).toBeInTheDocument();

  if (!unCheckedBox) {
    const checkedBox = screen.queryByTestId("checked-box");
    expect(checkedBox).toBeInTheDocument();

    fireEvent.click(checkedBox);

    const clearButton = screen.queryByTestId("menu-clear-button");
    expect(clearButton).toBeInTheDocument();

    if (clearButton) {
      fireEvent.click(clearButton);
      expect(filterMenu).not.toBeInTheDocument();
    }
  }

  cleanup();
  renderViewRequest().unmount();
});
