import { Rocket, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0b0d17] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Rocket className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl tracking-wider text-white">APOD EXPLORER</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              Exploring the cosmos one pixel at a time. Powered by NASA's Astronomy Picture of the Day API.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Navigation</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Home</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Cosmic Gallery</Link></li>
              <li><Link to="/search" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">Time Travel</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full">
                <Github size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors bg-gray-800 p-2 rounded-full">
                <Twitter size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors bg-gray-800 p-2 rounded-full">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mb-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2025 <span className="text-white font-medium">LostSetBit</span>. All rights reserved.
          </p>
          
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-red-500" />
            <span>and Stardust</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;