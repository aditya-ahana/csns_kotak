import React from "react";
import {
  render,
  fireEvent,
  screen,
  cleanup,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import { test, expect, vi, describe, beforeEach, afterEach } from "vitest";
import ViewRequestDetails from "../../pages/ViewRequest/ViewRequestDetails";
import { BrowserRouter } from "react-router-dom";
import store from "../../Redux/reduxStore";
import { Provider } from "react-redux";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

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

test("View Details Page Loader Render Check", () => {
  renderViewDetails();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  advanceTimer();
  expect(loader).not.toBeInTheDocument();
});

test("Render View Details component", () => {
  renderViewDetails();
  advanceTimer();
  const viewDetailsPage = screen.getByTestId("view-details-page");

  expect(viewDetailsPage).toBeInTheDocument();
});

test("Sub-Request Expand Button Functionality check", async () => {
  renderViewDetails();
  advanceTimer();
  const expandButton = screen.getByTestId("accordion-displayer-0");
  expect(expandButton).toBeInTheDocument();

  fireEvent.click(expandButton);

  // await waitFor(() => {
  //   const accordion = screen.getByTestId("sub-det-disp-0");
  //   expect(accordion).toBeInTheDocument();
  // })

  const accordion = screen.getByTestId("sub-data-display-0");
  expect(accordion).toBeInTheDocument();
});

test("Sub-Request Minimize Button Functionality check", () => {
  renderViewDetails();
  advanceTimer();
  const expandButton = screen.getByTestId("accordion-displayer-0");
  // expect(expandButton).toBeInTheDocument();

  fireEvent.click(expandButton);

  // await waitFor(() => {
  //   const accordion = screen.getByTestId("sub-det-disp-0");
  //   expect(accordion).toBeInTheDocument();
  // })

  const accordion = screen.getByTestId("sub-data-display-0");
  expect(accordion).toBeInTheDocument();

  const hideButton = screen.getByTestId("accordion-hider-0");
  // expect(hideButton).toBeInTheDocument();

  fireEvent.click(hideButton);
  expect(accordion).not.toBeInTheDocument();
});

test("Conditional Render of Show and Hide Accordion buttons", () => {
  renderViewDetails();
  advanceTimer();
  const expandButton = screen.getByTestId("accordion-displayer-0");
  expect(expandButton).toBeInTheDocument();

  fireEvent.click(expandButton);

  const hideButton = screen.getByTestId("accordion-hider-0");
  expect(hideButton).toBeInTheDocument();

  fireEvent.click(hideButton);

  expect(expandButton).toBeInTheDocument();
});
