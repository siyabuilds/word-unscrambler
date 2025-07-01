import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bottom-0 left-0 right-0 z-10 p-4 text-center bg-slate-900/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center space-x-4">
          <p className="text-slate-500 text-sm">Built by siyabuilds</p>
          <a
            href="https://github.com/siyabuilds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-400 transition-colors duration-300"
          >
            <FaGithub className="h-6 w-6 hover:animate-pulse" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
