import React from "react";

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UnifiedDesktop from "../../pages/UnifiedDesktop";
import { requestList } from "../../components/data/requestsData";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";

const renderUnifiedDesktop = () => {
  return render(
    <BrowserRouter>
      <UnifiedDesktop />
    </BrowserRouter>
  );
};

test("Unified Desktop Loader Render Check",() => {
  renderUnifiedDesktop();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  setTimeout(() => {
    expect(loader).not.toBeInTheDocument();
  },1000)
});

test("Render Unified Desktop component", () => {
  renderUnifiedDesktop();

  setTimeout(() => {
  const unifiedDesktopContainer = screen.getByTestId("unified-desktop");

  expect(unifiedDesktopContainer).toBeInTheDocument();
},1000)
});


