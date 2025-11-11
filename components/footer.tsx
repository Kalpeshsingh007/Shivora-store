export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-8 md:py-12 border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
          <div>
            <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">SHIVORA</h3>
            <p className="text-xs md:text-sm text-slate-300">
              Premium clothing brand offering the finest quality apparel.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Quick Links</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">
                  Products
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Support</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
              <li>
                <a href="/contact" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Legal</h4>
            <ul className="space-y-1 md:space-y-2 text-xs md:text-sm text-slate-300">
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Returns
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-6 md:pt-8">
          <p className="text-center text-xs md:text-sm text-slate-400">&copy; 2025 Shivora. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
