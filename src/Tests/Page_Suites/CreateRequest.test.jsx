import React, { useEffect } from "react";
import {
  render,
  fireEvent,
  screen,
  within,
  waitFor,
  act,
} from "@testing-library/react";
import { test, expect, vi, describe, afterEach, beforeEach } from "vitest";
import { cleanup } from "@testing-library/react";
import CreateRequest from "../../pages/CreateRequest/CreateRequest";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "../../Redux/reduxStore";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";
import ViewRequest from "../../pages/ViewRequest/ViewRequest";
import MailDraft from "../../components/Modals/MailDraft";
import {
  availableReportTypes,
  changeReadOnly,
  countryCodeData,
  currentDate,
  ticketTypeData,
} from "../../Redux/reducedData";

const countryCodes = countryCodeData.map((code) => code.phone);

const ticketTypes = ticketTypeData.filter(
  (ticketType) => ticketType !== "Other"
);

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

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
      <Provider store={store}>
        <ViewRequest>
          <MailDraft />
        </ViewRequest>
      </Provider>
    </BrowserRouter>
  );
};

const advanceTimer = () => {
  act(() => {
    vi.advanceTimersByTime(1000);
  });
};

const fillTicketNumberInput = () => {
  const ticketNumberField = screen.getByTestId("ticket-num-input");

  expect(ticketNumberField).toBeInTheDocument();

  const ticketNumberInput = ticketNumberField.querySelector("input");

  expect(ticketNumberInput.value).toBe("");

  fireEvent.change(ticketNumberInput, {
    target: {
      value: "2455481780",
    },
  });

  expect(ticketNumberInput.value.slice(0, 10)).toBe("2455481780");
};

const selectTicketType = () => {
  ticketTypeData.forEach((ticketType) => {
    renderCreateRequest();
    advanceTimer();

    fillTicketNumberInput();

    const ticketDropdown = screen.getByTestId(`ticket-type-dropdown`);

    const ticketDropdownBox = within(ticketDropdown).getByRole("combobox", {
      hidden: true,
    });

    fireEvent.mouseDown(ticketDropdownBox);

    const ticketItems = screen.getAllByTestId(`ticket-menu-item`);

    const ticketItem1 = ticketItems.find(
      (cc) => cc.getAttribute("data-value") === ticketType
    );

    fireEvent.click(ticketItem1);

    expect(ticketDropdown.querySelector("input").value).toBe(ticketType);
    cleanup();
  });
};

