{/*import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Blog() {
  const [loading, setLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState([]);

  // Simulate loading
  useEffect(() => {
    // Sample blog posts
    const posts = [
    {
      id: 1,
      title: "Setting Up a CI/CD Pipeline with GitHub Actions",
      excerpt: "Learn how to automate your deployment process using GitHub Actions for a modern cloud application.",
      date: "June 15, 2023",
      tags: ["CI/CD", "GitHub Actions", "DevOps"],
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Infrastructure as Code with Terraform",
      excerpt: "Discover how to manage your cloud infrastructure using Terraform for better scalability and maintainability.",
      date: "July 22, 2023",
      tags: ["Terraform", "IaC", "AWS"],
      readTime: "10 min read"
    },
    {
      id: 3,
      title: "Kubernetes Best Practices for Production",
      excerpt: "Essential best practices to follow when deploying applications to Kubernetes in production environments.",
      date: "August 5, 2023",
      tags: ["Kubernetes", "Docker", "Cloud Native"],
      readTime: "12 min read"
    },
  ];
    
    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setBlogPosts(posts);
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto p-4 py-16 space-y-8 max-w-4xl">
      <h1 className="text-4xl font-bold text-center animate-in fade-in duration-700 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Blog</h1>
      <p className="text-center text-foreground/70 max-w-2xl mx-auto animate-in fade-in duration-700 delay-150">
        Thoughts, tutorials, and insights on cloud engineering, DevOps practices, and modern infrastructure.
      </p>
      
      <Separator className="max-w-md mx-auto bg-primary/20" />
      
      <ScrollArea className="h-[600px] rounded-md border border-primary/20 p-4">
        <div className="flex flex-col space-y-6 animate-in fade-in duration-700 delay-300">
          {loading ? (
            // Skeleton loading state
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="flex flex-col h-full">
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent className="flex-grow">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-24" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : (
            // Actual blog posts
            blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.01] border-primary/20 hover:border-primary/50">
                <CardHeader className="bg-muted/30">
                  <CardTitle className="text-primary">{post.title}</CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-foreground/90 mb-4">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full justify-between text-primary hover:text-primary/90 hover:bg-primary/10" asChild>
                    <a href={`/blog/${post.id}`}>
                      Read More <ArrowRight className="h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}*/}