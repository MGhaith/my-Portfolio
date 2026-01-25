import ProjectsList from "../components/ProjectsList";
import Hero from "../components/Hero";
import SkillTags from "../components/SkillTags";
import ContactForm from "../components/ContactForm";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <Hero />
      <SkillTags />
      <ProjectsList />
      <div className="container mx-auto max-w-7xl px-4 py-20">
        <ContactForm />
      </div>
    </div>
  );
}
