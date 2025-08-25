import { useEffect, useState } from "react";
import { getProjects } from "../api/api.ts";
import type { Project } from "../api/api.ts";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 && <p>No projects yet.</p>}
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <a href={p.link} target="_blank" rel="noopener noreferrer">
              {p.title}
            </a>
            : {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
