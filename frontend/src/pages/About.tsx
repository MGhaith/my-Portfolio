import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Calendar } from "lucide-react";

export default function About() {
  const experiences = [
    {
      year: "2024 - Present",
      title: "Cloud & DevOps Engineer",
      company: "Freelance",
      description: "Building automated CI/CD pipelines and managing cloud infrastructure on AWS.",
      icon: <Briefcase className="w-5 h-5 text-white" />,
      color: "bg-primary"
    },
    {
      year: "2023",
      title: "Software Engineering Degree",
      company: "University",
      description: "Graduated with focus on Distributed Systems and Cloud Computing.",
      icon: <GraduationCap className="w-5 h-5 text-white" />,
      color: "bg-accent"
    },
    // Add more as needed
  ];

  const skillCategories = [
    { name: "Cloud", skills: ["AWS", "Azure", "Terraform", "CloudFormation"], color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    { name: "DevOps", skills: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "ArgoCD"], color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    { name: "Backend", skills: ["Python", "Go", "Node.js", "PostgreSQL"], color: "bg-green-500/10 text-green-500 border-green-500/20" },
    { name: "Observability", skills: ["Prometheus", "Grafana", "CloudWatch"], color: "bg-orange-500/10 text-orange-500 border-orange-500/20" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl space-y-20">

        {/* Intro Section */}
        <section className="text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground">
            About <span className="text-primary text-glow">Me</span>
          </h1>
          <div className="prose prose-lg dark:prose-invert mx-auto max-w-3xl text-muted-foreground leading-relaxed">
            <p>
              I’m a Cloud & DevOps Engineer from Tunisia, passionate about automating the unautomatable.
              With a strong foundation in AWS and Infrastructure as Code, I turn chaotic workflows into streamlined pipelines.
              My mission is to build systems that are secure, scalable, and self-healing.
            </p>
          </div>
        </section>

        {/* Skills Infographic */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-10 text-foreground">Technical Arsenal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat) => (
              <Card key={cat.name} className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden group hover:border-primary/50 transition-colors">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-bold text-foreground">{cat.name}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map(skill => (
                      <Badge key={skill} variant="outline" className={`border ${cat.color} hover:bg-white/5 transition-colors`}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline Journey */}
        <section>
          <h2 className="text-2xl font-bold text-center mb-12 text-foreground">My Journey</h2>
          <div className="relative mx-auto max-w-3xl">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />

            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className={`relative flex flex-col md:flex-row items-center md:justify-between gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>

                  {/* Date Badge */}
                  <div className="absolute left-8 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background border border-primary z-10">
                    <div className={`w-3 h-3 rounded-full ${exp.color} animate-pulse`} />
                  </div>

                  {/* Content Card */}
                  <div className="w-full md:w-[45%] pl-20 md:pl-0">
                    <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span className="text-xs font-mono text-primary">{exp.year}</span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                      <p className="text-sm text-primary/80 mb-2">{exp.company}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block w-[45%]" />
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}