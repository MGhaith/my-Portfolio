import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 mt-auto border-t border-white/5 bg-background/50 backdrop-blur-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <span className="text-lg font-display font-bold text-foreground">
            Ghaith<span className="text-primary">.dev</span>
          </span>
          <p className="text-sm text-muted-foreground mt-1">
            Built with React, Tailwind & Love.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
            <Github size={20} />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
            <Linkedin size={20} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
            <Twitter size={20} />
            <span className="sr-only">Twitter</span>
          </a>
          <a href="mailto:ghaith@example.com" className="text-muted-foreground hover:text-primary transition-colors hover:scale-110 transform duration-200">
            <Mail size={20} />
            <span className="sr-only">Email</span>
          </a>
        </div>

        <div className="text-xs text-muted-foreground">
          &copy; {currentYear} Ghaith Magherbi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}