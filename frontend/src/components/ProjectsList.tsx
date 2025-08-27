import { useEffect, useState } from "react";
import { getProjects } from "../api/api.ts";
import type { Project } from "../api/types.ts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Gitlab, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

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

  // Get only the 4 most recent projects (reverse order)
  const recentProjects = [...projects].reverse().slice(0, 4);

  return (
    <section className="py-10" id="projects">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-white bg-clip-text">Featured Projects</h2>
        {projects.length === 0 && !loading && (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No projects in this category yet.
          </p>
        )}

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
                  <Skeleton className="h-10 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProjects.map((project, index) => (
              <Card 
                key={project.id} 
                className="flex flex-col h-full border-primary/20 hover:border-primary/50 transition-colors animate-in fade-in duration-700"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-transparent">
                  <CardTitle className="text-xl font-bold">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm mb-4">
                    {project.content.length > 80 
                      ? `${project.content.substring(0, 80)}...` 
                      : project.content}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.technologies?.map((tech) => (
                      <Badge key={tech} variant="outline" className="bg-secondary/10 hover:bg-secondary/20 hover:border-primary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  {project.repo && (
                    <Button asChild variant="outline" size="sm" className="flex items-center gap-2">
                      <a href={project.repo} target="_blank" rel="noopener noreferrer">
                        {(() => {
                          const getRepoInfo = (url: string) => {
                            if (url.includes('github.com')) return { icon: <Github size={16} />, text: 'Github' };
                            if (url.includes('gitlab.com')) return { icon: <Gitlab size={16} />, text: 'Gitlab' };
                            return { icon: <ExternalLink size={16} />, text: 'Repository' };
                          };
                          
                          const { icon, text } = getRepoInfo(project.repo);
                          return (
                            <>
                              {icon}
                              {text}
                            </>
                          );
                        })()}
                      </a>
                    </Button>
                  )}
                  {project.link && (
                    <Button asChild size="sm" className="bg-primary hover:bg-primary/80">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink size={16} />
                        Demo
                      </a>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        <div className="flex justify-center mt-10 animate-in fade-in duration-700 delay-300">
          <Button asChild variant="outline" className="group">
            <Link to="/projects" className="flex items-center gap-2">
              View All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
