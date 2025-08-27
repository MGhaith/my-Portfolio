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
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <div className="flex flex-col min-h-screen relative overflow-hidden">
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
          <Toaster position="top-center" richColors />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
