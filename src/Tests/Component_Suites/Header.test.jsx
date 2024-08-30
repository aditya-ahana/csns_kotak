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
import ViewRequestDetails from "../../pages/ViewRequest/ViewRequestDetails";
import { requestDetails } from "../../components/data/requestsData";
import Header from "../../components/Header";
import LanguageSelector from "../../components/LanguageSelector";

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header>
        <LanguageSelector />
      </Header>
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

test("Header Render Check", () => {
  expect(renderHeader());
});

test("Header Content Check", () => {
  renderHeader();

  const headerContainer = screen.getByTestId("header");

  expect(headerContainer).toBeInTheDocument();

  const languageDropdown = screen.getByTestId("language-dropdown");

  expect(languageDropdown).toBeInTheDocument();

  const headerProfile = screen.getByTestId("header-profile");

  expect(headerProfile).toBeInTheDocument();

  const headerUser = screen.getByTestId("header-username");

  expect(headerUser).not.toHaveTextContent("");
});

test.skip("Language Dropdown Functionality Check", () => {
  renderHeader();

  const languageDropdown = screen.getByTestId("language-dropdown");

  const languageSelectInput = languageDropdown.querySelector("input");

  const languagedropdownBox = within(languageDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(languagedropdownBox);

  const languageMenuItem1 = screen.getByTestId(`language-dropdown-menuitem-0`);

  fireEvent.click(languageMenuItem1);

  expect(languageSelectInput.value).toBe("en");

  const languageMenuItem2 = screen.getByTestId(`language-dropdown-menuitem-1`);

  fireEvent.click(languageMenuItem2);

  expect(languageSelectInput.value).toBe("hi");

  fireEvent.click(languageMenuItem1);

  expect(languageSelectInput.value).toBe("en");
});