const fillTicketDescriptionInput = () => {
  const ticketDropdown = screen.getByTestId(`ticket-type-dropdown`);

  const ticketDropdownBox = within(ticketDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(ticketDropdownBox);

  const ticketItems = screen.getAllByTestId(`ticket-menu-item`);

  const ticketItem1 = ticketItems.find(
    (cc) => cc.getAttribute("data-value") === "Other"
  );

  fireEvent.click(ticketItem1);

  expect(ticketDropdown.querySelector("input").value).toBe("Other");

  const ticketDescriptionField = screen.getByTestId("ticket-descr-input");

  const ticketDescriptionInput =
    ticketDescriptionField.querySelector("textarea");

  expect(ticketDescriptionInput.value).toBe("");

  fireEvent.change(ticketDescriptionInput, {
    target: {
      value:
        "Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts : A dev server that provides rich feature enhancements and a build command that bundles your code with highly optimized static assets for production",
    },
  });

  expect(ticketDescriptionInput.value).toBe(
    "Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects. It consists of two major parts : A dev server that provides rich feature enhancements and a build command that bundles your code with highly optimized static assets for production"
  );
};

describe("Ticket Type Check", () => {
  test("Ticket Type Selection Check", () => {
    selectTicketType();
  });

  test("Ticket Description Input Render Check", () => {
    ticketTypeData.forEach((ticketType) => {
      renderCreateRequest();
      advanceTimer();
      fillTicketNumberInput();

      const ticketDropdown = screen.getByTestId(`ticket-type-dropdown`);

      const ticketDropdownBox = within(ticketDropdown).getByRole("combobox", {
        hidden: true,
      });

      fireEvent.mouseDown(ticketDropdownBox);

      const ticketItems = screen.getAllByTestId(`ticket-menu-item`);

      const ticketItem1 = ticketItems.find(
        (cc) => cc.getAttribute("data-value") === ticketType
      );

      fireEvent.click(ticketItem1);

      expect(ticketDropdown.querySelector("input").value).toBe(ticketType);

      const ticketDescriptionField = screen.queryByTestId("ticket-descr-input");

      if (ticketType === "Other") {
        expect(ticketDescriptionField).toBeInTheDocument();
      } else {
        expect(ticketDescriptionField).not.toBeInTheDocument();
      }
      cleanup();
    });
  });

  test("Ticket Description Input Check", () => {
    renderCreateRequest();
    advanceTimer();
    fillTicketNumberInput();
    fillTicketDescriptionInput();
  });
});

const selectReports = (selectedReport) => {
  const dropdown = screen.getByTestId("reports-selection-dropdown");
  const dropdownBox = within(dropdown).getByRole("combobox");

  fireEvent.mouseDown(dropdownBox);

  const menuItems = screen.getAllByRole("option");

  screen.debug(menuItems);

  // expect(menuItem).toBeInTheDocument();

  const menuItem = menuItems.find(
    (report) => report.getAttribute("data-value") === selectedReport
  );

  const checkBox = within(menuItem).getByTestId(`reports-checkbox`);
  expect(checkBox).toBeInTheDocument();

  const checkerBox = within(checkBox).getByRole("checkbox");

  screen.debug(checkerBox);

  fireEvent.click(checkerBox);

  expect(checkerBox).toBeChecked();

  const selectInput = dropdown.querySelector("input");

  expect(selectInput.value).toBe(selectedReport);

  // expect(checkerBox).toHaveProperty('checked', true);

  // const selectedReportsSection = screen.getByTestId("selected-reports-section");

  // expect(selectedReportsSection).toBeInTheDocument();
};

const selectParams = (report, param) => {
  // console.log(reportIndex, report, paramSelectIndex, paramIndex, param);
  selectReports(report);

  // const selectedReportsSection = screen.getByTestId("selected-reports-section");

  // expect(selectedReportsSection).toBeInTheDocument();

  const paramDropdown = screen.getByTestId(`param-dropdown-0`);

  const paramdropdownBox = within(paramDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(paramdropdownBox);

  const menuItems = screen.getAllByRole("option");

  // expect(menuItems).toBeInTheDocument();

  screen.debug(menuItems);

  const menuItem = menuItems.find(
    (input) => input.getAttribute("data-value") === param
  );

  // // expect(menuItem).toBeInTheDocument();

  // screen.debug(menuItem);

  const checkBox = within(menuItem).getByTestId(`param-checkbox`);

  // // expect(paramCheckBox).toBeInTheDocument();

  const paramCheckerBox = within(checkBox).getByRole("checkbox");

  // // expect(paramCheckerBox).toBeInTheDocument();

  fireEvent.click(paramCheckerBox);

  expect(paramCheckerBox).toBeChecked();
  // // // expect(paramCheckerBox).toHaveProperty('checked', true);

  const paramSelectInput = paramDropdown.querySelector("input");

  expect(paramSelectInput.value).toBe(param);
};

test("Create Request Page Loader Render Check", () => {
  renderCreateRequest();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  advanceTimer();

  expect(loader).not.toBeInTheDocument();
});

test("Reports Search Functionality Check", async () => {
  renderCreateRequest();
  advanceTimer();

  const dropdown = screen.getByTestId("reports-selection-dropdown");
  const dropdownBox = within(dropdown).getByRole("combobox");

  fireEvent.mouseDown(dropdownBox);

  const searchBar = screen.getByTestId("reports-search");

  const searchInput = screen
    .getByTestId("reports-search-input")
    .querySelector("input");

  screen.debug(searchBar);

  const value = " DeviCe ";

  fireEvent.change(searchInput, {
    target: {
      value: value.toLowerCase().trim(),
    },
  });

  expect(searchInput.value).toBe("device");

  vi.useRealTimers();
});

test("Render Create Request component", () => {
  expect(renderCreateRequest());
});

test("Ticket Number Input Field Test", () => {
  renderCreateRequest();
  advanceTimer();

  const ticketNumberField = screen.getByTestId("ticket-num-input");

  expect(ticketNumberField).toBeInTheDocument();

  const ticketNumberInput = ticketNumberField.querySelector("input");

  fireEvent.change(ticketNumberInput, {
    target: {
      value: "49249247012",
    },
  });

  expect(ticketNumberInput.value.slice(0, 10)).toBe("4924924701");
});

test("Ticket Description TextArea Field Test", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketDescriptionInput();
});

describe("Reports Selection Dropdown Functionality Check", () => {
  test("Mock Selection Check", () => {
    renderCreateRequest();
    advanceTimer();
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectReports("IP Logs");
    // screen.debug();
  });

  test("Multiple Reports Selection Check", () => {
    renderCreateRequest();
    advanceTimer();
    advanceTimer();
    fillTicketNumberInput();
    fillTicketDescriptionInput();

    const dropdown = screen.getByTestId("reports-selection-dropdown");

    const selectInput = dropdown.querySelector("input");

    expect(selectInput.value).toBe("");

    const dropdownBox = within(dropdown).getByRole("combobox");

    fireEvent.mouseDown(dropdownBox);

    const menuItems = screen.getAllByRole("option");

    const menuItemMap1 = menuItems.find(
      (item) =>
        item.getAttribute("data-value") ===
        "Beneficiary details for Bulk IMPS transactions"
    );
    const menuItemMap2 = menuItems.find(
      (item) =>
        item.getAttribute("data-value") ===
        "Beneficiary details for Single UPI transactions"
    );
    const menuItemMap3 = menuItems.find(
      (item) => item.getAttribute("data-value") === "Device details"
    );
    const menuItemMap4 = menuItems.find(
      (item) => item.getAttribute("data-value") === "IP Logs"
    );
    const menuItemMap5 = menuItems.find(
      (item) => item.getAttribute("data-value") === "Statement in PDF/Excel"
    );

    const checkBox1 = within(menuItemMap1).getByTestId(`reports-checkbox`);
    const checkBox2 = within(menuItemMap2).getByTestId(`reports-checkbox`);
    const checkBox3 = within(menuItemMap3).getByTestId(`reports-checkbox`);
    const checkBox4 = within(menuItemMap4).getByTestId(`reports-checkbox`);
    const checkBox5 = within(menuItemMap5).getByTestId(`reports-checkbox`);

    const checkerBox1 = within(checkBox1).getByRole("checkbox");
    const checkerBox2 = within(checkBox2).getByRole("checkbox");
    const checkerBox3 = within(checkBox3).getByRole("checkbox");
    const checkerBox4 = within(checkBox4).getByRole("checkbox");
    const checkerBox5 = within(checkBox5).getByRole("checkbox");

    fireEvent.click(checkerBox1);
    expect(checkerBox1).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions"
    );

    fireEvent.click(checkerBox2);
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions"
    );

    fireEvent.click(checkerBox3);
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions,Device details"
    );

    fireEvent.click(checkerBox4);
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions,Device details,IP Logs"
    );

    fireEvent.click(checkerBox5);
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions,Device details,IP Logs,Statement in PDF/Excel"
    );

    fireEvent.click(checkerBox2);
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).not.toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions,Device details,IP Logs,Statement in PDF/Excel"
    );

    fireEvent.click(checkerBox4);
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).not.toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).not.toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(selectInput.value).toBe(
      "Beneficiary details for Bulk IMPS transactions,Device details,Statement in PDF/Excel"
    );
  });
});

