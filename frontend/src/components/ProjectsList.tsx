import { useEffect, useState } from "react";
import { getProjects } from "../api/api.ts";
import type { Project } from "../api/types.ts";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Get only featured projects or first 4
  const featuredProjects = projects.filter(project => project.featured).slice(0, 4);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 4);

  return (
    <section className="py-20 bg-background relative z-10" id="projects">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            Featured <span className="text-primary">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects demonstrating cloud infrastructure and modern web development.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-[300px] rounded-xl border border-white/5 bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {displayProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.content}
                tags={project.technologies || []}
                repo={project.repo}
                link={project.link}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 hover:bg-primary/10 hover:text-primary transition-all">
            <Link to="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight size={16} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
