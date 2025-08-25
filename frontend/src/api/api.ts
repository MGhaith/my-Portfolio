const BASE_URL = "https://api.ghaith-magherbi.com";

// ---- Types ----
export interface Project {
  id: string; // DynamoDB PK (you can change type if needed)
  title: string;
  description: string;
  link: string;
  tags: string[];
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// ---- API functions ----
export async function getProjects(): Promise<Project[]> {
  const res = await fetch(`${BASE_URL}/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function submitContact(data: ContactForm): Promise<{ success: boolean; message: string }> {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send contact");
  return res.json();
}
