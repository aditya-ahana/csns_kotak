import React from "react";
import { render } from "@testing-library/react";
import App from "../App";

jest.mock("../main.jsx");

jest.mock("../App.jsx");
jest.mock("../App.css");

jest.mock("../i18n.js");

jest.mock("../pages/UnifiedDesktop.jsx");

jest.mock("../pages/Dashboard/Dashboard.jsx");

jest.mock("../pages/CreateRequest/CreateRequest.jsx");

jest.mock("../pages/ViewRequest/ViewRequest.jsx");
jest.mock("../pages/ViewRequest/ViewRequestDetails.jsx");

jest.mock("../components/BreadCrumb.jsx");
jest.mock("../components/Header.jsx");
jest.mock("../components/LanguageSelector.jsx");
jest.mock("../components/Sidebar.jsx");
jest.mock("../components/Modals/MailDraft.jsx");
jest.mock("../components/data/FederationData.jsx");
jest.mock("../components/data/requestsData.jsx");
jest.mock("../components/data/SidebarData.jsx");

jest.mock("../Layout/SharedLayout.jsx");
jest.mock("../Layout/WithNav.jsx");
jest.mock("../Layout/WithoutNav.jsx");

jest.mock("../locale/English.js");
jest.mock("../locale/Hindi.js");

jest.mock("../Mocks/Mocker.js");

jest.mock("../Redux/csnsReducers.js");
jest.mock("../Redux/reduxStore.js");

describe("Succesfull App Render Scenario", () => {
  test("App Mount", () => {
    expect(render(<App />));
  });
});
