import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function About() {
  const skills = [
    {
      category: "Cloud Platforms",
      items: ["AWS"],
    },
    {
      category: "Infrastructure as Code",
      items: ["Terraform", "CloudFormation"],
    },
    {
      category: "Containerization & Orchestration",
      items: ["Docker", "Kubernetes", "ECS", "EKS"],
    },
    {
      category: "CI/CD",
      items: ["GitHub Actions", "Jenkins", "CircleCI", "GitlabCI"],
    },
    {
      category: "Monitoring & Logging",
      items: ["Prometheus", "Grafana", "CloudWatch"],
    },
    {
      category: "Programming & Scripting",
      items: ["Python", "Bash", "JavaScript/TypeScript"],
    },
  ];

  return (
    <div className="container mx-auto p-4 py-16 space-y-12">
      {/* About Me Section */}
      <section className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-700">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">About Me</h1>
        <div className="prose dark:prose-invert mx-auto">
          <p className="text-foreground/90">
            I’m a Cloud & DevOps Engineer from Tunisia, focused on AWS, Terraform, and CI/CD automation with GitHub Actions. I enjoy designing secure, cost-aware cloud architectures and turning manual workflows into fully automated pipelines.
          </p>
          <p className="text-foreground/90">
            I have a strong passion for learning and continuously exploring new DevOps practices, from modern infrastructure design to monitoring and deployment strategies. For me, DevOps is not just a job—it’s a craft I enjoy improving every day.
          </p>
        </div>
      </section>

      <Separator className="max-w-md mx-auto bg-primary/20" />

      {/* Skills Section */}
      <section className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-700 delay-300">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-400 to-primary bg-clip-text text-transparent">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category} className="border-primary/20 hover:border-primary/50 transition-colors">
              <CardHeader className="bg-muted/30">
                <CardTitle className="text-primary">{skillGroup.category}</CardTitle>
                <CardDescription>Key technologies and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} className="text-foreground/90">{skill}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}