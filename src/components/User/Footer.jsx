import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-300 py-10 px-5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#E63946]">SERVICES</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Branding</a></li>
            <li><a href="#" className="hover:text-white">Design</a></li>
            <li><a href="#" className="hover:text-white">Marketing</a></li>
            <li><a href="#" className="hover:text-white">Advertisement</a></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#E63946]">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Jobs</a></li>
            <li><a href="#" className="hover:text-white">Press kit</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-[#E63946]">LEGAL</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Terms of Use</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Social Media & Download App Section */}
      <div className="flex flex-col items-center mt-10 space-y-4">
        {/* Social Media Icons */}
        <div className="flex space-x-6">
          <a href="https://facebook.com" target="_blank" className="text-gray-400 hover:text-[#E63946] text-2xl">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" className="text-gray-400 hover:text-[#E63946] text-2xl">
            <FaInstagram />
          </a>
          <a href="https://twitter.com" target="_blank" className="text-gray-400 hover:text-[#E63946] text-2xl">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-gray-400 hover:text-[#E63946] text-2xl">
            <FaLinkedin />
          </a>
        </div>

        {/* Download App Section */}
        <div className="flex space-x-4">
          <a href="#" className="bg-[#E63946] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-red-600">
            Download on Play Store
          </a>
          <a href="#" className="bg-[#E63946] text-white px-5 py-2 rounded-md font-semibold text-sm hover:bg-red-600">
            Download on App Store
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        © 2025 FoodOrder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
