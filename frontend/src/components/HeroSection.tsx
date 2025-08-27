import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="animate-in fade-in zoom-in duration-700">
            <img
              src="https://avatars.githubusercontent.com/u/57289554?v=4"
              alt="Ghaith Magherbi"
              className="w-32 h-32 md:w-64 md:h-64 rounded-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none animate-in fade-in zoom-in duration-700">
              Ghaith Magherbi
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              Cloud & DevOps Engineer specializing in <span className="font-semibold text-amber-500">AWS</span>, <span className="font-semibold text-purple-500">Terraform</span>, <span className="font-semibold text-blue-500">Docker</span>, and <span className="font-semibold text-blue-100">Kubernetes</span>.
            </p>
          </div>
          <div className="space-x-4 animate-in fade-in slide-in-from-bottom duration-700 delay-500">
            <Link to="/about">
              <Button className="h-11 px-6 hover:scale-105 transition-transform">
                About Me <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/resume">
              <Button variant="outline" className="h-11 px-6 hover:scale-105 transition-transform">
                Resume
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}