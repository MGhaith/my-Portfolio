import { describe, it, expect, vi } from "vitest"; // ✅ import vi properly
import { getProjects, submitContact } from "../api/api";
import type { Project, ContactFormData } from "../api/types";

// Mock fetch globally
global.fetch = vi.fn() as unknown as typeof fetch;

describe("API functions", () => {
  it("getProjects returns project list", async () => {
    const mockProjects: Project[] = [{ id: "1", title: "Test", description: "Desc", content: "Content", link: "#", repo: "github.com", technologies: ["tech1", "tech2"], featured: true }]; 

    // @ts-ignore
    (global.fetch as unknown as vi.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProjects,
    });

    const projects = await getProjects();
    expect(projects).toEqual(mockProjects);
  });

  it("submitContact posts data", async () => {
    const form: ContactFormData = { name: "Ghaith", email: "a@b.com", message: "Hi" };

    // @ts-ignore
    (global.fetch as unknown as vi.Mock).mockResolvedValueOnce({ ok: true });

    await expect(submitContact(form)).resolves.toBeUndefined();
  });
});
