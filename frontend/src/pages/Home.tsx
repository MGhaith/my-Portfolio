import ProjectsList from "../components/ProjectsList";
import ContactForm from "../components/ContactForm";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-16">
      <HeroSection />
      <ProjectsList />
      <ContactForm />
    </div>
  );
}