test("Rendering Selected Reports Section", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectReports("Statement in PDF/Excel");

  const selectedReportsSection = screen.getByTestId("selected-reports-section");

  expect(selectedReportsSection).toBeInTheDocument();
});

describe("Params Selection Dropdown Functionality Check", () => {
  test("Param Search Functionality check", () => {
    renderCreateRequest();
    advanceTimer();
    fillTicketNumberInput();
    fillTicketDescriptionInput();

    selectReports("Statement in PDF/Excel");

    const paramDropdown = screen.getByTestId(`param-dropdown-0`);

    const paramdropdownBox = within(paramDropdown).getByRole("combobox", {
      hidden: true,
    });

    fireEvent.mouseDown(paramdropdownBox);

    const searchBar = screen.getByTestId("param-search-0");

    const searchInput = screen
      .getByTestId("param-search-input-0")
      .querySelector("input");

    screen.debug(searchBar);

    const value = "      AadhaR ";

    fireEvent.change(searchInput, {
      target: {
        value: value.toLowerCase().trim(),
      },
    });

    expect(searchInput.value).toBe("aadhar");

    vi.useRealTimers();
  });
  test("Mock Params Selection Check", () => {
    renderCreateRequest();
    advanceTimer();
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("Beneficiary details for Bulk IMPS transactions", "Aadhar");
  });

  test("Multiple Params Selection Check", () => {
    renderCreateRequest();
    advanceTimer();
    fillTicketNumberInput();
    fillTicketDescriptionInput();

    selectReports("Beneficiary details for Bulk IMPS transactions");

    const dropdown = screen.getByTestId("param-dropdown-0");

    const selectInput = dropdown.querySelector("input");

    expect(selectInput.value).toBe("");

    const dropdownBox = within(dropdown).getByRole("combobox", {
      hidden: true,
    });

    fireEvent.mouseDown(dropdownBox);

    const menuItems = screen.getAllByRole("option");

    const menuItem0 = menuItems.find(
      (input) => input.getAttribute("data-value") === "Aadhar"
    );

    const menuItem1 = menuItems.find(
      (input) => input.getAttribute("data-value") === "Account number"
    );

    const menuItem2 = menuItems.find(
      (input) => input.getAttribute("data-value") === "CRN"
    );

    const menuItem3 = menuItems.find(
      (input) => input.getAttribute("data-value") === "Credit Card"
    );

    const menuItem4 = menuItems.find(
      (input) => input.getAttribute("data-value") === "Debit Card"
    );

    const menuItem5 = menuItems.find(
      (input) => input.getAttribute("data-value") === "Email ID"
    );

    const menuItem6 = menuItems.find(
      (input) => input.getAttribute("data-value") === "Mobile No"
    );

    const menuItem7 = menuItems.find(
      (input) => input.getAttribute("data-value") === "PAN"
    );

    const menuItem8 = menuItems.find(
      (input) => input.getAttribute("data-value") === "RRN"
    );

    const checkBox0 = within(menuItem0).getByTestId("param-checkbox");
    const checkBox1 = within(menuItem1).getByTestId("param-checkbox");
    const checkBox2 = within(menuItem2).getByTestId("param-checkbox");
    const checkBox3 = within(menuItem3).getByTestId("param-checkbox");
    const checkBox4 = within(menuItem4).getByTestId("param-checkbox");
    const checkBox5 = within(menuItem5).getByTestId("param-checkbox");
    const checkBox6 = within(menuItem6).getByTestId("param-checkbox");
    const checkBox7 = within(menuItem7).getByTestId("param-checkbox");
    const checkBox8 = within(menuItem8).getByTestId("param-checkbox");

    const checkerBox0 = within(checkBox0).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox1 = within(checkBox1).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox2 = within(checkBox2).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox3 = within(checkBox3).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox4 = within(checkBox4).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox5 = within(checkBox5).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox6 = within(checkBox6).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox7 = within(checkBox7).getByRole("checkbox", {
      hidden: true,
    });
    const checkerBox8 = within(checkBox8).getByRole("checkbox", {
      hidden: true,
    });

    fireEvent.click(checkerBox0);
    expect(checkerBox0).toBeChecked();
    expect(selectInput.value).toBe("Aadhar");

    fireEvent.click(checkerBox1);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(selectInput.value).toBe("Aadhar,Account number");

    fireEvent.click(checkerBox2);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(selectInput.value).toBe("Aadhar,Account number,CRN");

    fireEvent.click(checkerBox3);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(selectInput.value).toBe("Aadhar,Account number,CRN,Credit Card");

    fireEvent.click(checkerBox4);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Credit Card,Debit Card"
    );

    fireEvent.click(checkerBox5);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Credit Card,Debit Card,Email ID"
    );

    fireEvent.click(checkerBox6);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(checkerBox6).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Credit Card,Debit Card,Email ID,Mobile No"
    );

    fireEvent.click(checkerBox7);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(checkerBox6).toBeChecked();
    expect(checkerBox7).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Credit Card,Debit Card,Email ID,Mobile No,PAN"
    );

    fireEvent.click(checkerBox8);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(checkerBox6).toBeChecked();
    expect(checkerBox7).toBeChecked();
    expect(checkerBox8).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Credit Card,Debit Card,Email ID,Mobile No,PAN,RRN"
    );

    fireEvent.click(checkerBox3);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).not.toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(checkerBox6).toBeChecked();
    expect(checkerBox7).toBeChecked();
    expect(checkerBox8).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Debit Card,Email ID,Mobile No,PAN,RRN"
    );

    fireEvent.click(checkerBox7);

    expect(checkerBox0).toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).not.toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(checkerBox6).toBeChecked();
    expect(checkerBox7).not.toBeChecked();
    expect(checkerBox8).toBeChecked();
    expect(selectInput.value).toBe(
      "Aadhar,Account number,CRN,Debit Card,Email ID,Mobile No,RRN"
    );

    fireEvent.click(checkerBox0);

    expect(checkerBox0).not.toBeChecked();
    expect(checkerBox1).toBeChecked();
    expect(checkerBox2).toBeChecked();
    expect(checkerBox3).not.toBeChecked();
    expect(checkerBox4).toBeChecked();
    expect(checkerBox5).toBeChecked();
    expect(checkerBox6).toBeChecked();
    expect(checkerBox7).not.toBeChecked();
    expect(checkerBox8).toBeChecked();
    expect(selectInput.value).toBe(
      "Account number,CRN,Debit Card,Email ID,Mobile No,RRN"
    );
  });
});

