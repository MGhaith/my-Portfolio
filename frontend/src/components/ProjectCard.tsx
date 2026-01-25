import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectProps {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    repo?: string;
    image?: string; // Optional image URL
}

export default function ProjectCard({ title, description, tags, link, repo }: ProjectProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const cardRef = useRef<HTMLDivElement>(null);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative rounded-xl border border-white/10 bg-white/5 px-6 py-8 shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Hover Spotlight Effect */}
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(124, 58, 237, 0.15),
              transparent 80%
            )
          `,
                }}
            />

            <div className="relative flex flex-col h-full z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        {/* Folder icon or Tech icon could go here */}
                        <div className="w-6 h-6 rounded-full border-2 border-primary/50" />
                    </div>
                    <div className="flex gap-2">
                        {repo && (
                            <a href={repo} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <Github size={20} />
                            </a>
                        )}
                        {link && (
                            <a href={link} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                <ArrowUpRight size={20} />
                            </a>
                        )}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                    {description.length > 150 ? description.substring(0, 150) + "..." : description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {tags.slice(0, 4).map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-xs font-normal">
                            {tag}
                        </Badge>
                    ))}
                    {tags.length > 4 && (
                        <Badge variant="outline" className="text-xs text-muted-foreground">
                            +{tags.length - 4}
                        </Badge>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
