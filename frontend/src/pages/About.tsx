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
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-center">About Me</h1>
        <div className="max-w-3xl mx-auto text-lg">
          <p className="mb-4">
            I'm a passionate Cloud/DevOps Engineer with expertise in designing, implementing, and managing cloud infrastructure. 
            My focus is on creating scalable, secure, and automated solutions that enable teams to deliver software efficiently.
          </p>
          <p>
            With a strong background in both development and operations, I bridge the gap between these disciplines to 
            implement DevOps practices that improve deployment frequency, reduce time to market, and enhance system reliability.
          </p>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Skills & Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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