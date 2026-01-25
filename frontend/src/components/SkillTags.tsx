import { motion } from "framer-motion";

const skills = [
    "AWS", "Terraform", "Kubernetes", "Docker", "CI/CD",
    "Python", "Go", "React", "TypeScript", "Node.js",
    "Linux", "Ansible", "Jenkins", "GitOps", "ArgoCD",
    "Prometheus", "Grafana", "Azure"
];

const MarqueeItem = ({ text }: { text: string }) => (
    <div className="mx-4 flex items-center justify-center px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm text-sm font-medium text-muted-foreground whitespace-nowrap hover:bg-white/10 hover:text-primary transition-colors cursor-default">
        {text}
    </div>
);

export default function SkillTags() {
    return (
        <div className="relative flex overflow-x-hidden w-full py-10 bg-background/50 border-y border-white/5">
            {/* Gradient Masks */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

            {/* Marquee Content - Duplicate for seamless loop */}
            <motion.div
                className="flex"
                animate={{ x: [0, -1000] }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 30, // Adjust speed here
                        ease: "linear",
                    },
                }}
            >
                {skills.map((skill, index) => (
                    <MarqueeItem key={`skill-1-${index}`} text={skill} />
                ))}
                {skills.map((skill, index) => (
                    <MarqueeItem key={`skill-2-${index}`} text={skill} />
                ))}
                {skills.map((skill, index) => (
                    <MarqueeItem key={`skill-3-${index}`} text={skill} />
                ))}
            </motion.div>
        </div>
    );
}
