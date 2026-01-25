import type { FC } from "react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5 py-2 shadow-lg" : "bg-transparent py-4"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="font-display font-bold text-2xl tracking-tighter hover:opacity-80 transition-opacity"
          >
            <span className="text-foreground">Ghaith</span>
            <span className="text-primary">.dev</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-1">
              <NavLink href="/" text="Home" isActive={location.pathname === '/'} />
              <NavLink href="/about" text="About" isActive={location.pathname === '/about'} />
              <NavLink href="/projects" text="Projects" isActive={location.pathname === '/projects'} />
              <NavLink href="/resume" text="Resume" isActive={location.pathname === '/resume'} />
            </div>
            <div className="pl-4 border-l border-border/50">
              <ModeToggle />
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ModeToggle />
            <button
              className="text-foreground p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border/50 animate-in slide-in-from-top-5 duration-300 shadow-2xl">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <MobileNavLink href="/" text="Home" isActive={location.pathname === '/'} onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/about" text="About" isActive={location.pathname === '/about'} onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/projects" text="Projects" isActive={location.pathname === '/projects'} onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/resume" text="Resume" isActive={location.pathname === '/resume'} onClick={() => setIsOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink: FC<{ href: string; text: string; isActive: boolean }> = ({ href, text, isActive }) => (
  <Link
    to={href}
    className={cn(
      "relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-full",
      isActive
        ? "text-primary bg-primary/10"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
    )}
  >
    {text}
    {isActive && (
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full mb-1" />
    )}
  </Link>
);

const MobileNavLink: FC<{ href: string; text: string; isActive: boolean; onClick: () => void }> = ({ href, text, isActive, onClick }) => (
  <Link
    to={href}
    className={cn(
      "block px-4 py-3 rounded-xl text-base font-medium transition-all",
      isActive
        ? "text-primary bg-primary/10 pl-6"
        : "text-muted-foreground hover:text-foreground hover:bg-accent/50 hover:pl-6"
    )}
    onClick={onClick}
  >
    {text}
  </Link>
);

export default Navbar;
