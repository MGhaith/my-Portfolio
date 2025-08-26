import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
{/*import Blog from "./pages/Blog";*/}
import About from "./pages/About";
import Resume from "./pages/Resume";
import Projects from "./pages/Projects";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col min-h-screen relative overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="pattern-grid opacity-10"></div>
          </div>
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/*<Route path="/blog" element={<Blog />} />*/}
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
