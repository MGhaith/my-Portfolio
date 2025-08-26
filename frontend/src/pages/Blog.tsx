import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Blog() {
  // Sample blog posts - in a real app, these would come from an API
  const blogPosts = [
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

  return (
    <div className="container mx-auto p-4 py-16 space-y-8">
      <h1 className="text-4xl font-bold text-center">Blog</h1>
      <p className="text-center text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
        Thoughts, tutorials, and insights on cloud engineering, DevOps practices, and modern infrastructure.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>{post.date}</span>
                <span>{post.readTime}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-700 dark:text-gray-300 mb-4">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <a href={`/blog/${post.id}`}>
                  Read More <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}