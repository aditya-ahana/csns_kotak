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
import CreateRequest from "../../pages/CreateRequest/CreateRequest";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/reduxStore";
import userEvent from "@testing-library/user-event";
import { requiredReportsData } from "../../components/data/requestsData";
import dayjs from "dayjs";
import ViewRequest from "../../pages/ViewRequest/ViewRequest";
import MailDraft from "../../components/Modals/MailDraft";
import { changeReadOnly } from "../../components/data/requestsData";

const datePickerTestValue = dayjs(new Date()).format("DD-MM-YYYY");

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

const fillTicketDescriptionInput = () => {
  const ticketDescriptionField = screen.getByTestId("ticket-descr-input");
  screen.get;
  expect(ticketDescriptionField).toBeInTheDocument();

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

const selectReports = (index, selectedReport) => {
  const dropdown = screen.getByTestId("reports-selection-dropdown");
  const dropdownBox = within(dropdown).getByRole("combobox");

  fireEvent.mouseDown(dropdownBox);

  const menuItem = screen.getByTestId(
    `reports-selection-dropdown-menu-item-${index}`
  );

  expect(menuItem).toBeInTheDocument();

  const checkBox = screen.getByTestId(
    `reports-selection-dropdown-menu-item-checkbox-${index}`
  );
  expect(checkBox).toBeInTheDocument();

  const checkerBox = within(checkBox).getByRole("checkbox");

  fireEvent.click(checkerBox);

  expect(checkerBox).toBeChecked();

  const selectInput = dropdown.querySelector("input");

  expect(selectInput.value).toBe(selectedReport);
  // expect(checkerBox).toHaveProperty('checked', true);

  // const selectedReportsSection = screen.getByTestId("selected-reports-section");

  // expect(selectedReportsSection).toBeInTheDocument();
};

const selectParams = (
  reportIndex,
  report,
  paramSelectIndex,
  paramIndex,
  param
) => {
  selectReports(reportIndex, report);

  // const selectedReportsSection = screen.getByTestId("selected-reports-section");

  // expect(selectedReportsSection).toBeInTheDocument();

  const paramDropdown = screen.getByTestId(
    `param-dropdown-${paramSelectIndex}`
  );

  const paramdropdownBox = within(paramDropdown).getByRole("combobox", {
    hidden: true,
  });

  fireEvent.mouseDown(paramdropdownBox);

  const paramMenuItem = screen.getByTestId(
    `param-dropdown-menu-item-${paramIndex}`
  );

  expect(paramMenuItem).toBeInTheDocument();

  screen.debug(paramMenuItem);

  const paramCheckBox = screen.getByTestId(
    `param-dropdown-checkbox-${paramIndex}`
  );

  expect(paramCheckBox).toBeInTheDocument();

  const paramCheckerBox = within(paramCheckBox).getByRole("checkbox", {
    hidden: true,
  });

  expect(paramCheckerBox).toBeInTheDocument();

  fireEvent.click(paramCheckerBox);

  expect(paramCheckerBox).toBeChecked();
  // expect(paramCheckerBox).toHaveProperty('checked', true);

  const paramSelectInput = paramDropdown.querySelector("input");

  expect(paramSelectInput.value).toBe(param);
};

test("Create Request Page Loader Render Check", () => {
  renderCreateRequest();

  const loader = screen.getByTestId("loader-modal");
  expect(loader).toBeInTheDocument();

  setTimeout(() => {
    expect(loader).not.toBeInTheDocument();
  }, 600);
});

test("Render Create Request component", () => {
  setTimeout(() => {
    expect(renderCreateRequest());
  }, 600);
});

test("Ticket Number Input Field Test", () => {
  renderCreateRequest();

  setTimeout(() => {
    const ticketNumberField = screen.getByTestId("ticket-num-input");

    expect(ticketNumberField).toBeInTheDocument();

    const ticketNumberInput = ticketNumberField.querySelector("input");

    fireEvent.change(ticketNumberInput, {
      target: {
        value: "49249247012",
      },
    });

    expect(ticketNumberInput.value.slice(0, 10)).toBe("4924924701");
  }, 600);
});

test("Ticket Description TextArea Field Test", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketDescriptionInput();
    cleanup();
  }, 600);
});

