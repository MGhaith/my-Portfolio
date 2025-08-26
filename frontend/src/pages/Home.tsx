import ProjectsList from "../components/ProjectsList";
import ContactForm from "../components/ContactForm";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div className="container mx-auto p-4 space-y-16">
      <HeroSection />
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-700">
        <ProjectsList />
      </div>
      <div className="animate-in fade-in slide-in-from-bottom duration-700 delay-1000">
        <ContactForm />
      </div>
    </div>
  );
}