test("Rendering Form Fields After Param Selection", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const formFieldset = screen.queryByTestId("detail-fieldset-0");

  expect(formFieldset).toBeInTheDocument();
});

test("Detail Name Input Render and Functionality Check", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameField = screen.getByTestId("search-type-input-0");

  expect(detailNameField).toBeInTheDocument();

  const detailNameInput = detailNameField.querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "8510542870441383",
    },
  });

  expect(detailNameInput.value).toBe("8510542870441383");
});

test("From Date Picker Functionality Check", () => {
  renderCreateRequest();
  advanceTimer();
  changeReadOnly(false);

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "25705428704477890",
    },
  });

  expect(detailNameInput.value).toBe("25705428704477890");

  const fromDatepicker = screen.getByLabelText("from");

  expect(fromDatepicker).toBeInTheDocument();

  fireEvent.change(fromDatepicker, {
    target: { value: currentDate },
  });

  expect(fromDatepicker.value).toBe(currentDate);
  changeReadOnly(true);
});

test("To Date Picker Functionality Check", () => {
  renderCreateRequest();
  advanceTimer();
  changeReadOnly(false);

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "16325456314470578",
    },
  });

  expect(detailNameInput.value).toBe("16325456314470578");

  const fromDatepicker = screen.getByLabelText("from");

  expect(fromDatepicker).toBeInTheDocument();

  fireEvent.change(fromDatepicker, {
    target: { value: currentDate },
  });

  expect(fromDatepicker.value).toBe(currentDate);

  const toDatepicker = screen.getByLabelText("to");

  expect(toDatepicker).toBeInTheDocument();

  fireEvent.change(toDatepicker, { target: { value: currentDate } });

  expect(toDatepicker.value).toBe(currentDate);
  changeReadOnly(true);
});

