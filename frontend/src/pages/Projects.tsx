import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "../api/api.ts";
import type { Project } from "../api/types.ts";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.flatMap((p) => p.categories || []))
        );
        setCategories(["All", ...uniqueCategories]);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.categories?.includes(selectedCategory));

  return (
    <div className="container mx-auto p-4 py-16 space-y-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center animate-in fade-in duration-700">Projects</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto animate-in fade-in duration-700 delay-150">
        A showcase of my work in cloud engineering, DevOps, and infrastructure as code.
      </p>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in duration-700 delay-300">
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer text-sm px-4 py-2 hover:scale-105 transition-transform"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 animate-in fade-in">
          No projects in this category yet.
        </p>
      )}
      
      <div className="flex flex-col space-y-6 animate-in fade-in duration-700 delay-500">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies?.map((tech) => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <a href={project.github || project.link} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  Code
                </a>
              </Button>
              <Button size="sm" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Demo
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}