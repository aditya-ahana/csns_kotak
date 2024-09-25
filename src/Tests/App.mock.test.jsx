import React from "react";
import { test, expect, vi, describe } from "vitest";

test("All Component Mocks", () => {
  vi.mock("../Entry.jsx");

  vi.mock("../App.jsx");
  vi.mock("../App.css");

  vi.mock("../i18n.js");

  vi.mock("../pages/UnifiedDesktop.jsx");

  vi.mock("../pages/Dashboard/Dashboard.jsx");

  vi.mock("../pages/CreateRequest/CreateRequest.jsx");

  vi.mock("../pages/ViewRequest/ViewRequest.jsx");
  vi.mock("../pages/ViewRequest/ViewRequestDetails.jsx");

  vi.mock("../components/BreadCrumb.jsx");
  vi.mock("../components/Header.jsx");
  vi.mock("../components/LanguageSelector.jsx");
  vi.mock("../components/Sidebar.jsx");
  vi.mock("../components/Modals/MailDraft.jsx");
  vi.mock("../components/data/FederationData.jsx");
  vi.mock("../components/data/SidebarData.jsx");

  vi.mock("../Layout/SharedLayout.jsx");
  vi.mock("../Layout/WithNav.jsx");
  vi.mock("../Layout/WithoutNav.jsx");

  vi.mock("../locale/English.js");
  vi.mock("../locale/Hindi.js");

  vi.mock("../Mocks/VitestSetup.js");

  vi.mock("../Mocks/Mocker.js");

  vi.mock("../Redux/csnsReducers.js");
  vi.mock("../Redux/reduxStore.js");
  vi.mock("../Redux/reducedData.js");
});