test("Report Type Dropdown Functionality Check for Statement in PDF/Excel Report", () => {
  availableReportTypes.forEach((type) => {
    renderCreateRequest();
    advanceTimer();

    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("Statement in PDF/Excel", "Account number");

    const detailNameInput = screen
      .getByTestId("search-type-input-0")
      .querySelector("input");

    fireEvent.change(detailNameInput, {
      target: {
        value: "4672345131447409",
      },
    });

    expect(detailNameInput.value).toBe("4672345131447409");

    const typeDropdown = screen.getByTestId(`type-dropdown-0`);

    const typeSelectInput = typeDropdown.querySelector("input");

    const typedropdownBox = within(typeDropdown).getByRole("combobox", {
      hidden: true,
    });

    fireEvent.mouseDown(typedropdownBox);

    const typeMenuItems = screen.getAllByRole("option");

    const typeMenuItem1 = typeMenuItems.find(
      (item) => item.getAttribute("data-value") === type
    );
    // const typeMenuItem2 = typeMenuItems.find(
    //   (type) => type.getAttribute("data-value") === "PDF"
    // );

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe(type.toLowerCase());
    cleanup();

    // fireEvent.click(typeMenuItem2);

    // expect(typeSelectInput.value).toBe("PDF".toLowerCase());

    // fireEvent.click(typeMenuItem1);

    // expect(typeSelectInput.value).toBe("Excel".toLowerCase());
  });
});

