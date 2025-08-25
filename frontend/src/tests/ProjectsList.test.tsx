import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ProjectsList from "../components/ProjectsList";
import * as api from "../api/api";

vi.spyOn(api, "getProjects").mockResolvedValue([{ id: "1", title: "Test", description: "Desc", link: "#" }]);

test("renders projects", async () => {
  render(<ProjectsList />);
  expect(await screen.findByText("Test")).toBeInTheDocument();
});
