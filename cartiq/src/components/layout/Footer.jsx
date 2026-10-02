import { Shield, RefreshCw, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'

const Footer = () => {
  return (
    <footer className="bg-[#1E3A5F] text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <span className="font-serif text-2xl font-bold">CartIQ</span>
            </div>
            <p className="text-amber-300 mb-4">Shop smarter, not harder.</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              CartIQ is built on the principle of user-centered discovery. We help you find exactly what you need based on your unique requirements, budget, and priorities.
            </p>
          </div>

          {/* Column 2 - Shop */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  All Products
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Best Sellers
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  New Arrivals
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Deals of the Day
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Account */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  My Account
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  My Orders
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Wishlist
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Return an Item
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Track Order
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Trust & Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Trust & Support</h3>
            <ul className="space-y-2 mb-6">
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Return Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-amber-300 hover:text-amber-400 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <Link to={ROUTES.DESIGN_PROCESS} className="text-amber-300 hover:text-amber-400 transition-colors">
                  Design Process
                </Link>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-4 h-4 text-amber-400" />
                <span>100% Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <RefreshCw className="w-4 h-4 text-amber-400" />
                <span>Easy Returns</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>Verified Sellers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 CartIQ. All rights reserved.
            </p>

            {/* Payment methods */}
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">UPI</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Visa</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">Mastercard</span>
              <span className="px-3 py-1 bg-gray-700 rounded-full text-sm">NetBanking</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
