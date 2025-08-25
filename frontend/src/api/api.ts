import type { Project, ContactFormData } from "./types.ts";

const BASE_URL = "https://api.ghaith-magherbi.com";

export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function submitContact(data: ContactFormData): Promise<void> {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send contact");
}
