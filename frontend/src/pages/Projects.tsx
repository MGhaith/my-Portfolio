import { useEffect, useState } from "react";
import { getProjects } from "../api/api.ts";
import type { Project } from "../api/types.ts";
import ProjectCard from "@/components/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock categories for now, or extract from tags
const CATEGORIES = ["All", "Cloud", "DevOps", "Web"];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

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

  const filteredProjects = projects.filter(project => {
    if (activeCategory === "All") return true;
    // Simple tag matching for category
    return project.technologies?.some(tech =>
      tech.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "Web" && (tech.includes("React") || tech.includes("Vue")))
    );
  });

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            My <span className="text-primary text-glow">Projects</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of my extensive work in cloud engineering, DevOps automation, and full-stack development.
          </p>
        </div>

        <Tabs defaultValue="All" className="w-full mb-12" onValueChange={setActiveCategory}>
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/5 border border-white/10 backdrop-blur-md p-1 h-auto rounded-full">
              {CATEGORIES.map(category => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="rounded-full px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-0">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-[350px] rounded-xl border border-white/5 bg-white/5 animate-pulse" />
                ))}
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
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
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No projects found in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}