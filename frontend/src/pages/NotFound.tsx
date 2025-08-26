import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold mb-4 animate-in fade-in zoom-in duration-500">404</h1>
      <h2 className="text-2xl font-semibold mb-6 animate-in fade-in zoom-in duration-500 delay-200">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md animate-in fade-in zoom-in duration-500 delay-300">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors animate-in fade-in zoom-in duration-500 delay-400"
      >
        Return Home
      </Link>
    </div>
  );
}