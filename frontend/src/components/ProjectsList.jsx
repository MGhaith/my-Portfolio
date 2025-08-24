import { useEffect, useState } from "react";
import { getProjects } from "../api/api";

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects()
      .then(setProjects)
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.length === 0 && <p>No projects yet.</p>}
      <ul>
        {projects.map((p, index) => (
            <li key={index}>
                <a href={p.link} target="_blank">{p.title}</a>: {p.description}
            </li>
        ))}
      </ul>
    </div>
  );
}
