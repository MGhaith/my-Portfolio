import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProjectsList from "../components/ProjectsList";
import * as api from "../api/api";

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.spyOn(api, "getProjects").mockResolvedValue([{ id: "1", title: "Test", description: "Desc", content: "Content", link: "", repo: "github.com", technologies: ["tech1", "tech2"], featured: true }]);

test("renders projects", async () => {
  render(
    <MemoryRouter>
      <ProjectsList />
    </MemoryRouter>
  );
  expect(await screen.findByText("Test")).toBeInTheDocument();
});
