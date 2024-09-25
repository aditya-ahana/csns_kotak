import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import UnifiedDesktop from "../../pages/UnifiedDesktop";
import { BrowserRouter } from "react-router-dom";
import { cleanup } from "@testing-library/react";
import { test, expect, vi, describe, beforeEach, afterEach } from "vitest";
import store from "../../Redux/reduxStore";
import { Provider } from "react-redux";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

const renderUnifiedDesktop = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <UnifiedDesktop />
      </Provider>
    </BrowserRouter>
  );
};

const advanceTimer = () => {
  act(() => {
    vi.advanceTimersByTime(1000);
  });
};

test("Unified Desktop Loader Render Check", () => {
  renderUnifiedDesktop();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  advanceTimer();
  expect(loader).not.toBeInTheDocument();
});

test("Render Unified Desktop component", () => {
  renderUnifiedDesktop();

  advanceTimer();
  const unifiedDesktopContainer = screen.getByTestId("unified-desktop");

  expect(unifiedDesktopContainer).toBeInTheDocument();
});