describe("Triple Detail Render and Change for IP Logs", () => {
  test("Triple Detailset render check", () => {
    renderCreateRequest();
    advanceTimer();

    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("IP Logs", "Aadhar");

    const detailSet0 = screen.getByTestId("detail-fieldset-0");
    const detailSet1 = screen.getByTestId("detail-fieldset-1");
    const detailSet2 = screen.getByTestId("detail-fieldset-2");

    expect(detailSet0).toBeInTheDocument();
    expect(detailSet1).toBeInTheDocument();
    expect(detailSet2).toBeInTheDocument();
  });

  test("Triple Input Change Functionality check", () => {
    renderCreateRequest();
    advanceTimer();

    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("IP Logs", "PAN");

    const detailField0 = screen.getByTestId("search-type-input-0");
    const detailField1 = screen.getByTestId("search-type-input-1");
    const detailField2 = screen.getByTestId("search-type-input-2");

    const detailInput0 = detailField0.querySelector("input");
    const detailInput1 = detailField1.querySelector("input");
    const detailInput2 = detailField2.querySelector("input");

    fireEvent.change(detailInput2, {
      target: {
        value: "6424789013",
      },
    });

    expect(detailInput2.value).toBe("6424789013");
    expect(detailInput1.value).toBe("6424789013");
    expect(detailInput0.value).toBe("6424789013");
  });

  test("Triple From Date Input change check", () => {
    renderCreateRequest();
    advanceTimer();
    changeReadOnly(false);

    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("IP Logs", "Account number");

    const fromDatepickers = screen.getAllByLabelText("from");

    const fromDate0 = fromDatepickers.find((picker, index) => index === 0);
    const fromDate1 = fromDatepickers.find((picker, index) => index === 1);
    const fromDate2 = fromDatepickers.find((picker, index) => index === 2);

    // fromDatepickers.forEach((picker, index) => {
    //   expect(picker).toBeInTheDocument();
    //   console.log("PICKER INDEX", index);
    // });

    fireEvent.change(fromDate2, {
      target: { value: currentDate },
    });

    expect(fromDate2.value).toBe(currentDate);
    expect(fromDate1.value).toBe(currentDate);
    expect(fromDate0.value).toBe(currentDate);

    changeReadOnly(true);
  });

  test("Triple To Date Input change check", () => {
    renderCreateRequest();
    advanceTimer();
    changeReadOnly(false);

    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("IP Logs", "Debit Card");

    const toDatepickers = screen.getAllByLabelText("to");

    const toDate0 = toDatepickers.find((picker, index) => index === 0);
    const toDate1 = toDatepickers.find((picker, index) => index === 1);
    const toDate2 = toDatepickers.find((picker, index) => index === 2);

    fireEvent.change(toDate2, {
      target: { value: currentDate },
    });

    expect(toDate2.value).toBe(currentDate);
    expect(toDate1.value).toBe(currentDate);
    expect(toDate0.value).toBe(currentDate);

    changeReadOnly(true);
  });

  test("Triple Country Code Select Functionality Check for Primary Mobile Number", () => {
    countryCodes.forEach((code) => {
      renderCreateRequest();
      advanceTimer();

      fillTicketNumberInput();
      fillTicketDescriptionInput();
      selectParams("IP Logs", "Mobile No");

      const ccDropdown0 = screen.getByTestId(`cc-dropdown-0`);
      const ccDropdown1 = screen.getByTestId(`cc-dropdown-1`);
      const ccDropdown2 = screen.getByTestId(`cc-dropdown-2`);

      const ccSelectInput0 = ccDropdown0.querySelector("input");
      const ccSelectInput1 = ccDropdown1.querySelector("input");
      const ccSelectInput2 = ccDropdown2.querySelector("input");

      const ccDropdownBox = within(ccDropdown2).getByRole("combobox", {
        hidden: true,
      });

      fireEvent.mouseDown(ccDropdownBox);

      const ccMenuItems = screen.getAllByTestId(`cc-menuitem`);

      const ccMenuItem1 = ccMenuItems.find(
        (cc) => cc.getAttribute("data-value") === code
      );

      fireEvent.click(ccMenuItem1);

      expect(ccSelectInput2.value).toBe(code);
      expect(ccSelectInput1.value).toBe(code);
      expect(ccSelectInput0.value).toBe(code);
      cleanup();
    });
  });

  test("Triple Country Code Select Functionality Check for Secondary Mobile Number", () => {
    renderCreateRequest();
    advanceTimer();

    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams("IP Logs", "Aadhar");

    const ccDropdown0 = screen.getByTestId(`cc-dropdown-0`);
    const ccDropdown1 = screen.getByTestId(`cc-dropdown-1`);
    const ccDropdown2 = screen.getByTestId(`cc-dropdown-2`);

    const ccSelectInput0 = ccDropdown0.querySelector("input");
    const ccSelectInput1 = ccDropdown1.querySelector("input");
    const ccSelectInput2 = ccDropdown2.querySelector("input");

    expect(ccSelectInput0.value).toBe("91");
    expect(ccSelectInput1.value).toBe("91");
    expect(ccSelectInput2.value).toBe("91");

    const ccDropdownBox = within(ccDropdown2).getByRole("combobox", {
      hidden: true,
    });

    fireEvent.mouseDown(ccDropdownBox);

    const ccMenuItems = screen.getAllByTestId(`cc-menuitem`);

    const ccMenuItem1 = ccMenuItems.find(
      (cc) => cc.getAttribute("data-value") === "1"
    );

    fireEvent.click(ccMenuItem1);

    expect(ccSelectInput2.value).toBe("1");
    expect(ccSelectInput1.value).toBe("1");
    expect(ccSelectInput0.value).toBe("1");

    const ccMenuItem2 = ccMenuItems.find(
      (cc) => cc.getAttribute("data-value") === "1-242"
    );

    fireEvent.click(ccMenuItem2);

    expect(ccSelectInput2.value).toBe("1-242");
    expect(ccSelectInput1.value).toBe("1-242");
    expect(ccSelectInput0.value).toBe("1-242");
  });
});

