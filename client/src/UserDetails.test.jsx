import { render, screen, waitFor } from "@testing-library/react";
import React from 'react';
import renderer from 'react-test-renderer';
import UserDetails from './pages/UserDetails';
import { useParams, BrowserRouter } from 'react-router-dom';
import axios from "axios";

// Mock dependencies
jest.mock("axios", () => ({
  get: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ username: 'codedcauliflower' }),  // Mock useParams
  BrowserRouter: ({ children }) => <div>{children}</div>,  // Mock BrowserRouter
}));

// Ensure cleanup between tests
afterEach(() => {
  jest.clearAllMocks();
});

// Snapshot Test
test('UserDetails component snapshot', () => {
  const component = renderer.create(
    <BrowserRouter>
      <UserDetails />
    </BrowserRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

// API Fetch Test
test("fetches and displays user details", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      name: "CodedCauliflower",
      bio: "Aspiring Developer",
      avatar_url: "https://example.com/avatar.png",
      html_url: "https://github.com/codedcauliflower",
      repos: [{ id: 1, name: "TestRepo", html_url: "https://github.com/testrepo" }],
    },
  });

  render(
    <BrowserRouter>
      <UserDetails />
    </BrowserRouter>
  );

  // Wait for elements to appear
  await waitFor(() => expect(screen.getByText("CodedCauliflower")).toBeInTheDocument());
  expect(screen.getByText("Aspiring Developer")).toBeInTheDocument();
  expect(screen.getByText("TestRepo")).toBeInTheDocument();
});