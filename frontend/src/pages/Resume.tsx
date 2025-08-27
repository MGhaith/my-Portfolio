import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

export default function Resume() {
  return (
    <div className="container mx-auto p-4 py-16 space-y-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">Resume</h1>
      </section>

      <section className="max-w-4xl mx-auto space-y-8">
        {/* Experience Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 text-primary border-primary/30">Professional Experience</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Game Engineer</h3>
            <p className="text-primary/80 dark:text-primary/70">Freelancer • July 2024 - Present</p>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Developed and deployed 2.5D platformer and mobile/web games using Godot Engine 4.2 and 4.3.</li>
              <li>Implemented end-to-end development workflows, including build automation and deployment pipelines for cross-platform delivery.</li>
              <li>Designed and integrated UI systems, reusable components, and asset pipelines to improve team productivity.</li>
              <li>Led a small distributed team, introducing version control (Git) and project management best practices.</li>
              <li>Delivered web-based game apps, gaining hands-on experience with web hosting, backend APIs, and deployment to cloud platforms.</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Game Engineer</h3>
            <p className="text-primary/80 dark:text-primary/70"> LoCoNET GmbH • March 2024 - June 2024</p>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Built frontend features and UI systems for an online multiplayer colony game (Godot 3.5.3).</li>
              <li>Integrated REST API calls and optimized frontend-backend communication.</li>
              <li>Worked within a cross-functional, Agile team, collaborating with backend, design, and QA to ensure smooth deployments.</li>
              <li>Contributed to team’s code review, testing, and version control workflows (Git/GitLab).</li>
            </ul>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 text-primary border-primary/30">Education</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground"> Bachelor of Engineering (B.E.) in Computer Science</h3>
            <p className="text-primary/80 dark:text-primary/70">Private Higher School of Engineering and Technology - ESPRIT • 2019 - 2022</p>
          </div>
        </div>

        {/* Certifications Section 
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2 text-primary border-primary/30">Certifications</h2>
          
          <ul className="list-disc pl-5 space-y-1 text-foreground/90">
            <li>AWS Certified Solutions Architect - Professional</li>
            <li>AWS Certified DevOps Engineer - Professional</li>
            <li>Certified Kubernetes Administrator (CKA)</li>
            <li>HashiCorp Certified: Terraform Associate</li>
          </ul>
        </div>*/}
      </section>
      
      <section>
            <div className="flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button className="h-11 px-6 bg-primary hover:bg-primary/90">
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume (PDF)
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get a copy of my resume</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </section>
    </div>
  );
}