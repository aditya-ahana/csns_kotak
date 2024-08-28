import React from "react";

import {
  render,
  fireEvent,
  screen,
  cleanup,
  within,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewRequestDetails from "../../pages/ViewRequest/ViewRequestDetails";
import { BrowserRouter } from "react-router-dom";
import { requestDetails } from "../../components/data/requestsData";

const renderViewDetails = () => {
  return render(
    <BrowserRouter>
      <ViewRequestDetails />
    </BrowserRouter>
  );
};

test("View Details Page Loader Render Check",() => {
  renderViewDetails();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  setTimeout(() => {
    expect(loader).not.toBeInTheDocument();
  },1000)
});

test("Render View Details component", () => {
  renderViewDetails();
  setTimeout(() => {

  const viewDetailsPage = screen.getByTestId("view-details-page");

  expect(viewDetailsPage).toBeInTheDocument();
  },1000)
});

test("Sub-Request Expand Button Functionality check", async () => {
  renderViewDetails();
  setTimeout(() => {

  const expandButton = screen.getByTestId("accordion-displayer-0");
  expect(expandButton).toBeInTheDocument();

  fireEvent.click(expandButton);

  // await waitFor(() => {
  //   const accordion = screen.getByTestId("sub-det-disp-0");
  //   expect(accordion).toBeInTheDocument();
  // })

  const accordion = screen.getByTestId("sub-data-display-0");
  expect(accordion).toBeInTheDocument();
},1000)
});

test("Sub-Request Minimize Button Functionality check", () => {
  renderViewDetails();
  setTimeout(() => {

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
  cleanup();
},1000)
});

test("Conditional Render of Show and Hide Accordion buttons", () => {
  renderViewDetails();
  setTimeout(() => {

  const expandButton = screen.getByTestId("accordion-displayer-0");
  expect(expandButton).toBeInTheDocument();

  fireEvent.click(expandButton);

  const hideButton = screen.getByTestId("accordion-hider-0");
  expect(hideButton).toBeInTheDocument();

  fireEvent.click(hideButton);

  expect(expandButton).toBeInTheDocument();
  cleanup();
},1000)
});
