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
import Login from "../../pages/Login/Login";
import Dashboard from "../../pages/Dashboard/Dashboard";
import { RememberMe } from "@mui/icons-material";

const renderLogin = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
};

const renderDashboard = () => {
  return render(
    <BrowserRouter>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </BrowserRouter>
  );
};

const fillUsernameField = () => {
  const usernameField = screen
    .getByTestId("username-field")
    .querySelector("input");

  fireEvent.change(usernameField, {
    target: {
      value: "KXT75648",
    },
  });

  expect(usernameField.value).toBe("KXT75648");
};

const fillPasswordField = () => {
  const passwordField = screen
    .getByTestId("password-field")
    .querySelector("input");

  fireEvent.change(passwordField, {
    target: {
      value: "KXT75648_Password",
    },
  });

  expect(passwordField.value).toBe("KXT75648_Password");
};

test("Login Screen Render Test", () => {
  renderLogin();

  const loginScreen = screen.getByTestId("login-container");

  expect(loginScreen).toBeInTheDocument();
});

test("Username Input Check", () => {
  renderLogin();
  fillUsernameField();
});

test("Password Input Check", () => {
  renderLogin();
  fillPasswordField();
});

test("Show Password Functionality Check", () => {
  renderLogin();
  fillPasswordField();

  const passwordField = screen
    .getByTestId("password-field")
    .querySelector("input");

  expect(passwordField).toHaveAttribute("type", "password");

  const showButton = screen.getByTestId("show-password-icon");

  expect(showButton).toBeInTheDocument();

  fireEvent.click(showButton);

  expect(passwordField).toHaveAttribute("type", "text");

  fireEvent.click(showButton);

  expect(passwordField).toHaveAttribute("type", "password");
});

test("Remember User Checkbox Check", () => {
  renderLogin();
  fillUsernameField();
  fillPasswordField();

  const rememberMe = screen.getByTestId("remember-box");
  expect(rememberMe).toBeInTheDocument();

  const rememberMeCheckBox = screen.getByRole("checkbox");

  fireEvent.click(rememberMeCheckBox);

  expect(rememberMeCheckBox).toBeChecked();

  fireEvent.click(rememberMeCheckBox);

  expect(rememberMeCheckBox).not.toBeChecked();
});

test("Sign In Functionality Check", () => {
  renderLogin();
  fillUsernameField();
  fillPasswordField();

  const signinButton = screen.getByTestId("signin-button");

  fireEvent.click(signinButton);

  expect(renderDashboard());

  expect(screen.getByTestId("dashboard-main")).toBeInTheDocument();
});
