import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h2 className="text-white text-lg font-semibold mb-4">InvestorDash</h2>
            <p className="text-sm">
              A comprehensive platform for investors to track project progress and financial performance with clarity and confidence.
            </p>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-base font-medium mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white">Dashboard</Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm hover:text-white">Projects</Link>
              </li>
              <li>
                <Link to="/documents" className="text-sm hover:text-white">Documents</Link>
              </li>
              <li>
                <Link to="/investor-area" className="text-sm hover:text-white">Investor Area</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-base font-medium mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-sm hover:text-white">Help Center</Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm hover:text-white">FAQs</Link>
              </li>
              <li>
                <Link to="/guides" className="text-sm hover:text-white">Investment Guides</Link>
              </li>
              <li>
                <Link to="/webinars" className="text-sm hover:text-white">Webinars</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-base font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-sm hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-white">Contact</Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm hover:text-white">Careers</Link>
              </li>
              <li>
                <Link to="/legal" className="text-sm hover:text-white">Legal</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-neutral-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} InvestorDash. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link to="/privacy" className="text-sm hover:text-white">Privacy Policy</Link>
              <Link to="/terms" className="text-sm hover:text-white">Terms of Service</Link>
              <Link to="/cookies" className="text-sm hover:text-white">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;