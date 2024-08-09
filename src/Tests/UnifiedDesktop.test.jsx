import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UnifiedDesktop from "../pages/UnifiedDesktop";
import { requestList } from "../components/data/requestsData";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";

const renderUnifiedDesktop = () => {
  return render(
    <BrowserRouter>
      <UnifiedDesktop />
    </BrowserRouter>
  );
};

describe("Initial Unified Desktop Page", () => {
  test("Render Unified Desktop component", () => {
    renderUnifiedDesktop();
    cleanup();
  });
});