describe("Reports Selection Dropdown Functionality Check", () => {
  test("Mock Selection Check", () => {
    renderCreateRequest();
    setTimeout(() => {
      fillTicketNumberInput();
      fillTicketDescriptionInput();
      selectReports(0, "Statement in PDF/Excel");
      // screen.debug();
    }, 600);
  });

  test("Multiple Reports Selection Check", () => {
    renderCreateRequest();
    setTimeout(() => {
      fillTicketNumberInput();
      fillTicketDescriptionInput();

      const dropdown = screen.getByTestId("reports-selection-dropdown");

      const selectInput = dropdown.querySelector("input");

      expect(selectInput.value).toBe("");

      const dropdownBox = within(dropdown).getByRole("combobox");

      fireEvent.mouseDown(dropdownBox);

      const menuItem0 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-0`
      );
      const menuItem1 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-1`
      );
      const menuItem2 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-2`
      );
      const menuItem3 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-3`
      );
      const menuItem4 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-4`
      );
      const menuItem5 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-5`
      );
      const menuItem6 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-6`
      );

      expect(menuItem0).toBeInTheDocument();
      expect(menuItem1).toBeInTheDocument();
      expect(menuItem2).toBeInTheDocument();
      expect(menuItem3).toBeInTheDocument();
      expect(menuItem4).toBeInTheDocument();
      expect(menuItem5).toBeInTheDocument();
      expect(menuItem6).toBeInTheDocument();

      const checkBox0 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-0`
      );
      const checkBox1 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-1`
      );
      const checkBox2 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-2`
      );
      const checkBox3 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-3`
      );
      const checkBox4 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-4`
      );
      const checkBox5 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-5`
      );
      const checkBox6 = screen.getByTestId(
        `reports-selection-dropdown-menu-item-checkbox-6`
      );

      const checkerBox0 = within(checkBox0).getByRole("checkbox");
      const checkerBox1 = within(checkBox1).getByRole("checkbox");
      const checkerBox2 = within(checkBox2).getByRole("checkbox");
      const checkerBox3 = within(checkBox3).getByRole("checkbox");
      const checkerBox4 = within(checkBox4).getByRole("checkbox");
      const checkerBox5 = within(checkBox5).getByRole("checkbox");
      const checkerBox6 = within(checkBox6).getByRole("checkbox");

      fireEvent.click(checkerBox0);

      expect(checkerBox0).toBeChecked();
      expect(selectInput.value).toBe("Statement in PDF/Excel");

      fireEvent.click(checkerBox1);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions"
      );

      fireEvent.click(checkerBox2);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Bulk IMPS transactions"
      );

      fireEvent.click(checkerBox3);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions"
      );

      fireEvent.click(checkerBox4);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(checkerBox4).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions,Beneficiary details for Bulk UPI transactions"
      );

      fireEvent.click(checkerBox5);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(checkerBox4).toBeChecked();
      expect(checkerBox5).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions,Beneficiary details for Bulk UPI transactions,IP Logs"
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
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Bulk IMPS transactions,Beneficiary details for Single UPI transactions,Beneficiary details for Bulk UPI transactions,IP Logs,Device details"
      );

      fireEvent.click(checkerBox2);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).not.toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(checkerBox4).toBeChecked();
      expect(checkerBox5).toBeChecked();
      expect(checkerBox6).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Single UPI transactions,Beneficiary details for Bulk UPI transactions,IP Logs,Device details"
      );

      fireEvent.click(checkerBox4);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).not.toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(checkerBox4).not.toBeChecked();
      expect(checkerBox5).toBeChecked();
      expect(checkerBox6).toBeChecked();
      expect(selectInput.value).toBe(
        "Statement in PDF/Excel,Beneficiary details for Single IMPS transactions,Beneficiary details for Single UPI transactions,IP Logs,Device details"
      );

      // screen.debug();
    }, 600);
  });
});

test("Rendering Selected Reports Section", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectReports(0, "Statement in PDF/Excel");

    const selectedReportsSection = screen.getByTestId(
      "selected-reports-section"
    );

    expect(selectedReportsSection).toBeInTheDocument();
  }, 600);
});

describe("Params Selection Dropdown Functionality Check", () => {
  test("Mock Params Selection Check", () => {
    renderCreateRequest();
    setTimeout(() => {
      fillTicketNumberInput();
      fillTicketDescriptionInput();
      selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");
    }, 600);
  });

  test("Multiple Params Selection Check", () => {
    renderCreateRequest();
    setTimeout(() => {
      fillTicketNumberInput();
      fillTicketDescriptionInput();

      selectReports(0, "Statement in PDF/Excel");

      const dropdown = screen.getByTestId("param-dropdown-0");

      const selectInput = dropdown.querySelector("input");

      expect(selectInput.value).toBe("");

      const dropdownBox = within(dropdown).getByRole("combobox", {
        hidden: true,
      });

      fireEvent.mouseDown(dropdownBox);

      const menuItem0 = screen.getByTestId(`param-dropdown-menu-item-0`);
      const menuItem1 = screen.getByTestId(`param-dropdown-menu-item-1`);
      const menuItem2 = screen.getByTestId(`param-dropdown-menu-item-2`);
      const menuItem3 = screen.getByTestId(`param-dropdown-menu-item-3`);
      const menuItem4 = screen.getByTestId(`param-dropdown-menu-item-4`);
      const menuItem5 = screen.getByTestId(`param-dropdown-menu-item-5`);
      const menuItem6 = screen.getByTestId(`param-dropdown-menu-item-6`);
      const menuItem7 = screen.getByTestId(`param-dropdown-menu-item-7`);
      const menuItem8 = screen.getByTestId(`param-dropdown-menu-item-8`);

      expect(menuItem0).toBeInTheDocument();
      expect(menuItem1).toBeInTheDocument();
      expect(menuItem2).toBeInTheDocument();
      expect(menuItem3).toBeInTheDocument();
      expect(menuItem4).toBeInTheDocument();
      expect(menuItem5).toBeInTheDocument();
      expect(menuItem6).toBeInTheDocument();
      expect(menuItem7).toBeInTheDocument();
      expect(menuItem8).toBeInTheDocument();

      const checkBox0 = screen.getByTestId(`param-dropdown-checkbox-0`);
      const checkBox1 = screen.getByTestId(`param-dropdown-checkbox-1`);
      const checkBox2 = screen.getByTestId(`param-dropdown-checkbox-2`);
      const checkBox3 = screen.getByTestId(`param-dropdown-checkbox-3`);
      const checkBox4 = screen.getByTestId(`param-dropdown-checkbox-4`);
      const checkBox5 = screen.getByTestId(`param-dropdown-checkbox-5`);
      const checkBox6 = screen.getByTestId(`param-dropdown-checkbox-6`);
      const checkBox7 = screen.getByTestId(`param-dropdown-checkbox-7`);
      const checkBox8 = screen.getByTestId(`param-dropdown-checkbox-8`);

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
      expect(selectInput.value).toBe("Account number");

      fireEvent.click(checkerBox1);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(selectInput.value).toBe("Account number,CRN");

      fireEvent.click(checkerBox2);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(selectInput.value).toBe("Account number,CRN,RRN");

      fireEvent.click(checkerBox3);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(selectInput.value).toBe("Account number,CRN,RRN,PAN");

      fireEvent.click(checkerBox4);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(checkerBox4).toBeChecked();
      expect(selectInput.value).toBe("Account number,CRN,RRN,PAN,Aadhar");

      fireEvent.click(checkerBox5);

      expect(checkerBox0).toBeChecked();
      expect(checkerBox1).toBeChecked();
      expect(checkerBox2).toBeChecked();
      expect(checkerBox3).toBeChecked();
      expect(checkerBox4).toBeChecked();
      expect(checkerBox5).toBeChecked();
      expect(selectInput.value).toBe(
        "Account number,CRN,RRN,PAN,Aadhar,Mobile No."
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
        "Account number,CRN,RRN,PAN,Aadhar,Mobile No.,Debit Card"
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
        "Account number,CRN,RRN,PAN,Aadhar,Mobile No.,Debit Card,Credit Card"
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
        "Account number,CRN,RRN,PAN,Aadhar,Mobile No.,Debit Card,Credit Card,Email ID"
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
        "Account number,CRN,RRN,Aadhar,Mobile No.,Debit Card,Credit Card,Email ID"
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
        "Account number,CRN,RRN,Aadhar,Mobile No.,Debit Card,Email ID"
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
        "CRN,RRN,Aadhar,Mobile No.,Debit Card,Email ID"
      );
    }, 600);
  });
});

test("Rendering Form Fields After Param Selection", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const formFieldset = screen.queryByTestId("detail-fieldset-0");

    expect(formFieldset).toBeInTheDocument();
  }, 600);
});

test("Detail Name Input Render and Functionality Check", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameField = screen.getByTestId("detail-name-input-0");

    expect(detailNameField).toBeInTheDocument();

    const detailNameInput = detailNameField.querySelector("input");

    fireEvent.change(detailNameInput, {
      target: {
        value: "8510542870441383",
      },
    });

    expect(detailNameInput.value).toBe("8510542870441383");
  }, 600);
});

test("From Date Picker Functionality Check", () => {
  renderCreateRequest();
  changeReadOnly(false);
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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
      target: { value: datePickerTestValue },
    });

    expect(fromDatepicker.value).toBe(datePickerTestValue);
    changeReadOnly(true);
  }, 600);
});

test("To Date Picker Functionality Check", () => {
  renderCreateRequest();
  changeReadOnly(false);
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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
      target: { value: datePickerTestValue },
    });

    expect(fromDatepicker.value).toBe(datePickerTestValue);

    const toDatepicker = screen.getByLabelText("to");

    expect(toDatepicker).toBeInTheDocument();

    fireEvent.change(toDatepicker, { target: { value: datePickerTestValue } });

    expect(toDatepicker.value).toBe(datePickerTestValue);
    changeReadOnly(true);
  }, 600);
});

test("Report Type Dropdown Functionality Check for Statement in PDF/Excel Report", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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

    const typeMenuItem1 = screen.getByTestId(`type-dropdown-menuitem-0`);

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const typeMenuItem2 = screen.getByTestId(`type-dropdown-menuitem-1`);

    fireEvent.click(typeMenuItem2);

    expect(typeSelectInput.value).toBe("Excel");

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");
  }, 600);
});

test("Mobile Number Input Functionality Check for IP Logs", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(5, "IP Logs", 0, 0, "Account number");

    const detailNameField = screen.getByTestId("detail-name-input-0");

    expect(detailNameField).toBeInTheDocument();

    const detailNameInput = detailNameField.querySelector("input");

    fireEvent.change(detailNameInput, {
      target: {
        value: "8510542870441383",
      },
    });

    expect(detailNameInput.value).toBe("8510542870441383");

    const mobileNoField = screen.getByTestId("mobileno-input-0");

    expect(mobileNoField).toBeInTheDocument();

    const mobileNoInput = detailNameField.querySelector("input");

    fireEvent.change(mobileNoInput, {
      target: {
        value: "7359124706",
      },
    });

    expect(mobileNoInput.value).toBe("7359124706");
  }, 600);
});

test("RRN Amount Input Functionality Check for Beneficiary Details for Single IMPS Transactions", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();

    selectReports(3, "Beneficiary details for Single UPI transactions");

    const RRNField = screen.getByTestId("detail-name-input-0");

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

    cleanup();
  }, 600);
});

test("RRN Date Picker Functionality Check for Beneficiary Details for Single Transactions", () => {
  renderCreateRequest();
  changeReadOnly(false);
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();

    selectReports(3, "Beneficiary details for Single UPI transactions");

    const RRNField = screen.getByTestId("detail-name-input-0");

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
        value: datePickerTestValue,
      },
    });

    expect(rrnDatePicker.value).toBe(datePickerTestValue);
    changeReadOnly(true);
  }, 600);
});

test("Add Detail Button Functionality Check", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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

    const typeMenuItem1 = screen.getByTestId(`type-dropdown-menuitem-0`);

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const addDetailButton = screen.getByTestId("add-button-0");

    fireEvent.click(addDetailButton);

    const newDetailFieldset = screen.getByTestId("detail-fieldset-1");

    expect(newDetailFieldset).toBeInTheDocument();
  }, 600);
});

test("Delete Detail Button Functionality Check", () => {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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

    const typeMenuItem1 = screen.getByTestId(`type-dropdown-menuitem-0`);

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const addDetailButton = screen.getByTestId("add-button-0");

    fireEvent.click(addDetailButton);

    const newDetailFieldsetIndex = screen.getByTestId("detail-fieldset-1");

    expect(newDetailFieldsetIndex).toBeInTheDocument();

    const deleteDetailButton = screen.getByTestId("delete-button-0");

    fireEvent.click(deleteDetailButton);

    expect(newDetailFieldsetIndex).not.toBeInTheDocument();
  }, 600);
});

test("Preview Open Functionality Check", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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

    const typeMenuItem1 = screen.getByTestId(`type-dropdown-menuitem-0`);

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const previewButton = screen.getByTestId("preview-button");

    fireEvent.click(previewButton);

    expect(previewButton).toBeInTheDocument();

    const previewModal = screen.queryByTestId("preview-modal");

    expect(previewModal).toBeInTheDocument();
  }, 600);
});

test("Preview Modal Close Button Functionality Check", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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

    const typeMenuItem1 = screen.getByTestId(`type-dropdown-menuitem-0`);

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const previewButton = screen.getByTestId("preview-button");

    fireEvent.click(previewButton);

    expect(previewButton).toBeInTheDocument();

    const previewModal = screen.queryByTestId("preview-modal");

    expect(previewModal).toBeInTheDocument();

    const closePreviewButton = screen.getByTitle("Close Preview");

    fireEvent.click(closePreviewButton);

    expect(previewModal).not.toBeInTheDocument();
  }, 600);
});

test("Submission and Route To View Requests Page on clicking Submit Button Functionlaity Check", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectParams(0, "Statement in PDF/Excel", 0, 0, "Account number");

    const detailNameInput = screen
      .getByTestId("detail-name-input-0")
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

    const typeMenuItem1 = screen.getByTestId(`type-dropdown-menuitem-0`);

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const typeMenuItem2 = screen.getByTestId(`type-dropdown-menuitem-1`);

    fireEvent.click(typeMenuItem2);

    expect(typeSelectInput.value).toBe("Excel");

    fireEvent.click(typeMenuItem1);

    expect(typeSelectInput.value).toBe("PDF");

    const submitButton = screen.getByTestId("submit-button");

    fireEvent.click(submitButton);

    expect(renderViewRequest());

    const viewRequestPage = screen.getByTestId("view-request-page");

    expect(viewRequestPage).toBeInTheDocument();
  }, 600);
});

test("Selected Report Detail View Controller Functionality Check", () => {
  renderCreateRequest();
  setTimeout(() => {
    fillTicketNumberInput();
    fillTicketDescriptionInput();
    selectReports(0, "Statement in PDF/Excel");

    const selectedReportsSection = screen.getByTestId(
      "selected-reports-section"
    );

    expect(selectedReportsSection).toBeInTheDocument();

    const detailView = screen.getByTestId("selected-report-detail-0");

    expect(detailView).toBeVisible();

    const viewControllerIcon = screen.getByTestId(
      "selected-report-detail-control-0"
    );

    fireEvent.click(viewControllerIcon);

    expect(detailView).not.toBeVisible();
  }, 600);
});

//// Rejected /////

/// 1. scrollIntoView() on addDetail() call
/// 2. scrollIntoView() on deleteDetail() call
/// readOnly === true for datePicker field
