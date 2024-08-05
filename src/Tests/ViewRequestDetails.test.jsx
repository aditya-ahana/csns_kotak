import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ViewRequestDetails from "../pages/ViewRequest/ViewRequestDetails";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { requestDetails } from "../components/data/requestsData";

const renderViewDetails = () => {
  return render(
    <BrowserRouter>
      <ViewRequestDetails />
    </BrowserRouter>
  );
};

describe("View Details Page", () => {
  test("Render View Details component", () => {
    renderViewDetails();
    cleanup();
  });
});

// test("Display Sub-Details",() => {
//   renderViewDetails();

//   requestDetails.forEach((detail, index) => {
//   const expandButton = screen.getByTestId(`accordion-displayer${index}`);
//   expect(expandButton).toBeInTheDocument();

//   fireEvent.click(expandButton)

//   const subDetailsSection = screen.queryByTestId(`sub-det-disp${index}`);
//   expect(subDetailsSection).toBeInTheDocument();
//   });
//   cleanup();
// });
