import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

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
        <h1 className="text-4xl font-bold text-center">About Me</h1>
        <div className="prose dark:prose-invert mx-auto">
          <p>
            I'm a Cloud & DevOps Engineer with a passion for building scalable, reliable infrastructure and automating deployment processes. With expertise in AWS, Terraform, Docker, and Kubernetes, I help organizations implement modern DevOps practices and cloud-native solutions.
          </p>
          <p>
            My approach combines technical expertise with a focus on business outcomes, ensuring that infrastructure decisions support organizational goals. I believe in infrastructure as code, continuous integration/deployment, and monitoring as core principles of modern operations.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-700 delay-300">
        <h2 className="text-3xl font-bold text-center">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skillGroup) => (
            <Card key={skillGroup.category}>
              <CardHeader>
                <CardTitle>{skillGroup.category}</CardTitle>
                <CardDescription>Key technologies and tools</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {skillGroup.items.map((skill) => (
                    <li key={skill}>{skill}</li>
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