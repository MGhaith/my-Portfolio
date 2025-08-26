import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Resume from "./pages/Resume";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}