test("Mobile Number Input Functionality Check for IP Logs", () => {
  renderCreateRequest();
  advanceTimer();

  act(() => {
    vi.advanceTimersByTime(1000);
  });

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("IP Logs", "Aadhar");

  const detailNameField = screen.getByTestId("search-type-input-2");

  expect(detailNameField).toBeInTheDocument();

  const detailNameInput = detailNameField.querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "8510542870441383",
    },
  });

  expect(detailNameInput.value).toBe("8510542870441383");

  const mobileNoField = screen.getByTestId("mobileno-input-2");

  // screen.debug(mobileNoField)

  expect(mobileNoField).toBeInTheDocument();

  const mobileNoInput = detailNameField.querySelector("input");

  fireEvent.change(mobileNoInput, {
    target: {
      value: "4359124706",
    },
  });

  expect(mobileNoInput.value).toBe("4359124706");
});

test("RRN Amount Input Functionality Check for Beneficiary Details for Single IMPS Transactions", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();

  selectReports("Beneficiary details for Single UPI transactions");

  const RRNField = screen.getByTestId("search-type-input-0");

  expect(RRNField).toBeInTheDocument();

  const RRNInput = RRNField.querySelector("input");

  fireEvent.change(RRNInput, {
    target: {
      value: "6726921083",
    },
  });

  expect(RRNInput.value).toBe("6726921083");

  const amountField = screen.getByTestId("amount-detail-0");

  expect(amountField).toBeInTheDocument();

  const amountInput = amountField.querySelector("input");

  fireEvent.change(amountInput, {
    target: {
      value: "96480",
    },
  });

  expect(amountInput.value).toBe("96480");
});

test("RRN Date Picker Functionality Check for Beneficiary Details for Single Transactions", () => {
  renderCreateRequest();
  advanceTimer();
  changeReadOnly(false);

  fillTicketNumberInput();
  fillTicketDescriptionInput();

  selectReports("Beneficiary details for Single UPI transactions");

  const RRNField = screen.getByTestId("search-type-input-0");

  expect(RRNField).toBeInTheDocument();

  const RRNInput = RRNField.querySelector("input");

  fireEvent.change(RRNInput, {
    target: {
      value: "6726921083",
    },
  });

  expect(RRNInput.value).toBe("6726921083");

  const rrnDatePicker = screen.getByLabelText("date");

  expect(rrnDatePicker).toBeInTheDocument();

  fireEvent.change(rrnDatePicker, {
    target: {
      value: currentDate,
    },
  });

  expect(rrnDatePicker.value).toBe(currentDate);
  changeReadOnly(true);
});

test("Add Detail Button Functionality Check", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "46723451314474097",
    },
  });

  expect(detailNameInput.value).toBe("46723451314474097");

  const typeDropdown = screen.getByTestId(`type-dropdown-0`);

  const typeSelectInput = typeDropdown.querySelector("input");

  const typedropdownBox = within(typeDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(typedropdownBox);

  const typeMenuItems = screen.getAllByRole("option");

  const typeMenuItem2 = typeMenuItems.find(
    (type) => type.getAttribute("data-value") === "PDF"
  );

  fireEvent.click(typeMenuItem2);

  expect(typeSelectInput.value).toBe("PDF".toLowerCase());

  const addDetailButton = screen.getByTestId("add-button-0");

  fireEvent.click(addDetailButton);

  const newDetailFieldset = screen.getByTestId("detail-fieldset-1");

  expect(newDetailFieldset).toBeInTheDocument();
});

test("Delete Detail Button Functionality Check", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "46723451314474097",
    },
  });

  expect(detailNameInput.value).toBe("46723451314474097");

  const typeDropdown = screen.getByTestId(`type-dropdown-0`);

  const typeSelectInput = typeDropdown.querySelector("input");

  const typedropdownBox = within(typeDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(typedropdownBox);

  const typeMenuItems = screen.getAllByRole("option");

  const typeMenuItem2 = typeMenuItems.find(
    (type) => type.getAttribute("data-value") === "PDF"
  );

  fireEvent.click(typeMenuItem2);

  expect(typeSelectInput.value).toBe("PDF".toLowerCase());

  const addDetailButton = screen.getByTestId("add-button-0");

  fireEvent.click(addDetailButton);

  const newDetailFieldsetIndex = screen.getByTestId("detail-fieldset-1");

  expect(newDetailFieldsetIndex).toBeInTheDocument();

  const deleteDetailButton = screen.getByTestId("delete-button-0");

  fireEvent.click(deleteDetailButton);

  expect(newDetailFieldsetIndex).not.toBeInTheDocument();
});

