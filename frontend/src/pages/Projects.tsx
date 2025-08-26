import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ExternalLink, Github } from "lucide-react";
import { useEffect, useState } from "react";
import { getProjects } from "../api/api.ts";
import type { Project } from "../api/types.ts";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects()
      .then((data) => {
        setProjects(data);
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(data.flatMap((p) => p.categories || []))
        );
        setCategories(["All", ...uniqueCategories]);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(p => p.categories?.includes(selectedCategory));

  return (
    <div className="container mx-auto p-4 py-16 space-y-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center animate-in fade-in duration-700 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4 leading-relaxed">Projects</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto animate-in fade-in duration-700 delay-150">
        A showcase of my work in cloud engineering, DevOps, and infrastructure as code.
      </p>
      
      <Separator className="my-6 bg-primary/20" />
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 animate-in fade-in duration-700 delay-300">
        {categories.map((category) => (
          <Badge 
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className={`cursor-pointer text-sm px-4 py-2 hover:scale-105 transition-transform ${selectedCategory === category ? 'bg-primary text-primary-foreground' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
      
      <ScrollArea className="h-[600px] rounded-md border p-4">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{project.content}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map((tech) => (
                      <TooltipProvider key={tech}>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="outline" className="bg-secondary/10 hover:bg-secondary/20">
                              {tech}
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Technology: {tech}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="default" className="bg-primary hover:bg-primary/80">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  </Button>
                  {project.github && (
                    <Button asChild variant="outline" size="icon">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={18} />
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto animate-in fade-in duration-700 delay-150">No projects found in this category.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}