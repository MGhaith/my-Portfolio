import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Resume() {
  return (
    <div className="container mx-auto p-4 py-16 space-y-12">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold text-center">Resume</h1>
        <div className="flex justify-center">
          <Button className="h-11 px-6">
            <Download className="mr-2 h-4 w-4" />
            Download Resume (PDF)
          </Button>
        </div>
      </section>

      <section className="max-w-4xl mx-auto space-y-8">
        {/* Experience Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Professional Experience</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Cloud DevOps Engineer</h3>
            <p className="text-gray-500 dark:text-gray-400">Company Name • 2021 - Present</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Designed and implemented CI/CD pipelines using GitHub Actions, reducing deployment time by 70%</li>
              <li>Managed AWS infrastructure using Terraform, implementing infrastructure as code practices</li>
              <li>Containerized applications using Docker and orchestrated with Kubernetes</li>
              <li>Implemented monitoring and alerting solutions using Prometheus and Grafana</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Systems Administrator</h3>
            <p className="text-gray-500 dark:text-gray-400">Previous Company • 2019 - 2021</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Managed on-premises infrastructure and initiated cloud migration strategies</li>
              <li>Implemented automation scripts using Python and Bash</li>
              <li>Maintained system security and performed regular audits</li>
            </ul>
          </div>
        </div>

        {/* Education Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Education</h2>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
            <p className="text-gray-500 dark:text-gray-400">University Name • 2015 - 2019</p>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold border-b pb-2">Certifications</h2>
          
          <ul className="list-disc pl-5 space-y-1">
            <li>AWS Certified Solutions Architect - Professional</li>
            <li>AWS Certified DevOps Engineer - Professional</li>
            <li>Certified Kubernetes Administrator (CKA)</li>
            <li>HashiCorp Certified: Terraform Associate</li>
          </ul>
        </div>
      </section>
    </div>
  );
}