test("Preview Open Functionality Check", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "46723451314474097",
    },
  });

  expect(detailNameInput.value).toBe("46723451314474097");

  const typeDropdown = screen.getByTestId(`type-dropdown-0`);

  const typeSelectInput = typeDropdown.querySelector("input");

  const typedropdownBox = within(typeDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(typedropdownBox);

  const typeMenuItems = screen.getAllByRole("option");

  const typeMenuItem2 = typeMenuItems.find(
    (type) => type.getAttribute("data-value") === "PDF"
  );

  fireEvent.click(typeMenuItem2);

  expect(typeSelectInput.value).toBe("PDF".toLowerCase());

  const previewButton = screen.getByTestId("preview-button");

  fireEvent.click(previewButton);

  expect(previewButton).toBeInTheDocument();

  const previewModal = screen.queryByTestId("preview-modal");

  expect(previewModal).toBeInTheDocument();
});

test("Preview Modal Close Button Functionality Check", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "46723451314474097",
    },
  });

  expect(detailNameInput.value).toBe("46723451314474097");

  const typeDropdown = screen.getByTestId(`type-dropdown-0`);

  const typeSelectInput = typeDropdown.querySelector("input");

  const typedropdownBox = within(typeDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(typedropdownBox);

  const typeMenuItems = screen.getAllByRole("option");

  const typeMenuItem2 = typeMenuItems.find(
    (type) => type.getAttribute("data-value") === "PDF"
  );

  fireEvent.click(typeMenuItem2);

  expect(typeSelectInput.value).toBe("PDF".toLowerCase());

  const previewButton = screen.getByTestId("preview-button");

  fireEvent.click(previewButton);

  expect(previewButton).toBeInTheDocument();

  const previewModal = screen.queryByTestId("preview-modal");

  expect(previewModal).toBeInTheDocument();

  const closePreviewButton = screen.getByTitle("Close Preview");

  fireEvent.click(closePreviewButton);

  expect(previewModal).not.toBeInTheDocument();
});

test("Submission and Route To View Requests Page on clicking Submit Button Functionlaity Check", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectParams("Statement in PDF/Excel", "Account number");

  const detailNameInput = screen
    .getByTestId("search-type-input-0")
    .querySelector("input");

  fireEvent.change(detailNameInput, {
    target: {
      value: "46723451314474097",
    },
  });

  expect(detailNameInput.value).toBe("46723451314474097");

  const typeDropdown = screen.getByTestId(`type-dropdown-0`);

  const typeSelectInput = typeDropdown.querySelector("input");

  const typedropdownBox = within(typeDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(typedropdownBox);

  const typeMenuItems = screen.getAllByRole("option");

  const typeMenuItem2 = typeMenuItems.find(
    (type) => type.getAttribute("data-value") === "PDF"
  );

  fireEvent.click(typeMenuItem2);

  expect(typeSelectInput.value).toBe("PDF".toLowerCase());

  const submitButton = screen.getByTestId("submit-button");

  fireEvent.click(submitButton);

  expect(renderViewRequest());

  const viewRequestPage = screen.getByTestId("view-request-page");

  expect(viewRequestPage).toBeInTheDocument();
});

test("Selected Report Detail View Controller Functionality Check", () => {
  renderCreateRequest();
  advanceTimer();

  fillTicketNumberInput();
  fillTicketDescriptionInput();
  selectReports("Statement in PDF/Excel");

  const selectedReportsSection = screen.getByTestId("selected-reports-section");

  expect(selectedReportsSection).toBeInTheDocument();

  const detailView = screen.getByTestId("selected-report-detail-0");

  expect(detailView).toBeVisible();

  const viewControllerIcon = screen.getByTestId(
    "selected-report-detail-control-0"
  );

  fireEvent.click(viewControllerIcon);

  expect(detailView).not.toBeVisible();
});

//// Rejected /////

/// 1. scrollIntoView() on addDetail() call
/// 2. scrollIntoView() on deleteDetail() call
/// readOnly === true for datePicker field
