export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  link: string;
  github?: string;
  categories?: string[];
  technologies?: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
// for blog posts later
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags?: string[];
}