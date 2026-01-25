import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import InteractiveBackground from "./InteractiveBackground";
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
            {/* 3D Background */}
            <InteractiveBackground />

            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-background/30 backdrop-blur-[1px] z-0 pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 px-4 md:px-6 max-w-7xl mx-auto w-full text-center md:text-left flex flex-col md:flex-row items-center gap-12">

                {/* Text Content */}
                <div className="flex-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-primary uppercase border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
                            Available for work
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight text-white leading-[1.1]">
                            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary animate-text-shimmer">Ghaith</span>
                        </h1>
                        <h2 className="text-2xl md:text-4xl font-light text-muted-foreground mt-2">
                            Software Engineer <br className="hidden md:block" />
                            <span className="text-foreground/80">Cloud & DevOps</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto md:mx-0 leading-relaxed"
                    >
                        I build scalable, high-performance web applications and cloud infrastructure.
                        Passionate about automating workflows and crafting intuitive user experiences.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4"
                    >
                        <Button size="lg" className="h-12 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] transition-all duration-300">
                            View Projects <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg" className="h-12 px-8 text-lg rounded-full border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
                            Download Resume <Download className="ml-2 h-5 w-5" />
                        </Button>
                    </motion.div>
                </div>

                {/* Hero Visual/Graphic (Optional, keeping text focused for now but reserving space) */}
                {/* <div className="flex-1 hidden md:block relative">
           Could add a 3D model or profile image here later
        </div> */}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground flex flex-col items-center gap-2"
            >
                <span className="text-xs uppercase tracking-widest">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-primary/0 via-primary to-primary/0 animate-pulse-slow"></div>
            </motion.div>
        </section>
    );
}
