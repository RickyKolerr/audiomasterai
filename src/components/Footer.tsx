const Footer = () => {
  return (
    <footer className="bg-secondary py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Careers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Community</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Partners</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-primary">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-400">
          <p>&copy; 2024 PWAMaster. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;