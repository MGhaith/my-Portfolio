import type { FC } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed w-full top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/"
            className="font-bold text-2xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Ghaith Magherbi
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <NavLink href="/" text="Home" isActive={location.pathname === '/'} />
              <NavLink href="/about" text="About" isActive={location.pathname === '/about'} />
              <NavLink href="/blog" text="Blog" isActive={location.pathname === '/blog'} />
              <NavLink href="/resume" text="Resume" isActive={location.pathname === '/resume'} />
            </div>
            <ModeToggle />
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ModeToggle />
            <button 
              className="text-gray-700 dark:text-gray-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden animate-in slide-in-from-top duration-300">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <MobileNavLink href="/" text="Home" isActive={location.pathname === '/'} onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/about" text="About" isActive={location.pathname === '/about'} onClick={() => setIsOpen(false)} />
              <MobileNavLink href="/blog" text="Blog" isActive={location.pathname === '/blog'} onClick={() => setIsOpen(false)} />
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
    className={`${isActive ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} hover:text-primary transition-colors duration-200 hover:scale-105 active:scale-95`}
  >
    {text}
  </Link>
);

const MobileNavLink: FC<{ href: string; text: string; isActive: boolean; onClick: () => void }> = ({ href, text, isActive, onClick }) => (
  <Link
    to={href}
    className={`${isActive ? 'text-primary font-medium' : 'text-gray-700 dark:text-gray-300'} block px-3 py-2 rounded-md text-base hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-transform`}
    onClick={onClick}
  >
    {text}
  </Link>
);

export default Navbar;
