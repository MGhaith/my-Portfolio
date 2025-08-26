export interface Project {
  id: string;
  title: string;
  description: string;
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
